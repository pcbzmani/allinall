import React, { useRef, useEffect } from 'react';

export function Background3D() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // 3D shape definitions
    const shapes = [];
    const shapeCount = 35;

    for (let i = 0; i < shapeCount; i++) {
      shapes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 600 + 100,
        size: Math.random() * 30 + 10,
        rotX: Math.random() * Math.PI * 2,
        rotY: Math.random() * Math.PI * 2,
        rotZ: Math.random() * Math.PI * 2,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.3,
        speedRotX: (Math.random() - 0.5) * 0.015,
        speedRotY: (Math.random() - 0.5) * 0.02,
        speedRotZ: (Math.random() - 0.5) * 0.01,
        type: ['cube', 'triangle', 'diamond', 'ring'][Math.floor(Math.random() * 4)],
        hue: Math.random() * 60 + 190, // blues, cyans, purples
        opacity: Math.random() * 0.15 + 0.04,
      });
    }

    // Floating particles
    const particles = [];
    const particleCount = 60;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2.5 + 0.5,
        hue: Math.random() * 80 + 180,
        opacity: Math.random() * 0.4 + 0.1,
      });
    }

    function project3D(x, y, z) {
      const fov = 800;
      const scale = fov / (fov + z);
      return {
        x: canvas.width / 2 + (x - canvas.width / 2) * scale,
        y: canvas.height / 2 + (y - canvas.height / 2) * scale,
        scale
      };
    }

    function drawCube(ctx, cx, cy, size, rotX, rotY, hue, opacity) {
      const vertices = [
        [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
        [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]
      ];
      const edges = [
        [0,1],[1,2],[2,3],[3,0],
        [4,5],[5,6],[6,7],[7,4],
        [0,4],[1,5],[2,6],[3,7]
      ];

      const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY), sinY = Math.sin(rotY);

      const projected = vertices.map(([x, y, z]) => {
        let nx = x * cosY - z * sinY;
        let nz = x * sinY + z * cosY;
        let ny = y * cosX - nz * sinX;
        nz = y * sinX + nz * cosX;
        return [cx + nx * size, cy + ny * size];
      });

      ctx.strokeStyle = `hsla(${hue}, 80%, 65%, ${opacity})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      edges.forEach(([a, b]) => {
        ctx.moveTo(projected[a][0], projected[a][1]);
        ctx.lineTo(projected[b][0], projected[b][1]);
      });
      ctx.stroke();
    }

    function drawTriangle(ctx, cx, cy, size, rot, hue, opacity) {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rot);
      ctx.strokeStyle = `hsla(${hue}, 80%, 65%, ${opacity})`;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      for (let i = 0; i < 3; i++) {
        const angle = (i * 2 * Math.PI / 3) - Math.PI / 2;
        const px = Math.cos(angle) * size;
        const py = Math.sin(angle) * size;
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.stroke();
      ctx.restore();
    }

    function drawDiamond(ctx, cx, cy, size, rot, hue, opacity) {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rot);
      ctx.strokeStyle = `hsla(${hue}, 80%, 65%, ${opacity})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, -size);
      ctx.lineTo(size * 0.6, 0);
      ctx.lineTo(0, size);
      ctx.lineTo(-size * 0.6, 0);
      ctx.closePath();
      ctx.stroke();
      ctx.restore();
    }

    function drawRing(ctx, cx, cy, size, rot, hue, opacity) {
      ctx.strokeStyle = `hsla(${hue}, 70%, 60%, ${opacity})`;
      ctx.lineWidth = 1;
      
      // Elliptical ring (3D ring illusion)
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rot);
      ctx.beginPath();
      ctx.ellipse(0, 0, size, size * 0.4, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }

    function drawConnections(ctx) {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.08;
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      time += 0.008;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw particle connections
      drawConnections(ctx);

      // Draw floating particles
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 80%, 70%, ${p.opacity})`;
        ctx.fill();
      });

      // Draw 3D shapes
      // Sort by z-depth for correct draw order
      shapes.sort((a, b) => b.z - a.z);

      shapes.forEach(s => {
        s.x += s.speedX;
        s.y += s.speedY;
        s.rotX += s.speedRotX;
        s.rotY += s.speedRotY;
        s.rotZ += s.speedRotZ;

        // Wrap around screen
        if (s.x < -50) s.x = canvas.width + 50;
        if (s.x > canvas.width + 50) s.x = -50;
        if (s.y < -50) s.y = canvas.height + 50;
        if (s.y > canvas.height + 50) s.y = -50;

        const proj = project3D(s.x, s.y, s.z);
        const drawSize = s.size * proj.scale;

        switch (s.type) {
          case 'cube':
            drawCube(ctx, proj.x, proj.y, drawSize, s.rotX, s.rotY, s.hue, s.opacity);
            break;
          case 'triangle':
            drawTriangle(ctx, proj.x, proj.y, drawSize, s.rotZ, s.hue, s.opacity);
            break;
          case 'diamond':
            drawDiamond(ctx, proj.x, proj.y, drawSize, s.rotY, s.hue, s.opacity);
            break;
          case 'ring':
            drawRing(ctx, proj.x, proj.y, drawSize, s.rotX, s.hue, s.opacity);
            break;
        }
      });

      animationId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
