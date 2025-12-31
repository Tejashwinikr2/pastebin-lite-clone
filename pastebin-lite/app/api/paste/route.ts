import { NextResponse } from "next/server";

const store = new Map<string, string>();

export async function POST(request: Request) {
  const body = await request.json();
  const content = body.content?.trim();

  if (!content) {
    return NextResponse.json(
      { error: "Content is required" },
      { status: 400 }
    );
  }

  const id = crypto.randomUUID().slice(0, 8);
  store.set(id, content);

  return NextResponse.json({ id });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id || !store.has(id)) {
    return NextResponse.json(
      { error: "Paste not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    content: store.get(id),
  });
}
