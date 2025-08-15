import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProcessingQueue = ({ jobs = [], onJobAction }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const mockJobs = [
    {
      id: 'job-001',
      title: 'Spanish Literature Chapter 3.mp4',
      type: 'file',
      status: 'processing',
      progress: 65,
      startTime: new Date(Date.now() - 8 * 60 * 1000),
      estimatedCompletion: new Date(Date.now() + 4 * 60 * 1000),
      sourceLanguage: 'English',
      targetLanguages: ['Spanish', 'French'],
      fileSize: '245 MB',
      duration: '18:24',
      queuePosition: null
    },
    {
      id: 'job-002',
      title: 'Advanced Mathematics: Calculus Fundamentals',
      type: 'youtube',
      status: 'queued',
      progress: 0,
      startTime: null,
      estimatedCompletion: new Date(Date.now() + 12 * 60 * 1000),
      sourceLanguage: 'English',
      targetLanguages: ['Spanish', 'Portuguese', 'Italian'],
      fileSize: '1.2 GB',
      duration: '24:35',
      queuePosition: 2
    },
    {
      id: 'job-003',
      title: 'History Documentary - World War II.mp4',
      type: 'file',
      status: 'completed',
      progress: 100,
      startTime: new Date(Date.now() - 25 * 60 * 1000),
      estimatedCompletion: new Date(Date.now() - 2 * 60 * 1000),
      sourceLanguage: 'English',
      targetLanguages: ['German', 'French'],
      fileSize: '890 MB',
      duration: '45:12',
      queuePosition: null
    },
    {
      id: 'job-004',
      title: 'Chemistry Lab Experiment.mp4',
      type: 'file',
      status: 'failed',
      progress: 0,
      startTime: new Date(Date.now() - 15 * 60 * 1000),
      estimatedCompletion: null,
      sourceLanguage: 'English',
      targetLanguages: ['Spanish'],
      fileSize: '156 MB',
      duration: '12:08',
      queuePosition: null,
      error: 'Audio quality too low for accurate transcription'
    }
  ];

  const displayJobs = jobs?.length > 0 ? jobs : mockJobs;

  const getStatusColor = (status) => {
    switch (status) {
      case 'processing': return 'text-warning';
      case 'completed': return 'text-success';
      case 'failed': return 'text-error';
      case 'queued': return 'text-secondary';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'processing': return 'Loader2';
      case 'completed': return 'CheckCircle';
      case 'failed': return 'XCircle';
      case 'queued': return 'Clock';
      default: return 'Circle';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'processing': return 'bg-warning/10';
      case 'completed': return 'bg-success/10';
      case 'failed': return 'bg-error/10';
      case 'queued': return 'bg-secondary/10';
      default: return 'bg-muted/10';
    }
  };

  const formatTimeRemaining = (date) => {
    if (!date) return 'Unknown';
    const diff = date?.getTime() - currentTime?.getTime();
    if (diff <= 0) return 'Completed';
    
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    
    if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    }
    return `${seconds}s`;
  };

  const formatElapsedTime = (startTime) => {
    if (!startTime) return 'Not started';
    const diff = currentTime?.getTime() - startTime?.getTime();
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    
    if (minutes > 0) {
      return `${minutes}m ${seconds}s ago`;
    }
    return `${seconds}s ago`;
  };

  const handleJobAction = (jobId, action) => {
    onJobAction?.(jobId, action);
  };

  const getJobActions = (job) => {
    switch (job?.status) {
      case 'processing':
        return [
          { label: 'Pause', icon: 'Pause', action: 'pause' },
          { label: 'Cancel', icon: 'X', action: 'cancel', variant: 'destructive' }
        ];
      case 'queued':
        return [
          { label: 'Priority', icon: 'ArrowUp', action: 'priority' },
          { label: 'Cancel', icon: 'X', action: 'cancel', variant: 'destructive' }
        ];
      case 'completed':
        return [
          { label: 'Download', icon: 'Download', action: 'download' },
          { label: 'View', icon: 'Eye', action: 'view' },
          { label: 'Delete', icon: 'Trash2', action: 'delete', variant: 'destructive' }
        ];
      case 'failed':
        return [
          { label: 'Retry', icon: 'RefreshCw', action: 'retry' },
          { label: 'Delete', icon: 'Trash2', action: 'delete', variant: 'destructive' }
        ];
      default:
        return [];
    }
  };

  return (
    <div className="space-y-6">
      {/* Queue Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Processing', count: displayJobs?.filter(j => j?.status === 'processing')?.length, color: 'warning' },
          { label: 'Queued', count: displayJobs?.filter(j => j?.status === 'queued')?.length, color: 'secondary' },
          { label: 'Completed', count: displayJobs?.filter(j => j?.status === 'completed')?.length, color: 'success' },
          { label: 'Failed', count: displayJobs?.filter(j => j?.status === 'failed')?.length, color: 'error' }
        ]?.map((stat, index) => (
          <div key={index} className="glass rounded-lg p-4 border border-border/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat?.label}</p>
                <p className={`text-2xl font-heading font-semibold text-${stat?.color}`}>
                  {stat?.count}
                </p>
              </div>
              <div className={`w-10 h-10 bg-${stat?.color}/10 rounded-lg flex items-center justify-center`}>
                <Icon 
                  name={getStatusIcon(stat?.label?.toLowerCase())} 
                  size={20} 
                  className={`text-${stat?.color}`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Jobs List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-heading font-medium text-foreground">
            Processing Queue
          </h3>
          <Button variant="ghost" size="sm" iconName="RefreshCw">
            Refresh
          </Button>
        </div>

        {displayJobs?.length === 0 ? (
          <div className="glass rounded-lg p-8 border border-border/50 text-center">
            <Icon name="Inbox" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h4 className="font-medium text-foreground mb-2">No jobs in queue</h4>
            <p className="text-muted-foreground">Upload a video or add a YouTube URL to get started</p>
          </div>
        ) : (
          <div className="space-y-3">
            {displayJobs?.map((job) => (
              <div key={job?.id} className="glass rounded-lg p-4 border border-border/50">
                <div className="flex items-start space-x-4">
                  {/* Status Icon */}
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getStatusBg(job?.status)}`}>
                    <Icon 
                      name={getStatusIcon(job?.status)} 
                      size={20} 
                      className={`${getStatusColor(job?.status)} ${job?.status === 'processing' ? 'animate-spin' : ''}`}
                    />
                  </div>

                  {/* Job Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-foreground truncate">{job?.title}</h4>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                          <span className="flex items-center">
                            <Icon name={job?.type === 'youtube' ? 'Youtube' : 'FileVideo'} size={14} className="mr-1" />
                            {job?.type === 'youtube' ? 'YouTube' : 'File Upload'}
                          </span>
                          <span>{job?.fileSize}</span>
                          <span>{job?.duration}</span>
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        {getJobActions(job)?.map((action, index) => (
                          <Button
                            key={index}
                            variant={action?.variant || "ghost"}
                            size="sm"
                            onClick={() => handleJobAction(job?.id, action?.action)}
                            iconName={action?.icon}
                            className="text-xs"
                          >
                            {action?.label}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Progress Bar */}
                    {job?.status === 'processing' && (
                      <div className="mb-3">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="text-foreground font-medium">{job?.progress}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-warning h-2 rounded-full transition-all duration-300"
                            style={{ width: `${job?.progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Languages */}
                    <div className="mb-3">
                      <div className="flex items-center space-x-2 text-sm">
                        <span className="text-muted-foreground">From:</span>
                        <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">
                          {job?.sourceLanguage}
                        </span>
                        <Icon name="ArrowRight" size={14} className="text-muted-foreground" />
                        <span className="text-muted-foreground">To:</span>
                        <div className="flex space-x-1">
                          {job?.targetLanguages?.map((lang, index) => (
                            <span key={index} className="bg-secondary/10 text-secondary px-2 py-1 rounded text-xs">
                              {lang}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Status Information */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-4">
                        {job?.status === 'processing' && (
                          <span className="text-muted-foreground">
                            Started: {formatElapsedTime(job?.startTime)}
                          </span>
                        )}
                        {job?.status === 'queued' && job?.queuePosition && (
                          <span className="text-muted-foreground">
                            Position: #{job?.queuePosition} in queue
                          </span>
                        )}
                        {job?.status === 'completed' && (
                          <span className="text-success">
                            Completed: {formatElapsedTime(job?.estimatedCompletion)}
                          </span>
                        )}
                        {job?.status === 'failed' && job?.error && (
                          <span className="text-error">
                            Error: {job?.error}
                          </span>
                        )}
                      </div>
                      
                      {job?.estimatedCompletion && job?.status !== 'completed' && job?.status !== 'failed' && (
                        <span className="text-muted-foreground">
                          ETA: {formatTimeRemaining(job?.estimatedCompletion)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProcessingQueue;