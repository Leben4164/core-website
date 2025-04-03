"use client"
import { Database } from "@/supabase"
import { createClient } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"


export default function Admin() {
  const [applicants, setApplicants] = useState<Database['public']['Tables']['applications']['Row'][]>([])
  const supabase = createClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_KEY!)
  let router = useRouter() //페이지 이동

  async function getApplicants() {
    const { data } = await supabase.from('applications').select()
    setApplicants(data!)
  }

  useEffect(() => {
    getApplicants()
  }, [])

  function onIdClick(applicant: { created_at?: string; id: any; motiv?: string | null; student_id?: string | null; student_name?: string | null; want_to_do?: string | null }) {
    router.push(`/admin/${applicant.id}`)
  }

  useEffect(() => {
    // 스타일을 head에 추가
    const styleElement = document.createElement('style');
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);

    // 컴포넌트가 언마운트될 때 스타일 요소 제거
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []); // 빈 배열을 전달하여 마운트 시에만 실행

  return (
    <div className="admin-container">
      <h1 className="admin-heading">관리자 페이지</h1>
      <h3 className="admin-subHeading">지원자 목록</h3>
      <table className="admin-table">
        <thead>
          <tr>
            <th className="admin-th">학번</th>
            <th className="admin-th">이름</th>
          </tr>
        </thead>
        {applicants.length > 0 ? (
          <tbody>
            {applicants.map((applicant) => (
              <tr
                key={applicant.id}
                onClick={() => onIdClick(applicant)}
                className="admin-row"
              >
                <td className="admin-td">{applicant.student_id}</td>
                <td className="admin-td">{applicant.student_name}</td>
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td className="admin-td" colSpan={2} style={{ textAlign: 'center' }}>로딩중...</td>
            </tr>
          </tbody>
        )}
      </table>
    </div>

  )
}

const styles = `
  .admin-container {
        min-height: 100vh;
        background-color: 'rgb(118, 121, 120)';
        display: flex;
        flex-direction: column;
        align-items: center;
        color: white;
        padding: 24px;
      }
      .admin-heading {
        color: #7FFFD4;
        font-size: 2rem;
        font-weight: bold;
        margin-bottom: 16px;
      }
      .admin-subHeading {
        font-size: 1.5rem;
        font-weight: 600;
        margin-bottom: 8px;
      }
      .admin-table {
        width: 50%;
        text-align: center;
        background-color: rgb(0, 0, 0);
        color: #7fffd4;
        border-collapse: collapse;
        border-radius: 8px;
        overflow: hidden;
      }
      .admin-th {
        background-color: rgb(0, 0, 0);
        color: #5fc1b9;
        padding: 12px;
        border: 1px solid black;
      }
      .admin-td {
        padding: 8px;
        border: 1px solid black;
      }
      .admin-row {
        cursor: pointer;
        transition: background-color 0.3s;
      }
      .admin-row:hover {
        background-color: #4fa59e;
        color: white
      }
`