// Generated from the registered homepage selection; do not edit scores independently.
window.SPATIALGEN_SUPPLEMENTARY_RESULTS = {
  "schema_version": "spatialgen.homepage_supplementary.v1",
  "updated_at": "2026-11-02",
  "manifest": "assets/results/visual-20261102/manifest.json",
  "manifest_sha256": "7ba7495ae2934a2c7159763cc5e278282f17f920ea0cc7cea67bb07deec27da8",
  "models": [
    {
      "model": "SenseNova-U1.5-8B",
      "protocol": "Visual Answering",
      "protocolKey": "visual",
      "source": "Supplementary local evaluation, comparison A",
      "status": "complete",
      "samples": 470,
      "run": "sensenova-u15-8step-v2-full470",
      "configuration": "Official 8-step V2 LoRA",
      "configurationId": "sensenova-u15-8step-v2",
      "tasks": {
        "counting": 55.00000000000001,
        "depth": 10.0,
        "orientation": 10.0,
        "size": 85.71428571428571,
        "relationship": 37.142857142857146,
        "perspective": 17.142857142857142,
        "mental_modeling": 0.0,
        "grounding": 65.71428571428571,
        "multihop": 0.0,
        "prediction": 17.466666666666665,
        "feasibility": 31.428571428571427,
        "affordance": 23.791165230940088,
        "navigation": 36.666666666666664,
        "trajectory": 83.33333333333334
      },
      "overall": 33.81433493146171,
      "capabilities": {
        "Perception": 40.17857142857143,
        "Understanding": 30.0,
        "Reasoning": 16.298412698412697,
        "Interaction": 47.93038841031336
      }
    },
    {
      "model": "Qwen-Image-Edit-2511",
      "protocol": "Visual Answering",
      "protocolKey": "visual",
      "source": "Supplementary local evaluation, comparison A",
      "status": "complete",
      "samples": 470,
      "run": "qwen2511-dyref-full470",
      "configuration": "DyRef gamma2 epoch-30 LoRA",
      "configurationId": "qwen2511-dyref",
      "tasks": {
        "counting": 60.0,
        "depth": 76.66666666666667,
        "orientation": 7.5,
        "size": 28.57142857142857,
        "relationship": 34.285714285714285,
        "perspective": 5.714285714285714,
        "mental_modeling": 2.857142857142857,
        "grounding": 25.71428571428571,
        "multihop": 0.0,
        "prediction": 9.257142857142858,
        "feasibility": 48.57142857142857,
        "affordance": 19.048561628891715,
        "navigation": 36.666666666666664,
        "trajectory": 60.0
      },
      "overall": 29.63238025240383,
      "capabilities": {
        "Perception": 43.18452380952381,
        "Understanding": 17.142857142857142,
        "Reasoning": 19.276190476190475,
        "Interaction": 38.57174276518613
      },
      "replaces": "Qwen-Image-Edit-2511::visual"
    },
    {
      "model": "UniPic-3 Base",
      "protocol": "Visual Answering",
      "protocolKey": "visual",
      "source": "Supplementary local evaluation, comparison A",
      "status": "complete",
      "samples": 470,
      "run": "unipic3-base-full470",
      "configuration": "Official Base checkpoint, 50 steps",
      "configurationId": "unipic3-base",
      "tasks": {
        "counting": 22.5,
        "depth": 86.66666666666667,
        "orientation": 10.0,
        "size": 37.142857142857146,
        "relationship": 31.428571428571427,
        "perspective": 8.571428571428571,
        "mental_modeling": 5.714285714285714,
        "grounding": 11.428571428571429,
        "multihop": 0.0,
        "prediction": 0.0,
        "feasibility": 37.142857142857146,
        "affordance": 10.423928525170705,
        "navigation": 36.666666666666664,
        "trajectory": 73.33333333333333
      },
      "overall": 26.501369044314913,
      "capabilities": {
        "Perception": 39.077380952380956,
        "Understanding": 14.285714285714285,
        "Reasoning": 12.380952380952381,
        "Interaction": 40.141309508390236
      }
    }
  ]
};
