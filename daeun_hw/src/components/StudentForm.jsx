// 점수 등록하는 폼

import styled from "styled-components";
import { addOrAppend } from "../lib/localdb";

export default function StudentForm() {
  const onSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    addOrAppend(form.name.value, form.score.value);
    form.reset();
    form.name.focus();
  };

  return (
    <Form onSubmit={onSubmit}>
      <Input name="name" placeholder="이름" required />
      <Input
        name="score"
        placeholder="점수(0~100)"
        type="number"
        min="0"
        max="100"
        step="1"
      />
      <PrimaryButton type="submit">등록</PrimaryButton>
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
`;
const Input = styled.input`
  padding: 8px 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
`;
const PrimaryButton = styled.button`
  padding: 8px 14px;
  border-radius: 6px;
  border: 1px solid #222;
  background: #222;
  color: #fff;
  cursor: pointer;
  &:hover {
    filter: brightness(0.95);
  }
`;
