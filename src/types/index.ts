export interface Student {
  id: string;
  name: string;
}

export interface Seat {
  position: number;
  student: Student | null;
  isActive: boolean; // 이 줄이 있어야 합니다!
}

export interface ClassroomConfig {
  rows: number;
  cols: number;
  customSeats?: boolean[];
}

export interface SeatArrangement {
  id: string;
  seats: Seat[];
  config: ClassroomConfig;
  createdAt: string;
}

export interface CreateArrangementRequest {
  students: string[];
  rows: number;
  cols: number;
  customSeats?: boolean[];
}

export interface CreateArrangementResponse {
  success: boolean;
  data?: SeatArrangement;
  error?: string;
}