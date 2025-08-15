import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const SubtitlePreview = ({ 
  subtitles = [], 
  currentTime = 0, 
  language = 'es',
  onStyleChange,
  onExport
}) => {
  const [previewStyle, setPreviewStyle] = useState({
    fontSize: 'medium',
    fontFamily: 'arial',
    color: '#FFFFFF',
    backgroundColor: '#000000',
    opacity: 0.8,
    position: 'bottom',
    alignment: 'center',
    outline: true,
    shadow: true
  });

  const mockSubtitles = {
    'es': [
      {
        id: 'sub-001',
        startTime: 0,
        endTime: 4.2,
        text: "Bienvenidos a la lección de hoy sobre cálculo avanzado. Exploraremos los conceptos fundamentales de las derivadas y sus aplicaciones.",
        originalText: "Welcome to today\'s lesson on advanced calculus. We\'ll be exploring the fundamental concepts of derivatives and their applications."
      },
      {
        id: 'sub-002',
        startTime: 4.2,
        endTime: 8.7,
        text: "Comencemos repasando lo que aprendimos en la sesión anterior sobre límites y continuidad.",
        originalText: "Let\'s begin by reviewing what we learned in the previous session about limits and continuity."
      },
      {
        id: 'sub-003',
        startTime: 8.7,
        endTime: 13.1,
        text: "La derivada de una función representa la tasa de cambio en cualquier punto dado de la curva.",
        originalText: "The derivative of a function represents the rate of change at any given point on the curve."
      },
      {
        id: 'sub-004',
        startTime: 13.1,
        endTime: 18.5,
        text: "Por ejemplo, si tenemos f(x) igual a x al cuadrado, la derivada f prima de x es igual a 2x.",
        originalText: "For example, if we have f(x) equals x squared, the derivative f prime of x equals 2x."
      }
    ],
    'fr': [
      {
        id: 'sub-001',
        startTime: 0,
        endTime: 4.2,
        text: "Bienvenue à la leçon d\'aujourd\'hui sur le calcul avancé. Nous explorerons les concepts fondamentaux des dérivées et leurs applications.",
        originalText: "Welcome to today\'s lesson on advanced calculus. We\'ll be exploring the fundamental concepts of derivatives and their applications."
      },
      {
        id: 'sub-002',
        startTime: 4.2,
        endTime: 8.7,
        text: "Commençons par réviser ce que nous avons appris dans la session précédente sur les limites et la continuité.",
        originalText: "Let\'s begin by reviewing what we learned in the previous session about limits and continuity."
      }
    ]
  };

  const displaySubtitles = subtitles?.length > 0 ? subtitles : (mockSubtitles?.[language] || mockSubtitles?.['es']);

  const fontSizeOptions = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' },
    { value: 'extra-large', label: 'Extra Large' }
  ];

  const fontFamilyOptions = [
    { value: 'arial', label: 'Arial' },
    { value: 'helvetica', label: 'Helvetica' },
    { value: 'times', label: 'Times New Roman' },
    { value: 'courier', label: 'Courier New' },
    { value: 'georgia', label: 'Georgia' }
  ];

  const positionOptions = [
    { value: 'top', label: 'Top' },
    { value: 'middle', label: 'Middle' },
    { value: 'bottom', label: 'Bottom' }
  ];

  const alignmentOptions = [
    { value: 'left', label: 'Left' },
    { value: 'center', label: 'Center' },
    { value: 'right', label: 'Right' }
  ];

  const getCurrentSubtitle = () => {
    return displaySubtitles?.find(sub => 
      currentTime >= sub?.startTime && currentTime <= sub?.endTime
    );
  };

  const handleStyleChange = (property, value) => {
    const newStyle = { ...previewStyle, [property]: value };
    setPreviewStyle(newStyle);
    onStyleChange?.(newStyle);
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 1000);
    
    return `${hours?.toString()?.padStart(2, '0')}:${minutes?.toString()?.padStart(2, '0')}:${secs?.toString()?.padStart(2, '0')},${ms?.toString()?.padStart(3, '0')}`;
  };

  const exportSubtitles = (format) => {
    let content = '';
    
    switch (format) {
      case 'srt':
        content = displaySubtitles?.map((sub, index) => {
          return `${index + 1}\n${formatTime(sub?.startTime)} --> ${formatTime(sub?.endTime)}\n${sub?.text}\n`;
        })?.join('\n');
        break;
      case 'vtt':
        content = 'WEBVTT\n\n' + displaySubtitles?.map((sub, index) => {
          return `${index + 1}\n${formatTime(sub?.startTime)} --> ${formatTime(sub?.endTime)}\n${sub?.text}\n`;
        })?.join('\n');
        break;
      case 'ass':
        content = `[Script Info]\nTitle: Translated Subtitles\n\n[V4+ Styles]\nFormat: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding\nStyle: Default,${previewStyle?.fontFamily},${previewStyle?.fontSize === 'small' ? '16' : previewStyle?.fontSize === 'medium' ? '20' : previewStyle?.fontSize === 'large' ? '24' : '28'},${previewStyle?.color},&Hffffff,&H0,&H0,0,0,0,0,100,100,0,0,1,2,0,2,10,10,10,1\n\n[Events]\nFormat: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text\n` + 
          displaySubtitles?.map((sub, index) => {
            return `Dialogue: 0,${formatTime(sub?.startTime)},${formatTime(sub?.endTime)},Default,,0,0,0,,${sub?.text}`;
          })?.join('\n');
        break;
    }
    
    onExport?.(content, format);
  };

  const currentSubtitle = getCurrentSubtitle();

  const getSubtitleStyle = () => {
    const fontSize = {
      'small': '14px',
      'medium': '18px',
      'large': '22px',
      'extra-large': '26px'
    }?.[previewStyle?.fontSize];

    const fontFamily = {
      'arial': 'Arial, sans-serif',
      'helvetica': 'Helvetica, sans-serif',
      'times': 'Times New Roman, serif',
      'courier': 'Courier New, monospace',
      'georgia': 'Georgia, serif'
    }?.[previewStyle?.fontFamily];

    return {
      fontSize,
      fontFamily,
      color: previewStyle?.color,
      backgroundColor: `${previewStyle?.backgroundColor}${Math.round(previewStyle?.opacity * 255)?.toString(16)?.padStart(2, '0')}`,
      textAlign: previewStyle?.alignment,
      textShadow: previewStyle?.shadow ? '2px 2px 4px rgba(0,0,0,0.8)' : 'none',
      WebkitTextStroke: previewStyle?.outline ? '1px black' : 'none',
      padding: '8px 16px',
      borderRadius: '4px',
      maxWidth: '80%',
      lineHeight: '1.4'
    };
  };

  return (
    <div className="space-y-6">
      {/* Preview Area */}
      <div className="glass rounded-lg p-4 border border-border/50">
        <h3 className="text-lg font-heading font-medium text-foreground mb-4 flex items-center">
          <Icon name="Subtitles" size={20} className="mr-2 text-secondary" />
          Subtitle Preview
        </h3>

        {/* Mock Video Area with Subtitle Overlay */}
        <div className="relative bg-black rounded-lg aspect-video flex items-center justify-center mb-4">
          <div className="text-white/50 text-center">
            <Icon name="Play" size={48} className="mx-auto mb-2" />
            <p>Video Preview Area</p>
          </div>

          {/* Subtitle Overlay */}
          {currentSubtitle && (
            <div 
              className={`absolute ${
                previewStyle?.position === 'top' ? 'top-4' : 
                previewStyle?.position === 'middle' ? 'top-1/2 transform -translate-y-1/2' : 
                'bottom-4'
              } left-1/2 transform -translate-x-1/2`}
            >
              <div style={getSubtitleStyle()}>
                {currentSubtitle?.text}
              </div>
            </div>
          )}

          {/* Time indicator */}
          <div className="absolute top-2 left-2 bg-black/50 text-white text-sm px-2 py-1 rounded">
            {Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60)?.toString()?.padStart(2, '0')}
          </div>
        </div>

        {/* Current Subtitle Info */}
        {currentSubtitle && (
          <div className="bg-muted/30 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Current Subtitle</span>
              <span className="text-xs text-muted-foreground">
                {Math.floor(currentSubtitle?.startTime)}s - {Math.floor(currentSubtitle?.endTime)}s
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-2">{currentSubtitle?.text}</p>
            {currentSubtitle?.originalText && (
              <p className="text-xs text-muted-foreground italic">
                Original: {currentSubtitle?.originalText}
              </p>
            )}
          </div>
        )}
      </div>
      {/* Style Controls */}
      <div className="glass rounded-lg p-4 border border-border/50">
        <h4 className="font-medium text-foreground mb-4 flex items-center">
          <Icon name="Palette" size={18} className="mr-2 text-accent" />
          Subtitle Styling
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Font Settings */}
          <div className="space-y-3">
            <Select
              label="Font Size"
              options={fontSizeOptions}
              value={previewStyle?.fontSize}
              onChange={(value) => handleStyleChange('fontSize', value)}
            />
            
            <Select
              label="Font Family"
              options={fontFamilyOptions}
              value={previewStyle?.fontFamily}
              onChange={(value) => handleStyleChange('fontFamily', value)}
            />

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Text Color
              </label>
              <div className="flex space-x-2">
                <input
                  type="color"
                  value={previewStyle?.color}
                  onChange={(e) => handleStyleChange('color', e?.target?.value)}
                  className="w-12 h-10 rounded border border-border cursor-pointer"
                />
                <input
                  type="text"
                  value={previewStyle?.color}
                  onChange={(e) => handleStyleChange('color', e?.target?.value)}
                  className="flex-1 px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>

          {/* Position & Background */}
          <div className="space-y-3">
            <Select
              label="Position"
              options={positionOptions}
              value={previewStyle?.position}
              onChange={(value) => handleStyleChange('position', value)}
            />

            <Select
              label="Alignment"
              options={alignmentOptions}
              value={previewStyle?.alignment}
              onChange={(value) => handleStyleChange('alignment', value)}
            />

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Background Color
              </label>
              <div className="flex space-x-2">
                <input
                  type="color"
                  value={previewStyle?.backgroundColor}
                  onChange={(e) => handleStyleChange('backgroundColor', e?.target?.value)}
                  className="w-12 h-10 rounded border border-border cursor-pointer"
                />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={previewStyle?.opacity}
                  onChange={(e) => handleStyleChange('opacity', parseFloat(e?.target?.value))}
                  className="flex-1"
                />
                <span className="text-sm text-muted-foreground w-12">
                  {Math.round(previewStyle?.opacity * 100)}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Effects */}
        <div className="mt-4 flex space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={previewStyle?.outline}
              onChange={(e) => handleStyleChange('outline', e?.target?.checked)}
              className="rounded border-border"
            />
            <span className="text-sm text-foreground">Text Outline</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={previewStyle?.shadow}
              onChange={(e) => handleStyleChange('shadow', e?.target?.checked)}
              className="rounded border-border"
            />
            <span className="text-sm text-foreground">Drop Shadow</span>
          </label>
        </div>
      </div>
      {/* Export Options */}
      <div className="glass rounded-lg p-4 border border-border/50">
        <h4 className="font-medium text-foreground mb-4 flex items-center">
          <Icon name="Download" size={18} className="mr-2 text-primary" />
          Export Subtitles
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Button
            variant="outline"
            onClick={() => exportSubtitles('srt')}
            iconName="FileText"
            iconPosition="left"
            className="justify-start"
          >
            <div className="text-left">
              <div className="font-medium">SRT Format</div>
              <div className="text-xs text-muted-foreground">Most compatible</div>
            </div>
          </Button>

          <Button
            variant="outline"
            onClick={() => exportSubtitles('vtt')}
            iconName="Globe"
            iconPosition="left"
            className="justify-start"
          >
            <div className="text-left">
              <div className="font-medium">WebVTT Format</div>
              <div className="text-xs text-muted-foreground">Web standard</div>
            </div>
          </Button>

          <Button
            variant="outline"
            onClick={() => exportSubtitles('ass')}
            iconName="Palette"
            iconPosition="left"
            className="justify-start"
          >
            <div className="text-left">
              <div className="font-medium">ASS Format</div>
              <div className="text-xs text-muted-foreground">Advanced styling</div>
            </div>
          </Button>
        </div>

        {/* Statistics */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Total Subtitles</p>
            <p className="font-medium text-foreground">{displaySubtitles?.length}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Language</p>
            <p className="font-medium text-foreground">{language?.toUpperCase()}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Duration</p>
            <p className="font-medium text-foreground">
              {Math.floor(Math.max(...displaySubtitles?.map(s => s?.endTime)) / 60)}m
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Characters</p>
            <p className="font-medium text-foreground">
              {displaySubtitles?.reduce((acc, sub) => acc + sub?.text?.length, 0)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubtitlePreview;