import { useState, useEffect } from "react";
import { FormCard } from "@/components/form-card";
import { InstructionModal } from "@/components/instruction-modal";
import { useIdleTimer } from "@/hooks/use-idle-timer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Shield, 
  Baby, 
  FileText, 
  Heart, 
  Plus, 
  Edit, 
  Award,
  Clock,
  Info 
} from "lucide-react";
import birthGuideImage from "@assets/출생신고서_1753853823291.jpg";
import deathGuideImage from "@assets/사망신고서_1753854404354.jpg";
import marriageGuideImage from "@assets/혼인신고서_1753854404355.jpg";
import divorceGuideImage from "@assets/이혼신고서_1753854404355.jpg";
import nameChangeGuideImage from "@assets/개명신청서_1753854404354.jpg";
import certificateGuideImage from "@assets/증명신청서_1753854404355.jpg";

interface FormType {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  imageSrc: string;
}

const formTypes: FormType[] = [
  {
    id: 'birth',
    title: '출생신고서',
    description: '',
    icon: Baby,
    color: 'gov-blue',
    imageSrc: birthGuideImage
  },
  {
    id: 'death',
    title: '사망신고서',
    description: '',
    icon: FileText,
    color: 'gov-gray',
    imageSrc: deathGuideImage
  },
  {
    id: 'marriage',
    title: '혼인신고서',
    description: '',
    icon: Heart,
    color: 'gov-red',
    imageSrc: marriageGuideImage
  },
  {
    id: 'divorce',
    title: '이혼신고서',
    description: '',
    icon: Plus,
    color: 'gov-orange',
    imageSrc: divorceGuideImage
  },
  {
    id: 'namechange',
    title: '개명신고서',
    description: '',
    icon: Edit,
    color: 'gov-purple',
    imageSrc: nameChangeGuideImage
  },
  {
    id: 'certificate',
    title: '증명신청서',
    description: '',
    icon: Award,
    color: 'gov-green',
    imageSrc: certificateGuideImage
  }
];

export default function Home() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedForm, setSelectedForm] = useState<FormType | null>(null);
  const [showIdleNotification, setShowIdleNotification] = useState(false);

  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Idle timer for auto-return to main screen
  useIdleTimer({
    timeout: 120000, // 2 minutes
    onIdle: () => {
      if (selectedForm) {
        setShowIdleNotification(true);
        setTimeout(() => {
          setSelectedForm(null);
          setShowIdleNotification(false);
        }, 5000);
      }
    }
  });

  const handleFormSelect = (form: FormType) => {
    setSelectedForm(form);
    setShowIdleNotification(false);
  };

  const handleCloseModal = () => {
    setSelectedForm(null);
    setShowIdleNotification(false);
  };



  // Prevent context menu and text selection for kiosk mode
  useEffect(() => {
    const preventContextMenu = (e: Event) => e.preventDefault();
    const preventSelection = (e: Event) => e.preventDefault();

    document.addEventListener('contextmenu', preventContextMenu);
    document.addEventListener('selectstart', preventSelection);

    return () => {
      document.removeEventListener('contextmenu', preventContextMenu);
      document.removeEventListener('selectstart', preventSelection);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 whiteboard-container">
      {/* Header */}
      <header className="gov-blue text-white shadow-lg rounded-lg mb-4">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold tracking-tight">가족관계 민원서식 작성 안내</h1>
                <p className="text-sm md:text-base lg:text-lg xl:text-xl text-blue-100 mt-1">Family Registration Document Guide System</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold tabular-nums">
                {currentTime.toLocaleTimeString('ko-KR', {
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit'
                })}
              </div>
              <div className="text-sm md:text-base lg:text-lg xl:text-xl text-blue-100">오늘</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-2 py-2 overflow-y-auto">
        {/* Instructions */}
        <Card className="bg-white rounded-lg shadow-lg p-3 mb-4 border-l-4 border-blue-600">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 gov-blue rounded-full flex items-center justify-center flex-shrink-0">
              <Info className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 mb-2">서식 선택 안내</h2>
              <p className="text-sm md:text-base lg:text-lg xl:text-xl text-gray-600 leading-relaxed">
                원하시는 민원서식을 선택하시면 작성 안내서가 표시됩니다. 
                화면을 터치하여 선택해 주세요.
              </p>
            </div>
          </div>
        </Card>

        {/* Form Selection Grid - Responsive layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 lg:gap-6">
          {formTypes.map((form) => (
            <FormCard
              key={form.id}
              title={form.title}
              description={form.description}
              icon={form.icon}
              color={form.color}
              onClick={() => handleFormSelect(form)}
            />
          ))}
        </div>


      </main>

      {/* Instruction Modal */}
      {selectedForm && (
        <InstructionModal
          isOpen={!!selectedForm}
          onClose={handleCloseModal}
          title={`${selectedForm.title} 작성 안내`}
          imageSrc={selectedForm.imageSrc}
        />
      )}

      {/* Auto-return notification */}
      {showIdleNotification && (
        <div className="fixed bottom-8 right-8 bg-yellow-500 text-white p-4 rounded-xl shadow-lg z-50">
          <div className="flex items-center space-x-3">
            <Clock className="w-6 h-6" />
            <span className="font-semibold">잠시 후 메인화면으로 돌아갑니다</span>
          </div>
        </div>
      )}
    </div>
  );
}
