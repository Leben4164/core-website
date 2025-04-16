'use client';

import { useEffect, useState } from 'react';
import styles from '../styles/overlay.module.css';

export default function Overlay() {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setHide(true), 3150);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={`${styles.overlay} ${hide ? styles.hide : ''}`} />
  );
}
