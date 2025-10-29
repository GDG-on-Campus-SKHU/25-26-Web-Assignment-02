import StudentItem from "./StudentItem";
import type { Student } from "./types";

interface StudentListProps {
  students: Student[];
}

export default function StudentList({ students }: StudentListProps) {
  if (students.length === 0)
    return <p className="empty">등록된 학생이 없습니다.</p>;

  const averages = students.map((s) =>
    s.scores.length > 0
      ? s.scores.reduce((a, b) => a + b, 0) / s.scores.length
      : 0
  );
  const maxAvg = Math.max(...averages);

  return (
    <div className="list">
      {students.map((s, i) => (
        <StudentItem key={i} student={s} highlight={averages[i] === maxAvg} />
      ))}
    </div>
  );
}
