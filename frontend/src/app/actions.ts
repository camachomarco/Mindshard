"use server";

import { revalidateTag } from "next/cache";

export async function fullProcess(e: FormData) {
  "use server";

  const inputUrl = e.get("file") || e.get("yt-url");

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

  // This is retarded. Look at actions and figure out if connecting backend without server actions is a thing, if not just fix the client component/styled component issues you have and reset.

  if (!res.ok) {
    throw new Error(`Server responded with status: ${res.status}`);
  }

  const response = await res.json();

  console.log(response);

  // revalidateTag("data");
}
