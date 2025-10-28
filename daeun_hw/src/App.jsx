import styled from "styled-components";
import StudentForm from "./components/StudentForm";
import Controls from "./components/Controls";
import StudentList from "./components/StudentList";

export default function App({ state }) {
  const { students, sortMode } = state;

  return (
    <Page>
      <Card>
        <Title>학생 성적 관리</Title>
        <Sub>* 이름만 등록하면 “점수 없음”으로 표시됩니다.</Sub>

        <StudentForm />
        <Controls sortMode={sortMode} />
        <StudentList students={students} sortMode={sortMode} />
      </Card>
    </Page>
  );
}

const Page = styled.div`
  min-height: 100svh;
  background: #f7f7f8;
  padding: 20px;
  display: grid;
  place-items: center;
`;

const Card = styled.div`
  width: min(720px, 100%);
  background: #fff;
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
`;

const Title = styled.h1`
  margin: 0;
  font-size: 22px;
`;

const Sub = styled.p`
  margin: 6px 0 14px;
  color: #666;
`;
