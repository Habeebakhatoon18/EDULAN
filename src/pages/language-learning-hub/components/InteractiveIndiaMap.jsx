import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const InteractiveIndiaMap = () => {
  const [hoveredState, setHoveredState] = useState(null);

  const indianLanguages = [
    {
      id: 'hindi',
      name: 'Hindi',
      nativeScript: 'हिन्दी',
      speakers: '602M',
      region: 'North India',
      position: { top: '35%', left: '45%' }
    },
    {
      id: 'bengali',
      name: 'Bengali',
      nativeScript: 'বাংলা',
      speakers: '265M',
      region: 'West Bengal',
      position: { top: '40%', left: '70%' }
    },
    {
      id: 'telugu',
      name: 'Telugu',
      nativeScript: 'తెలుగు',
      speakers: '95M',
      region: 'Andhra Pradesh',
      position: { top: '60%', left: '60%' }
    },
    {
      id: 'marathi',
      name: 'Marathi',
      nativeScript: 'मराठी',
      speakers: '83M',
      region: 'Maharashtra',
      position: { top: '55%', left: '45%' }
    },
    {
      id: 'tamil',
      name: 'Tamil',
      nativeScript: 'தமிழ்',
      speakers: '78M',
      region: 'Tamil Nadu',
      position: { top: '75%', left: '55%' }
    },
    {
      id: 'gujarati',
      name: 'Gujarati',
      nativeScript: 'ગુજરાતી',
      speakers: '56M',
      region: 'Gujarat',
      position: { top: '50%', left: '35%' }
    },
    {
      id: 'kannada',
      name: 'Kannada',
      nativeScript: 'ಕನ್ನಡ',
      speakers: '44M',
      region: 'Karnataka',
      position: { top: '65%', left: '50%' }
    },
    {
      id: 'malayalam',
      name: 'Malayalam',
      nativeScript: 'മലയാളം',
      speakers: '38M',
      region: 'Kerala',
      position: { top: '75%', left: '48%' }
    }
  ];

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="relative bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 overflow-hidden">
        {/* Background Map Illustration */}
        <div className="relative w-full h-96 bg-gradient-to-br from-accent/20 to-primary/20 rounded-xl overflow-hidden">
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            title="India Map"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=20.5937,78.9629&z=5&output=embed"
            className="rounded-xl opacity-30"
          />
          
          {/* Language Markers */}
          {indianLanguages?.map((language) => (
            <div
              key={language?.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={language?.position}
              onMouseEnter={() => setHoveredState(language)}
              onMouseLeave={() => setHoveredState(null)}
            >
              <div className="relative">
                <div className="w-4 h-4 bg-primary rounded-full animate-pulse-gentle group-hover:scale-150 transition-smooth shadow-lg">
                  <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-75"></div>
                </div>
                
                {/* Tooltip */}
                {hoveredState?.id === language?.id && (
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 glass rounded-lg p-4 min-w-48 animate-scale-in z-10">
                    <div className="text-center">
                      <div className="text-2xl font-heading mb-2">{language?.nativeScript}</div>
                      <div className="font-medium text-foreground">{language?.name}</div>
                      <div className="text-sm text-muted-foreground">{language?.region}</div>
                      <div className="flex items-center justify-center space-x-1 mt-2 text-primary">
                        <Icon name="Users" size={14} />
                        <span className="text-sm font-medium">{language?.speakers} speakers</span>
                      </div>
                    </div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white/20"></div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Map Legend */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <div className="w-3 h-3 bg-primary rounded-full animate-pulse-gentle"></div>
            <span>Supported Languages</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Users" size={16} />
            <span>1.2B+ Total Speakers</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Globe" size={16} />
            <span>22 Official Languages</span>
          </div>
        </div>
      </div>
      {/* Floating Info Card */}
      {hoveredState && (
        <div className="fixed top-4 right-4 glass rounded-lg p-4 max-w-xs animate-fade-in z-50 lg:block hidden">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
              <Icon name="Languages" size={18} color="var(--color-primary)" />
            </div>
            <div>
              <div className="font-medium text-foreground">{hoveredState?.name}</div>
              <div className="text-xs text-muted-foreground">{hoveredState?.region}</div>
            </div>
          </div>
          <div className="text-2xl font-heading text-center mb-2">{hoveredState?.nativeScript}</div>
          <div className="text-sm text-muted-foreground text-center">
            Native speakers: <span className="text-primary font-medium">{hoveredState?.speakers}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveIndiaMap;