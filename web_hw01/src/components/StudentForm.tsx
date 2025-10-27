interface StudentFormProps {
  onAdd: (name: string, score: string) => void;
}

export default function StudentForm({ onAdd }: StudentFormProps) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const score = (form.elements.namedItem("score") as HTMLInputElement).value;
    onAdd(name, score);
    form.reset();
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <input name="name" placeholder="이름" className="input" />
      <input name="score" placeholder="점수 (0~100)" className="input" />
      <button type="submit" className="btn add">
        등록
      </button>
    </form>
  );
}
