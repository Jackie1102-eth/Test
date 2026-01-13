export async function onRequestPost({ request, env }) {
  const ip =
    request.headers.get("CF-Connecting-IP") ||
    request.headers.get("X-Forwarded-For") ||
    "unknown";

  const ua = request.headers.get("User-Agent") || "";
  const time = new Date().toISOString();

  await env.DB.prepare(
    `INSERT INTO visits (created_at, ip, user_agent)
     VALUES (?, ?, ?)`
  ).bind(time, ip, ua).run();

  return new Response(JSON.stringify({ ok: true }), {
    headers: { "Content-Type": "application/json" },
  });
}
