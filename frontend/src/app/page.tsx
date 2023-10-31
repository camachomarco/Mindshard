"use client";

import { Button_, Container, Div, FileInput, FileInputLabel, Form_, PageContainer, TextInput } from "@/lib/components/styles/ReusableStyledComponents";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import styled from "styled-components";
import fs from "fs";
import path from "path";
import { fullProcess } from "./actions";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputValidation } from "@/lib/validations/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import LoadingPage from "./loading";

const Home = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(true);
  const [output, setOutput] = useState<any>(null);

  const [formData, setFormData] = useState({
    ytUrl: "",
  });

  const { ytUrl } = formData;

  const onChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value });

  useEffect(() => {
    const getData = async () => {
      const res = await fetch("http://127.0.0.1:5000/get_output");

      const data = await res.json();

      setOutput(data);
      setLoading(false);
    };
    getData();
  }, []);

  const form = useForm({
    resolver: zodResolver(InputValidation),
    defaultValues: { yt_url: "", file: "" },
  });

  const onSubmit = async (values: z.infer<typeof InputValidation>) => {
    console.log("jjjjjjjjjjjj");
    return;
    const inputUrl = values.yt_url || values.file;
    console.log("okok", inputUrl);

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

    // const blob = values.file;
    // const hasImageChanged = isBase64Image(blob);
    // if (hasImageChanged) {
    //   const imgRes = await startUpload(files);
    //   if (imgRes && imgRes[0].fileUrl) {
    //     values.profile_photo = imgRes[0].fileUrl;
    //   }
    // }
    // await updateUser({
    //   yt_url: values.yt_url,
    // });
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>, fieldChange: (value: string) => void) => {
    e.preventDefault();

    const fileReader = new FileReader();

    if (e?.target?.files?.length) {
      const file = e.target.files[0];

      setFiles(Array.from(e.target.files));

      if (!file.type.includes("video") && !file.type.includes("audio")) return;

      fileReader.onload = async (event) => {
        const dataUrl = event.target?.result?.toString() || "";

        fieldChange(dataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };

  // if (loading) {
  //   return <LoadingPage />;
  // }

  return (
    <PageContainer_>
      <Form {...form}>
        <Input_ onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="yt_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Youtube URL</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Youtube URL" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Video file</FormLabel>
                <FormControl>
                  <Input type="file" accept="audio/*,video/*" placeholder="Upload a video" onChange={(e) => handleFileUpload(e, field.onChange)} />
                </FormControl>
              </FormItem>
            )}
          /> */}
          <Button type="submit">Submit</Button>
        </Input_>
      </Form>

      <Input_>
        <h1>
          Turn any chunk of data <br /> into insightful summaries
        </h1>
        <h3>Input</h3>
        <TextInput name="yt-url" placeholder="Enter Youtube url" />
        <p>or&nbsp;</p>
        <FileInputLabel htmlFor="fileInput">Upload video</FileInputLabel>
        <FileInput name="file" id="fileInput" />
        <Button_>Submit</Button_>
      </Input_>

      <Output>
        <h3>Output&nbsp;</h3>
        <p>Overview: {output?.overview}&nbsp;</p>
        <p>Summary: {output.summary}&nbsp;</p>
      </Output>
    </PageContainer_>
  );
};

export default Home;

const PageContainer_ = styled(PageContainer)`
  flex-direction: column;
  /* border: 1px solid green; */

  justify-content: space-around;
`;

const Input_ = styled(Form_)`
  flex-direction: column;
  justify-content: space-around;
  height: 20rem;
`;
const Output = styled(Div)`
  height: 20rem;
  flex-direction: column;
  justify-content: space-around;
`;
