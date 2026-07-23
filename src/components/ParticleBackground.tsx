import { useEffect, useRef } from 'react';

const ParticleBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        // Particles
        const particles: { x: number; y: number; size: number; vx: number; vy: number; gold: boolean; alpha: number }[] = [];
        for (let i = 0; i < 140; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 1.8 + 0.4,
                vx: (Math.random() - 0.5) * 0.25,
                vy: (Math.random() - 0.5) * 0.25,
                gold: Math.random() > 0.55,
                alpha: Math.random() * 0.7 + 0.2,
            });
        }

        // Streaks — light beams from upper right area
        const streaks = [
            { ax: 0.62, ay: 0.12, angle: 42, len: 0.85, colA: 'rgba(200,150,20,0.18)', w: 40 },
            { ax: 0.64, ay: 0.10, angle: 32, len: 0.70, colA: 'rgba(200,150,20,0.12)', w: 28 },
            { ax: 0.60, ay: 0.14, angle: 58, len: 0.75, colA: 'rgba(0,200,80,0.10)', w: 30 },
            { ax: 0.66, ay: 0.08, angle: 22, len: 0.90, colA: 'rgba(200,150,20,0.09)', w: 24 },
            { ax: 0.58, ay: 0.16, angle: 72, len: 0.60, colA: 'rgba(0,200,80,0.07)', w: 18 },
            { ax: 0.68, ay: 0.06, angle: 15, len: 1.00, colA: 'rgba(200,150,20,0.07)', w: 20 },
        ];

        let t = 0;
        let animId: number;

        const draw = () => {
            const W = canvas.width, H = canvas.height;
            if (W <= 0 || H <= 0) {
                animId = requestAnimationFrame(draw);
                return;
            }

            // Base
            ctx.fillStyle = '#060e08';
            ctx.fillRect(0, 0, W, H);

            // Central warm gold glow (upper-right)
            const cg = ctx.createRadialGradient(W * 0.63, H * 0.18, 0, W * 0.63, H * 0.18, W * 0.75);
            cg.addColorStop(0, 'rgba(155, 115, 15, 0.45)');
            cg.addColorStop(0.25, 'rgba(90, 65, 8, 0.28)');
            cg.addColorStop(0.55, 'rgba(0, 80, 30, 0.12)');
            cg.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = cg;
            ctx.fillRect(0, 0, W, H);

            // Secondary green glow (lower-left)
            const gg = ctx.createRadialGradient(W * 0.1, H * 0.75, 0, W * 0.1, H * 0.75, W * 0.55);
            gg.addColorStop(0, 'rgba(0, 140, 55, 0.18)');
            gg.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = gg;
            ctx.fillRect(0, 0, W, H);

            // Light streaks
            streaks.forEach(s => {
                const sx = W * s.ax, sy = H * s.ay;
                const rad = (s.angle * Math.PI) / 180;
                const ex = sx + Math.cos(rad) * W * s.len;
                const ey = sy + Math.sin(rad) * H * s.len;
                const gr = ctx.createLinearGradient(sx, sy, ex, ey);
                gr.addColorStop(0, s.colA);
                gr.addColorStop(0.6, s.colA.replace(/[\d.]+\)$/, '0.03)'));
                gr.addColorStop(1, 'rgba(0,0,0,0)');
                ctx.save();
                ctx.beginPath();
                ctx.moveTo(sx, sy);
                ctx.lineTo(ex, ey);
                ctx.strokeStyle = gr;
                ctx.lineWidth = s.w;
                ctx.globalCompositeOperation = 'screen';
                ctx.stroke();
                ctx.restore();
            });

            // Particles
            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0) p.x = W;
                if (p.x > W) p.x = 0;
                if (p.y < 0) p.y = H;
                if (p.y > H) p.y = 0;

                const twinkle = Math.sin(t * 1.8 + p.x * 0.01 + p.y * 0.01) * 0.35 + 0.65;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                if (p.gold) {
                    ctx.fillStyle = `rgba(212,175,55,${p.alpha * twinkle})`;
                    ctx.shadowColor = '#d4af37';
                } else {
                    ctx.fillStyle = `rgba(0,230,118,${p.alpha * twinkle})`;
                    ctx.shadowColor = '#00e676';
                }
                ctx.shadowBlur = p.size * 5;
                ctx.fill();
                ctx.shadowBlur = 0;
            });

            t += 0.012;
            animId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return <canvas ref={canvasRef} className="particle-bg-canvas" />;
};

export default ParticleBackground;
