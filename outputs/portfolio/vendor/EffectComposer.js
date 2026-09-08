(function(){
if(!window.THREE) return;
// Minimal EffectComposer shim: supports addPass and render sequence
window.THREE.EffectComposer = function(renderer){
  this.renderer = renderer;
  this.passes = [];
};
window.THREE.EffectComposer.prototype.addPass = function(pass){ this.passes.push(pass); };
window.THREE.EffectComposer.prototype.render = function(){
  for(let i=0;i<this.passes.length;i++){
    const p = this.passes[i];
    if(p && typeof p.render === 'function'){
      try{ p.render(this.renderer); }catch(e){ /* swallow errors */ }
    }
  }
};
})();
