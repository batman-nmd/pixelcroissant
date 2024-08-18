import React, { useState, useEffect, useRef } from 'react';
import { Canvas, Rect, Line, Text, Circle } from 'fabric';
import { useNavigate } from 'react-router-dom';

function PatternGenerator() {
  const [patternName, setPatternName] = useState('MyPattern');
  const [width, setWidth] = useState(1920);
  const [height, setHeight] = useState(1080);
  const [tempWidth, setTempWidth] = useState(1920); // Valeur temporaire pour la largeur
  const [tempHeight, setTempHeight] = useState(1080); // Valeur temporaire pour la hauteur
  const [backgroundColor, setBackgroundColor] = useState('#000000');
  const [showBackground, setshowBackground] = useState(true);
  const [showBorder, setShowBorder] = useState(true);
  const [borderColor, setBorderColor] = useState('#ffffff');
  const [borderWidth, setBorderWidth] = useState(1);
  const [showMiddle, setShowMiddle] = useState(true);
  const [middleColor, setMiddleColor] = useState('#FFFF00');
  const [middleWidth, setMiddleWidth] = useState(2);
  const [showCross, setShowCross] = useState(true);
  const [crossColor, setCrossColor] = useState('#ffffff');
  const [crossWidth, setCrossWidth] = useState(1);
  const [showCircle, setShowCircle] = useState(true);
  const [circleColor, setCircleColor] = useState('#ffffff');
  const [circleWidth, setCircleWidth] = useState(1);
  const [showGrid, setShowGrid] = useState(true);
  const [gridSpacing, setGridSpacing] = useState(50);
  const [gridColor, setGridColor] = useState('#ffffff');
  const [gridWidth, setGridWidth] = useState(1);
  const [textColorPattern, setTextColorPattern] = useState('#ffffff');
  const [fontSizePattern, setFontSizePattern] = useState(100);
  const [textColorResolution, setTextColorResolution] = useState('#ffffff');
  const [fontSizeResolution, setFontSizeResolution] = useState(100);
  const [showPatternName, setShowPatternName] = useState(true);
  const [patternNameX, setPatternNameX] = useState(width / 2);
  const [patternNameY, setPatternNameY] = useState(height / 4);
  const [showResolution, setShowResolution] = useState(true);
  const [resolutionX, setResolutionX] = useState(width / 2);
  const [resolutionY, setResolutionY] = useState(3 * height / 4);

  const email = localStorage.getItem('email');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    navigate('/login');
    window.location.reload();
  };

  const canvasRef = useRef(null);

  useEffect(() => {
    setPatternNameX(width / 2);
    setPatternNameY(height / 4);
    setResolutionX(width / 2);
    setResolutionY(3 * height / 4);
  }, [width, height]);

    const adjustCanvasSize = () => {
    const maxWidth = window.innerWidth * 0.75;
    const maxHeight = window.innerHeight * 0.75;
    const aspectRatio = width / height;

    let displayWidth = maxWidth;
    let displayHeight = maxHeight;

    if (width > maxWidth) {
        displayWidth = maxWidth;
        displayHeight = displayWidth / aspectRatio;

        if (displayHeight > maxHeight) {
            displayHeight = maxHeight;
            displayWidth = displayHeight * aspectRatio;
        }
    } else if (height > maxHeight) {
        displayHeight = maxHeight;
        displayWidth = displayHeight * aspectRatio;

        if (displayWidth > maxWidth) {
            displayWidth = maxWidth;
            displayHeight = displayWidth / aspectRatio;
        }
    } else {
        displayWidth = width;
        displayHeight = height;
    }

    canvasRef.current.style.width = `${displayWidth}px`;
    canvasRef.current.style.height = `${displayHeight}px`;
};

