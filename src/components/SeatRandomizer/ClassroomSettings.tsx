'use client';

import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import type { ClassroomConfig } from '@/types';

interface ClassroomSettingsProps {
  config: ClassroomConfig;
  onChange: (config: ClassroomConfig) => void;
  disabled?: boolean;
  onOpenCustomModal: () => void;
  onResetCustom: () => void;
  activeSeatsCount: number;
  totalSeats: number;
}

export function ClassroomSettings({ 
  config, 
  onChange, 
  disabled,
  onOpenCustomModal,
  onResetCustom,
  activeSeatsCount,
  totalSeats
}: ClassroomSettingsProps) {
  const isCustomMode = !!config.customSeats;
  
  return (
    <Card>
      <div className="flex items-center mb-4">
        <div className="w-1.5 h-5 bg-black rounded mr-3" />
        <h3 className="text-lg font-bold">교실 크기</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            세로 (줄)
          </label>
          <input
            type="number"
            value={config.rows}
            onChange={(e) => onChange({ ...config, rows: Math.max(1, parseInt(e.target.value) || 1) })}
            min="1"
            max="10"
            disabled={disabled || isCustomMode}
            className="w-full p-3 border-2 border-gray-200 rounded-lg text-center font-semibold
                       focus:border-black focus:outline-none transition-colors
                       disabled:bg-gray-100 disabled:text-gray-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            가로 (칸)
          </label>
          <input
            type="number"
            value={config.cols}
            onChange={(e) => onChange({ ...config, cols: Math.max(1, parseInt(e.target.value) || 1) })}
            min="1"
            max="10"
            disabled={disabled || isCustomMode}
            className="w-full p-3 border-2 border-gray-200 rounded-lg text-center font-semibold
                       focus:border-black focus:outline-none transition-colors
                       disabled:bg-gray-100 disabled:text-gray-500"
          />
        </div>
      </div>
      
      {isCustomMode ? (
        <>
          <div className="p-3 bg-blue-50 border-2 border-blue-300 rounded-lg mb-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-blue-800 font-semibold">커스텀 모드</span>
              <span className="text-blue-900 font-bold">{activeSeatsCount}/{totalSeats}개 활성</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button 
              onClick={onOpenCustomModal} 
              variant="secondary"
              disabled={disabled}
              className="text-sm py-2"
            >
              수정하기
            </Button>
            <Button 
              onClick={onResetCustom} 
              variant="secondary"
              disabled={disabled}
              className="text-sm py-2"
            >
              초기화
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="p-3 bg-gray-50 rounded-lg flex justify-between items-center mb-3">
            <span className="text-sm text-gray-600">전체 좌석</span>
            <span className="text-xl font-bold">{totalSeats}개</span>
          </div>
          <Button 
            onClick={onOpenCustomModal} 
            variant="secondary"
            disabled={disabled}
            className="w-full text-sm py-2"
          >
            커스텀 자리 설정
          </Button>
        </>
      )}
    </Card>
  );
}