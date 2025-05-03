"use client";

import { MouseEvent, useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

export default function Form() {
  //지원서 페이지
  const [studentId, setStudentId] = useState(""); //학번
  const [studentName, setStudentName] = useState(""); //이름
  const [motiv, setMotiv] = useState(""); //지원 동기
  const [wantToDo, setWantToDo] = useState(""); //하고 싶은 일
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!,
  ); //DB연결
  let router = useRouter(); //페이지 이동

  async function onSubmit(event: MouseEvent<HTMLButtonElement>) {
    //제출하기 눌렀을 때 실행
    console.log(studentId, studentName, motiv, wantToDo);
    event.currentTarget.disabled = true;
    const { error } = await supabase.from("applications").insert({
      //인풋에 입력한 정보를 DB에 삽입
      student_id: studentId,
      student_name: studentName,
      motiv: motiv,
      want_to_do: wantToDo,
    });
    alert("제출되었습니다.");
    router.replace("/"); //메인 페이지로 이동
  }

  useEffect(() => {
    // 스타일을 head에 추가
    const styleElement = document.createElement("style");
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);

    // 컴포넌트가 언마운트될 때 스타일 요소 제거
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []); // 빈 배열을 전달하여 마운트 시에만 실행

  return (
    <div id="form">
      <p>위 지원서의 내용은 면접과정에서 참고될 예정입니다.</p>
      <p>신중히 작성하시기 바랍니다.</p>
      <p style={{ paddingBottom: "20px" }}> </p>

      <fieldset>
        <legend>지원서 양식</legend>

        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <div>
            <label>학번</label>
            <input
              className="smallInput"
              type="text"
              placeholder="학번"
              value={studentId}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setStudentId(event.target.value);
              }}
            />
          </div>

          <div>
            <label>이름</label>
            <input
              className="smallInput"
              type="text"
              placeholder="이름"
              value={studentName}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setStudentName(event.target.value);
              }}
            />
          </div>
        </div>

        <label>지원 동기</label>
        <textarea
          className="largeInput"
          placeholder="지원하게된 동기를 적어주세요."
          value={motiv}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
            setMotiv(event.target.value);
          }}
        ></textarea>

        <label>하고싶은 활동</label>
        <textarea
          className="largeInput"
          placeholder="만약 합격해서 동아리에 들어오게 된다면 가장 하고싶을 활동을 적어주세요."
          value={wantToDo}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
            setWantToDo(event.target.value);
          }}
        ></textarea>
      </fieldset>

      <button
        onClick={(e) => {
          onSubmit(e);
        }}
      >
        제출하기
      </button>
    </div>
  );
}

const styles = `
  textarea {
    height: 100px;
    resize: none;
  }

  #form {
    background-color: #222;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0px 0px 10px rgba(127, 255, 212, 0.5);
    color: #7fffd4;
    width: 500px;
    text-align: center;
  }

  fieldset {
    border: 2px solid #7fffd4;
    border-radius: 10px;
    padding: 15px;
  }

  legend {
    color: #7fffd4;
    font-weight: bold;
    text-align: center;
    width: 100%;
  }

  label {
    display: block;
    margin-top: 10px;
    font-weight: bold;
  }

  .largeInput {
    width: calc(100% - 10px);
    padding: 8px;
    margin-top: 5px;
    border: 1px solid #7fffd4;
    border-radius: 5px;
    background-color: #333;
    color: white;
  }

  .smallInput {
    width: 150px;
    padding: 8px;
    margin-top: 5px;
    border: 1px solid #7fffd4;
    border-radius: 5px;
    background-color: #333;
    color: white;
  }

  button {
    background-color: #222;
    border: none;
    padding: 10px;
    margin-top: 15px;
    width: 80%;
    font-size: 16px;
    font-weight: bold;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s;
    color: #7fffd4;
  }

  button:hover {
    background-color: #5fcfa1;
    color: #222;
  }

  button:hover:disabled {
    background-color: #222;
    color: #7fffd4;
  }

  `;
