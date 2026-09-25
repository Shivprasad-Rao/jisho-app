/* Classic worker wrapping KanjiCanvas (MIT, https://github.com/asdfjkl/kanjicanvas).
   Input strokes are arrays of [x, y] points in a 256×256 space. */
self.window = self;
self.document = { addEventListener() {}, getElementById() { return null; } };
const log = console.log;
console.log = () => {};
importScripts('kanji-canvas.js', 'ref-patterns.js');
console.log = log;

self.onmessage = (e) => {
  const { id, strokes } = e.data;
  try {
    if (!strokes.length) return self.postMessage({ id, candidates: [] });
    KanjiCanvas['recordedPattern_w'] = strokes;
    const normalized = KanjiCanvas.momentNormalize('w');
    const features = KanjiCanvas.extractFeatures(normalized, 20);
    const coarse = KanjiCanvas.coarseClassification(features);
    const silence = console.log;
    console.log = () => {};
    const out = KanjiCanvas.fineClassification(features, coarse);
    console.log = silence;
    self.postMessage({ id, candidates: out.trim().split(/\s+/).filter(Boolean) });
  } catch (err) {
    self.postMessage({ id, candidates: [], error: String(err) });
  }
};
