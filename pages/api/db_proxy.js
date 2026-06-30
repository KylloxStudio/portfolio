export default async function handler(req, res) {
  try {
    const upstream = await fetch("https://kyllox3509.dothome.co.kr/db/index.php");

    if (!upstream.ok) {
      res.status(upstream.status).json({ error: "upstream error" });
      return;
    }

    let html = await upstream.text();

    html = html.replace(
      /<head>/i,
      `<head><base href="https://kyllox3509.dothome.co.kr/db/">`
    );

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.status(200).send(html);
  }
  catch (err) {
    console.error("Proxy error:", err);
    res.status(500).json({ error: String(err) });
  }
}