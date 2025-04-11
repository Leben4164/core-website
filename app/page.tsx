'use client';

import { useEffect } from 'react';
import { animate, createTimeline, createTimer, stagger, utils } from 'animejs';
import styles from './page.module.css'

export default function Home() {
  useEffect(() => {
    const creatureEl = document.querySelector('#creature');
    if (!creatureEl) return;

    const viewport = { w: window.innerWidth * 0.5, h: window.innerHeight * 0.5 };
    const cursor = { x: 0, y: 0 };
    const rows = 13;
    const grid = [rows, rows];
    const from = 'center';
    const scaleStagger = stagger([2, 5], { ease: 'inQuad', grid, from });
    const opacityStagger = stagger([1, 0.1], { grid, from });

    for (let i = 0; i < rows * rows; i++) {
      creatureEl.appendChild(document.createElement('div'));
    }

    const particuleEls = creatureEl.querySelectorAll('div');

    utils.set(creatureEl, {
      width: `${rows * 10}em`,
      height: `${rows * 10}em`,
    });

    utils.set(particuleEls, {
      x: 0,
      y: 0,
      scale: scaleStagger,
      opacity: opacityStagger,
      background: stagger([80, 20], {
        grid,
        from,
        modifier: (v) => `hsl(160, 100%, ${v}%)`,
      }),
      boxShadow: stagger([8, 1], {
        grid,
        from,
        modifier: (v) => `0px 0px ${utils.round(v, 0)}em 0px #7fffd4`,
      }),
      zIndex: stagger([rows * rows, 1], { grid, from, modifier: utils.round(0) }),
    });

    const pulse = () => {
      animate(particuleEls, {
        keyframes: [
          {
            scale: 5,
            opacity: 1,
            delay: stagger(90, { start: 1650, grid, from }),
            duration: 150,
          },
          {
            scale: scaleStagger,
            opacity: opacityStagger,
            ease: 'inOutQuad',
            duration: 600,
          },
        ],
      });
    };

    const mainLoop = createTimer({
      frameRate: 15,
      onUpdate: () => {
        animate(particuleEls, {
          x: cursor.x,
          y: cursor.y,
          delay: stagger(40, { grid, from }),
          duration: stagger(120, { start: 750, ease: 'inQuad', grid, from }),
          ease: 'inOut',
          composition: 'blend',
        });
      },
    });

    const autoMove = createTimeline()
      .add(
        cursor,
        {
          x: [-viewport.w * 0.45, viewport.w * 0.45],
          modifier: (x) => x + Math.sin(mainLoop.currentTime * 0.0007) * viewport.w * 0.5,
          duration: 3000,
          ease: 'inOutExpo',
          alternate: true,
          loop: true,
          onBegin: pulse,
          onLoop: pulse,
        },
        0
      )
      .add(
        cursor,
        {
          y: [-viewport.h * 0.45, viewport.h * 0.45],
          modifier: (y) => y + Math.cos(mainLoop.currentTime * 0.00012) * viewport.h * 0.5,
          duration: 1000,
          ease: 'inOutQuad',
          alternate: true,
          loop: true,
        },
        0
      );

    const manualMovementTimeout = createTimer({
      duration: 1500,
      onComplete: () => autoMove.play(),
    });

    const followPointer = (e: MouseEvent | TouchEvent) => {
      const event = e.type === 'touchmove' ? (e as TouchEvent).touches[0] : (e as MouseEvent);
      cursor.x = event.pageX - viewport.w;
      cursor.y = event.pageY - viewport.h;
      autoMove.pause();
      manualMovementTimeout.restart();
    };

    document.addEventListener('mousemove', followPointer);
    document.addEventListener('touchmove', followPointer);

    return () => {
      document.removeEventListener('mousemove', followPointer);
      document.removeEventListener('touchmove', followPointer);
    };
  }, []);

  return (
    <div>
      <h1>메인 페이지</h1>
      <div id="creature-wrapper" className={styles.creatureWrapper}>
        <div id="creature" className={styles.creature}></div>
      </div>
    </div>
  );
}
