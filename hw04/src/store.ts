export type Student = { name: string; scores: number[]; index: number };
export type SortMode = "none" | "avg-asc" | "avg-desc";

export type SnapshotStudent = Student & { avg: number | null };
export type Snapshot = {
  students: SnapshotStudent[];
  sort: SortMode;
  maxAvg: number | null;
};

type Actions = {
  add: (name: string, score: number | string) => void;
  setSort: (mode: SortMode) => void;
  clearAll: () => void;
};

const STORAGE_KEY = "student-store-v1";

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { students: [] as Student[], sort: "none" as SortMode, seq: 0 };
    const obj = JSON.parse(raw);
    return {
      students: Array.isArray(obj.students) ? obj.students as Student[] : [],
      sort: (obj.sort as SortMode) ?? "none",
      seq: typeof obj.seq === "number" ? obj.seq : 0,
    };
  } catch {
    return { students: [] as Student[], sort: "none" as SortMode, seq: 0 };
  }
}

function average(scores: number[]) {
  if (!scores || scores.length === 0) return null;
  const sum = scores.reduce((a, b) => a + b, 0);
  return sum / scores.length;
}

class Store {
  private state = loadInitial();
  private listeners = new Set<() => void>();

  subscribe(fn: () => void) { this.listeners.add(fn); return () => this.listeners.delete(fn); }
  private save() { localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state)); }
  private notify() { this.save(); this.listeners.forEach(fn => fn()); }

  getSnapshot(): Snapshot {
    let list: SnapshotStudent[] = this.state.students.map(s => ({ ...s, avg: average(s.scores) }));

    if (this.state.sort === "avg-desc") {
      list = list.slice().sort((a, b) => {
        const aa = a.avg === null ? -Infinity : a.avg;
        const bb = b.avg === null ? -Infinity : b.avg;
        if (bb !== aa) return bb - aa;
        return a.index - b.index;
      });
    } else if (this.state.sort === "avg-asc") {
      list = list.slice().sort((a, b) => {
        const aa = a.avg === null ? Infinity : a.avg;
        const bb = b.avg === null ? Infinity : b.avg;
        if (aa !== bb) return aa - bb;
        return a.index - b.index;
      });
    }

    const valid = list.filter(s => s.avg !== null);
    const maxAvg = valid.length ? Math.max(...valid.map(s => s.avg as number)) : null;

    return { students: list, sort: this.state.sort, maxAvg };
  }

  actions: Actions = {
    add: (name, score) => {
      const nm = String(name ?? "").trim();
      const n = Number(score);
      if (!nm) return;
      if (!Number.isFinite(n) || n < 0 || n > 100) return;

      const i = this.state.students.findIndex(s => s.name === nm);
      if (i >= 0) {
        const target = this.state.students[i];
        this.state.students[i] = { ...target, scores: [...target.scores, n] };
      } else {
        this.state.students.push({ name: nm, scores: [n], index: this.state.seq++ });
      }
      this.notify();
    },
    setSort: (mode) => { this.state.sort = mode; this.notify(); },
    clearAll: () => { this.state = { students: [], sort: "none", seq: 0 }; this.notify(); },
  };
}

export const store = new Store();
export type StoreActions = Store["actions"];
