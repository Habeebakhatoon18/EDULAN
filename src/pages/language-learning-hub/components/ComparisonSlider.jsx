import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ComparisonSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [currentExample, setCurrentExample] = useState(0);
  const sliderRef = useRef(null);

  const examples = [
    {
      title: 'Physics Textbook',
      subject: 'Science Education',
      before: {
        title: 'Original English Text',
        content: `Newton's First Law of Motion states that an object at rest stays at rest and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an unbalanced force. This law is also known as the law of inertia.

The concept of inertia explains why passengers in a car lurch forward when the car suddenly stops. Their bodies want to continue moving at the same speed the car was traveling.

Understanding this fundamental principle helps students grasp more complex physics concepts like momentum and energy conservation.`,
        image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500&h=300&fit=crop'
      },
      after: {
        title: 'Hindi Translation',content: `न्यूटन का गति का प्रथम नियम कहता है कि विराम में स्थित वस्तु विराम में ही रहती है और गति में स्थित वस्तु समान गति और समान दिशा में गति करती रहती है जब तक कि उस पर कोई असंतुलित बल न लगाया जाए। इस नियम को जड़त्व का नियम भी कहते हैं।जड़त्व की अवधारणा समझाती है कि कार के अचानक रुकने पर यात्री आगे की ओर क्यों झुक जाते हैं। उनका शरीर उसी गति से चलते रहना चाहता है जिस गति से कार चल रही थी।इस मौलिक सिद्धांत को समझना छात्रों को संवेग और ऊर्जा संरक्षण जैसी अधिक जटिल भौतिकी अवधारणाओं को समझने में मदद करता है।`,image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500&h=300&fit=crop'
      }
    },
    {
      title: 'Mathematics Problem',subject: 'Math Education',
      before: {
        title: 'Original English Text',
        content: `Solve for x in the equation: 2x + 5 = 15

Step 1: Subtract 5 from both sides
2x + 5 - 5 = 15 - 5
2x = 10

Step 2: Divide both sides by 2
2x ÷ 2 = 10 ÷ 2
x = 5

Verification: Substitute x = 5 back into the original equation
2(5) + 5 = 10 + 5 = 15 ✓`,
        image: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=500&h=300&fit=crop'
      },
      after: {
        title: 'Spanish Translation',
        content: `Resuelve para x en la ecuación: 2x + 5 = 15

Paso 1: Resta 5 de ambos lados
2x + 5 - 5 = 15 - 5
2x = 10

Paso 2: Divide ambos lados por 2
2x ÷ 2 = 10 ÷ 2
x = 5

Verificación: Sustituye x = 5 en la ecuación original
2(5) + 5 = 10 + 5 = 15 ✓`,
        image: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=500&h=300&fit=crop'
      }
    },
    {
      title: 'History Lesson',subject: 'Social Studies',
      before: {
        title: 'Original English Text',
        content: `The Renaissance was a period of cultural, artistic, political and economic "rebirth" following the Middle Ages. Generally described as taking place from the 14th century to the 17th century, the Renaissance promoted the rediscovery of classical philosophy, literature and art.

Key figures of the Renaissance include Leonardo da Vinci, Michelangelo, and William Shakespeare. These individuals made lasting contributions to art, science, and literature that continue to influence our world today.

The invention of the printing press by Johannes Gutenberg around 1440 revolutionized the spread of knowledge and ideas throughout Europe.`,
        image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500&h=300&fit=crop'
      },
      after: {
        title: 'French Translation',content: `La Renaissance était une période de "renaissance" culturelle, artistique, politique et économique suivant le Moyen Âge. Généralement décrite comme ayant lieu du 14ème au 17ème siècle, la Renaissance a promu la redécouverte de la philosophie, de la littérature et de l'art classiques. Les figures clés de la Renaissance incluent Léonard de Vinci, Michel-Ange et William Shakespeare. Ces individus ont apporté des contributions durables à l'art, à la science et à la littérature qui continuent d'influencer notre monde aujourd'hui.L'invention de l'imprimerie par Johannes Gutenberg vers 1440 a révolutionné la diffusion des connaissances et des idées à travers l'Europe.`,
        image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500&h=300&fit=crop'
      }
    }
  ];

  const handleMouseDown = (e) => {
    setIsDragging(true);
    updateSliderPosition(e);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    updateSliderPosition(e);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const updateSliderPosition = (e) => {
    if (!sliderRef?.current) return;
    
    const rect = sliderRef?.current?.getBoundingClientRect();
    const x = e?.clientX - rect?.left;
    const percentage = Math.max(0, Math.min(100, (x / rect?.width) * 100));
    setSliderPosition(percentage);
  };

  const currentData = examples?.[currentExample];

  React.useEffect(() => {
    const handleGlobalMouseMove = (e) => handleMouseMove(e);
    const handleGlobalMouseUp = () => handleMouseUp();

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-heading font-semibold text-foreground mb-2">
          Before & After Comparison
        </h3>
        <p className="text-muted-foreground">
          Drag the slider to see the transformation from original to translated content
        </p>
      </div>
      {/* Example Selector */}
      <div className="flex items-center justify-center space-x-4 mb-8">
        {examples?.map((example, index) => (
          <Button
            key={index}
            variant={currentExample === index ? "default" : "outline"}
            size="sm"
            onClick={() => setCurrentExample(index)}
            className="text-xs"
          >
            {example?.title}
          </Button>
        ))}
      </div>
      {/* Comparison Container */}
      <div className="relative glass rounded-2xl overflow-hidden border border-border/50">
        {/* Header */}
        <div className="bg-muted/20 px-6 py-4 border-b border-border/50">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-heading font-semibold text-foreground">{currentData?.title}</h4>
              <p className="text-sm text-muted-foreground">{currentData?.subject}</p>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="MousePointer" size={16} />
              <span>Drag to compare</span>
            </div>
          </div>
        </div>

        {/* Slider Container */}
        <div
          ref={sliderRef}
          className="relative h-96 cursor-col-resize select-none"
          onMouseDown={handleMouseDown}
        >
          {/* Before Content */}
          <div className="absolute inset-0 flex">
            <div className="w-1/2 p-6 bg-gradient-to-r from-red-50/50 to-transparent">
              <div className="h-full overflow-y-auto">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-3 h-3 bg-error rounded-full"></div>
                  <span className="text-sm font-medium text-error">{currentData?.before?.title}</span>
                </div>
                <div className="prose prose-sm max-w-none">
                  <p className="text-foreground leading-relaxed whitespace-pre-line">
                    {currentData?.before?.content}
                  </p>
                </div>
              </div>
            </div>
            <div className="w-1/2 p-6 bg-gradient-to-l from-success-50/50 to-transparent">
              <div className="h-full overflow-y-auto">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-3 h-3 bg-success rounded-full"></div>
                  <span className="text-sm font-medium text-success">{currentData?.after?.title}</span>
                </div>
                <div className="prose prose-sm max-w-none">
                  <p className="text-foreground leading-relaxed whitespace-pre-line">
                    {currentData?.after?.content}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sliding Overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-l from-success-50/50 to-transparent transition-all duration-100"
            style={{
              clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`
            }}
          >
            <div className="w-full h-full p-6">
              <div className="h-full overflow-y-auto">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-3 h-3 bg-success rounded-full"></div>
                  <span className="text-sm font-medium text-success">{currentData?.after?.title}</span>
                </div>
                <div className="prose prose-sm max-w-none">
                  <p className="text-foreground leading-relaxed whitespace-pre-line">
                    {currentData?.after?.content}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Slider Handle */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-primary shadow-lg cursor-col-resize z-10"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-primary rounded-full shadow-lg flex items-center justify-center">
              <Icon name="GripVertical" size={16} color="white" />
            </div>
          </div>

          {/* Position Indicator */}
          <div className="absolute top-4 right-4 glass rounded-lg px-3 py-1 text-xs text-muted-foreground">
            {Math.round(sliderPosition)}% translated
          </div>
        </div>

        {/* Footer Stats */}
        <div className="bg-muted/20 px-6 py-4 border-t border-border/50">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-heading font-semibold text-primary">99.2%</div>
              <div className="text-xs text-muted-foreground">Accuracy Score</div>
            </div>
            <div>
              <div className="text-lg font-heading font-semibold text-secondary">1.2s</div>
              <div className="text-xs text-muted-foreground">Translation Time</div>
            </div>
            <div>
              <div className="text-lg font-heading font-semibold text-accent">A+</div>
              <div className="text-xs text-muted-foreground">Quality Grade</div>
            </div>
          </div>
        </div>
      </div>
      {/* Instructions */}
      <div className="text-center mt-6">
        <p className="text-sm text-muted-foreground">
          Drag the slider left and right to compare original and translated content quality
        </p>
      </div>
    </div>
  );
};

export default ComparisonSlider;