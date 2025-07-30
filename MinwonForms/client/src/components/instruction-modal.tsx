import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

interface InstructionModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  imageSrc: string;
  autoCloseTime?: number;
}

export function InstructionModal({ 
  isOpen, 
  onClose, 
  title, 
  imageSrc, 
  autoCloseTime = 60 
}: InstructionModalProps) {
  const [countdown, setCountdown] = useState(autoCloseTime);

  useEffect(() => {
    if (!isOpen) {
      setCountdown(autoCloseTime);
      return;
    }

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          onClose();
          return autoCloseTime;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, onClose, autoCloseTime]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] w-full max-h-[95vh] p-0 bg-white rounded-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="gov-blue text-white p-6 flex justify-between items-center">
          <h2 className="text-3xl font-bold">{title}</h2>
          <div className="flex items-center space-x-4">
            <div className="text-xl font-semibold bg-blue-600 px-4 py-2 rounded-lg">
              자동 닫기: <span className="tabular-nums">{countdown}</span>초
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:text-gray-200 hover:bg-blue-600 p-2"
            >
              <X className="w-8 h-8" />
            </Button>
          </div>
        </div>
        
        {/* Modal Content */}
        <div className="p-4 lg:p-6 xl:p-8 text-center overflow-auto max-h-[80vh]">
          <div className="mb-4 lg:mb-6">
            <p className="text-lg lg:text-xl xl:text-2xl text-gray-600">
              아래 작성 예시를 참고하여 신고서를 작성해 주세요.
            </p>
          </div>
          
          {/* Instruction Image Container */}
          <div className="flex justify-center mb-6 lg:mb-8">
            <img 
              src={imageSrc}
              alt={title}
              className="instruction-image rounded-xl shadow-lg border-2 border-gray-200 w-full max-w-none"
              style={{ maxHeight: '70vh', objectFit: 'contain' }}
            />
          </div>
          
          <div className="mt-8 p-6 bg-blue-50 rounded-xl border-2 border-blue-200">
            <p className="text-xl lg:text-2xl xl:text-3xl font-bold text-blue-800 text-center">
              작성 후 7번 창구에 신고하세요
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
