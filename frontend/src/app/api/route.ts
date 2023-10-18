import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const res = await fetch("http://localhost:5000/summarize", {
    method: "POST",
  });

  return res;
}

export async function GET(request: NextRequest) {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
    method: "GET",
  });

  const data = await res.json();

  return NextResponse.json(data);
}
