"use client"
import { useState, useRef, useEffect } from 'react';

const governoratesData = [
  { 
    id: 'damascus', 
    name: 'دمشق', 
    passengers: 5, 
    path: 'M355,320 C355,320 360,315 363,318 C366,321 368,325 365,328 C362,331 358,330 355,327 C352,324 355,320 355,320 Z', 
    center: [359, 323] 
  },
  { 
    id: 'aleppo', 
    name: 'حلب', 
    passengers: 8, 
    path: 'M310,180 C322,175 335,178 340,190 C345,202 343,215 335,220 C327,225 310,223 305,215 C300,207 302,185 310,180 Z', 
    center: [320, 200] 
  },
  { 
    id: 'homs', 
    name: 'حمص', 
    passengers: 6, 
    path: 'M320,270 C330,265 345,268 350,275 C355,282 353,290 350,295 C347,300 335,302 328,298 C321,294 315,280 320,270 Z', 
    center: [335, 285] 
  },
  { 
    id: 'daraa', 
    name: 'درعا', 
    passengers: 10, 
    path: 'M340,350 C345,348 355,348 360,352 C365,356 363,365 358,368 C353,371 345,370 342,365 C339,360 335,352 340,350 Z', 
    center: [350, 359] 
  },
  { 
    id: 'latakia', 
    name: 'اللاذقية', 
    passengers: 7, 
    path: 'M270,220 C275,215 285,215 290,225 C295,235 290,245 285,248 C280,251 272,250 270,245 C268,240 265,225 270,220 Z', 
    center: [280, 235] 
  },
  { 
    id: 'tartus', 
    name: 'طرطوس', 
    passengers: 4, 
    path: 'M270,250 C275,248 285,250 290,255 C295,260 290,267 285,270 C280,273 272,272 270,265 C268,258 265,252 270,250 Z', 
    center: [280, 260] 
  },
  { 
    id: 'idlib', 
    name: 'إدلب', 
    passengers: 3, 
    path: 'M270,190 C275,186 285,186 290,193 C295,200 297,210 295,215 C293,220 280,222 275,218 C270,214 265,194 270,190 Z', 
    center: [282, 203] 
  },
  { 
    id: 'hama', 
    name: 'حماة', 
    passengers: 5, 
    path: 'M300,230 C307,225 320,228 325,235 C330,242 330,255 325,260 C320,265 305,263 303,255 C301,247 293,235 300,230 Z', 
    center: [313, 245] 
  },
  { 
    id: 'raqqa', 
    name: 'الرقة', 
    passengers: 2, 
    path: 'M370,200 C380,195 400,198 410,205 C420,212 415,225 410,230 C405,235 380,232 375,225 C370,218 365,203 370,200 Z', 
    center: [390, 215] 
  },
  { 
    id: 'deir-ez-zor', 
    name: 'دير الزور', 
    passengers: 3, 
    path: 'M420,230 C430,225 450,230 455,240 C460,250 455,257 450,260 C445,263 427,262 423,255 C419,248 410,235 420,230 Z', 
    center: [440, 245] 
  },
  { 
    id: 'hasaka', 
    name: 'الحسكة', 
    passengers: 4, 
    path: 'M440,180 C450,175 470,178 475,190 C480,202 475,215 470,220 C465,225 445,223 442,215 C439,207 430,185 440,180 Z', 
    center: [460, 200] 
  },
  { 
    id: 'sweida', 
    name: 'السويداء', 
    passengers: 6, 
    path: 'M365,340 C370,338 380,339 385,343 C390,347 387,355 382,358 C377,361 370,360 367,355 C364,350 360,342 365,340 Z', 
    center: [375, 349] 
  },
  { 
    id: 'quneitra', 
    name: 'القنيطرة', 
    passengers: 2, 
    path: 'M325,340 C328,338 335,339 338,342 C341,345 340,350 337,353 C334,356 330,355 327,352 C324,349 322,342 325,340 Z', 
    center: [332, 347] 
  },
  { 
    id: 'damascus-countryside', 
    name: 'ريف دمشق', 
    passengers: 7, 
    path: 'M345,300 C350,298 365,298 370,305 C375,312 375,325 370,330 C365,335 350,333 345,325 C340,317 340,302 345,300 Z', 
    center: [358, 315] 
  }
];

