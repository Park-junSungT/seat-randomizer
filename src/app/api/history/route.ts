import { NextRequest, NextResponse } from 'next/server';
import type { SeatArrangement } from '@/types';

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      history: [],
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: '히스토리 조회 실패',
    }, { status: 500 });
  }
}

// POST: 히스토리 저장
export async function POST(request: NextRequest) {
  try {
    const arrangement: SeatArrangement = await request.json();
    
    return NextResponse.json({
      success: true,
      message: '저장되었습니다',
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: '저장 실패',
    }, { status: 500 });
  }
}