import { Database } from "@/supabase";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

// 서버 측에서 Supabase 클라이언트 생성
// 서버 측에서는 NEXT_PUBLIC_ 접두사 없이 환경 변수를 사용할 수 있습니다
// 환경 변수 이름이 다르다면 적절히 수정해주세요
const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_KEY!
);

export async function GET() {
  try {
    // Supabase에서 지원자 데이터 가져오기
    const { data, error } = await supabase.from('applications').select();

    if (error) {
      console.error('Supabase 오류:', error);
      return NextResponse.json(
        { error: '데이터를 가져오는 중 오류가 발생했습니다' },
        { status: 500 }
      );
    }

    // 성공적으로 데이터를 가져왔을 때 응답
    return NextResponse.json(data);
  } catch (error) {
    console.error('서버 오류:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다' },
      { status: 500 }
    );
  }
}