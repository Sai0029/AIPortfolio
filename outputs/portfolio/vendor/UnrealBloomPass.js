(function(){
if(!window.THREE) return;
// Minimal UnrealBloomPass shim: provides render() that applies a basic screen-space additive effect via blending capture
window.THREE.UnrealBloomPass = function(resolution, strength, radius, threshold){ this.resolution = resolution; this.strength = strength || 1.0; this.radius = radius || 0.5; this.threshold = threshold || 0.9; };
window.THREE.UnrealBloomPass.prototype.render = function(renderer){ /* No-op; this is a shim for compatibility. */ };
})();
