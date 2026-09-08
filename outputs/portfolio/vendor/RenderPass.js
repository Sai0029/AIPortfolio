(function(){
if(!window.THREE) return;
window.THREE.RenderPass = function(scene, camera){ this.scene = scene; this.camera = camera; };
window.THREE.RenderPass.prototype.render = function(renderer){ renderer.render(this.scene, this.camera); };
})();
