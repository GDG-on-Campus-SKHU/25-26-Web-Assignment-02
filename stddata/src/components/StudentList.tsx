import React from "react";
import type { Student } from "../types/student";

type Props = { students: Student[] };

export default function StudentList({ students }: Props) {
  if (students.length === 0)
    return <p style={{ color: "#888" }}>등록된 학생이 없습니다.</p>;

  const averages = students.map((s) =>
    s.scores.length
      ? s.scores.reduce((a, b) => a + b, 0) / s.scores.length
      : 0
  );
  const maxAvg = Math.max(...averages);

  return (
    <ul className="student-list">
      {students.map((s) => {
        const avg =
          s.scores.length > 0
            ? (s.scores.reduce((a, b) => a + b, 0) / s.scores.length).toFixed(2)
            : "점수 없음";
        const isTop = s.scores.length > 0 && Number(avg) === maxAvg;

        return (
          <li key={s.id} className={`student-item ${isTop ? "top" : ""}`}>
            <span>{s.name}</span>
            <span className={s.scores.length === 0 ? "empty" : ""}>
              {avg}점
            </span>
          </li>
        );
      })}
    </ul>
  );
}
