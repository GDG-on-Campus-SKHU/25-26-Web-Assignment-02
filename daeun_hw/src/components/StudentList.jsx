// 등록 학생 리스트

import styled from "styled-components";
import { formatAvg, sortedStudents } from "../lib/utils";
import { removeStudent } from "../lib/localdb";

export default function StudentList({ students, sortMode }) {
  const list = sortedStudents(students, sortMode);

  if (list.length === 0) {
    return (
      <Empty>등록된 학생이 없습니다. 이름과 점수를 입력해 등록해 보세요.</Empty>
    );
  }

  return (
    <Ul>
      {list.map((s) => (
        <Li key={`${s.name}-${s.originalOrder}`}>
          <Name>{s.name}</Name>
          <Right>
            {s._avg === null ? (
              <strong>점수 없음</strong>
            ) : (
              <span>
                평균: {formatAvg(s._avg)} <Small>(n={s.scores.length})</Small>
              </span>
            )}
            <Delete
              onClick={() => {
                if (confirm(`"${s.name}" 학생 정보를 삭제할까요?`)) {
                  removeStudent(s.name);
                }
              }}
            >
              삭제
            </Delete>
          </Right>
        </Li>
      ))}
    </Ul>
  );
}

const Ul = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 8px;
`;
const Li = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border: 1px solid #eee;
  border-radius: 8px;
  background: #fff;
`;
const Name = styled.div`
  font-weight: 700;
`;
const Right = styled.div`
  color: #444;
  display: flex;
  align-items: center;
  gap: 10px;
`;
const Small = styled.span`
  font-size: 12px;
  margin-left: 6px;
  color: #777;
`;
const Delete = styled.button`
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid #e00;
  background: #ffefef;
  color: #b30000;
  cursor: pointer;
  font-size: 0.9rem;
  &:hover {
    filter: brightness(0.98);
    background: #ffe3e3;
  }
`;
const Empty = styled.div`
  padding: 16px 0;
  color: #666;
`;
