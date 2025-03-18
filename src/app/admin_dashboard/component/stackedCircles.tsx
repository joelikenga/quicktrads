// components/ScatteredCircles.tsx
import React from 'react';

interface Circle {
  name: string;
  figure: number; // Use a number for calculations
  color: string;
}

interface ScatteredCirclesProps {
  circleData: Circle[];
  maxSize?: number; // Maximum size of the largest circle
}

const ScatteredCircles: React.FC<ScatteredCirclesProps> = ({ circleData, maxSize = 200 }) => {
  // Find the maximum figure value in the data
  const maxFigure = Math.max(...circleData.map((circle) => circle.figure));

  // Calculate the size of each circle based on its figure value
  const getCircleSize = (figure: number) => {
    return (figure / maxFigure) * maxSize; // Proportional size calculation
  };

  // Calculate the positions of the circles so they overlap in the center
  const getCirclePositions = (circleData: Circle[]) => {
    const positions: { top: number; left: number }[] = [];
    const centerOffset = 50; // Center of the container (50% from top and left)

    circleData.forEach((circle, index) => {
      const size = getCircleSize(circle.figure);

      // Position circles so they overlap in the center
      const top = centerOffset - size / 9 / maxSize * 100; // Adjust for circle size
      const left = centerOffset - size / 9 / maxSize * 100; // Adjust for circle size

      positions.push({ top, left });
    });

    return positions;
  };

  const circlePositions = getCirclePositions(circleData);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        border: '1px solid #ccc', // Optional: Visualize the container
        display:'flex',
        justifyContent:'center'
        // overflow: 'hidden', // Ensure circles don't overflow the container
      }}
    >
      {circleData.map((circle, index) => {
        const size = getCircleSize(circle.figure); // Calculate the size of the circle
        const { top, left } = circlePositions[index]; // Get the calculated position

        return (
          <div
            key={index}
            style={{
              position: 'absolute',
              top: `${top}%`,
              left: `${left}%`,
              width: `${size}px`,
              height: `${size}px`,
              borderRadius: '50%',
              backgroundColor: circle.color,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#fff',
              fontSize: '14px',
              textAlign: 'center',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Optional: Add shadow for depth
              transform: 'translate(-50%, -50%)', // Center the circle at the position
            }}
          >
            <div>{circle.name}</div>
            <div>{circle.figure}</div>
          </div>
        );
      })}
    </div>
  );
};

export default ScatteredCircles;