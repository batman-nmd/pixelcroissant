import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Canvas, Rect, Line, Text, Circle } from 'fabric';
import { useNavigate } from 'react-router-dom';

function PatternGenerator() {
  const [patternName, setPatternName] = useState('MyPattern');
  const [width, setWidth] = useState(1920);
  const [height, setHeight] = useState(1080);
  const [tempWidth, setTempWidth] = useState(3840); // Valeur temporaire pour la largeur
  const [tempHeight, setTempHeight] = useState(2160); // Valeur temporaire pour la hauteur
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
  const [gridSpacing, setGridSpacing] = useState(100);
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
  const videoStandards = [
    { label: '1920x1080', width: 1920, height: 1080, font: 50},
    { label: '1920x1200', width: 1920, height: 1200, font: 50}, 
    { label: '2048x1080', width: 2048, height: 1080, font: 50},
    { label: '2560x1600', width: 2560, height: 1600, font: 50}, 
    { label: '2716x1600', width: 2716, height: 1600, font: 50},
    { label: '3440x1440', width: 3440, height: 1440, font: 50},
    { label: '3840x1600', width: 3840, height: 1600, font: 100},
    { label: '3840x2160', width: 3840, height: 2160, font: 100},
    { label: '3840x2400', width: 3840, height: 2400, font: 100},
    { label: '4096x2160', width: 4096, height: 2160, font: 100},
    { label: '5120x2160', width: 5120, height: 2160, font: 100},
    { label: '7680x4320', width: 7680, height: 4320, font: 100},
  ];

  const handleStandardChange = (event) => {
    const index = parseInt(event.target.value, 10);
    if (!isNaN(index)) {
      const selectedStandard = videoStandards[index];
      if (selectedStandard) {
        setTempWidth(selectedStandard.width);
        setTempHeight(selectedStandard.height);
        setWidth(selectedStandard.width/scaleCorrection);
        setHeight(selectedStandard.height/scaleCorrection);
        setFontSizePattern(selectedStandard.font);
        setFontSizeResolution(selectedStandard.font);
      }
    }
  };
  
  
  const scaleCorrection = 2;

  const email = localStorage.getItem('email');
  const navigate = useNavigate();

  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [isDownloadButtonClicked, setIsDownloadButtonClicked] = useState(false);

    const handleLogout = () => {
    setIsButtonClicked(true);
    setTimeout(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        navigate('/login');
        window.location.reload();
    }, 100);
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
    const scaleFactor = 1;
    const scaledWidth = width / 1;
    const scaledHeight = height / 1;
  
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
        width: (width - borderWidth)/scaleFactor,
        height: (height - borderWidth)/scaleFactor,
        stroke: borderColor,
        strokeWidth: borderWidth/scaleFactor,
        ...options,
      });
      canvas.add(border);
    }

    if (showMiddle) {
      const middleHorizontal = new Line([0, height / (2*scaleFactor), width/scaleFactor, height / (2*scaleFactor)], {
        stroke: middleColor,
        strokeWidth: middleWidth / scaleFactor,
        ...options,
      });
      middleHorizontal.set({
        top: height / (2*scaleFactor) - middleWidth / (2*scaleFactor),
      });
      const middleVertical = new Line([width / (2*scaleFactor), 0, width / (2*scaleFactor), height/scaleFactor], {
        stroke: middleColor,
        strokeWidth: middleWidth / scaleFactor,
        ...options,
      });
      middleVertical.set({
        left: width / (2*scaleFactor) - middleWidth / (2*scaleFactor),
      });
      canvas.add(middleHorizontal);
      canvas.add(middleVertical);
    }

    if (showCross) {
      const crossDiagonal1 = new Line([0, 0, width/scaleFactor, height/scaleFactor], {
        stroke: crossColor,
        strokeWidth: crossWidth,
        ...options,
      });
      const crossDiagonal2 = new Line([0, height/scaleFactor, width/scaleFactor, 0], {
        stroke: crossColor,
        strokeWidth: crossWidth,
        ...options,
      });
      canvas.add(crossDiagonal1);
      canvas.add(crossDiagonal2);
    }

    if (showGrid) {
      for (let i = gridSpacing/scaleCorrection; i < width/scaleFactor; i += gridSpacing/scaleCorrection) {
        const gridLineVertical = new Line([i, 0, i, height/scaleFactor], {
          stroke: gridColor,
          strokeWidth: gridWidth/scaleFactor,
          ...options,
        });
        canvas.add(gridLineVertical);
      }

      for (let i = gridSpacing/scaleCorrection; i < height/scaleFactor; i += gridSpacing/scaleCorrection) {
        const gridLineHorizontal = new Line([0, i, width/scaleFactor, i], {
          stroke: gridColor,
          strokeWidth: gridWidth/scaleFactor,
          ...options,
        });
        canvas.add(gridLineHorizontal);
      }
    }
    if (showCircle) {
    const circleDiameter = Math.min(width, height);
    const circle = new Circle({
      left: width / (2*scaleFactor),
      top: height / (2*scaleFactor),
      radius: (circleDiameter / (2*scaleFactor)) - (circleWidth/(2*scaleFactor)),
      fill: 'transparent',
      stroke: circleColor,
      strokeWidth: circleWidth / scaleFactor,
      originX: 'center',
      originY: 'center',
      ...options,
    });
    canvas.add(circle);
}

    if (showPatternName) {
      const nameText = new Text(patternName, {
        left: patternNameX / scaleFactor,
        top: patternNameY / scaleFactor,
        fill: textColorPattern,
        fontSize: fontSizePattern / scaleFactor,
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
      const resolutionText = new Text(`${width*scaleCorrection}x${height*scaleCorrection}`, {
        left: resolutionX / scaleFactor,
        top: resolutionY / scaleFactor,
        fill: textColorResolution,
        fontSize: fontSizeResolution / scaleFactor,
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
    setWidth(tempWidth/scaleCorrection);
    setHeight(tempHeight/scaleCorrection);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === 'Tab') {
      setWidth(tempWidth/scaleCorrection);
      setHeight(tempHeight/scaleCorrection);
    }
  };


  const downloadImage = () => {
    setIsDownloadButtonClicked(true);
    const canvasElement = canvasRef.current;
    // Set backgroundColor to 'transparent' if alpha is true
    if (showBackground) {
      canvasElement.backgroundColor = 'transparent';
    }
    const dataURL = canvasElement.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = `${patternName}_${width*scaleCorrection}x${height*scaleCorrection}.png`;
    link.click();
    setTimeout(() => {
      setIsDownloadButtonClicked(false);
    }, 200);
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={styles.sidebar}>
      <header style={styles.header}>
        <span>Logged in as: {email}</span>
        <button 
        onClick={handleLogout} 
        style={{ 
            ...styles.buttonExit, 
            ...(isButtonClicked ? styles.buttonExitActive : {}) 
        }}
        >
        Logout
        </button>
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
              <select style={styles.select} onChange={handleStandardChange}>
                <option value="">Select Standard</option>
                {videoStandards.map((standard, index) => (
                  <option key={index} value={index}>{standard.label}</option>
                ))}
              </select>
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


        <div style={styles.buttonContainer}>
  <button 
    style={{ 
      ...styles.button, 
      ...(isDownloadButtonClicked ? styles.buttonActive : {}) 
    }} 
    onClick={downloadImage}
  >
    Download PNG
  </button>
</div>
    </div>
    <div style={styles.canvasContainer}>
      <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  );
}

const styles = {
    sidebar: {
        flex: '0 0 350px',
        padding: '10px',
        backgroundColor: 'linear-gradient(135deg, #f0f0f0, #d4d4d4)',
        borderRight: '1px solid #ddd',
        height: '100vh',
        overflowY: 'auto',
        fontSize: '0.9em',
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
    fontSize: '1.4em',
    marginBottom: '15px',
    color: '#333',
  },
  section: {
    marginBottom: '5px', // Réduction de la marge inférieure
    padding: '8px',       // Réduction du padding interne
    backgroundColor: '#ffffff',
    border: '1px solid #ddd',
    borderRadius: '4px',
    boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)', // Réduction de l'ombre
  },
  
  label: {
    display: 'block',
    marginBottom: '3px',   // Réduction de la marge inférieure
    fontWeight: 'bold',
    fontSize: '0.9em',     // Réduction de la taille de la police
  },
  input: {
    width: '100%',
    padding: '4px',        // Réduction du padding interne
    marginTop: '2px',      // Réduction de la marge supérieure
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '0.9em',     // Réduction de la taille de la police
  },
  buttonExit: {
    padding: '8px 15px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'transform 0.1s ease, background-color 0.1s ease',
  },
  buttonExitActive: {
    transform: 'scale(0.95)',
    backgroundColor: '#0056b3',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',  // Utilisez cette ligne si vous souhaitez centrer également verticalement
    marginTop: '20px', // Ajoutez un espace au-dessus si nécessaire
  },
  button: {
    padding: '8px 15px',
    marginBottom: '20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1em',
    transition: 'transform 0.1s ease, background-color 0.1s ease',
  },
  buttonActive: {
    transform: 'scale(0.95)',
    backgroundColor: '#0056b3',
  },
  paramRow: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '8px',  // Réduction de la marge inférieure
  },
  resolutionRow: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '8px',  // Réduction de la marge inférieure
  },
  labelInline: {
    marginRight: '4px',   // Réduction de la marge droite
    fontWeight: 'bold',
    fontSize: '0.9em',    // Réduction de la taille de la police
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
    width: '50px',  // Ajustez la largeur si nécessaire
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
