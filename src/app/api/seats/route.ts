import { NextRequest, NextResponse } from 'next/server';
import type { CreateArrangementRequest, CreateArrangementResponse } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body: CreateArrangementRequest = await request.json();

    if (!body.students || body.students.length === 0) {
      return NextResponse.json({
        success: false,
        error: '학생 데이터가 없습니다',
      } as CreateArrangementResponse);
    }

    return NextResponse.json({
      success: true,
      data: {
        id: `${Date.now()}`,
        seats: [],
        config: { rows: body.rows, cols: body.cols },
        createdAt: new Date().toISOString(),
      },
    } as CreateArrangementResponse);
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: '서버 오류가 발생했습니다',
    } as CreateArrangementResponse, { status: 500 });
  }
}