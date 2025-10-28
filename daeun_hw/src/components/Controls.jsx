// 정렬 버튼

import styled, { css } from "styled-components";
import { clearAll, setSortMode } from "../lib/localdb";

export default function Controls({ sortMode }) {
  return (
    <Wrap>
      <Group>
        <Toggle
          $active={sortMode === "latest"}
          onClick={() => setSortMode("latest")}
        >
          최신 순
        </Toggle>
        <Toggle
          $active={sortMode === "avgDesc"}
          onClick={() => setSortMode("avgDesc")}
        >
          평균 높은 순
        </Toggle>
        <Toggle
          $active={sortMode === "avgAsc"}
          onClick={() => setSortMode("avgAsc")}
        >
          평균 낮은 순
        </Toggle>
      </Group>
      <Danger onClick={clearAll}>전체 삭제</Danger>
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 12px 0 16px;
  gap: 12px;
  flex-wrap: wrap;
`;
const Group = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;
const Toggle = styled.button`
  padding: 8px 14px;
  border-radius: 6px;
  cursor: pointer;
  ${(p) =>
    p.$active
      ? css`
          border: 1px solid #111;
          background: #111;
          color: #fff;
        `
      : css`
          border: 1px solid #bbb;
          background: #fff;
          color: #111;
        `}
  &:hover {
    filter: brightness(0.97);
  }
`;
const Danger = styled.button`
  padding: 8px 14px;
  border-radius: 6px;
  border: 1px solid #e11;
  background: #f33;
  color: #fff;
  cursor: pointer;
  &:hover {
    filter: brightness(0.97);
  }
`;
