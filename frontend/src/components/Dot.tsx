// RedDraggableDot.tsx
import React from 'react';

import { DotProps } from '../types/props';
import styles from '../css/Dot.module.css';


const Dot: React.FC<DotProps> = ({ plan }) => {
  return (
    <div
      className={styles.redDot}
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("type", "point");
        e.dataTransfer.setData("payload", JSON.stringify(plan))
      }}
    />
  );
};

export default Dot;
