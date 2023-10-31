import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const res = await fetch("http://127.0.0.1:5000/summarize", {
    cache: "no-cache",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      input_str: "",
    }),
  });

  if (!res.ok) {
    throw new Error(`Server responded with status: ${res.status}`);
  }

  const response = await res.json();

  console.log(response);

  // revalidateTag("data");
}
