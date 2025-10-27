import React from "react";
import type { StoreActions } from "../store";

type Props = { onRegister: StoreActions["add"] };

export default function RegisterForm({ onRegister }: Props) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const score = (form.elements.namedItem("score") as HTMLInputElement).value;
    onRegister(name, score);
    form.reset();
    (form.elements.namedItem("name") as HTMLInputElement).focus();
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
      <input name="name" type="text" placeholder="이름" required />
      <input name="score" type="number" min={0} max={100} step={1} placeholder="점수(0~100)" required />
      <button type="submit">등록</button>
    </form>
  );
}
