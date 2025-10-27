import type { Student } from "./types";

interface StudentItemProps {
  student: Student;
  highlight: boolean;
}

export default function StudentItem({ student, highlight }: StudentItemProps) {
  const avg =
    student.scores.length > 0
      ? (
          student.scores.reduce((a, b) => a + b, 0) / student.scores.length
        ).toFixed(2)
      : "점수 없음";

  return (
    <div className={`card ${highlight ? "highlight" : ""}`}>
      <strong>{student.name}</strong>
      <span>평균: {avg}</span>
    </div>
  );
}
