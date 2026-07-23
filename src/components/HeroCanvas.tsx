import { useEffect, useRef } from 'react';

const HeroCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let W = canvas.width = canvas.offsetWidth;
        let H = canvas.height = canvas.offsetHeight;

        const resize = () => {
            W = canvas.width = canvas.offsetWidth;
            H = canvas.height = canvas.offsetHeight;
        };
        window.addEventListener('resize', resize);

        const NUM_BARS = 20;
        let phase = 0;
        let animId: number;

        // Sparks floating upward
        const sparks: { x: number; y: number; size: number; vy: number; gold: boolean; alpha: number }[] = [];
        for (let i = 0; i < 18; i++) {
            sparks.push({
                x: Math.random() * W, y: Math.random() * H * 0.8,
                size: Math.random() * 2.5 + 0.5,
                vy: Math.random() * 0.6 + 0.2,
                gold: Math.random() > 0.4,
                alpha: Math.random() * 0.8 + 0.2,
            });
        }

        const draw = () => {
            const currentW = canvas.offsetWidth || canvas.clientWidth || 300;
            const currentH = canvas.offsetHeight || canvas.clientHeight || 200;
            if (canvas.width !== currentW || canvas.height !== currentH) {
                W = canvas.width = currentW;
                H = canvas.height = currentH;
            }
            if (W <= 0 || H <= 0) {
                animId = requestAnimationFrame(draw);
                return;
            }
            ctx.clearRect(0, 0, W, H);

            // Dark gradient background
            const bg = ctx.createLinearGradient(0, 0, W, H);
            bg.addColorStop(0, '#051008');
            bg.addColorStop(1, '#020604');
            ctx.fillStyle = bg;
            ctx.fillRect(0, 0, W, H);

            // Grid
            ctx.strokeStyle = 'rgba(0,210,80,0.05)';
            ctx.lineWidth = 1;
            for (let x = 0; x < W; x += 28) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
            for (let y = 0; y < H; y += 28) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

            // Bottom glow wash
            const bgl = ctx.createRadialGradient(W * 0.5, H, 0, W * 0.5, H, H * 0.9);
            bgl.addColorStop(0, 'rgba(0,180,70,0.18)');
            bgl.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = bgl;
            ctx.fillRect(0, 0, W, H);

            // Bars
            const marginX = W * 0.06;
            const totalW = W - marginX * 2;
            const barW = totalW / NUM_BARS;
            const gap = barW * 0.22;
            const baseY = H * 0.90;

            const linePoints: { x: number; y: number }[] = [];

            for (let i = 0; i < NUM_BARS; i++) {
                const x = marginX + i * barW;

                // Mountain shape: rises in center-right, with wave ripple
                const mountain = Math.pow(Math.sin((i / NUM_BARS) * Math.PI * 1.05), 1.2) * 0.75;
                const wave = Math.sin(i * 0.55 + phase) * 0.12;
                const hFactor = Math.max(0.04, mountain + wave + 0.05);
                const bH = hFactor * H * 0.82;
                const bY = baseY - bH;
                const bX = x + gap / 2;
                const bWW = barW - gap;

                linePoints.push({ x: bX + bWW / 2, y: bY });

                // Glow layers (back to front)
                for (let g = 3; g >= 0; g--) {
                    const gr = ctx.createLinearGradient(bX, bY, bX, baseY);
                    if (g === 0) {
                        gr.addColorStop(0, 'rgba(100,255,170,0.95)');
                        gr.addColorStop(0.2, 'rgba(0,230,118,0.85)');
                        gr.addColorStop(0.7, 'rgba(0,140,60,0.5)');
                        gr.addColorStop(1, 'rgba(0,60,25,0.2)');
                        ctx.shadowBlur = 0;
                    } else {
                        const a = 0.12 / g;
                        gr.addColorStop(0, `rgba(0,230,118,${a})`);
                        gr.addColorStop(1, 'rgba(0,0,0,0)');
                        ctx.shadowColor = '#00e676';
                        ctx.shadowBlur = g * 18;
                    }
                    ctx.fillStyle = gr;
                    ctx.fillRect(bX, bY, bWW, bH);
                    ctx.shadowBlur = 0;
                }

                // Bright top cap
                const cap = ctx.createLinearGradient(0, bY - 1, 0, bY + 5);
                cap.addColorStop(0, 'rgba(210,255,230,1)');
                cap.addColorStop(1, 'rgba(0,230,118,0.3)');
                ctx.fillStyle = cap;
                ctx.shadowColor = '#aaffcc';
                ctx.shadowBlur = 14;
                ctx.fillRect(bX, bY, bWW, 4);
                ctx.shadowBlur = 0;
            }

            // Gold trend line over bars
            if (linePoints.length > 1) {
                ctx.beginPath();
                ctx.moveTo(linePoints[0].x, linePoints[0].y - 14);
                for (let i = 1; i < linePoints.length; i++) {
                    const p = linePoints[i - 1], c = linePoints[i];
                    const mx = (p.x + c.x) / 2;
                    ctx.bezierCurveTo(mx, p.y - 14, mx, c.y - 14, c.x, c.y - 14);
                }
                ctx.strokeStyle = '#d4af37';
                ctx.lineWidth = 2.5;
                ctx.shadowColor = '#d4af37';
                ctx.shadowBlur = 22;
                ctx.stroke();
                ctx.shadowBlur = 0;

                // Gold dot at peak
                const peak = linePoints.reduce((a, b) => (a.y < b.y ? a : b));
                ctx.beginPath();
                ctx.arc(peak.x, peak.y - 14, 5, 0, Math.PI * 2);
                ctx.fillStyle = '#ffe066';
                ctx.shadowColor = '#d4af37';
                ctx.shadowBlur = 25;
                ctx.fill();
                ctx.shadowBlur = 0;
            }

            // Floating sparks
            sparks.forEach((s, idx) => {
                s.y -= s.vy;
                if (s.y < -6) { s.y = H * 0.85; s.x = Math.random() * W; }

                const tw = Math.sin(phase * 2 + idx) * 0.4 + 0.6;
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
                if (s.gold) {
                    ctx.fillStyle = `rgba(212,175,55,${s.alpha * tw})`;
                    ctx.shadowColor = '#d4af37';
                } else {
                    ctx.fillStyle = `rgba(0,230,118,${s.alpha * tw})`;
                    ctx.shadowColor = '#00e676';
                }
                ctx.shadowBlur = s.size * 6;
                ctx.fill();
                ctx.shadowBlur = 0;
            });

            phase += 0.012;
            animId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return <canvas ref={canvasRef} className="hero-graphic-canvas" />;
};

export default HeroCanvas;
