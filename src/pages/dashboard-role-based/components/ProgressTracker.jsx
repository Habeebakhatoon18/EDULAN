import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressTracker = ({ userRole = 'educator' }) => {
  const educatorProgress = {
    title: 'Monthly Goals',
    items: [
      {
        label: 'Content Translated',
        current: 24,
        target: 30,
        unit: 'documents',
        color: 'primary',
        icon: 'FileText'
      },
      {
        label: 'Student Reach',
        current: 156,
        target: 200,
        unit: 'students',
        color: 'secondary',
        icon: 'Users'
      },
      {
        label: 'Languages Covered',
        current: 8,
        target: 10,
        unit: 'languages',
        color: 'accent',
        icon: 'Languages'
      }
    ]
  };

  const studentProgress = {
    title: 'Learning Progress',
    items: [
      {
        label: 'Lessons Completed',
        current: 12,
        target: 20,
        unit: 'lessons',
        color: 'success',
        icon: 'BookOpen'
      },
      {
        label: 'Practice Hours',
        current: 45,
        target: 60,
        unit: 'hours',
        color: 'primary',
        icon: 'Clock'
      },
      {
        label: 'Vocabulary Learned',
        current: 234,
        target: 300,
        unit: 'words',
        color: 'accent',
        icon: 'Brain'
      }
    ]
  };

  const progress = userRole === 'educator' ? educatorProgress : studentProgress;

  const getProgressPercentage = (current, target) => {
    return Math.min((current / target) * 100, 100);
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 90) return 'bg-success';
    if (percentage >= 70) return 'bg-primary';
    if (percentage >= 50) return 'bg-warning';
    return 'bg-error';
  };

  return (
    <div className="mb-8">
      <div className="glass rounded-lg border border-border/50 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-heading font-semibold text-foreground">{progress?.title}</h3>
          <Icon name="Target" size={20} className="text-primary" />
        </div>

        <div className="space-y-6">
          {progress?.items?.map((item, index) => {
            const percentage = getProgressPercentage(item?.current, item?.target);
            
            return (
              <div key={index} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-lg bg-${item?.color}/10 flex items-center justify-center`}>
                      <Icon name={item?.icon} size={16} color={`var(--color-${item?.color})`} />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground text-sm">{item?.label}</h4>
                      <p className="text-xs text-muted-foreground">
                        {item?.current} of {item?.target} {item?.unit}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-semibold text-${item?.color}`}>
                      {Math.round(percentage)}%
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {item?.target - item?.current} remaining
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(percentage)}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  {percentage >= 100 && (
                    <div className="absolute -top-1 right-0">
                      <Icon name="CheckCircle" size={16} className="text-success" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="Trophy" size={16} className="text-primary" />
            <span className="text-sm font-medium text-foreground">
              {userRole === 'educator' ?'Great progress! You\'re helping more students learn every day.' :'Excellent work! Keep up the momentum in your learning journey.'
              }
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;