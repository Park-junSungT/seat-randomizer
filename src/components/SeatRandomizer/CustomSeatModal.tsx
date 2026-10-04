'use client'

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';

interface CustomSeatModalProps {
    isOpen: boolean;
    onClose: () => void;
    rows: number;
    cols: number;
    initialSeats?: boolean[];
    onApply: (seats: boolean[]) => void;
}

export function CustomSeatModal({
    isOpen,
    onClose,
    rows,
    cols,
    initialSeats,
    onApply,
}: CustomSeatModalProps) {
    const [seats, setSeats] = useState<boolean[]>([]);

    useEffect(() => {
        if (isOpen) {
            const total = rows * cols;
            if (initialSeats && initialSeats.length === total) {
                setSeats([...initialSeats]);
            } else {
                setSeats(Array(total).fill(true));
            }
        }
    }, [isOpen, rows, cols, initialSeats]);

    const toggleSeat = (index: number) => {
        setSeats(prev => {
        const newSeats = [...prev];
        newSeats[index] = !newSeats[index];
        return newSeats;
        });
    };

    const selectAll = () => {
        setSeats(Array(rows * cols).fill(true));
    };

    const clearAll = () => {
        setSeats(Array(rows * cols).fill(false));
    };

    const handleApply = () => {
        onApply(seats);
    };

    const activeCount = seats.filter(Boolean).length;

    if (!isOpen) return null;

    return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="bg-gradient-to-r from-black to-gray-700 text-white p-6">
          <h2 className="text-2xl font-bold mb-2">커스텀 자리 설정</h2>
          <p className="text-gray-300 text-sm">클릭하여 자리를 활성화/비활성화하세요</p>
        </div>
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="flex gap-4 mb-6">
            <div className="flex-1 bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
              <div className="text-sm text-blue-700 mb-1">활성화된 자리</div>
              <div className="text-3xl font-bold text-blue-900">{activeCount}개</div>
            </div>
            <div className="flex-1 bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
              <div className="text-sm text-gray-700 mb-1">비활성화된 자리</div>
              <div className="text-3xl font-bold text-gray-900">{rows * cols - activeCount}개</div>
            </div>
          </div>

          <div className="flex gap-3 mb-6">
            <Button onClick={selectAll} variant="secondary" className="flex-1 text-sm">
              전체 선택
            </Button>
            <Button onClick={clearAll} variant="secondary" className="flex-1 text-sm">
              전체 해제
            </Button>
          </div>

          <div className="bg-gray-50 rounded-xl p-6">
            <div className="bg-gray-800 text-white text-center py-3 rounded-lg mb-6 font-semibold text-sm">
              교탁
            </div>
            
            <div
              className="grid gap-3"
              style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
            >
              {seats.map((isActive, index) => (
                <button
                  key={index}
                  onClick={() => toggleSeat(index)}
                  className={`
                    aspect-square rounded-lg font-semibold text-sm
                    transition-all duration-200 transform hover:scale-105 active:scale-95
                    flex flex-col items-center justify-center
                    ${isActive
                      ? 'bg-gradient-to-br from-black to-gray-700 text-white border-3 border-black shadow-lg'
                      : 'bg-white border-2 border-gray-300 text-gray-400 hover:border-gray-400'
                    }
                  `}
                >
                  <div className="text-xs opacity-70 mb-1">{index + 1}</div>
                  <div className="text-lg">
                    {isActive ? '✓' : '✕'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-xs text-yellow-800">
              💡 팁: 오세라 존나 빡세네
            </p>
          </div>
        </div>

        <div className="border-t border-gray-200 p-6 bg-gray-50 flex gap-3">
          <Button onClick={onClose} variant="secondary" className="flex-1">
            취소
          </Button>
          <Button 
            onClick={handleApply} 
            className="flex-1 bg-gradient-to-r from-black to-gray-700"
            disabled={activeCount === 0}
          >
            적용하기 ({activeCount}개 활성)
          </Button>
        </div>
      </div>
    </div>
    );
}