import React from "react";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import type { Student } from "./types/student";
import "./App.css";
const STORAGE_KEY = "students";

// 데이터 불러오기
function loadStudents(): Student[] {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
}

// 데이터 저장
function saveStudents(students: Student[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
}

// 학생 추가
function addStudent(name: string, score: number) {
  const students = loadStudents();
  const existing = students.find((s) => s.name === name);

  if (existing) existing.scores.push(score);
  else students.push({ id: Date.now(), name, scores: [score] });

  saveStudents(students);
  window.location.reload(); // useState 없이 갱신
}

// 전체 삭제
function clearStudents() {
  localStorage.removeItem(STORAGE_KEY);
  window.location.reload();
}

// 정렬
function sortStudents(desc = true) {
  const students = loadStudents();
  students.sort((a, b) => {
    const avgA = a.scores.length
      ? a.scores.reduce((x, y) => x + y, 0) / a.scores.length
      : 0;
    const avgB = b.scores.length
      ? b.scores.reduce((x, y) => x + y, 0) / b.scores.length
      : 0;
    return desc ? avgB - avgA : avgA - avgB;
  });
  saveStudents(students);
  window.location.reload();
}

export default function App() {
  const students = loadStudents();

  return (
    <div className="app-container">
      <h1>학생 성적 관리</h1>

      <StudentForm onAdd={addStudent} onClear={clearStudents} />

      <div className="sort-buttons">
        <button onClick={() => sortStudents(true)}>평균 높은 순</button>
        <button onClick={() => sortStudents(false)}>평균 낮은 순</button>
      </div>

      <StudentList students={students} />
    </div>
  );
}
