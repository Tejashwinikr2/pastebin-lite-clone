interface PastePageProps {
  params: { id: string };
}

export default async function PastePage({ params }: PastePageProps) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/paste?id=${params.id}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return <h2 style={{ padding: 20 }}>Paste not found</h2>;
  }

  const data = await res.json();

  return (
    <main style={{ padding: 20 }}>
      <h1>Paste</h1>

      <pre
        style={{
          background: "#f4f4f4",
          padding: 16,
          whiteSpace: "pre-wrap",
          borderRadius: 6,
        }}
      >
        {data.content}
      </pre>
    </main>
  );
}
