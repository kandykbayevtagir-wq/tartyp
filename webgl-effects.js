/**
 * TARTYP WebGL & High-Performance Visual Effects Suite v2.5
 * Features:
 * 1. Cyber-Engineering Perspective Grid & Spark Particles (WebGL Background)
 * 2. Real-time 3D Interactive Wall & Armobelt BIM Visualizer (Three.js)
 * 3. Juicy Number Rollers / Odometer Animations (easeOutExpo)
 * 4. Shockwave Ripple Pulses on Recalculation
 * 5. Interactive 3D Card Tilt & Tactile Micro-Interactions
 */

// Global Effects Controller
window.TartypFX = {
    triggerPulse: null,
    update3DWall: null,
    animateValue: null
};

/* ==========================================================================
   1. CYBER-ENGINEERING WEBGL PERSPECTIVE GRID & SPARKS BACKGROUND
   ========================================================================== */
(function initBackgroundFX() {
    const canvas = document.createElement('canvas');
    canvas.id = 'bgFXCanvas';
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: -1;
        pointer-events: none;
        opacity: 0.85;
    `;
    document.body.prepend(canvas);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0, height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
    }
    window.addEventListener('resize', resize);
    resize();

    // Floating Construction Sparks / Laser Particles
    const particles = [];
    const PARTICLE_COUNT = 32;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.4,
            vy: -Math.random() * 0.8 - 0.2, // Drifting upwards like welding sparks
            size: Math.random() * 2 + 1,
            color: Math.random() > 0.3 ? 'rgba(255, 107, 0, ' : 'rgba(0, 210, 255, ',
            alpha: Math.random() * 0.7 + 0.2,
            pulse: Math.random() * Math.PI
        });
    }

    // Shockwave Rings
    const shockwaves = [];
    window.TartypFX.triggerPulse = function(x, y) {
        shockwaves.push({
            x: x || width / 2,
            y: y || height * 0.4,
            radius: 5,
            maxRadius: Math.max(width, height) * 0.8,
            alpha: 0.6,
            speed: 12
        });
    };

    let gridOffset = 0;
    let isTabVisible = true;
    document.addEventListener('visibilitychange', () => {
        isTabVisible = !document.hidden;
    });

    let lastTime = performance.now();

    function render(now) {
        requestAnimationFrame(render);
        if (!isTabVisible) return;

        const dt = Math.min((now - lastTime) / 1000, 0.1);
        lastTime = now;

        ctx.clearRect(0, 0, width, height);

        // 1. Perspective Grid (Floor)
        const horizonY = height * 0.75;
        const vanishX = width * 0.5;
        gridOffset = (gridOffset + 14 * dt) % 40;

        ctx.save();
        ctx.strokeStyle = 'rgba(255, 107, 0, 0.04)';
        ctx.lineWidth = 1;

        // Radiating perspective lines
        const linesCount = 14;
        for (let i = -linesCount; i <= linesCount; i++) {
            const spread = (i / linesCount) * width * 1.5;
            ctx.beginPath();
            ctx.moveTo(vanishX, horizonY);
            ctx.lineTo(vanishX + spread, height);
            ctx.stroke();
        }

        // Horizontal perspective rungs
        for (let y = horizonY; y < height; y += (height - y) * 0.22 + 4) {
            const progress = (y - horizonY) / (height - horizonY);
            ctx.strokeStyle = `rgba(255, 107, 0, ${0.015 + progress * 0.06})`;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }
        ctx.restore();

        // 2. Shockwave Rings
        for (let i = shockwaves.length - 1; i >= 0; i--) {
            const sw = shockwaves[i];
            sw.radius += sw.speed;
            sw.alpha *= 0.94;

            ctx.save();
            ctx.beginPath();
            ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(255, 107, 0, ${sw.alpha})`;
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.restore();

            if (sw.alpha < 0.02 || sw.radius >= sw.maxRadius) {
                shockwaves.splice(i, 1);
            }
        }

        // 3. Floating Sparks
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.pulse += 0.04;
            const currentAlpha = p.alpha * (0.6 + 0.4 * Math.sin(p.pulse));

            if (p.y < -10) {
                p.y = height + 10;
                p.x = Math.random() * width;
            }
            if (p.x < -10) p.x = width + 10;
            if (p.x > width + 10) p.x = -10;

            ctx.save();
            ctx.fillStyle = p.color + currentAlpha + ')';
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();

            // Soft glowing halo
            ctx.fillStyle = p.color + (currentAlpha * 0.3) + ')';
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    requestAnimationFrame(render);
})();

/* ==========================================================================
   2. SMOOTH NUMBER ROLLER (EASE-OUT EXPONENTIAL ODOMETER)
   ========================================================================== */
