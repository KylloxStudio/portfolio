export default async function handler(req, res) {
  try {
    const upstream = await fetch("http://db.kyllox.pe.kr/index.php");

    if (!upstream.ok) {
      res.status(upstream.status).json({ error: "upstream error" });
      return;
    }

    let html = await upstream.text();

    html = html.replace(
      /<head>/i,
      `<head><base href="http://db.kyllox.pe.kr/">`
    );

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.status(200).send(html);
  }
  catch (err) {
    console.error("Proxy error:", err);
    res.status(500).json({ error: String(err) });
  }
}