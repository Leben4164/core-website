'use client';
import { Database } from '@/supabase';
import { createClient } from '@supabase/supabase-js';
import { use, useEffect, useState } from 'react';


export default function ApplicantList({ params }: { params: Promise<{ id: string }> }) {

    const [applicants, setApplicants] = useState<Database['public']['Tables']['applications']['Row'][]>([])
    const supabase = createClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_KEY!)
    const { id } = use(params)

    async function getApplicants() {
        const { data } = await supabase.from('applications').select().eq('id', parseInt(id))
        setApplicants(data!)
        console.log(applicants)
    }


    useEffect(() => {
        getApplicants()
    }, [])



    return (
        <div style={{
            backgroundColor: 'black',
            color: 'white',
            minHeight: '100vh',
            padding: '2rem'
        }}>
            <h1 style={{
                color: '#7fffd4',
                borderBottom: '2px solid #7fffd4',
                paddingBottom: '0.5rem',
                marginBottom: '2rem'
            }}>지원자 상세 정보</h1>

            {applicants.length > 0 ? (
                <fieldset style={{
                    border: '1px solid #7fffd4',
                    borderRadius: '10px',
                    padding: '2rem',
                    maxWidth: '800px',
                    margin: '0 auto'
                }}>
                    <legend style={{
                        color: '#7fffd4',
                        padding: '0 1rem',
                        fontSize: '1.2rem',
                        fontWeight: 'bold'
                    }}>지원 정보</legend>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <p style={{
                            fontSize: '1.1rem',
                            backgroundColor: 'rgba(127, 255, 212, 0.1)',
                            padding: '0.5rem',
                            borderRadius: '5px'
                        }}>
                            <span style={{ color: '#7fffd4', fontWeight: 'bold' }}>지원번호:</span> {id}
                        </p>
                        <p style={{
                            fontSize: '1.1rem',
                            backgroundColor: 'rgba(127, 255, 212, 0.1)',
                            padding: '0.5rem',
                            borderRadius: '5px',
                            marginTop: '0.5rem'
                        }}>
                            <span style={{ color: '#7fffd4', fontWeight: 'bold' }}>학번 이름:</span> {applicants[0].student_id} {applicants[0].student_name}
                        </p>
                    </div>

                    <div style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        padding: '1.5rem',
                        borderRadius: '8px',
                        marginBottom: '1.5rem',
                        boxShadow: '0 0 10px rgba(127, 255, 212, 0.3)'
                    }}>
                        <h3 style={{ color: '#7fffd4', marginTop: 0 }}>지원 동기</h3>
                        <p style={{ lineHeight: '1.6' }}>{applicants[0].motiv}</p>
                    </div>

                    <div style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        padding: '1.5rem',
                        borderRadius: '8px',
                        boxShadow: '0 0 10px rgba(127, 255, 212, 0.3)'
                    }}>
                        <h3 style={{ color: '#7fffd4', marginTop: 0 }}>하고싶은 일</h3>
                        <p style={{ lineHeight: '1.6' }}>{applicants[0].want_to_do}</p>
                    </div>
                </fieldset>
            ) : (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '50vh'
                }}>
                    <p style={{
                        color: '#7fffd4',
                        fontSize: '1.2rem',
                        animation: 'pulse 1.5s infinite',
                        textAlign: 'center'
                    }}>로딩중...</p>
                </div>
            )}

            <style jsx global>{`
                @keyframes pulse {
                    0% { opacity: 0.6; }
                    50% { opacity: 1; }
                    100% { opacity: 0.6; }
                }
                body {
                    margin: 0;
                    padding: 0;
                    font-family: 'Arial', sans-serif;
                }
            `}</style>
        </div>
    )


}