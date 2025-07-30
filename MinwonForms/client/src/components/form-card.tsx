import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface FormCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  onClick: () => void;
}

export function FormCard({ title, description, icon: Icon, color, onClick }: FormCardProps) {
  return (
    <Card 
      className="form-card bg-white rounded-2xl shadow-lg p-6 text-left border-2 border-gray-100 hover:border-blue-500 focus:border-blue-500 cursor-pointer transition-all duration-300"
      onClick={onClick}
      style={{ minHeight: '280px', height: '280px', width: '100%', maxWidth: '360px' }}
    >
      <div className="flex flex-col items-center text-center h-full justify-center">
        <div className={`w-20 h-20 ${color} rounded-2xl flex items-center justify-center mb-4 flex-shrink-0`}>
          <Icon className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-2">{title}</h3>
        <p className="text-lg text-gray-600 leading-relaxed whitespace-pre-line flex-1 flex items-center justify-center">
          {description}
        </p>
      </div>
    </Card>
  );
}
