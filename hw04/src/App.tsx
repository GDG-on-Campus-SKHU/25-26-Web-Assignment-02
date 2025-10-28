import "./App.css";
import type { Snapshot, StoreActions, SortMode } from "./store";
import RegisterForm from "./components/RegisterForm";
import StudentList from "./components/StudentList";

type Props = {
  data: Snapshot;
  actions: StoreActions;
};

export default function App({ data, actions }: Props) {
  return (
    <div className="App" style={{ maxWidth: 760, margin: "0 auto", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 16, padding: 20 }}>
      <h1 style={{ margin: "0 0 16px", fontSize: 20 }}>학생 성적 관리 (no useState)</h1>

      <RegisterForm onRegister={actions.add} />

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
        <span className="pill">정렬: {labelOfSort(data.sort)}</span>
        <div style={{ flex: 1 }} />
        <button onClick={() => actions.setSort("avg-desc")}>평균 높은 순</button>
        <button onClick={() => actions.setSort("avg-asc")}>평균 낮은 순</button>
        <button onClick={() => actions.setSort("none")}>정렬 해제</button>
        <button onClick={actions.clearAll}>전체 삭제</button>
      </div>

      <StudentList students={data.students} maxAvg={data.maxAvg} />
    </div>
  );
}

function labelOfSort(mode: SortMode) {
  switch (mode) {
    case "avg-desc": return "평균 높은 순";
    case "avg-asc": return "평균 낮은 순";
    default: return "없음";
  }
}
