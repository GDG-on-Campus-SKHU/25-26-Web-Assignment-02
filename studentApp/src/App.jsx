import './App.css'
import React from "react";

const STORAGE_KEY = "studentScores_v1";
let state = { students: [], sortBy: "none", nextOrder: 0 };
try {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) state = { ...state, ...JSON.parse(raw) };
} catch {
  //오류 발생 시 무시
}

const listeners = new Set();
function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}
function notify() {
  persist();
  listeners.forEach((fn) => fn(getState()));
}
function getState() {
  return {
    students: state.students.map((s) => ({ ...s, scores: [...s.scores] })),
    sortBy: state.sortBy,
    nextOrder: state.nextOrder,
  };
}
function addScore(name, score) {
  const clean = String(name ?? "").trim();
  if (!clean) return;
  const raw = String(score ?? "").trim();
  if (raw === "") return;
  const num = Number(raw);
  if (!Number.isFinite(num) || num < 0 || num > 100) return;
  const idx = state.students.findIndex((s) => s.name === clean);
  if (idx >= 0) state.students[idx].scores.push(num);
  else state.students.push({ name: clean, scores: [num], order: state.nextOrder++ });
  notify();
}
function setSort(by) {
  state.sortBy = by;
  notify();
}
function clearAll() {
  state = { students: [], sortBy: "none", nextOrder: 0 };
  notify();
}
function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
function getSortedStudents() {
  const avg = (arr) => (arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : NaN);
  const factor = state.sortBy === "desc" ? -1 : 1;
  return state.students
    .map((s) => ({ ...s, _avg: avg(s.scores) }))
    .sort((a, b) => {
      if (Number.isNaN(a._avg) && Number.isNaN(b._avg)) return a.order - b.order;
      if (Number.isNaN(a._avg)) return 1;
      if (Number.isNaN(b._avg)) return -1;
      if (a._avg === b._avg) return a.order - b.order;
      return (a._avg - b._avg) * factor;
    });
}

function StudentForm({ onRegister }) {
  let nameInput = null;
  let scoreInput = null;
  function handleSubmit(e) {
    e.preventDefault();
    const name = nameInput?.value ?? "";
    const score = scoreInput?.value ?? "";
    if (String(score).trim() === "") return;
    onRegister(name, score);
    scoreInput.value = "";
  }
  return (
    <section>
      <h2>학생 등록</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="이름" ref={(el) => (nameInput = el)} />
        <input type="number" min={0} max={100} placeholder="점수" ref={(el) => (scoreInput = el)} />
        <button type="submit">등록</button>
      </form>
    </section>
  );
}

function Controls({ sortBy, onSortAsc, onSortDesc, onClear }) {
  return (
    <section>
      <h2>정렬 / 초기화</h2>
      <button onClick={onSortDesc} disabled={sortBy === "desc"}>평균 높은 순</button>
      <button onClick={onSortAsc} disabled={sortBy === "asc"}>평균 낮은 순</button>
      <button onClick={onClear}>전체 삭제</button>
    </section>
  );
}

function StudentItem({ student }) {
  const hasScores = student.scores.length > 0;
  const avg = hasScores ? student.scores.reduce((a, b) => a + b, 0) / student.scores.length : NaN;
  return (
    <li>
      <b>{student.name}</b> - {hasScores ? avg.toFixed(2) : "점수 없음"}
    </li>
  );
}

function StudentList({ students }) {
  return (
    <section>
      <h2>학생 목록</h2>
      {students.length === 0 ? (
        <p>등록된 학생이 없습니다</p>
      ) : (
        <ul>
          {students.map((s) => (
            <StudentItem key={s.name} student={s} />
          ))}
        </ul>
      )}
    </section>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = getState();
  }
  componentDidMount() {
    this.unsubscribe = subscribe((next) => this.setState(next));
  }
  componentWillUnmount() {
    this.unsubscribe && this.unsubscribe();
  }
  render() {
    return (
      <div style={{ maxWidth: 640, margin: "24px auto" }}>
        <h1>학생 성적 관리 (한 파일 버전)</h1>
        <StudentForm onRegister={addScore} />
        <Controls
          sortBy={this.state.sortBy}
          onSortAsc={() => setSort("asc")}
          onSortDesc={() => setSort("desc")}
          onClear={clearAll}
        />
        <StudentList students={getSortedStudents()} />
      </div>
    );
  }
}

export default App;