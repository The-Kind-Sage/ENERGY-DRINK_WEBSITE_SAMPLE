import http from "node:http";
import { URL } from "node:url";
import handlerModule from "./dist/server/server.js";

const handler = handlerModule?.default ?? handlerModule;

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (c) => chunks.push(c));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

function toHeaders(nodeReq) {
  const headers = {};
  for (const [key, value] of Object.entries(nodeReq.headers)) {
    if (value === undefined) continue;
    headers[key] = Array.isArray(value) ? value.join(",") : value;
  }
  return headers;
}

const server = http.createServer(async (nodeReq, nodeRes) => {
  try {
    const proto = nodeReq.headers["x-forwarded-proto"] ?? "http";
    const host = nodeReq.headers.host ?? "localhost";
    const url = new URL(nodeReq.url ?? "/", `${proto}://${host}`);

    const body = nodeReq.method && !["GET", "HEAD"].includes(nodeReq.method)
      ? await readBody(nodeReq)
      : undefined;

    const request = new Request(url, {
      method: nodeReq.method,
      headers: toHeaders(nodeReq),
      body,
      // @ts-ignore - node may provide signal; handler doesn't require it
      signal: undefined
    });

    const response = await handler.fetch(request, process.env, {});

    nodeRes.statusCode = response.status;

    // Copy headers
    for (const [k, v] of response.headers.entries()) {
      // Avoid Node choking on multiple headers formatted as comma-separated string
      nodeRes.setHeader(k, v);
    }

    // Stream body
    const arrayBuffer = await response.arrayBuffer();
    nodeRes.end(Buffer.from(arrayBuffer));
  } catch (err) {
    nodeRes.statusCode = 500;
    nodeRes.setHeader("content-type", "text/plain; charset=utf-8");
    nodeRes.end(String(err?.stack ?? err));
  }
});

const port = process.env.PORT ? Number(process.env.PORT) : 3000;
server.listen(port, "0.0.0.0", () => {
  console.log(`Server running on http://0.0.0.0:${port}`);
});

