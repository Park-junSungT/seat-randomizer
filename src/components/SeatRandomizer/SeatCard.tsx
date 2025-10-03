'use client';

import type { Seat } from '@/types';

interface SeatCardProps {
  seat: Seat;
}

export function SeatCard({ seat }: SeatCardProps) {
  const hasStudent = !!seat.student;
  
  if (!seat.isActive) {
    return (
      <div className="aspect-square rounded-lg flex items-center justify-center bg-gray-200 border-2 border-gray-300">
        <span className="text-gray-400 text-2xl">✕</span>
      </div>
    );
  }
  
  return (
    <div
      className={`
        aspect-square rounded-lg flex flex-col items-center justify-center p-3
        transition-all duration-150
        ${hasStudent 
          ? 'bg-gradient-to-br from-black to-gray-800 text-white border-3 border-black shadow-md' 
          : 'bg-gray-50 border-2 border-dashed border-gray-300 text-gray-400'
        }
      `}
    >
      <div className="text-xs opacity-60 mb-1">
        {seat.position + 1}번
      </div>
      <div className="text-sm font-bold text-center break-words">
        {seat.student?.name || '빈 자리'}
      </div>
    </div>
  );
}