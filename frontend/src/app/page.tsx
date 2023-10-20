"use client";

import { Button, Container, Div, FileInput, FileInputLabel, Form, PageContainer, TextInput } from "@/lib/components/styles/ReusableStyledComponents";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import styled from "styled-components";
import fs from "fs";
import path from "path";
import { fullProcess } from "./actions";
import React, { useEffect, useState } from "react";

// let output: any = null;
// const fetching = async () => {
//   const updatedData = await fetch("http://127.0.0.1:5000/get_output", {
//     cache: "no-cache",
//     next: {
//       tags: ["data"],
//     },
//   });
//   output = await updatedData.json();
// };

// fetching();
export default function Home() {
  const [output, setOutput] = useState<any>(null);

  async function fullProcess(e: any) {
    const formData = new FormData(e.currentTarget);
    const inputUrl = formData.get("file") || formData.get("yt-url");

    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");

    if (!inputUrl) return;

    const res = await fetch("http://127.0.0.1:5000/summarize", {
      cache: "no-cache",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input_str: inputUrl,
      }),
    });

    if (!res.ok) {
      throw new Error(`Server responded with status: ${res.status}`);
    }

    const response = await res.json();

    console.log(response);

    // revalidateTag("data");
  }

  useEffect(() => {
    const fetchData = async () => {
      const updatedData = await fetch("http://127.0.0.1:5000/get_output", {
        cache: "no-cache",
        next: {
          tags: ["data"],
        },
      });
      const result = await updatedData.json();
      setOutput(result);
    };

    fetchData();
  }, []);
  return (
    <PageContainer_>
      <Input
        onSubmit={(e) => {
          e.preventDefault();
          fullProcess(new FormData(e.target as HTMLFormElement));
        }}
      >
        <h1>
          Turn any chunk of data <br /> into insightful summaries
        </h1>
        <h3>Input</h3>
        <TextInput name="yt-url" placeholder="Enter Youtube url" />
        <p>or&nbsp;</p>
        <FileInputLabel htmlFor="fileInput">Upload video</FileInputLabel>
        <FileInput name="file" id="fileInput" />
        <Button>Submit</Button>
      </Input>

      <Output>
        <h3>Output&nbsp;</h3>
        <p>Overview: {output?.overview}&nbsp;</p>
        <p>Summary: {output?.summary}&nbsp;</p>
      </Output>
    </PageContainer_>
  );
}

const PageContainer_ = styled(PageContainer)`
  flex-direction: column;
  /* border: 1px solid green; */

  justify-content: space-around;
`;

const Input = styled(Form)`
  flex-direction: column;
  justify-content: space-around;
  height: 20rem;
`;
const Output = styled(Div)`
  height: 20rem;
  flex-direction: column;
  justify-content: space-around;
`;
