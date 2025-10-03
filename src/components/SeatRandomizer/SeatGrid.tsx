'use client';

import { Card } from '@/components/ui/Card';
import { SeatCard } from './SeatCard';
import type { Seat, ClassroomConfig } from '@/types';

interface SeatGridProps {
  seats: Seat[];
  config: ClassroomConfig;
  isDone: boolean;
}

export function SeatGrid({ seats, config, isDone }: SeatGridProps) {
  return (
    <Card className="min-h-[600px]">
      <div className="bg-gradient-to-r from-gray-900 to-gray-700 text-white p-4 rounded-lg text-center mb-8 font-bold shadow-md">
        교탁 (앞쪽)
      </div>
      
      {seats.length === 0 ? (
        <div className="min-h-[500px] border-3 border-dashed border-gray-300 rounded-xl flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">🪑</div>
            <p className="text-gray-400 font-medium">자리 배치 결과가 여기에 표시됩니다</p>
          </div>
        </div>
      ) : (
        <>
          <div
            className="grid gap-4"
            style={{ gridTemplateColumns: `repeat(${config.cols}, 1fr)` }}
          >
            {seats.map((seat) => (
              <SeatCard key={seat.position} seat={seat} />
            ))}
          </div>
          
          {isDone && (
            <div className="mt-6 p-4 bg-blue-50 border-2 border-blue-300 rounded-lg text-center">
              <p className="text-blue-800 font-semibold">✓ 자리 배치가 완료되었습니다</p>
            </div>
          )}
        </>
      )}
    </Card>
  );
}