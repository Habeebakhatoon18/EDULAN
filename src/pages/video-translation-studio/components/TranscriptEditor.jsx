import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const TranscriptEditor = ({ 
  transcript = [], 
  currentTime = 0, 
  onTranscriptUpdate,
  onSeekToTime,
  language = 'en',
  isEditable = true
}) => {
  const [editingSegment, setEditingSegment] = useState(null);
  const [editText, setEditText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSegments, setSelectedSegments] = useState([]);
  const transcriptRef = useRef(null);
  const activeSegmentRef = useRef(null);

  const mockTranscript = [
    {
      id: 'seg-001',
      startTime: 0,
      endTime: 4.2,
      text: "Welcome to today\'s lesson on advanced calculus. We\'ll be exploring the fundamental concepts of derivatives and their applications.",
      confidence: 0.95,
      speaker: 'Instructor',
      language: 'en'
    },
    {
      id: 'seg-002',
      startTime: 4.2,
      endTime: 8.7,
      text: "Let\'s begin by reviewing what we learned in the previous session about limits and continuity.",
      confidence: 0.92,
      speaker: 'Instructor',
      language: 'en'
    },
    {
      id: 'seg-003',
      startTime: 8.7,
      endTime: 13.1,
      text: "The derivative of a function represents the rate of change at any given point on the curve.",
      confidence: 0.98,
      speaker: 'Instructor',
      language: 'en'
    },
    {
      id: 'seg-004',
      startTime: 13.1,
      endTime: 18.5,
      text: "For example, if we have f(x) equals x squared, the derivative f prime of x equals 2x.",
      confidence: 0.89,
      speaker: 'Instructor',
      language: 'en'
    },
    {
      id: 'seg-005',
      startTime: 18.5,
      endTime: 23.8,
      text: "This tells us that at any point x, the slope of the tangent line is 2x.",
      confidence: 0.94,
      speaker: 'Instructor',
      language: 'en'
    },
    {
      id: 'seg-006',
      startTime: 23.8,
      endTime: 28.2,
      text: "Now, let's look at some practical applications of derivatives in real-world scenarios.",
      confidence: 0.91,
      speaker: 'Instructor',
      language: 'en'
    }
  ];

  const displayTranscript = transcript?.length > 0 ? transcript : mockTranscript;

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 100);
    return `${minutes}:${secs?.toString()?.padStart(2, '0')}.${ms?.toString()?.padStart(2, '0')}`;
  };

  const getCurrentSegment = () => {
    return displayTranscript?.find(segment => 
      currentTime >= segment?.startTime && currentTime <= segment?.endTime
    );
  };

  const handleSegmentClick = (segment) => {
    onSeekToTime?.(segment?.startTime);
  };

  const handleEditStart = (segment) => {
    setEditingSegment(segment?.id);
    setEditText(segment?.text);
  };

  const handleEditSave = () => {
    if (editingSegment && onTranscriptUpdate) {
      const updatedTranscript = displayTranscript?.map(segment =>
        segment?.id === editingSegment
          ? { ...segment, text: editText, confidence: 0.99 }
          : segment
      );
      onTranscriptUpdate(updatedTranscript);
    }
    setEditingSegment(null);
    setEditText('');
  };

  const handleEditCancel = () => {
    setEditingSegment(null);
    setEditText('');
  };

  const handleSegmentSelect = (segmentId) => {
    setSelectedSegments(prev => 
      prev?.includes(segmentId)
        ? prev?.filter(id => id !== segmentId)
        : [...prev, segmentId]
    );
  };

  const handleBulkAction = (action) => {
    if (selectedSegments?.length === 0) return;
    
    switch (action) {
      case 'delete':
        const updatedTranscript = displayTranscript?.filter(
          segment => !selectedSegments?.includes(segment?.id)
        );
        onTranscriptUpdate?.(updatedTranscript);
        setSelectedSegments([]);
        break;
      case 'merge':
        // Merge selected segments
        const selectedSegs = displayTranscript?.filter(
          segment => selectedSegments?.includes(segment?.id)
        )?.sort((a, b) => a?.startTime - b?.startTime);
        
        if (selectedSegs?.length > 1) {
          const mergedSegment = {
            ...selectedSegs?.[0],
            endTime: selectedSegs?.[selectedSegs?.length - 1]?.endTime,
            text: selectedSegs?.map(seg => seg?.text)?.join(' '),
            confidence: Math.min(...selectedSegs?.map(seg => seg?.confidence))
          };
          
          const newTranscript = displayTranscript?.filter(
            segment => !selectedSegments?.includes(segment?.id)
          );
          newTranscript?.push(mergedSegment);
          newTranscript?.sort((a, b) => a?.startTime - b?.startTime);
          
          onTranscriptUpdate?.(newTranscript);
          setSelectedSegments([]);
        }
        break;
    }
  };

  const filteredTranscript = displayTranscript?.filter(segment =>
    segment?.text?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  const getConfidenceColor = (confidence) => {
    if (confidence >= 0.9) return 'text-success';
    if (confidence >= 0.7) return 'text-warning';
    return 'text-error';
  };

  const getConfidenceBg = (confidence) => {
    if (confidence >= 0.9) return 'bg-success/10';
    if (confidence >= 0.7) return 'bg-warning/10';
    return 'bg-error/10';
  };

  // Auto-scroll to current segment
  useEffect(() => {
    if (activeSegmentRef?.current) {
      activeSegmentRef?.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }, [currentTime]);

  const currentSegment = getCurrentSegment();

  return (
    <div className="space-y-4">
      {/* Header Controls */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-heading font-medium text-foreground flex items-center">
          <Icon name="FileText" size={20} className="mr-2 text-primary" />
          Transcript Editor
        </h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">
            {displayTranscript?.length} segments
          </span>
          {selectedSegments?.length > 0 && (
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleBulkAction('merge')}
                iconName="Merge"
                disabled={selectedSegments?.length < 2}
              >
                Merge
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleBulkAction('delete')}
                iconName="Trash2"
              >
                Delete
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedSegments([])}
                iconName="X"
              >
                Clear
              </Button>
            </div>
          )}
        </div>
      </div>
      {/* Search */}
      <div className="flex space-x-3">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search transcript..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
          />
        </div>
        <Button variant="outline" iconName="Download">
          Export
        </Button>
      </div>
      {/* Transcript List */}
      <div 
        ref={transcriptRef}
        className="glass rounded-lg border border-border/50 max-h-96 overflow-y-auto"
      >
        {filteredTranscript?.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="FileText" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h4 className="font-medium text-foreground mb-2">No transcript available</h4>
            <p className="text-muted-foreground">
              {searchTerm ? 'No segments match your search.' : 'Upload a video to generate transcript.'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border/50">
            {filteredTranscript?.map((segment) => {
              const isActive = currentSegment?.id === segment?.id;
              const isEditing = editingSegment === segment?.id;
              const isSelected = selectedSegments?.includes(segment?.id);
              
              return (
                <div
                  key={segment?.id}
                  ref={isActive ? activeSegmentRef : null}
                  className={`p-4 transition-smooth ${
                    isActive 
                      ? 'bg-primary/10 border-l-4 border-primary' 
                      : isSelected
                        ? 'bg-secondary/10' :'hover:bg-muted/30'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    {/* Selection Checkbox */}
                    <button
                      onClick={() => handleSegmentSelect(segment?.id)}
                      className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-smooth ${
                        isSelected
                          ? 'bg-secondary border-secondary' :'border-border hover:border-secondary'
                      }`}
                    >
                      {isSelected && (
                        <Icon name="Check" size={12} className="text-white" />
                      )}
                    </button>

                    {/* Timestamp */}
                    <button
                      onClick={() => handleSegmentClick(segment)}
                      className="flex-shrink-0 text-xs font-mono text-muted-foreground hover:text-primary transition-smooth focus-ring rounded px-2 py-1"
                    >
                      {formatTime(segment?.startTime)}
                    </button>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      {isEditing ? (
                        <div className="space-y-2">
                          <textarea
                            value={editText}
                            onChange={(e) => setEditText(e?.target?.value)}
                            className="w-full p-2 border border-border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                            rows={3}
                          />
                          <div className="flex space-x-2">
                            <Button
                              variant="default"
                              size="sm"
                              onClick={handleEditSave}
                              iconName="Check"
                            >
                              Save
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={handleEditCancel}
                              iconName="X"
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <p className="text-sm text-foreground leading-relaxed">
                            {segment?.text}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                              <span>{segment?.speaker}</span>
                              <div className={`flex items-center space-x-1 px-2 py-1 rounded ${getConfidenceBg(segment?.confidence)}`}>
                                <Icon name="Zap" size={12} className={getConfidenceColor(segment?.confidence)} />
                                <span className={getConfidenceColor(segment?.confidence)}>
                                  {Math.round(segment?.confidence * 100)}%
                                </span>
                              </div>
                            </div>
                            {isEditable && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEditStart(segment)}
                                iconName="Edit2"
                                className="opacity-0 group-hover:opacity-100 transition-smooth"
                              >
                                Edit
                              </Button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass rounded-lg p-3 border border-border/50 text-center">
          <p className="text-sm text-muted-foreground">Total Duration</p>
          <p className="font-medium text-foreground">
            {formatTime(Math.max(...displayTranscript?.map(s => s?.endTime)))}
          </p>
        </div>
        <div className="glass rounded-lg p-3 border border-border/50 text-center">
          <p className="text-sm text-muted-foreground">Word Count</p>
          <p className="font-medium text-foreground">
            {displayTranscript?.reduce((acc, seg) => acc + seg?.text?.split(' ')?.length, 0)}
          </p>
        </div>
        <div className="glass rounded-lg p-3 border border-border/50 text-center">
          <p className="text-sm text-muted-foreground">Avg Confidence</p>
          <p className="font-medium text-foreground">
            {Math.round(displayTranscript?.reduce((acc, seg) => acc + seg?.confidence, 0) / displayTranscript?.length * 100)}%
          </p>
        </div>
        <div className="glass rounded-lg p-3 border border-border/50 text-center">
          <p className="text-sm text-muted-foreground">Speakers</p>
          <p className="font-medium text-foreground">
            {new Set(displayTranscript.map(s => s.speaker))?.size}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TranscriptEditor;