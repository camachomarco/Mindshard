"use client";

import { Container, Div, FileInput, FileInputLabel, PageContainer, TextInput } from "@/lib/components/styles/ReusableStyledComponents";
import styled from "styled-components";

export default function Home() {
  return (
    <PageContainer_>
      <Input>
        <h1>
          Turn any chunk of data <br /> into rich and insightful summaries
        </h1>
        <h3>Input</h3>
        <TextInput placeholder="Enter Youtube url" />
        <p>or&nbsp;</p>
        <FileInputLabel htmlFor="fileInput">Upload video</FileInputLabel>
        <FileInput id="fileInput" />
      </Input>

      <Output>
        <h3>Output</h3>
      </Output>
    </PageContainer_>
  );
}

const PageContainer_ = styled(Div)`
  flex-direction: column;
  margin: 20rem 0 0 0;
  /* border: 1px solid green; */

  justify-content: space-around;
`;

const Input = styled(Div)`
  flex-direction: column;
  justify-content: space-around;
  height: 20rem;
`;
const Output = styled(Div)`
  height: 20rem;
`;