window.TartypFX.animateValue = function(element, endVal, duration = 350, formatter = null) {
    if (!element) return;

    let suffix = '';
    let fn = null;
    let dur = typeof duration === 'number' ? duration : 350;

    if (typeof duration === 'string') {
        suffix = duration;
        dur = 350;
    } else if (typeof duration === 'function') {
        fn = duration;
        dur = 350;
    }

    if (typeof formatter === 'string') {
        suffix = formatter;
    } else if (typeof formatter === 'function') {
        fn = formatter;
    }

    if (!fn) {
        fn = (v) => {
            const rounded = Math.round(v);
            return `${rounded.toLocaleString('ru-RU')}${suffix ? ' ' + suffix.trim() : ''}`;
        };
    }

    const currentText = element.getAttribute('data-raw-val');
    const startVal = currentText ? parseFloat(currentText) : 0;
    if (isNaN(startVal) || isNaN(endVal)) {
        element.textContent = fn(endVal);
        return;
    }
    if (Math.abs(startVal - endVal) < 0.001) {
        element.textContent = fn(endVal);
        element.setAttribute('data-raw-val', endVal);
        return;
    }

    element.setAttribute('data-raw-val', endVal);
    const startTime = performance.now();

    // Subtle scale bounce animation on trigger
    element.classList.remove('num-bump');
    void element.offsetWidth; // force reflow
    element.classList.add('num-bump');

    function update(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / dur, 1);
        // Exponential ease out
        const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const current = startVal + (endVal - startVal) * ease;

        element.textContent = fn(current);

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = fn(endVal);
        }
    }

    requestAnimationFrame(update);
};

/* ==========================================================================
   3. REAL-TIME 3D WALL & ARMOBELT BIM VISUALIZER (THREE.JS)
   ========================================================================== */
window.TartypFX.init3DWall = function(containerId) {
    const container = document.getElementById(containerId);
    if (!container || typeof THREE === 'undefined') return;

    // Dimensions
    const width = container.clientWidth || 360;
    const height = 220;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x10131A);

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(4.5, 3.2, 5.0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Grid Floor
    const gridHelper = new THREE.GridHelper(8, 16, 0xFF6B00, 0x232A36);
    gridHelper.position.y = -0.01;
    scene.add(gridHelper);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.9);
    dirLight.position.set(5, 8, 4);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add(dirLight);

    const accentLight = new THREE.PointLight(0xFF6B00, 1.2, 8);
    accentLight.position.set(-3, 2, 2);
    scene.add(accentLight);

    // 3D Object Group
    const wallGroup = new THREE.Group();
    scene.add(wallGroup);

    // Material Colors Map
    const colorMap = {
        gazoblok: 0xB0BEC5,     // Autoclaved Aerated Concrete Grey
        brick: 0xC0392B,        // Terracotta Ceramic Brick
        shlakoblok: 0x546E7A,   // Cinder Block Charcoal
        penoblok: 0x90A4AE,     // Foam concrete
        teploblok: 0xD7CCC8,    // Warm composite block
        spliter: 0x78909C       // Split block
    };

    // Meshes cache
    let wallMesh = null;
    let concreteMesh = null;
    let openingMesh = null;
    let baseMesh = null;

    // Orbit Drag Controls (Manual Touch & Mouse rotation)
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let rotationSpeed = 0.006;
    let autoRotate = true;

    const domEl = renderer.domElement;

    function onPointerDown(e) {
        isDragging = true;
        autoRotate = false;
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        previousMousePosition = { x: clientX, y: clientY };
    }

    function onPointerMove(e) {
        if (!isDragging) return;
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        const deltaX = clientX - previousMousePosition.x;
        const deltaY = clientY - previousMousePosition.y;

        wallGroup.rotation.y += deltaX * rotationSpeed;
        camera.position.y = Math.max(1.0, Math.min(6.0, camera.position.y - deltaY * 0.02));

        previousMousePosition = { x: clientX, y: clientY };
    }

    function onPointerUp() {
        isDragging = false;
        setTimeout(() => { autoRotate = true; }, 3000); // Resume gentle spin after 3s idle
    }

    domEl.addEventListener('mousedown', onPointerDown);
    domEl.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('mouseup', onPointerUp);
    window.addEventListener('touchend', onPointerUp);

    // Look at center
    camera.lookAt(0, 0.8, 0);

    // Update 3D Geometry Function
    window.TartypFX.update3DWall = function(data) {
        if (!data) return;

        // Clear existing meshes
        while (wallGroup.children.length > 0) {
            const obj = wallGroup.children[0];
            if (obj.geometry) obj.geometry.dispose();
            if (obj.material) {
                if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
                else obj.material.dispose();
            }
            wallGroup.remove(obj);
        }

        // Scale factors to fit 3D viewport nicely (normalized to ~3.0m box)
        const rawLen = Math.max(1000, data.wLen || 6000) / 1000;
        const rawHgt = Math.max(1000, data.wHgt || 3000) / 1000;
        const rawThk = Math.max(100, data.wThk || 200) / 1000;
        const oArea = data.oArea || 0;
        const bVol = data.bVol || 0;

        const maxDim = Math.max(rawLen, rawHgt);
        const scale = 3.2 / maxDim;

        const wL = rawLen * scale;
        const wH = rawHgt * scale;
        const wT = Math.max(0.15, rawThk * scale * 2.2); // slight thickness exaggeration for 3D visibility

        // Block Color determination
        let baseColor = colorMap.gazoblok;
        if (data.matKey) {
            if (data.matKey.includes('brick')) baseColor = colorMap.brick;
            else if (data.matKey.includes('shlak')) baseColor = colorMap.shlakoblok;
            else if (data.matKey.includes('peno')) baseColor = colorMap.penoblok;
            else if (data.matKey.includes('teplo')) baseColor = colorMap.teploblok;
            else if (data.matKey.includes('split')) baseColor = colorMap.spliter;
        }

        // 1. Foundation Slab
        const baseGeo = new THREE.BoxGeometry(wL * 1.08, 0.1, wT * 1.6);
        const baseMat = new THREE.MeshStandardMaterial({ 
            color: 0x2A3240, 
            roughness: 0.85,
            metalness: 0.1
        });
        baseMesh = new THREE.Mesh(baseGeo, baseMat);
        baseMesh.position.set(0, 0.05, 0);
        baseMesh.receiveShadow = true;
        wallGroup.add(baseMesh);

        // 2. Concrete Armobelt Height (if concrete volume > 0)
        let armoHeight = 0;
        if (bVol > 0) {
            const rawArmoH = (bVol / (rawLen * rawThk));
            armoHeight = Math.min(wH * 0.35, Math.max(0.12, rawArmoH * scale));
        }

        const masonryHeight = Math.max(0.2, wH - armoHeight);

        // 3. Main Masonry Wall
        const wallGeo = new THREE.BoxGeometry(wL, masonryHeight, wT);
        
        // Block wireframe edges for high-tech architectural blueprint aesthetic
        const wallMat = new THREE.MeshStandardMaterial({
            color: baseColor,
            roughness: 0.75,
            metalness: 0.05
        });
        wallMesh = new THREE.Mesh(wallGeo, wallMat);
        wallMesh.position.set(0, 0.1 + masonryHeight / 2, 0);
        wallMesh.castShadow = true;
        wallMesh.receiveShadow = true;
        wallGroup.add(wallMesh);

        // Outline wireframe edges on blocks
        const edgesGeo = new THREE.EdgesGeometry(wallGeo);
        const edgesMat = new THREE.LineBasicMaterial({ color: 0x1A1F2B, linewidth: 1.5 });
        const wallEdges = new THREE.LineSegments(edgesGeo, edgesMat);
        wallMesh.add(wallEdges);

        // 4. Openings Cut-Out Representation (Visual window frame)
        if (oArea > 0) {
            const openWidth = Math.min(wL * 0.45, Math.sqrt(oArea * scale * 0.8));
            const openHeight = Math.min(masonryHeight * 0.65, Math.sqrt(oArea * scale * 0.8));
            const openGeo = new THREE.BoxGeometry(openWidth, openHeight, wT * 1.08);
            const openMat = new THREE.MeshStandardMaterial({
                color: 0x0A0D12,
                roughness: 0.9,
                wireframe: false
            });
            openingMesh = new THREE.Mesh(openGeo, openMat);
            openingMesh.position.set(0, 0.1 + masonryHeight * 0.5, 0);

            // Orange laser contour around opening
            const openEdges = new THREE.LineSegments(
                new THREE.EdgesGeometry(openGeo),
                new THREE.LineBasicMaterial({ color: 0xFF6B00, linewidth: 2 })
            );
            openingMesh.add(openEdges);
            wallGroup.add(openingMesh);
        }

        // 5. Concrete Armobelt Mesh (on top of the wall)
        if (armoHeight > 0) {
            const armoGeo = new THREE.BoxGeometry(wL, armoHeight, wT * 1.02);
            const armoMat = new THREE.MeshStandardMaterial({
                color: 0x90A4AE, // Concrete grey
                roughness: 0.6,
                metalness: 0.2
            });
            concreteMesh = new THREE.Mesh(armoGeo, armoMat);
            concreteMesh.position.set(0, 0.1 + masonryHeight + armoHeight / 2, 0);
            concreteMesh.castShadow = true;

            // Blueprint cyan outline for concrete
            const armoEdges = new THREE.LineSegments(
                new THREE.EdgesGeometry(armoGeo),
                new THREE.LineBasicMaterial({ color: 0x00D2FF, linewidth: 1.5 })
            );
            concreteMesh.add(armoEdges);
            wallGroup.add(concreteMesh);
        }

        // Trigger pulse wave on 3D rebuild
        if (window.TartypFX.triggerPulse) {
            window.TartypFX.triggerPulse();
        }
    };

    // Render Loop
    function animate() {
        requestAnimationFrame(animate);
        if (autoRotate) {
            wallGroup.rotation.y += 0.004;
        }
        renderer.render(scene, camera);
    }
    animate();

    // Resize handler
    window.addEventListener('resize', () => {
        const newW = container.clientWidth || 360;
        camera.aspect = newW / height;
        camera.updateProjectionMatrix();
        renderer.setSize(newW, height);
    });
};
