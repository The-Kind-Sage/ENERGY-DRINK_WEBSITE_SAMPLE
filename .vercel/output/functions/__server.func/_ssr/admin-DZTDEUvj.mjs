import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as createServerFn, T as TSS_SERVER_FUNCTION, g as getServerFnById } from "./server-DwMz2Gft.mjs";
import "../_libs/seroval.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
import "../_libs/isbot.mjs";
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const adminSignupFn = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  email: stringType().email(),
  password: stringType().min(8)
})).handler(createSsrRpc("bead73de31510191a102739ec4185280dd47f19f28fa39108baa7412046d760a"));
const adminLoginFn = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  email: stringType().email(),
  password: stringType().min(1)
})).handler(createSsrRpc("1245b775bf24ee8c56a9cac01abd48e7ab1823bfd09da223ffdd4c367d28403c"));
createServerFn({
  method: "GET"
}).handler(createSsrRpc("cc80e9ead6bd10e6a9eecb09d34e05260b2eb3ac9ef028e8106bfe979b54c46a"));
function AdminPage() {
  const [token, setToken] = reactExports.useState(() => {
    if (typeof window === "undefined") return null;
    return window.localStorage.getItem("admin_token");
  });
  const [status, setStatus] = reactExports.useState(() => token ? "authed" : "guest");
  const [mode, setMode] = reactExports.useState("signup");
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [error, setError] = reactExports.useState(null);
  const [busy, setBusy] = reactExports.useState(false);
  async function handleSubmit() {
    setBusy(true);
    setError(null);
    try {
      if (mode === "signup") {
        const res2 = await adminSignupFn({
          data: {
            email,
            password
          }
        });
        if (!res2.ok) {
          setError(res2.reason);
          return;
        }
        if (res2.token) {
          window.localStorage.setItem("admin_token", res2.token);
          setToken(res2.token);
        }
        setStatus("authed");
        return;
      }
      const res = await adminLoginFn({
        data: {
          email,
          password
        }
      });
      if (!res.ok) {
        setError(res.reason);
        return;
      }
      window.localStorage.setItem("admin_token", res.token);
      setToken(res.token);
      setStatus("authed");
    } finally {
      setBusy(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "min-h-screen bg-background text-foreground p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "Admin" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Signup/login for admin. First signup bootstraps the first admin." }),
    status === "authed" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 rounded-lg border border-border bg-card/40 p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-xs uppercase tracking-widest text-primary", children: "Signed in" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2", children: email ? email : "admin" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-bold", onClick: () => {
        window.localStorage.removeItem("admin_token");
        setToken(null);
        setStatus("guest");
      }, children: "Sign out" }) })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 rounded-lg border border-border bg-card/40 p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: mode === "signup" ? "px-3 py-2 rounded-md bg-primary text-primary-foreground text-sm font-bold" : "px-3 py-2 rounded-md border border-border text-sm", onClick: () => setMode("signup"), children: "Signup" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: mode === "login" ? "px-3 py-2 rounded-md bg-primary text-primary-foreground text-sm font-bold" : "px-3 py-2 rounded-md border border-border text-sm", onClick: () => setMode("login"), children: "Login" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium", children: "Email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "w-full rounded-md border border-border bg-background px-3 py-2", value: email, onChange: (e) => setEmail(e.target.value), type: "email", autoComplete: "email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium", children: "Password" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "w-full rounded-md border border-border bg-background px-3 py-2", value: password, onChange: (e) => setPassword(e.target.value), type: "password", autoComplete: mode === "signup" ? "new-password" : "current-password" }),
        error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-red-500", children: error }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { disabled: busy || !email || !password, onClick: handleSubmit, className: "w-full rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-bold disabled:opacity-50", children: busy ? "Please wait..." : mode === "signup" ? "Signup" : "Login" })
      ] })
    ] })
  ] }) });
}
export {
  AdminPage as component
};
