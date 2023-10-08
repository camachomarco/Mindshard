"use client";

import { Container, Div, PageContainer } from "@/lib/components/styles/ReusableStyledComponents";
import styled from "styled-components";

export default function Home() {
  return (
    <PageContainer_>
      <Input style={{ backgroundColor: "red" }}>
        <h2>Turn any piece of data into a rich and insightful summary.</h2>
        <p>Input</p>
        <input type="text" placeholder="Enter text" />
        <p>or&nbsp;</p>
        <input type="file" />
      </Input>

      <Output style={{ backgroundColor: "green" }}>output</Output>
    </PageContainer_>
  );
}

const PageContainer_ = styled(Div)`
  flex-direction: column;
  margin: 20rem 0 0 0;
  border: 1px solid green;
  height: 20rem;

  justify-content: space-around;
`;

const Input = styled(Div)`
  flex-direction: column;
`;
const Output = styled(Div)``;
