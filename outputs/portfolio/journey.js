(()=>{
	const route = document.querySelector('#route');
	const vehicle = document.querySelector('#route-vehicle');
	const pathEl = document.getElementById('route-path');
	const progress = document.querySelector('#route-progress');
	if(!route || !vehicle || !pathEl) return;

	let current = 0, target = 0, raf = 0, total = pathEl.getTotalLength();

	function render(){
		total = pathEl.getTotalLength();
		current += (target - current) * 0.085;
		const len = total * current;
		const pt = pathEl.getPointAtLength(len);

		// viewBox is 1200x220 — map SVG coords to percentage positioning
		const leftPct = (pt.x / 1200) * 100;
		const topPct = (pt.y / 220) * 100;
		vehicle.style.left = leftPct + '%';
		vehicle.style.top = topPct + '%';

		// compute heading by sampling a point slightly ahead
		const ahead = pathEl.getPointAtLength(Math.min(total, len + Math.max(1, total * 0.002)));
		const angle = Math.atan2(ahead.y - pt.y, ahead.x - pt.x) * 180 / Math.PI;
		vehicle.style.setProperty('--route-a', angle.toFixed(2));

		progress.textContent = Math.round(current * 100).toString().padStart(2,'0') + '%';

		document.querySelectorAll('.checkpoint').forEach((c,x)=>c.classList.toggle('reached', current >= x/4));

		if(Math.abs(target - current) > 0.0005) raf = requestAnimationFrame(render); else raf = 0;
	}

	function update(){
		const r = route.getBoundingClientRect();
		const span = innerHeight + r.height;
		target = Math.max(0, Math.min(1, (innerHeight - r.top) / span));
		if(!raf) raf = requestAnimationFrame(render);
	}

	addEventListener('scroll', update, {passive:true});
	addEventListener('resize', update);
	update();
})();
