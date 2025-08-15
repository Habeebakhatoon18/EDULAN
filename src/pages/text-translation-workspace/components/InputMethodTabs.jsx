import React from 'react';
import Icon from '../../../components/AppIcon';

const InputMethodTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    {
      id: 'paste',
      label: 'Paste Text',
      icon: 'Clipboard',
      description: 'Paste content directly'
    },
    {
      id: 'upload',
      label: 'Upload File',
      icon: 'Upload',
      description: 'PDF, DOCX supported'
    },
    {
      id: 'type',
      label: 'Type Directly',
      icon: 'Edit3',
      description: 'Type or edit content'
    }
  ];

  return (
    <div className="border-b border-border/50">
      <nav className="flex space-x-1" aria-label="Input methods">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => onTabChange(tab?.id)}
            className={`group relative flex items-center space-x-2 px-4 py-3 text-sm font-medium rounded-t-lg transition-smooth focus-ring ${
              activeTab === tab?.id
                ? 'bg-primary/10 text-primary border-b-2 border-primary' :'text-muted-foreground hover:text-foreground hover:bg-muted/30'
            }`}
          >
            <Icon 
              name={tab?.icon} 
              size={16} 
              className={`transition-smooth ${
                activeTab === tab?.id ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
              }`} 
            />
            <div className="text-left">
              <div>{tab?.label}</div>
              <div className="text-xs opacity-75 hidden sm:block">{tab?.description}</div>
            </div>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default InputMethodTabs;