document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.createElement('canvas');
    canvas.id = 'bg-canvas';
    document.body.prepend(canvas);

    const ctx = canvas.getContext('2d');
    let width, height;
    let time = 0;

    // Configuration for the effect
    const config = {
        noiseOpacity: 0.25, // Much more visible noise
        lensOpacity: 0.3,   // Visible glass effect
        flowSpeed: 0.015,   // Slow organic movement
        noiseScale: 3       // Large noise particles
    };

    window.addEventListener('resize', resize);
    resize();

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    // Color helper
    function getRandomColor() {
        // Mix between #7c696c and #7d7578
        const r = 124 + Math.random();
        const g = 105 + Math.random() * 12;
        const b = 108 + Math.random() * 12;
        return `rgba(${Math.floor(r)}, ${Math.floor(g)}, ${Math.floor(b)}`;
    }

    // Pre-render noise texture
    const noiseCanvas = document.createElement('canvas');
    noiseCanvas.width = 256;
    noiseCanvas.height = 256;
    const noiseCtx = noiseCanvas.getContext('2d');
    
    // Generate chunky noise
    function updateNoise() {
        const idata = noiseCtx.createImageData(256, 256);
        const buffer32 = new Uint32Array(idata.data.buffer);
        const len = buffer32.length;

        for (let i = 0; i < len; i++) {
            if (Math.random() < 0.4) {
                // Color #7c696c ~ #7d7578 (Darkened)
                // Subtracting roughly 20 from each channel to darken
                const r = Math.max(0, 104 + Math.random());
                const g = Math.max(0, 85 + Math.random() * 12);
                const b = Math.max(0, 88 + Math.random() * 12);
                
                // ABGR
                buffer32[i] = (0xFF << 24) | (Math.floor(b) << 16) | (Math.floor(g) << 8) | Math.floor(r); 
            } else {
                buffer32[i] = 0x00000000;
            }
        }
        noiseCtx.putImageData(idata, 0, 0);
    }
    updateNoise(); // Initial noise

    function animate() {
        ctx.clearRect(0, 0, width, height);
        time += config.flowSpeed;

        // 0. Dynamic Background Gradient
        // Calculate gradient colors based on time (Slowed down)
        const gradientSpeed = 0.5; // Multiplier to slow down color change
        const r1 = 124 + Math.sin(time * gradientSpeed) * 10;
        const g1 = 105 + Math.sin(time * gradientSpeed + 2) * 10;
        const b1 = 108 + Math.sin(time * gradientSpeed + 4) * 10;
        
        const r2 = 125 + Math.cos(time * gradientSpeed) * 10;
        const g2 = 117 + Math.cos(time * gradientSpeed + 2) * 10;
        const b2 = 120 + Math.cos(time * gradientSpeed + 4) * 10;

        const gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, `rgb(${r1}, ${g1}, ${b1})`); // Start color
        gradient.addColorStop(1, `rgb(${r2}, ${g2}, ${b2})`); // End color
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        // 1. Draw Visible Noise Background
        ctx.save();
        ctx.globalCompositeOperation = 'overlay'; // Blend noise with gradient
        ctx.globalAlpha = config.noiseOpacity;
        ctx.scale(config.noiseScale, config.noiseScale); // Scale up for chunkiness
        
        // Slowly move the noise pattern pattern
        // Add random vibration jitter
        const jitterX = (Math.random() - 0.5) * 2; 
        const jitterY = (Math.random() - 0.5) * 2;

        const pattern = ctx.createPattern(noiseCanvas, 'repeat');
        ctx.fillStyle = pattern;
        ctx.translate(Math.sin(time * 0.5) * 10 + jitterX, time * 5 + jitterY); // Flowing movement + Jitter
        ctx.fillRect(-width, -height, width * 4 / config.noiseScale, height * 4 / config.noiseScale);
        ctx.restore();


        // 2. Organic Optical Lens Effect (Horizontal Glass Rods)
        ctx.save();
        ctx.globalCompositeOperation = 'soft-light'; // Blend lens effect smoothly
        
        // Use a gradient to create the "rod" highlight/shadow look
        // We simulate this by drawing horizontal bands with varying alpha
        const rodHeight = 8; // Height of one glass rod effect
        
        for (let y = 0; y < height; y += rodHeight) {
            // Calculate organic wave intensity
            // Combine multiple sine waves for "honey-like" (organic) liquid motion
            const wave1 = Math.sin(y * 0.02 + time);
            const wave2 = Math.sin(y * 0.05 - time * 0.5);
            const wave3 = Math.cos(time * 0.2); // Global breathing
            
            const intensity = (wave1 + wave2 + wave3) / 3; // -1 to 1
            
            // Map intensity to opacity
            // Create "ridges" of light and dark
            const alpha = Math.max(0, (intensity + 1) / 2 * config.lensOpacity);
            
            ctx.fillStyle = `rgba(124, 105, 108, ${alpha})`;
            ctx.fillRect(0, y, width, rodHeight + 1); // +1 to overlap slightly
            
            // Optional: Add a highlight line for "optical" feel
            if (intensity > 0.5) {
                ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.5})`;
                ctx.fillRect(0, y + rodHeight/2, width, 1);
            }
        }
        ctx.restore();

        requestAnimationFrame(animate);
    }

    animate();
});
