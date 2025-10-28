// localStorage만으로 상태 관리한 계산 함수

// 로컬스토리지의 key 이름
const STORAGE_KEY = "students-app-v1";
// 렌더 트리거용 커스텀 이벤트 이름
const EVENT_NAME = "app:storage";

// 초기값
function getDefaultState() {
  return { students: [], sortMode: "latest", seq: 0 };
}

// 현재 상태 불러오기 (localStorage => js 객체)
export function getState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultState();
    const parsed = JSON.parse(raw);
    const st = { ...getDefaultState(), ...parsed };
    if (!Array.isArray(st.students)) st.students = [];
    if (typeof st.seq !== "number") st.seq = st.students.length;
    return st;
  } catch {
    return getDefaultState();
  }
}

// 상태 저장 (js 객체 => localStorage)
function setState(next) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  notify(); // 저장 후 렌더링을 다시 트리거하기 위해 호출
}

function notify() {
  // 같은 탭 렌더 알림
  window.dispatchEvent(new Event(EVENT_NAME));
}

// 학생 등록 및 점수 추가
export function addOrAppend(name, score) {
  const trimmed = String(name || "").trim();
  if (!trimmed) return; // 이름이 비었으면 무시

  const raw = String(score ?? "");
  const isBlank = raw.trim() === ""; // 점수가 비어 있는지 확인
  const n = Number(raw);
  const valid = !isBlank && Number.isFinite(n) && n >= 0 && n <= 100;

  const st = getState();
  const idx = st.students.findIndex((s) => s.name === trimmed);

  if (idx >= 0) {
    // 기존 학생: 점수 유효할 때만 추가
    if (!valid) return; // 점수가 비정상 -> 변화 x
    const next = { ...st };
    next.students = next.students.map((s, i) =>
      i === idx ? { ...s, scores: [...s.scores, n] } : s
    );
    setState(next);
  } else {
    // 새 학생 등록
    const next = { ...st };
    next.students = [
      ...next.students,
      {
        name: trimmed,
        scores: valid ? [n] : [], // 점수가 없으면 빈 배열
        originalOrder: next.seq++, // 등록 순서 부여하고 증가
      },
    ];
    setState(next);
  }
}

// 해당 학생 삭제
export function removeStudent(name) {
  const trimmed = String(name || "").trim();
  if (!trimmed) return;
  const st = getState();
  const next = {
    ...st,
    students: st.students.filter((s) => s.name !== trimmed),
  };
  setState(next);
}

// 전체 데이터 초기화
export function clearAll() {
  setState(getDefaultState());
}

// 정렬 모드 변경
export function setSortMode(mode) {
  const st = getState();
  const next = { ...st, sortMode: mode || "latest" };
  setState(next);
}

// 렌더 트리거 등록 함수
export function subscribeRender(renderFn) {
  // 같은 탭 커스텀 이벤트
  const onCustom = () => renderFn();
  window.addEventListener(EVENT_NAME, onCustom);

  // 다른 탭/창에서 변경 시 발생하는 기본 storage 이벤트
  const onStorage = (e) => {
    if (e.key === STORAGE_KEY) renderFn();
  };
  window.addEventListener("storage", onStorage);

  return () => {
    window.removeEventListener(EVENT_NAME, onCustom);
    window.removeEventListener("storage", onStorage);
  };
}
