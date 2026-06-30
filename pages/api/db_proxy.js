export async function GET() {
  const res = await fetch("http://db.kyllox.pe.kr/index.php");
  const html = await res.text();

  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}