'use client';

import { useEffect, useState } from 'react';
import styles from '../styles/overlay.module.css';

export default function Overlay() {
  const [hide, setHide] = useState(false);

  // 예: 3초 뒤 오버레이 숨기기
  useEffect(() => {
    const timeout = setTimeout(() => setHide(true), 4300);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={`${styles.overlay} ${hide ? styles.hide : ''}`} />
  );
}
