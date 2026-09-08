(function(){
if(!window.THREE) return;
// Minimal GLTFLoader shim using fetch and basic parsing for .gltf (JSON + external resources) is non-trivial.
// Provide a lightweight stub that throws on load to let code fallback.
window.THREE.GLTFLoader = function(){};
window.THREE.GLTFLoader.prototype.load = function(url, onLoad, onProgress, onError){ if(onError) onError(new Error('GLTFLoader stub: no loader available')); };
})();
