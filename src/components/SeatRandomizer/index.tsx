'use client';

import { StudentInput } from './StudentInput';
import { ClassroomSettings } from './ClassroomSettings';
import { SeatGrid } from './SeatGrid';
import { CustomSeatModal } from './CustomSeatModal';
import { Button } from '@/components/ui/Button';
import { useSeatRandomizer } from '@/hooks/useSeatRandomizer';

export default function SeatRandomizer() {
  const {
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
  } = useSeatRandomizer();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 pb-8 border-b-2 border-gray-200">
          <div className="inline-block bg-gradient-to-r from-black to-gray-700 px-8 py-3 rounded-full mb-4 shadow-lg">
            <h1 className="text-3xl font-bold text-white">교실 자리 배치</h1>
          </div>
          <p className="text-gray-600 font-medium">학생 이름을 입력하고 자리를 배치해보세요</p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-8">
          {/* Left Panel */}
          <div className="space-y-6">
            <StudentInput
              value={students}
              onChange={setStudents}
              studentCount={studentList.length}
              disabled={isShuffling}
            />
            
            <ClassroomSettings
              config={config}
              onChange={setConfig}
              disabled={isShuffling}
              onOpenCustomModal={openCustomModal}
              onResetCustom={resetCustomSeats}
              activeSeatsCount={activeSeatsCount}
              totalSeats={totalSeats}
            />
            
            <Button
              onClick={shuffle}
              disabled={isShuffling}
              className="w-full py-4 text-lg shadow-lg"
            >
              {isShuffling ? '배치 중...' : '자리 배치 시작'}
            </Button>
            
            {seats.length > 0 && (
              <div className="flex gap-3">
                <Button onClick={reset} variant="secondary" className="flex-1">
                  다시 하기
                </Button>
                <Button onClick={exportResult} variant="secondary" className="flex-1">
                  저장하기
                </Button>
              </div>
            )}
          </div>

          {/* Right Panel */}
          <SeatGrid seats={seats} config={config} isDone={isDone} />
        </div>
      </div>

      {/* Custom Seat Modal */}
      <CustomSeatModal
        isOpen={isCustomModalOpen}
        onClose={closeCustomModal}
        rows={config.rows}
        cols={config.cols}
        initialSeats={config.customSeats}
        onApply={applyCustomSeats}
      />
    </div>
  );
}