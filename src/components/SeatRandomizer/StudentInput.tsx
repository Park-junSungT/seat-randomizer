'use client';

import { Card } from '@/components/ui/Card';

interface StudentInputProps {
  value: string;
  onChange: (value: string) => void;
  studentCount: number;
  disabled?: boolean;
}

export function StudentInput({ value, onChange, studentCount, disabled }: StudentInputProps) {
  return (
    <Card>
      <div className="flex items-center mb-4">
        <div className="w-1.5 h-5 bg-black rounded mr-3" />
        <h3 className="text-lg font-bold">학생 명단</h3>
      </div>
      
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={'학생 이름을 입력하세요'}
        disabled={disabled}
        className="w-full h-80 p-4 border-2 border-gray-200 rounded-xl resize-none
                   focus:border-black focus:outline-none transition-colors
                   disabled:bg-gray-50 disabled:text-gray-500"
      />
      
      <div className="mt-4 p-3 bg-gray-50 rounded-lg flex justify-between items-center">
        <span className="text-sm text-gray-600">입력된 학생</span>
        <span className="text-xl font-bold">{studentCount}명</span>
      </div>
    </Card>
  );
}