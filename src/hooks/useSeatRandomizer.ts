'use client';

import { useState, useCallback } from 'react';
import type { Seat, Student, ClassroomConfig, SeatArrangement } from '@/types';
import { shuffleArray, generateId, parseStudentInput } from '@/lib/utils';
import { api } from '@/lib/api';

export function useSeatRandomizer() {
  const [students, setStudents] = useState('');
  const [config, setConfig] = useState<ClassroomConfig>({ rows: 5, cols: 6 });
  const [seats, setSeats] = useState<Seat[]>([]);
  const [isShuffling, setIsShuffling] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);

  const studentList = parseStudentInput(students);
  const totalSeats = config.rows * config.cols;

  const activeSeatsCount = config.customSeats 
    ? config.customSeats.filter(Boolean).length 
    : totalSeats;

  const shuffle = useCallback(async () => {
    if (studentList.length === 0) {
      alert('학생 이름을 입력해주세요');
      return;
    }
    if (studentList.length > activeSeatsCount) {
      alert(`활성화된 자리가 ${activeSeatsCount}개인데 학생이 ${studentList.length}명이에요`);
      return;
    }

    setIsShuffling(true);
    setIsDone(false);

    let count = 0;
    const interval = setInterval(() => {
      const shuffled = shuffleArray(studentList);
      const tempSeats: Seat[] = Array(totalSeats)
        .fill(null)
        .map((_, idx) => {
          const isActive = config.customSeats ? config.customSeats[idx] : true;
          return {
            position: idx,
            student: null,
            isActive,
          };
        });

      let studentIdx = 0;
      for (let i = 0; i < tempSeats.length; i++) {
        if (tempSeats[i].isActive && studentIdx < shuffled.length) {
          tempSeats[i].student = { id: generateId(), name: shuffled[studentIdx] };
          studentIdx++;
        }
      }
      
      setSeats(tempSeats);
      count++;

      if (count > 18) {
        clearInterval(interval);
        setIsShuffling(false);
        setIsDone(true);

        const arrangement: SeatArrangement = {
          id: generateId(),
          seats: tempSeats,
          config,
          createdAt: new Date().toISOString(),
        };
        api.saveHistory(arrangement);
      }
    }, 75);
  }, [studentList, activeSeatsCount, totalSeats, config]);

  const reset = useCallback(() => {
    setSeats([]);
    setIsDone(false);
  }, []);

  const exportResult = useCallback(() => {
    let text = '자리 배치 결과\n\n';
    for (let i = 0; i < config.rows; i++) {
      for (let j = 0; j < config.cols; j++) {
        const seat = seats[i * config.cols + j];
        if (!seat.isActive) {
          text += '[-----] ';
        } else {
          const name = seat.student?.name || '빈자리';
          text += `[${name}] `;
        }
      }
      text += '\n';
    }
    
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `자리배치_${new Date().toLocaleDateString()}.txt`;
    a.click();
  }, [seats, config]);

  const openCustomModal = useCallback(() => {
    setIsCustomModalOpen(true);
  }, []);

  const closeCustomModal = useCallback(() => {
    setIsCustomModalOpen(false);
  }, []);

  const applyCustomSeats = useCallback((customSeats: boolean[]) => {
    setConfig(prev => ({ ...prev, customSeats }));
    setIsCustomModalOpen(false);
    setSeats([]);
    setIsDone(false);
  }, []);

  const resetCustomSeats = useCallback(() => {
    setConfig(prev => ({ ...prev, customSeats: undefined }));
    setSeats([]);
    setIsDone(false);
  }, []);

  return {
    students,
    setStudents,
    config,
    setConfig,
    seats,
    isShuffling,
    isDone,
    studentList,
    totalSeats,
    activeSeatsCount,
    shuffle,
    reset,
    exportResult,
    isCustomModalOpen,
    openCustomModal,
    closeCustomModal,
    applyCustomSeats,
    resetCustomSeats,
  };
}
