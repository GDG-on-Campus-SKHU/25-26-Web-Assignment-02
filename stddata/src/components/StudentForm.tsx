import React from "react";

type Props = {
  onAdd: (name: string, score: number) => void;
  onClear: () => void;
};

export default function StudentForm({ onAdd, onClear }: Props) {
  let nameRef: HTMLInputElement | null = null;
  let scoreRef: HTMLInputElement | null = null;

  const handleAdd = () => {
    const name = nameRef?.value.trim();
    const score = Number(scoreRef?.value);
    if (!name || isNaN(score) || score < 0 || score > 100) return;
    onAdd(name, score);
  };

  return (
    <div className="student-form">
      <input
        ref={(el) => (nameRef = el)}
        placeholder="이름"
      />
      <input
        ref={(el) => (scoreRef = el)}
        type="number"
        placeholder="점수"
      />
      <button onClick={handleAdd}>등록</button>
      <button onClick={onClear} className="delete">
        전체 삭제
      </button>
    </div>
  );
}
