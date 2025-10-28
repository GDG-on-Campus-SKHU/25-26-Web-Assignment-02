export function avgOrNull(scores) {
  if (!scores || scores.length === 0) return null;
  const sum = scores.reduce((acc, cur) => acc + cur, 0);
  return sum / scores.length;
}

export function formatAvg(avg) {
  return avg === null ? "점수 없음" : avg.toFixed(2);
}

export function sortedStudents(students, mode) {
  const withAvg = students.map((s) => ({ ...s, _avg: avgOrNull(s.scores) }));

  if (mode === "latest" || !mode) {
    // 가장 최근 등록(큰 originalOrder)이 위로
    return withAvg.slice().sort((a, b) => b.originalOrder - a.originalOrder);
  }

  if (mode === "avgDesc") {
    return withAvg.slice().sort((a, b) => {
      const av = a._avg ?? -Infinity;
      const bv = b._avg ?? -Infinity;
      if (bv !== av) return bv - av;
      return 0;
    });
  }

  if (mode === "avgAsc") {
    return withAvg.slice().sort((a, b) => {
      const av = a._avg ?? Infinity;
      const bv = b._avg ?? Infinity;
      if (av !== bv) return av - bv;
      return 0;
    });
  }

  // 기본값 최신 순
  return withAvg.slice().sort((a, b) => b.originalOrder - a.originalOrder);
}
