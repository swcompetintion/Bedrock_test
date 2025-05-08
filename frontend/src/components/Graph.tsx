import React, { useRef } from 'react';
import dragDataPlugin from 'chartjs-plugin-dragdata';
import { Scatter } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ScatterController,
  LinearScale,
  PointElement,
  Tooltip,
  ChartData,
  ChartOptions
} from 'chart.js';


import { ScatterGraphProps } from '../types/props';
import { Point } from '../types/points';
import styles from '../css/Graph.module.css';
import { BasePlan } from '../types/plans';
import { Plan } from '../types/plans';
import { point2UpdatedData } from '../utils';

ChartJS.register(
  ScatterController,
  LinearScale,
  PointElement,
  Tooltip,
  dragDataPlugin
);


const ScatterChart: React.FC<ScatterGraphProps> = ({ data, onDragEnd }) => {
  const chartRef = useRef<any>(null);
  const propsData = React.useMemo(() => data, [data]);
  const chartDataPoints: Point[] = propsData.map(point => ({
    id: point.id,
    x: point.dDay,
    y: point.importance,
    title: point.title,
    body: point.body,
    date: point.date,
    category: point.category,
  }));

  const scatterData: ChartData<'scatter'> = {
    datasets: [
      {
        label: 'Draggable Points',
        data: chartDataPoints,
        backgroundColor: 'navy',
        pointRadius: (ctx) => {
          const raw = ctx.raw as Point;
          return raw?.y ?? 10;
        },
      },
    ],
  };

  const options: ChartOptions<'scatter'> = {
    plugins: {
      dragData: {
        round: 1,
        dragX: true,
        showTooltip: true,
        onDragEnd: (e, datasetIndex, index, value) => {
          const point = value as Point;      
          const updatedPlan = point2UpdatedData(point);
          onDragEnd(point.id, updatedPlan);
        },
      },
    },
    scales: {
      x: {
        type: 'linear',
        title: {
          display: true,
          text: 'D-day',
          font: {
            size: 14,
            weight: 'bold',
          },
          color: '#333',
        },
        min: 0, max: 30
      },
      y: {
        type: 'linear',
        title: {
          display: true,
          text: 'Importance',
          font: {
            size: 14,
            weight: 'bold',
          },
          color: '#333',
        },
        min: 0, max: 10
      },
    },
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();

    const chart = chartRef.current;
    if (!chart) return;

    const canvas = chart.canvas;
    const rect = canvas.getBoundingClientRect();

    const relativeX = e.clientX - rect.left;
    const relativeY = e.clientY - rect.top;

    const dDay = chart.scales.x.getValueForPixel(relativeX);
    const importance = chart.scales.y.getValueForPixel(relativeY);

    if ((dDay >= 0 && dDay <= 30) && (importance >= 0 && importance <= 10)) {
      const plan: Plan = JSON.parse(e.dataTransfer.getData('payload'));
      const point: Point = {
        id: plan.id,
        x: dDay,
        y: importance,
        title: plan.title,
        body: plan.body,
        category: plan.category,
        date: plan.date
      };
      const updatedData = point2UpdatedData(point);
      onDragEnd(plan.id, updatedData);
    };
  }


  return (
    <div 
      className={styles.scatterGraphContainer} 
      style={{ height: "400px" }}
      onDrop={ (e) => {
        if (e.dataTransfer.getData('type')==='point') handleDrop(e);
      }
      }
      onDragOver={(e) => e.preventDefault()}
    >
      <Scatter ref={chartRef} data={scatterData} options={options} />
    </div>
  );
};

export default ScatterChart;