useEffect(() => {
    const scaledWidth = width / 2;
    const scaledHeight = height / 2;
  
    const canvas = new Canvas(canvasRef.current, {
      width: scaledWidth,
      height: scaledHeight,
      backgroundColor: showBackground ? backgroundColor : 'transparent',
    });
  
    canvas.setDimensions({
      width: scaledWidth,
      height: scaledHeight,
    });

    const options = { selectable: false, evented: false }; // pour pas de selection utilisateur

    if (showBorder) {
      const border = new Rect({
        fill: 'transparent',
        width: (width - borderWidth)/2,
        height: (height - borderWidth)/2,
        stroke: borderColor,
        strokeWidth: borderWidth/2,
        ...options,
      });
      canvas.add(border);
    }

    if (showMiddle) {
      const middleHorizontal = new Line([0, height / 4, width, height / 4], {
        stroke: middleColor,
        strokeWidth: middleWidth / 2,
        ...options,
      });
      middleHorizontal.set({
        top: height / 4 - middleWidth / 4,
      });
      const middleVertical = new Line([width / 4, 0, width / 4, height/2], {
        stroke: middleColor,
        strokeWidth: middleWidth / 2,
        ...options,
      });
      middleVertical.set({
        left: width / 4 - middleWidth / 4,
      });
      canvas.add(middleHorizontal);
      canvas.add(middleVertical);
    }

    if (showCross) {
      const crossDiagonal1 = new Line([0, 0, width/2, height/2], {
        stroke: crossColor,
        strokeWidth: crossWidth,
        ...options,
      });
      const crossDiagonal2 = new Line([0, height/2, width/2, 0], {
        stroke: crossColor,
        strokeWidth: crossWidth,
        ...options,
      });
      canvas.add(crossDiagonal1);
      canvas.add(crossDiagonal2);
    }

    if (showGrid) {
      for (let i = gridSpacing/2; i < width/2; i += gridSpacing/2) {
        const gridLineVertical = new Line([i, 0, i, height/2], {
          stroke: gridColor,
          strokeWidth: gridWidth/2,
          ...options,
        });
        canvas.add(gridLineVertical);
      }

      for (let i = gridSpacing/2; i < height/2; i += gridSpacing/2) {
        const gridLineHorizontal = new Line([0, i, width/2, i], {
          stroke: gridColor,
          strokeWidth: gridWidth/2,
          ...options,
        });
        canvas.add(gridLineHorizontal);
      }
    }
    if (showCircle) {
    const circleDiameter = Math.min(width, height);
    const circle = new Circle({
      left: width / 4,
      top: height / 4,
      radius: (circleDiameter / 4) - (circleWidth/4),
      fill: 'transparent',
      stroke: circleColor,
      strokeWidth: circleWidth / 2,
      originX: 'center',
      originY: 'center',
      ...options,
    });
    canvas.add(circle);
}

    if (showPatternName) {
      const nameText = new Text(patternName, {
        left: patternNameX / 2,
        top: patternNameY / 2,
        fill: textColorPattern,
        fontSize: fontSizePattern / 2,
        stroke: '#000000',
        strokeWidth: 1, 
        originX: 'center',
        originY: 'center',
        fontFamily: 'Helvetica Neue',
        ...options,
      });
      canvas.add(nameText);
    }

    if (showResolution) {
      const resolutionText = new Text(`${width}x${height}`, {
        left: resolutionX / 2,
        top: resolutionY / 2,
        fill: textColorResolution,
        fontSize: fontSizeResolution / 2,
        stroke: '#000000',
        strokeWidth: 1, 
        originX: 'center',
        originY: 'center',
        fontFamily: 'Helvetica Neue',
        ...options,
      });
      canvas.add(resolutionText);
    }

    canvas.renderAll();

    adjustCanvasSize();

    return () => {
      canvas.dispose();
    };
  }, [
    width, height, backgroundColor, showBackground, showBorder, borderColor, borderWidth,
    showMiddle, middleColor, middleWidth, showCross, crossColor, crossWidth,
    showGrid, gridSpacing, gridColor, gridWidth, showCircle, circleColor, circleWidth, patternName, textColorPattern, fontSizePattern, textColorResolution, fontSizeResolution,
    showPatternName, patternNameX, patternNameY, showResolution, resolutionX, resolutionY
  ]);

  const handleResolutionChange = (event, dimension) => {
    let value = parseInt(event.target.value, 10);
    if (isNaN(value) || value < 1) {
        value = 1; // Assure que la valeur minimale est 1
    }
    if (value > 32764) {
        value = 32764; // Assure que la valeur minimale est 1
    }
    if (dimension === 'width') {
        setTempWidth(value);
    } else if (dimension === 'height') {
        setTempHeight(value);
    }
};

  const handleResolutionBlur = () => {
    setWidth(tempWidth);
    setHeight(tempHeight);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === 'Tab') {
      setWidth(tempWidth);
      setHeight(tempHeight);
    }
  };

  const downloadImage = () => {
    const canvasElement = canvasRef.current;
    // Set backgroundColor to 'transparent' if alpha is true
    if (showBackground) {
      canvasElement.backgroundColor = 'transparent';
    }
    const dataURL = canvasElement.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = `${patternName}_${width}x${height}.png`;
    link.click();
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={styles.sidebar}>
      <header style={styles.header}>
        <span>Logged in as: {email}</span>
        <button onClick={handleLogout} style={styles.buttonExit}>Logout</button>
      </header>
        <h1 style={styles.heading}>Create a New Pattern</h1>
        <div style={styles.section}>
          <label style={styles.label}>
            Pattern Name:
            <input style={styles.input} type="text" value={patternName} onChange={(e) => setPatternName(e.target.value)} />
          </label>
          <div style={styles.section}>
  <label style={styles.labelInline}>Resolution:</label>
  <div style={styles.resolutionRow}>
    <input
      style={styles.inputResolution}
      type="number"
      value={tempWidth}
                onChange={(e) => handleResolutionChange(e, 'width')}
                onKeyDown={handleKeyDown}
                onBlur={handleResolutionBlur}
    />
    <span style={styles.labelInline}>x</span>
    <input
      style={styles.inputResolution}
      type="number"
      value={tempHeight}
                onChange={(e) => handleResolutionChange(e, 'height')}
                onKeyDown={handleKeyDown}
                onBlur={handleResolutionBlur}
    />
    <span style={styles.labelInline}>pixels</span>
  </div>
</div>
        </div>
        
        <div style={styles.section}>
          <div style={styles.paramRow}>
            <label style={styles.labelInline}>
              <input type="checkbox" checked={showBackground} onChange={(e) => setshowBackground(e.target.checked)} />
              Background
            </label>
            {showBackground && (
              <>
                <label style={styles.labelInline}>
                  <input style={styles.inputColor} type="color" value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} />
                </label>
              </>
            )}
          </div>
        </div>

        <div style={styles.section}>
          <div style={styles.paramRow}>
            <label style={styles.labelInline}>
              <input type="checkbox" checked={showBorder} onChange={(e) => setShowBorder(e.target.checked)} />
              Border
            </label>
            {showBorder && (
              <>
                <label style={styles.labelInline}>
                  <input style={styles.inputColor} type="color" value={borderColor} onChange={(e) => setBorderColor(e.target.value)} />
                </label>
                <label style={styles.labelInline}>
                  Width:
                  <input style={styles.inputNumber} type="number" value={borderWidth} onChange={(e) => setBorderWidth(Math.abs(parseInt(e.target.value, 10)))} />
                </label>
              </>
            )}
          </div>
        </div>

        <div style={styles.section}>
          <div style={styles.paramRow}>
            <label style={styles.labelInline}>
              <input type="checkbox" checked={showMiddle} onChange={(e) => setShowMiddle(e.target.checked)} />
              Middle
            </label>
            {showMiddle && (
              <>
                <label style={styles.labelInline}>
                  <input style={styles.inputColor} type="color" value={middleColor} onChange={(e) => setMiddleColor(e.target.value)} />
                </label>
                <label style={styles.labelInline}>
                  Width:
                  <input style={styles.inputNumber} type="number" value={middleWidth} onChange={(e) => setMiddleWidth(Math.abs(Math.abs(parseInt(e.target.value, 10))))} />
                </label>
              </>
            )}
          </div>
        </div>

        <div style={styles.section}>
          <div style={styles.paramRow}>
            <label style={styles.labelInline}>
              <input type="checkbox" checked={showCross} onChange={(e) => setShowCross(e.target.checked)} />
              Cross
            </label>
            {showCross && (
              <>
                <label style={styles.labelInline}>
                  <input style={styles.inputColor} type="color" value={crossColor} onChange={(e) => setCrossColor(e.target.value)} />
                </label>
                <label style={styles.labelInline}>
                  Width:
                  <input style={styles.inputNumber} type="number" value={crossWidth} onChange={(e) => setCrossWidth(Math.abs(parseInt(e.target.value, 10)))} />
                </label>
              </>
            )}
          </div>
        </div>

        <div style={styles.section}>
          <div style={styles.paramRow}>
            <label style={styles.labelInline}>
              <input type="checkbox" checked={showCircle} onChange={(e) => setShowCircle(e.target.checked)} />
              Circle
            </label>
            {showCircle && (
              <>
                <label style={styles.labelInline}>
                  <input style={styles.inputColor} type="color" value={circleColor} onChange={(e) => setCircleColor(e.target.value)} />
                </label>
                <label style={styles.labelInline}>
                  Width:
                  <input style={styles.inputNumber} type="number" value={circleWidth} onChange={(e) => setCircleWidth(Math.abs(parseInt(e.target.value, 10)))} />
                </label>
              </>
            )}
          </div>
        </div>

        <div style={styles.section}>
        <div style={styles.paramRow}>
          <label style={styles.labelInline}>
            <input type="checkbox" checked={showGrid} onChange={(e) => setShowGrid(e.target.checked)} />
            Grid
          </label>
          {showGrid && (
            <>
                <label style={styles.labelInline}>
                  <input style={styles.inputColor} type="color" value={gridColor} onChange={(e) => setGridColor(e.target.value)} />
                  </label>
                <label style={styles.labelInline}>
                Width:
                  <input style={styles.inputNumber} type="number" value={gridWidth} onChange={(e) => setGridWidth(Math.abs(parseInt(e.target.value, 10)))} />
                </label>
                  <input style={styles.inputNumber} type="number" value={gridSpacing} onChange={(e) => setGridSpacing(parseInt(e.target.value, 10))} />

            </>
          )}
        </div>
        </div>

        <div style={styles.section}>
          <div style={styles.paramRow}>
            <label style={styles.labelInline}>
              <input type="checkbox" checked={showPatternName} onChange={(e) => setShowPatternName(e.target.checked)} />
              Show PatternName
            </label>
            {showPatternName && (
              <>
                <label style={styles.labelInline}>
                  <input style={styles.inputColor} type="color" value={textColorPattern} onChange={(e) => setTextColorPattern(e.target.value)} />
                </label>
                <label style={styles.labelInline}>
                  Font size:
                  <input style={styles.inputNumber} type="number" value={fontSizePattern} onChange={(e) => setFontSizePattern(Math.abs(parseInt(e.target.value, 10)))} />
                </label>
              </>
            )}
          </div>
        </div>

        <div style={styles.section}>
          <div style={styles.paramRow}>
            <label style={styles.labelInline}>
              <input type="checkbox" checked={showResolution} onChange={(e) => setShowResolution(e.target.checked)} />
              Show Resolution
            </label>
            {showResolution && (
              <>
                <label style={styles.labelInline}>
                  <input style={styles.inputColor} type="color" value={textColorResolution} onChange={(e) => setTextColorResolution(e.target.value)} />
                </label>
                <label style={styles.labelInline}>
                  Font size:
                  <input style={styles.inputNumber} type="number" value={fontSizeResolution} onChange={(e) => setFontSizeResolution(Math.abs(parseInt(e.target.value, 10)))} />
                </label>
              </>
            )}
          </div>
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
    padding: '20px',
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
    width: '50%',
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
  buttonExit: {
  },
  paramRow: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
  resolutionRow: {
    display: 'flex',
    alignItems: 'center',
  },
  labelInline: {
    marginRight: '5px',
    fontWeight: 'bold',
  },
  inputColor: {
    width: '20px',  // Taille fixe du côté du carré
    height: '20px',  // Taille fixe du côté du carré
    padding: '0',  // Pas de padding pour s'assurer que le carré est uniforme
    borderRadius: '4px',  // Légèrement arrondi pour un aspect esthétique
    border: '1px solid #ccc',  // Bordure standard pour le contrôle de formulaire
    appearance: 'none',  // Supprime le style par défaut du picker
    backgroundColor: 'transparent',  // Fond transparent pour ne pas masquer la couleur
    cursor: 'pointer',  // Curseur en mode pointer pour indiquer que c'est cliquable
  },
  inputResolution: {
    width: '60px',  // Ajustez la largeur si nécessaire
    marginRight: '5px',
    padding: '5px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    textAlign: 'center',
    // Styles pour supprimer les flèches de nombre
    MozAppearance: 'textfield',
    appearance: 'textfield',
  },
  inputNumber: {
    width: '50px',
  },

  inputInline: {
    marginRight: '10px',
    padding: '5px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '25%',
    // Styles pour supprimer les flèches de nombre
    MozAppearance: 'textfield',
    appearance: 'textfield',
  },
  // Supprimer les flèches dans WebKit (Chrome, Safari, etc.)
  'input::-webkit-outer-spin-button': {
    WebkitAppearance: 'none',
    margin: 0,
  },
  'input::-webkit-inner-spin-button': {
    WebkitAppearance: 'none',
    margin: 0,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: '#f5f5f5',
  },
};

export default PatternGenerator;