export default function SyriaMap() {
  const [hoveredGovernorate, setHoveredGovernorate] = useState(null);
  const [selectedGovernorate, setSelectedGovernorate] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0, scale: 1 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [showPopup, setShowPopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [popupData, setPopupData] = useState(null);
  
  const mapRef = useRef(null);

  const handleMouseEnter = (governorate, event) => {
    setHoveredGovernorate(governorate);
    setPopupData(governorate);
    if (mapRef.current) {
      const rect = mapRef.current.getBoundingClientRect();
      setPopupPosition({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      });
      setShowPopup(true);
    }
  };
  
  const handleMouseLeave = () => {
    setHoveredGovernorate(null);
    setShowPopup(false);
  };

  const handleClick = (governorate) => {
    setSelectedGovernorate(governorate);
  };

  const getColor = (passengers) => {
    if (passengers >= 8) return '#7c3aed'; 
    if (passengers >= 6) return '#a78bfa'; 
    if (passengers >= 4) return '#c4b5fd'; 
    return '#ddd6fe'; 
  };
  
  const handleZoomIn = () => {
    setPosition(prev => ({ ...prev, scale: Math.min(prev.scale * 1.2, 4) }));
  };
  
  const handleZoomOut = () => {
    setPosition(prev => ({ ...prev, scale: Math.max(prev.scale / 1.2, 0.5) }));
  };
  
  const handleMouseDown = (e) => {
    if (e.button === 0 || e.type === 'touchstart') { 
      setIsDragging(true);
      const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
      const clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
      setDragStart({ x: clientX - position.x, y: clientY - position.y });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
      const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;
      setPosition({
        x: clientX - dragStart.x,
        y: clientY - dragStart.y,
        scale: position.scale
      });
    }
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    const newScale = Math.max(0.5, Math.min(4, position.scale * delta));
    
    if (mapRef.current) {
      const rect = mapRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const mouseXBeforeZoom = (x - position.x) / position.scale;
      const mouseYBeforeZoom = (y - position.y) / position.scale;
      
      const mouseXAfterZoom = mouseXBeforeZoom * newScale;
      const mouseYAfterZoom = mouseYBeforeZoom * newScale;
      
      setPosition({
        x: position.x + (mouseXBeforeZoom - mouseXAfterZoom) * newScale,
        y: position.y + (mouseYBeforeZoom - mouseYAfterZoom) * newScale,
        scale: newScale
      });
    } else {
      setPosition(prev => ({ ...prev, scale: newScale }));
    }
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };
    
    window.addEventListener('mouseup', handleGlobalMouseUp);
    window.addEventListener('touchend', handleGlobalMouseUp);

    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      window.removeEventListener('touchend', handleGlobalMouseUp);
    };
  }, []);

  useEffect(() => {
    if (mapRef.current) {
      const rect = mapRef.current.getBoundingClientRect();
      const viewBoxWidth = 270;
      const viewBoxHeight = 270;
      const viewBoxCenterX = 250 + viewBoxWidth / 2;
      const viewBoxCenterY = 140 + viewBoxHeight / 2;

      setPosition({
        x: (rect.width / 2) - (viewBoxCenterX * 1),
        y: (rect.height / 2) - (viewBoxCenterY * 1),
        scale: 1
      });
    }
  }, []);

  return (
    <div className="flex flex-col items-center p-4 bg-[#1A202C] min-h-screen text-gray-200">
      
      <div className="flex flex-col md:flex-row w-full md:max-w-5xl"> 
        <div 
          className="w-full md:w-3/4 h-[70vh] md:h-96 relative border border-[#2D3748] bg-[#2D3748] rounded-md overflow-hidden"
          ref={mapRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleMouseDown} 
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseUp}
          onWheel={handleWheel}
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          <div className="absolute top-2 right-2 z-10 flex flex-col bg-[#4A5568] rounded-md shadow-md text-gray-200">
            <button 
              className="p-2 text-lg font-bold border-b border-[#2D3748] hover:bg-[#60a5fa] hover:text-white"
              onClick={handleZoomIn}
            >
              +
            </button>
            <button 
              className="p-2 text-lg font-bold hover:bg-[#60a5fa] hover:text-white"
              onClick={handleZoomOut}
            >
              -
            </button>
          </div>
          
          <button 
            className="absolute top-2 left-2 z-10 p-2 bg-[#4A5568] rounded-md shadow-md hover:bg-[#60a5fa] hover:text-white text-gray-200"
            onClick={() => {
              if (mapRef.current) {
                const rect = mapRef.current.getBoundingClientRect();
                const viewBoxWidth = 270;
                const viewBoxHeight = 270;
                const viewBoxCenterX = 250 + viewBoxWidth / 2;
                const viewBoxCenterY = 140 + viewBoxHeight / 2;
                setPosition({
                  x: (rect.width / 2) - (viewBoxCenterX * 1),
                  y: (rect.height / 2) - (viewBoxCenterY * 1),
                  scale: 1
                });
              }
            }}
          >
            إعادة ضبط
          </button>
          
          <div 
            style={{ 
              transform: `translate(${position.x}px, ${position.y}px) scale(${position.scale})`,
              transformOrigin: '0 0',
              width: '100%', 
              height: '100%' 
            }}
          >
            <svg viewBox="250 140 270 270" className="w-full h-full"> 
              <g opacity="0.4">
                <path 
                  d="M260,150 C280,145 300,150 320,155 C340,160 360,155 380,150 C400,145 420,150 440,155 C460,160 480,155 500,160"
                  fill="none"
                  stroke="#8B7D6B"
                  strokeWidth="2"
                  strokeDasharray="6,3"
                />
                
                <path 
                  d="M250,200 C255,210 260,220 265,230 C270,240 275,250 280,260 C285,270 290,280 295,290"
                  fill="none"
                  stroke="#8B7D6B"
                  strokeWidth="2"
                  strokeDasharray="6,3"
                />
                
                <path 
                  d="M300,390 C320,385 340,390 360,385 C380,380 400,385 420,380"
                  fill="none"
                  stroke="#8B7D6B"
                  strokeWidth="2"
                  strokeDasharray="6,3"
                />
                
                <path 
                  d="M500,180 C505,200 510,220 515,240 C520,260 515,280 510,300 C505,320 500,340 495,360"
                  fill="none"
                  stroke="#8B7D6B"
                  strokeWidth="2"
                  strokeDasharray="6,3"
                />
                
                <path 
                  d="M300,390 C310,395 320,400 330,405"
                  fill="none"
                  stroke="#8B7D6B"
                  strokeWidth="2"
                  strokeDasharray="6,3"
                />
              </g>
              
              <g opacity="0.3">
                <ellipse cx="275" cy="220" rx="8" ry="15" fill="none" stroke="#7A6B47" strokeWidth="0.5" transform="rotate(-20 275 220)"/>
                <ellipse cx="340" cy="300" rx="12" ry="20" fill="none" stroke="#7A6B47" strokeWidth="0.5" transform="rotate(-15 340 300)"/>
                <ellipse cx="370" cy="350" rx="10" ry="15" fill="none" stroke="#7A6B47" strokeWidth="0.5" transform="rotate(25 370 350)"/>
                
                <path d="M420,250 Q430,245 440,250 Q450,255 460,250" fill="none" stroke="#D4B896" strokeWidth="1" opacity="0.6"/>
                <path d="M430,270 Q440,265 450,270 Q460,275 470,270" fill="none" stroke="#C19A6B" strokeWidth="1" opacity="0.6"/>
                <path d="M440,290 Q450,285 460,290 Q470,295 480,290" fill="none" stroke="#A0795F" strokeWidth="1" opacity="0.6"/>
              </g>              <defs>
                <linearGradient id="seaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#A8DADC" />
                  <stop offset="30%" stopColor="#457B9D" />
                  <stop offset="70%" stopColor="#1D3557" />
                  <stop offset="100%" stopColor="#0F1419" />
                </linearGradient>
                
                <linearGradient id="coastalMountains" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#7D8471" />
                  <stop offset="50%" stopColor="#5A6B47" />
                  <stop offset="100%" stopColor="#3F4B36" />
                </linearGradient>
                
                <linearGradient id="agriculturalPlains" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#B8C5A6" />
                  <stop offset="50%" stopColor="#9CAF88" />
                  <stop offset="100%" stopColor="#7A8B5C" />
                </linearGradient>
                
                <radialGradient id="desertTerrain" cx="50%" cy="50%" r="80%">
                  <stop offset="0%" stopColor="#E8D5B7" />
                  <stop offset="40%" stopColor="#D4B896" />
                  <stop offset="70%" stopColor="#C19A6B" />
                  <stop offset="100%" stopColor="#A0795F" />
                </radialGradient>
                
                <linearGradient id="urbanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#E5E5E5" />
                  <stop offset="50%" stopColor="#D3D3D3" />
                  <stop offset="100%" stopColor="#BDBDBD" />
                </linearGradient>
                
                <pattern id="farmlandPattern" patternUnits="userSpaceOnUse" width="8" height="8">
                  <rect width="8" height="8" fill="#9CAF88"/>
                  <rect x="0" y="0" width="4" height="4" fill="#A8C090" opacity="0.7"/>
                  <rect x="4" y="4" width="4" height="4" fill="#A8C090" opacity="0.7"/>
                </pattern>
                
                <pattern id="desertPattern" patternUnits="userSpaceOnUse" width="12" height="12">
                  <rect width="12" height="12" fill="#D4B896"/>
                  <circle cx="3" cy="3" r="1" fill="#C19A6B" opacity="0.6"/>
                  <circle cx="9" cy="7" r="0.8" fill="#E8D5B7" opacity="0.8"/>
                  <circle cx="6" cy="10" r="0.5" fill="#A0795F" opacity="0.4"/>
                </pattern>
                
                <filter id="terrainShadow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
                  <feOffset dx="1" dy="1" result="offset"/>
                  <feFlood flood-color="#000000" flood-opacity="0.1"/>
                  <feComposite in2="offset" operator="in"/>
                  <feMerge>
                    <feMergeNode/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              <rect x="240" y="140" width="270" height="270" fill="#F5F5DC" stroke="#4A5568" strokeWidth="1" />
              
              <rect x="400" y="200" width="110" height="150" fill="#F4A460" opacity="0.6" />
              
              <rect x="240" y="140" width="120" height="200" fill="#98FB98" opacity="0.5" />
              
              <g opacity="0.3">
                <rect x="315" y="195" width="15" height="15" fill="#D3D3D3" rx="2" />
                <rect x="350" y="315" width="18" height="18" fill="#D3D3D3" rx="2" />
                <rect x="330" y="280" width="12" height="12" fill="#D3D3D3" rx="2" />
                <rect x="275" y="230" width="10" height="10" fill="#D3D3D3" rx="2" />
              </g>
              
              <g opacity="0.8">
                <path 
                  d="M280,240 Q320,235 360,240 Q400,245 440,240"
                  fill="none"
                  stroke="#FF6B35"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                
                <path 
                  d="M320,200 Q360,205 400,200 Q440,195 480,200"
                  fill="none"
                  stroke="#FF6B35"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                
                <path 
                  d="M300,280 Q340,275 380,280 Q420,285 450,280"
                  fill="none"
                  stroke="#FF6B35"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                
                <path 
                  d="M340,320 Q370,315 400,320"
                  fill="none"
                  stroke="#FF6B35"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                
                <path 
                  d="M270,220 L310,230 L350,220 L390,230"
                  fill="none"
                  stroke="#FFB84D"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                
                <path 
                  d="M290,260 L330,270 L370,260 L410,270"
                  fill="none"
                  stroke="#FFB84D"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                
                <path 
                  d="M285,200 L325,210 M365,190 L405,200 M425,210 L465,220"
                  fill="none"
                  stroke="#FFC107"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
              </g>
              
              <path 
                d="M245,220 C250,215 255,210 260,210 C265,210 265,215 270,215 C275,215 275,220 270,225 C265,230 265,240 270,245 C275,250 275,255 270,260 C265,265 260,270 265,275 C270,280 260,285 255,275 C250,265 250,255 245,250 C240,245 240,225 245,220"
                fill="url(#seaGradient)"
                stroke="#0277BD"
                strokeWidth="2"
              />
              
              <g opacity="0.3">
                <path d="M250,230 Q255,228 260,230 Q265,232 270,230" fill="none" stroke="#01579B" strokeWidth="1"/>
                <path d="M250,240 Q255,238 260,240 Q265,242 270,240" fill="none" stroke="#01579B" strokeWidth="1"/>
                <path d="M250,250 Q255,248 260,250 Q265,252 270,250" fill="none" stroke="#01579B" strokeWidth="1"/>
              </g>
              
              <g opacity="0.6">
                <circle cx="320" cy="200" r="2" fill="#D32F2F" stroke="#fff" strokeWidth="0.5"/>
                <circle cx="335" cy="285" r="2" fill="#D32F2F" stroke="#fff" strokeWidth="0.5"/>
                <circle cx="359" cy="323" r="2" fill="#D32F2F" stroke="#fff" strokeWidth="0.5"/>
                <circle cx="280" cy="235" r="1.5" fill="#D32F2F" stroke="#fff" strokeWidth="0.5"/>
              </g>
              
              <g opacity="0.5">
                <path 
                  d="M250,170 C260,160 280,150 310,160 C340,170 345,160 360,155 C375,150 400,155 420,160 C440,165 460,155 480,160 C500,165 505,190 510,210"
                  fill="none"
                  stroke="#9E9E9E"
                  strokeWidth="2"
                  strokeDasharray="4,2"
                />
                
                <path 
                  d="M250,230 C255,220 260,210 265,205"
                  fill="none"
                  stroke="#9E9E9E"
                  strokeWidth="2"
                  strokeDasharray="4,2"
                />
                
                <path 
                  d="M270,280 C280,290 285,310 290,330 C295,350 310,370 320,390"
                  fill="none"
                  stroke="#9E9E9E"
                  strokeWidth="2"
                  strokeDasharray="4,2"
                />
                
                <path 
                  d="M365,375 C375,380 385,390 395,395 C405,400 420,405 435,405 C450,405 470,400 485,390 C500,380 510,360 510,350"
                  fill="none"
                  stroke="#9E9E9E"
                  strokeWidth="2"
                  strokeDasharray="4,2"
                />
              </g>
              
              {governoratesData.map((governorate) => (
                <g key={governorate.id}>
                  <path
                    d={governorate.path}
                    fill={getColor(governorate.passengers)}
                    stroke="#1A202C"
                    strokeWidth="1.5"
                    opacity={hoveredGovernorate === governorate ? 0.9 : 0.7}
                    onMouseEnter={(e) => handleMouseEnter(governorate, e)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleClick(governorate)}
                    className="cursor-pointer transition-all duration-200"
                    style={{
                      filter: hoveredGovernorate === governorate ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' : 'none'
                    }}
                  />
                  <circle
                    cx={governorate.center[0]}
                    cy={governorate.center[1]}
                    r="10"
                    fill="rgba(26, 32, 44, 0.8)"
                    stroke="#4A5568"
                    strokeWidth="1"
                  />
                  <text
                    x={governorate.center[0]}
                    y={governorate.center[1] + 2}
                    textAnchor="middle"
                    fill="#fff"
                    fontSize="8"
                    fontWeight="bold"
                  >
                    {governorate.passengers}
                  </text>
                </g>
              ))}
              
              <g>
                <rect x="310" y="185" width="20" height="12" fill="rgba(26, 32, 44, 0.8)" rx="2" />
                <text x="320" y="195" textAnchor="middle" fill="#CBD5E0" fontSize="9" fontWeight="bold">حلب</text>
                
                <rect x="325" y="273" width="20" height="12" fill="rgba(26, 32, 44, 0.8)" rx="2" />
                <text x="335" y="283" textAnchor="middle" fill="#CBD5E0" fontSize="9" fontWeight="bold">حمص</text>
                
                <rect x="349" y="312" width="20" height="12" fill="rgba(26, 32, 44, 0.8)" rx="2" />
                <text x="359" y="322" textAnchor="middle" fill="#CBD5E0" fontSize="9" fontWeight="bold">دمشق</text>
                
                <rect x="340" y="355" width="20" height="12" fill="rgba(26, 32, 44, 0.8)" rx="2" />
                <text x="350" y="365" textAnchor="middle" fill="#CBD5E0" fontSize="9" fontWeight="bold">درعا</text>
              </g>
            </svg>
          </div>
          
          {showPopup && popupData && (
            <div 
              className="hidden md:block absolute bg-[#4A5568] p-2 rounded-md shadow-lg z-20 border border-[#2D3748] text-gray-200"
              style={{ 
                left: `${popupPosition.x + 10}px`, 
                top: `${popupPosition.y + 10}px`,
                pointerEvents: 'none'
              }}
            >
              <h4 className="font-bold text-sm">{popupData.name}</h4>
              <p className="text-sm">عدد الركاب: <span className="font-bold text-[#7c3aed]">{popupData.passengers}</span></p>
            </div>
          )}
          
          <div className="absolute bottom-2 left-2 bg-[#4A5568] p-2 rounded-md border border-[#2D3748] shadow-md text-xs text-gray-200">
            <div className="flex items-center mb-1">
              <div className="w-3 h-3 mr-1" style={{ backgroundColor: '#ddd6fe' }}></div>
              <span>1-3 ركاب</span>
            </div>
            <div className="flex items-center mb-1">
              <div className="w-3 h-3 mr-1" style={{ backgroundColor: '#c4b5fd' }}></div>
              <span>4-5 ركاب</span>
            </div>
            <div className="flex items-center mb-1">
              <div className="w-3 h-3 mr-1" style={{ backgroundColor: '#a78bfa' }}></div>
              <span>6-7 ركاب</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 mr-1" style={{ backgroundColor: '#7c3aed' }}></div>
              <span>8+ ركاب</span>
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-1/4 p-4 bg-[#2D3748] rounded-md border border-[#4A5568] flex flex-col h-[70vh] md:h-96 mt-4 md:mt-0 md:ml-4 text-gray-200">
          <h3 className="text-lg font-bold mb-2">تفاصيل المحافظات</h3>
          
          {selectedGovernorate ? (
            <div className="mb-4 p-3 bg-[#4A5568] rounded-md border border-[#718096]">
              <h4 className="font-bold text-lg">{selectedGovernorate.name}</h4>
              <p className="text-lg">عدد الركاب: <span className="font-bold text-[#7c3aed]">{selectedGovernorate.passengers}</span></p>
              <div className="mt-2 text-sm text-gray-400">
                <div className="w-full bg-[#1A202C] rounded-full h-2 mt-1">
                  <div 
                    className="h-2 rounded-full"
                    style={{ 
                      width: `${Math.round(selectedGovernorate.passengers / 12 * 100)}%`,
                      backgroundColor: '#7c3aed'
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-400 mb-4">اضغط على محافظة لعرض التفاصيل</p>
          )}
          
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-bold">إحصائيات المحافظات:</h4>
            <div className="flex items-center text-xs text-gray-400">
              <span>الترتيب حسب: </span>
              <button className="ml-1 px-2 py-1 bg-[#4A5568] rounded-md hover:bg-[#60a5fa] hover:text-white">عدد الركاب</button>
            </div>
          </div>
          
          <div className="overflow-y-auto flex-grow">
            <ul className="text-sm">
              {governoratesData
                .sort((a, b) => b.passengers - a.passengers)
                .map(gov => (
                  <li 
                    key={gov.id} 
                    className={`mb-1 cursor-pointer hover:bg-[#4A5568] p-2 rounded flex justify-between items-center ${selectedGovernorate?.id === gov.id ? 'bg-[#7c3aed] text-white' : 'text-gray-200'}`}
                    onClick={() => handleClick(gov)}
                  >
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: getColor(gov.passengers) }}
                      ></div>
                      <span>{gov.name}</span>
                    </div>
                    <span className="font-bold">{gov.passengers}</span>
                  </li>
                ))
              }
            </ul>
          </div>
          
          <div className="mt-4 pt-3 border-t border-[#4A5568]">
            <div className="flex justify-between text-sm">
              <div>
                <span className="text-gray-400">إجمالي الركاب:</span>
                <span className="font-bold ml-1">
                  {governoratesData.reduce((sum, gov) => sum + gov.passengers, 0)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 w-full md:max-w-5xl bg-[#2D3748] p-4 rounded-md border border-[#4A5568] text-gray-200">
        <h3 className="text-lg font-bold mb-3">إحصائيات وتحليلات</h3>
        
        <div className="flex flex-col md:flex-row text-right"> 
<div className="w-full md:w-1/3 pr-0 md:pr-4 mb-4 md:mb-0 cursor-pointer">
  <div className="bg-[#1c2026] p-3 rounded-md border border-[#718096] text-right">
    <h4 className="font-bold mb-2">المحافظات الأكثر ازدحاماً</h4>
    <ol className="text-right"> 
      {governoratesData
        .sort((a, b) => b.passengers - a.passengers)
        .slice(0, 3)
        .map((gov) => (
          <li key={gov.id} className="mb-1"> {/* إزالة flex justify-end إذا كنت لا تحتاجها بعد إزالة الترقيم اليدوي */}
            <span className="font-medium">{gov.name}</span>: {gov.passengers} ركاب
          </li>
        ))
      }
    </ol>
  </div>
</div>
          
          <div className="w-full md:w-1/3 px-0 md:px-2 mb-4 md:mb-0 cursor-pointer">
            <div className="bg-[#292f3b] p-3 rounded-md border border-[#718096]">
              <h4 className="font-bold mb-2">المحافظات الأقل ازدحاماً</h4>
              <ol className="text-right"> 
                {governoratesData
                  .sort((a, b) => a.passengers - b.passengers)
                  .slice(0, 3)
                  .map(gov => (
                    <li key={gov.id} className="mb-1">
                      <span className="font-medium">{gov.name}</span>: {gov.passengers} ركاب
                    </li>
                  ))
                }
              </ol>
            </div>
          </div>
          
          <div className="w-full md:w-1/3 pl-0 md:pl-4">
            <div className="bg-[#4A5568] p-3 rounded-md border border-[#718096] cursor-pointer">
              <h4 className="font-bold mb-2">إحصائيات عامة</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-gray-400"> : إجمالي الركاب</p>
                  <p className="font-bold text-lg">{governoratesData.reduce((sum, gov) => sum + gov.passengers, 0)}</p>
                </div>
                <div>
                  <p className="text-gray-400"> : عدد المحافظات</p>
                  <p className="font-bold text-lg">{governoratesData.length}</p>
                </div>
                <div>
                  <p className="text-gray-400"> : أقصى عدد</p>
                  <p className="font-bold text-lg">{Math.max(...governoratesData.map(gov => gov.passengers))}</p>
                </div>
                 <div>
        <p className="text-gray-400">: أقل عدد</p>
        <p className="font-bold text-lg">{Math.min(...governoratesData.map(gov => gov.passengers))}</p>
      </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}