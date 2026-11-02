const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const read = (name) => fs.readFileSync(path.join(root, name), "utf8");
const hash = (name) => crypto.createHash("sha256").update(fs.readFileSync(path.join(root, name))).digest("hex");

function load(includeSupplementary = true) {
  const context = vm.createContext({ window: { location: { hash: "" }, scrollTo() {} }, history: {} });
  vm.runInContext(read("expansion_results.js"), context);
  if (includeSupplementary) vm.runInContext(read("supplementary_results.js"), context);
  const code = read("script.js");
  vm.runInContext(code.slice(0, code.indexOf("const filters =")), context);
  vm.runInContext(code.slice(code.indexOf("function displayModelName("), code.indexOf("function rankDisplay(")), context);
  return context;
}

const data = (context, expression) => JSON.parse(vm.runInContext(`JSON.stringify(${expression})`, context));
const close = (actual, expected) => assert.ok(Math.abs(actual - expected) < 1e-9, `${actual} != ${expected}`);

test("selected entries contain all 14 tasks and correct macro averages", () => {
  const context = load();
  const groups = data(context, "capabilityTaskKeys");
  const selected = data(context, "supplementaryModels");
  assert.equal(selected.length, 3);
  for (const row of selected) {
    assert.equal(row.samples, 470);
    assert.equal(row.status, "complete");
    assert.equal(Object.keys(row.tasks).length, 14);
    assert.ok(Object.values(row.tasks).every((score) => Number.isFinite(score) && score >= 0 && score <= 100));
    close(row.overall, Object.values(row.tasks).reduce((a, b) => a + b, 0) / 14);
    for (const [group, tasks] of Object.entries(groups)) {
      close(row.capabilities[group], tasks.reduce((sum, task) => sum + row.tasks[task], 0) / tasks.length);
    }
  }
  assert.deepEqual(selected.map((row) => row.overall.toFixed(2)), ["33.81", "29.63", "26.50"]);
});

test("Qwen replacement is unique and unrelated scores remain unchanged", () => {
  const before = data(load(false), "integratedModels");
  const after = data(load(), "integratedModels");
  const key = (row) => `${row.model}::${row.protocolKey}`;
  const indexed = new Map(after.map((row) => [key(row), row]));
  assert.equal(indexed.size, after.length);
  assert.equal(after.length, before.length + 2);
  for (const row of before) {
    if (key(row) === "Qwen-Image-Edit-2511::visual") continue;
    assert.deepEqual(indexed.get(key(row)), row);
  }
  assert.equal(indexed.get("Qwen-Image-Edit-2511::visual").configuration, "DyRef gamma2 epoch-30 LoRA");
  assert.equal(after.filter((row) => row.model.startsWith("SenseNova-U1.5")).length, 1);
});

test("display names omit metadata suffixes without changing source identifiers", () => {
  const context = load();
  assert.equal(vm.runInContext('displayModelName({model:"BAGEL-7B-MoT"})', context), "BAGEL-7B");
  assert.equal(vm.runInContext('displayModelName({model:"SenseNova-Vision-7B-MoT"})', context), "SenseNova-Vision-7B");
  assert.equal(vm.runInContext('displayModelName({model:"RoboBrain2.5-8B-NV"})', context), "RoboBrain2.5-8B");
  for (const name of data(context, "integratedModels.map(displayModelName)")) assert.doesNotMatch(name, /-(MoT|NV)$/);
  const label = vm.runInContext("modelLabel(supplementaryModels[1])", context);
  assert.equal(label, "Qwen-Image-Edit-2511");
  assert.doesNotMatch(read("index.html"), /evaluation-configurations|Run metadata|Per-sample scores/);
});

test("published data have verified hashes and an explicit scoring scope", () => {
  const context = load();
  const payload = data(context, "window.SPATIALGEN_SUPPLEMENTARY_RESULTS");
  assert.equal(hash(payload.manifest), payload.manifest_sha256);
  const manifest = JSON.parse(read(payload.manifest));
  assert.equal(manifest.samples.rows, 1410);
  assert.equal(hash(path.join(path.dirname(payload.manifest), manifest.samples.path)), manifest.samples.sha256);
  assert.equal(manifest.full_historical_protocol_reproduced, false);
  assert.deepEqual(manifest.historical_parser_calibration, { records: 1209, mismatches: 0 });
  assert.equal(manifest.new_api_calls, 0);
});
