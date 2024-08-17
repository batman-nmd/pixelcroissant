import React, { useState, useEffect, useRef } from 'react';
import { Canvas, Rect, Line, Text, Circle } from 'fabric';

function PatternGenerator() {
  const [patternName, setPatternName] = useState('MyPattern');
  const [width, setWidth] = useState(1920);
  const [height, setHeight] = useState(1080);
  const [scale, setScale] = useState(0.4); // Initial scale for better layout
  const [backgroundColor, setBackgroundColor] = useState('#000000');
  const [isAlpha, setIsAlpha] = useState(false);
  const [showBorder, setShowBorder] = useState(true);
  const [borderColor, setBorderColor] = useState('#ffffff');
  const [borderWidth, setBorderWidth] = useState(1);
  const [showMiddle, setShowMiddle] = useState(true);
  const [middleColor, setMiddleColor] = useState('#ffffff');
  const [middleWidth, setMiddleWidth] = useState(1);
  const [showCross, setShowCross] = useState(true);
  const [crossColor, setCrossColor] = useState('#ffffff');
  const [crossWidth, setCrossWidth] = useState(1);
  const [showGrid, setShowGrid] = useState(true);
  const [gridSpacing, setGridSpacing] = useState(50);
  const [gridColor, setGridColor] = useState('#ffffff');
  const [gridWidth, setGridWidth] = useState(1);
  const [textColor, setTextColor] = useState('#ffffff');
  const [fontSize, setFontSize] = useState(100);
  const [showPatternName, setShowPatternName] = useState(true);
  const [patternNameX, setPatternNameX] = useState(width / 2);
  const [patternNameY, setPatternNameY] = useState(height / 4);
  const [showResolution, setShowResolution] = useState(true);
  const [resolutionX, setResolutionX] = useState(width / 2);
  const [resolutionY, setResolutionY] = useState(3 * height / 4);

  useEffect(() => {
    setPatternNameX(width / 2);
    setPatternNameY(height / 4);
    setResolutionX(width / 2);
    setResolutionY(3 * height / 4);
  }, [width, height]);

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = new Canvas(canvasRef.current, {
      width: width,
      height: height,
      backgroundColor: isAlpha ? 'transparent' : backgroundColor,
    });
  
    canvas.setWidth(width * scale);
    canvas.setHeight(height * scale);
    canvas.setZoom(scale);
  
    const options = { selectable: false, evented: false };

    if (isAlpha) {
      const checkerboardPattern = document.createElement('canvas');
      checkerboardPattern.width = checkerboardPattern.height = 80; // Size of checkerboard
      const ctx = checkerboardPattern.getContext('2d');
      ctx.fillStyle = '#CCCE93';
      ctx.fillRect(0, 0, 40, 40);
      ctx.fillRect(40, 40, 40, 40);
      ctx.fillStyle = '#00CCCB';
      ctx.fillRect(40, 0, 40, 40);
      ctx.fillRect(0, 40, 40, 40);

      const pattern = canvas.getContext().createPattern(checkerboardPattern, 'repeat');
      canvas.backgroundColor = pattern;
    } else {
      canvas.backgroundColor = backgroundColor;
    }

    if (showBorder) {
      const border = new Rect({
        left: 0,
        top: 0,
        fill: 'transparent',
        width: width,
        height: height,
        stroke: borderColor,
        strokeWidth: borderWidth,
        ...options,
      });
      canvas.add(border);
    }

    if (showMiddle) {
      const middleHorizontal = new Line([0, height / 2, width, height / 2], {
        stroke: middleColor,
        strokeWidth: middleWidth,
        ...options,
      });
      const middleVertical = new Line([width / 2, 0, width / 2, height], {
        stroke: middleColor,
        strokeWidth: middleWidth,
        ...options,
      });
      canvas.add(middleHorizontal);
      canvas.add(middleVertical);
    }

    if (showCross) {
      const crossDiagonal1 = new Line([0, 0, width, height], {
        stroke: crossColor,
        strokeWidth: crossWidth,
        ...options,
      });
      const crossDiagonal2 = new Line([0, height, width, 0], {
        stroke: crossColor,
        strokeWidth: crossWidth,
        ...options,
      });
      canvas.add(crossDiagonal1);
      canvas.add(crossDiagonal2);
    }

    if (showGrid) {
      for (let i = gridSpacing; i < width; i += gridSpacing) {
        const gridLineVertical = new Line([i, 0, i, height], {
          stroke: gridColor,
          strokeWidth: gridWidth,
          ...options,
        });
        canvas.add(gridLineVertical);
      }

      for (let i = gridSpacing; i < height; i += gridSpacing) {
        const gridLineHorizontal = new Line([0, i, width, i], {
          stroke: gridColor,
          strokeWidth: gridWidth,
          ...options,
        });
        canvas.add(gridLineHorizontal);
      }
    }

    const circleDiameter = Math.min(width, height);
    const circle = new Circle({
      left: width / 2,
      top: height / 2,
      radius: circleDiameter / 2,
      fill: 'transparent',
      stroke: '#ffffff',
      strokeWidth: 1,
      originX: 'center',
      originY: 'center',
      ...options,
    });
    canvas.add(circle);

    if (showPatternName) {
      const nameText = new Text(patternName, {
        left: patternNameX,
        top: patternNameY,
        fill: textColor,
        fontSize: fontSize,
        originX: 'center',
        originY: 'center',
        ...options,
      });
      canvas.add(nameText);
    }

    if (showResolution) {
      const resolutionText = new Text(`${width}x${height}`, {
        left: resolutionX,
        top: resolutionY,
        fill: textColor,
        fontSize: fontSize / 2,
        originX: 'center',
        originY: 'center',
        ...options,
      });
      canvas.add(resolutionText);
    }

    canvas.renderAll();

    return () => {
      canvas.dispose();
    };
  }, [
    width, height, scale, backgroundColor, isAlpha, showBorder, borderColor, borderWidth,
    showMiddle, middleColor, middleWidth, showCross, crossColor, crossWidth,
    showGrid, gridSpacing, gridColor, gridWidth, patternName, textColor, fontSize,
    showPatternName, patternNameX, patternNameY, showResolution, resolutionX, resolutionY
  ]);

  const downloadImage = () => {
    const canvasElement = canvasRef.current;
    const dataURL = canvasElement.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = `${patternName}_${width}x${height}.png`;
    link.click();
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={styles.sidebar}>
        <h1 style={styles.heading}>Create a New Pattern</h1>
        <div style={styles.section}>
          <label style={styles.label}>
            Pattern Name:
            <input style={styles.input} type="text" value={patternName} onChange={(e) => setPatternName(e.target.value)} />
          </label>
          <label style={styles.label}>
            Width:
            <input style={styles.input} type="number" value={width} onChange={(e) => setWidth(parseInt(e.target.value, 10))} />
          </label>
          <label style={styles.label}>
            Height:
            <input style={styles.input} type="number" value={height} onChange={(e) => setHeight(parseInt(e.target.value, 10))} />
          </label>
        </div>

        <div style={styles.section}>
          <label style={styles.label}>
            Background Color:
            <input style={styles.input} type="color" value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} disabled={isAlpha} />
          </label>
          <label style={styles.label}>
            <input type="checkbox" checked={isAlpha} onChange={(e) => setIsAlpha(e.target.checked)} />
            Alpha (Transparent Background)
          </label>
        </div>

        <div style={styles.section}>
          <label style={styles.label}>
            <input type="checkbox" checked={showBorder} onChange={(e) => setShowBorder(e.target.checked)} />
            Border
          </label>
          {showBorder && (
            <>
              <label style={styles.label}>
                Border Color:
                <input style={styles.input} type="color" value={borderColor} onChange={(e) => setBorderColor(e.target.value)} />
              </label>

              <label style={styles.label}>
                Border Width:
                <input style={styles.input} type="number" value={borderWidth} onChange={(e) => setBorderWidth(parseInt(e.target.value, 10))} />
              </label>
            </>
          )}
        </div>

        <div style={styles.section}>
          <label style={styles.label}>
            <input type="checkbox" checked={showMiddle} onChange={(e) => setShowMiddle(e.target.checked)} />
            Middle
          </label>
          {showMiddle && (
            <>
              <label style={styles.label}>
                Middle Color:
                <input style={styles.input} type="color" value={middleColor} onChange={(e) => setMiddleColor(e.target.value)} />
              </label>
              <label style={styles.label}>
                Middle Width:
                <input style={styles.input} type="number" value={middleWidth} onChange={(e) => setMiddleWidth(parseInt(e.target.value, 10))} />
              </label>
            </>
          )}
        </div>

        <div style={styles.section}>
          <label style={styles.label}>
            <input type="checkbox" checked={showCross} onChange={(e) => setShowCross(e.target.checked)} />
            Cross
          </label>
          {showCross && (
            <>
              <label style={styles.label}>
                Cross Color:
                <input style={styles.input} type="color" value={crossColor} onChange={(e) => setCrossColor(e.target.value)} />
              </label>
              <label style={styles.label}>
                Cross Width:
                <input style={styles.input} type="number" value={crossWidth} onChange={(e) => setCrossWidth(parseInt(e.target.value, 10))} />
              </label>
            </>
          )}
        </div>

        <div style={styles.section}>
          <label style={styles.label}>
            <input type="checkbox" checked={showGrid} onChange={(e) => setShowGrid(e.target.checked)} />
            Grid
          </label>
          {showGrid && (
            <>
              <label style={styles.label}>
                Grid Spacing:
                <input style={styles.input} type="number" value={gridSpacing} onChange={(e) => setGridSpacing(parseInt(e.target.value, 10))} />
              </label>
              <label style={styles.label}>
                Grid Color:
                <input style={styles.input} type="color" value={gridColor} onChange={(e) => setGridColor(e.target.value)} />
              </label>
              <label style={styles.label}>
                Grid Width:
                <input style={styles.input} type="number" value={gridWidth} onChange={(e) => setGridWidth(parseInt(e.target.value, 10))} />
              </label>
            </>
          )}
        </div>

        <div style={styles.section}>
          <label style={styles.label}>
            Text Color:
            <input style={styles.input} type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} />
          </label>
          <label style={styles.label}>
            Font Size:
            <input style={styles.input} type="number" value={fontSize} onChange={(e) => setFontSize(parseInt(e.target.value, 10))} />
          </label>
        </div>

        <div style={styles.section}>
          <label style={styles.label}>
            <input type="checkbox" checked={showPatternName} onChange={(e) => setShowPatternName(e.target.checked)} />
            Show Pattern Name
          </label>
        </div>

        <div style={styles.section}>
          <label style={styles.label}>
            <input type="checkbox" checked={showResolution} onChange={(e) => setShowResolution(e.target.checked)} />
            Show Resolution
          </label>
        </div>

        <button style={styles.button} onClick={downloadImage}>Download PNG</button>
      </div>
      <div style={styles.canvasContainer}>
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  );
}

const styles = {
  sidebar: {
    flex: '0 0 350px',  // Reduce sidebar width
    padding: '10px',    // Reduce padding
    backgroundColor: '#f5f5f5',
    borderRight: '1px solid #ddd',
    height: '100vh',
    overflowY: 'auto',
    fontSize: '0.9em',  // Reduce font size
  },
  canvasContainer: {
    flex: '1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px',
    overflow: 'hidden',
  },
  canvas: {
    maxWidth: '100%',
    maxHeight: '100%',
    width: 'auto',
    height: 'auto',
  },
  heading: {
    fontSize: '1.2em',  // Reduce heading size
    marginBottom: '15px',
  },
  section: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '5px',  // Reduce input padding
    marginTop: '3px',  // Reduce margin
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '8px 15px',  // Reduce button padding
    marginBottom: '20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1em',
  },
};

export default PatternGenerator;
