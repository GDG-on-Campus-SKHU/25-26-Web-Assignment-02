import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import type { Student } from "./components/types";
import "./App.css";

let students: Student[] = JSON.parse(localStorage.getItem("students") || "[]");

function App() {
  function handleAddStudent(name: string, score: string) {
    if (!name.trim()) return;
    const num = Number(score);
    if (isNaN(num) || num < 0 || num > 100) return;

    const existing = students.find((s) => s.name === name);
    if (existing) {
      existing.scores.push(num);
    } else {
      students.push({ name, scores: [num] });
    }
    saveAndRender();
  }

  function handleSort(order: "asc" | "desc") {
    students.sort((a, b) => {
      const avgA =
        a.scores.length > 0
          ? a.scores.reduce((x, y) => x + y, 0) / a.scores.length
          : 0;
      const avgB =
        b.scores.length > 0
          ? b.scores.reduce((x, y) => x + y, 0) / b.scores.length
          : 0;
      return order === "desc" ? avgB - avgA : avgA - avgB;
    });
    saveAndRender();
  }

  function handleClear() {
    students = [];
    saveAndRender();
  }

  function saveAndRender() {
    localStorage.setItem("students", JSON.stringify(students));
    window.location.reload();
  }

  return (
    <div className="container">
      <h1 className="title">🎓 학생 성적 관리 시스템</h1>

      <StudentForm onAdd={handleAddStudent} />

      <div className="button-group">
        <button className="btn sort-high" onClick={() => handleSort("desc")}>
          평균 높은 순
        </button>
        <button className="btn sort-low" onClick={() => handleSort("asc")}>
          평균 낮은 순
        </button>
        <button className="btn clear" onClick={handleClear}>
          전체 삭제
        </button>
      </div>

      <StudentList students={students} />
    </div>
  );
}

export default App;
