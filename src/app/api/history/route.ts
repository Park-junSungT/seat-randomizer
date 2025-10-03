import { NextRequest, NextResponse } from 'next/server';
import type { SeatArrangement } from '@/types';

// GET: 히스토리 조회
export async function GET() {
  try {
    // 데이터베이스에서 히스토리 조회 (구현 필요)
    // const history = await db.arrangements.findMany();
    
    return NextResponse.json({
      success: true,
      history: [], // 실제 데이터
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
    
    // 데이터베이스에 저장 (구현 필요)
    // await db.arrangements.create({ data: arrangement });
    
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