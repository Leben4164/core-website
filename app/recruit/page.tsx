import Form from "@/components/form";


export default function Recruit() {


  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: "center",
      paddingTop: '50px',
      height: '1000px'
    }}>
      <h1>지원서 작성 페이지</h1>
      <p style={{ paddingBottom: '50px' }}> </p>
      <Form />
    </div >
  )
}