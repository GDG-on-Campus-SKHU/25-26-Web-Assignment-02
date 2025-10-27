import React from "react";
import type { SnapshotStudent } from "../store";

type Props = {
  students: SnapshotStudent[];
  maxAvg: number | null;
};

export default function StudentList({ students, maxAvg }: Props) {
  if (students.length === 0) {
    return <p className="muted">아직 등록된 학생이 없어! 위에 이름과 점수를 입력하고 등록 눌러줘 ✨</p>;
  }
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {students.map(s => (
        <StudentItem key={s.name} student={s} highlight={maxAvg !== null && s.avg !== null && s.avg === maxAvg} />
      ))}
    </ul>
  );
}

function StudentItem({ student, highlight }: { student: SnapshotStudent; highlight: boolean }) {
  const { name, scores, avg } = student;
  const avgLabel = avg === null ? "점수 없음" : avg.toFixed(2);

  return (
    <li
      className={"item" + (highlight ? " highlight" : "")}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 14px",
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        marginBottom: 8,
        background: highlight ? "#dbeafe" : "#fff",
      }}
    >
      <div>
        <div className="name" style={{ fontWeight: 600 }}>{name}</div>
        <div className="muted">점수: {scores.length ? scores.join(", ") : "없음"}</div>
      </div>
      <div className="avg" style={{ fontVariantNumeric: "tabular-nums" }}>{avgLabel}</div>
    </li>
  );
}
