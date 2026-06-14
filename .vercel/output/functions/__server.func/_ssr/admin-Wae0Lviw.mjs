import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as createServerFn, T as TSS_SERVER_FUNCTION, g as getServerFnById } from "./server-CGjnfohx.mjs";
import "../_libs/seroval.mjs";
import { E as EyeOff, a as Eye, I as Image, M as Menu, X, L as LayoutDashboard, Z as Zap, F as FlaskConical, U as Users, P as Package, b as Megaphone, c as FileText, d as Palette, G as Globe, S as Settings, C as ChevronRight, e as LogOut, f as ShoppingBag, g as Save, R as RotateCcw } from "../_libs/lucide-react.mjs";
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
createServerFn({
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
const NAV_GROUPS = [{
  heading: "Overview",
  items: [{
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard
  }]
}, {
  heading: "Page Sections",
  items: [{
    id: "hero",
    label: "Hero Banner",
    icon: Zap
  }, {
    id: "flavors",
    label: "Flavors",
    icon: FlaskConical
  }, {
    id: "ingredients",
    label: "Ingredients",
    icon: FlaskConical
  }, {
    id: "stats",
    label: "Stats / Social",
    icon: Users
  }, {
    id: "products",
    label: "Products",
    icon: Package
  }, {
    id: "newsletter",
    label: "Newsletter",
    icon: Megaphone
  }, {
    id: "footer",
    label: "Footer",
    icon: FileText
  }]
}, {
  heading: "Site Settings",
  items: [{
    id: "branding",
    label: "Branding",
    icon: Palette
  }, {
    id: "seo",
    label: "SEO & Meta",
    icon: Globe
  }, {
    id: "settings",
    label: "Settings",
    icon: Settings
  }]
}];
function LoginScreen({
  onAuthed
}) {
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [showPw, setShowPw] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const [busy, setBusy] = reactExports.useState(false);
  async function handleLogin(e) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
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
      window.localStorage.setItem("admin_email", email);
      onAuthed(res.token, email);
    } finally {
      setBusy(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background flex items-center justify-center p-4", style: {
    background: "radial-gradient(ellipse at 50% 40%, oklch(0.18 0.06 142 / 0.5), oklch(0.08 0 0) 65%)"
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display text-5xl tracking-wider mb-1", children: [
        "X",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", style: {
          textShadow: "0 0 20px var(--neon)"
        }, children: "T" }),
        "REAM"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground", children: "Admin Console" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleLogin, className: "rounded-xl border border-border bg-card/40 backdrop-blur-xl p-8 space-y-5 shadow-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2", children: "Email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", required: true, autoComplete: "email", value: email, onChange: (e) => setEmail(e.target.value), className: "w-full rounded-md border border-border bg-background/60 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors", placeholder: "admin@xtream.com" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2", children: "Password" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: showPw ? "text" : "password", required: true, autoComplete: "current-password", value: password, onChange: (e) => setPassword(e.target.value), className: "w-full rounded-md border border-border bg-background/60 px-4 py-3 pr-11 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors", placeholder: "••••••••" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", tabIndex: -1, onClick: () => setShowPw((v) => !v), className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors", children: showPw ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" }) })
        ] })
      ] }),
      error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-md border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400", children: error }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: busy || !email || !password, className: "w-full rounded-md bg-primary text-primary-foreground py-3 text-sm font-bold uppercase tracking-widest shadow-neon hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:scale-100", children: busy ? "Signing in…" : "Sign In" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center mt-6 text-xs text-muted-foreground font-mono", children: "Access restricted to authorized admins only." })
  ] }) });
}
function Sidebar({
  active,
  onNav,
  email,
  onSignOut,
  collapsed,
  onToggle
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: `fixed inset-y-0 left-0 z-40 flex flex-col border-r border-border bg-card/60 backdrop-blur-xl transition-all duration-300 ${collapsed ? "w-16" : "w-60"}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-16 items-center justify-between px-4 border-b border-border shrink-0", children: [
      !collapsed && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-xl tracking-wider", children: [
        "X",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "T" }),
        "REAM"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onToggle, className: "ml-auto rounded-md p-1.5 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors", "aria-label": "Toggle sidebar", children: collapsed ? /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex-1 overflow-y-auto py-4 space-y-5 px-2", children: NAV_GROUPS.map((group) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      !collapsed && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-2 mb-1.5 font-mono text-[9px] uppercase tracking-[0.35em] text-muted-foreground/60", children: group.heading }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-0.5", children: group.items.map((item) => {
        const Icon = item.icon;
        const isActive = active === item.id;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => onNav(item.id), title: collapsed ? item.label : void 0, className: `w-full flex items-center gap-3 rounded-md px-2.5 py-2 text-sm transition-colors ${isActive ? "bg-primary/15 text-primary font-medium" : "text-muted-foreground hover:text-foreground hover:bg-accent/60"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `h-4 w-4 shrink-0 ${isActive ? "text-primary" : ""}` }),
          !collapsed && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: item.label }),
          !collapsed && isActive && /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3 w-3 ml-auto opacity-60" }),
          !collapsed && item.badge && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto rounded-full bg-primary/20 text-primary px-1.5 py-0.5 text-[10px] font-mono", children: item.badge })
        ] }, item.id);
      }) })
    ] }, group.heading)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0 border-t border-border p-3", children: !collapsed ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 rounded-full bg-primary/20 grid place-items-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-primary font-bold uppercase", children: email?.[0] ?? "A" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-medium truncate", children: email || "Admin" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground font-mono", children: "Administrator" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onSignOut, title: "Sign out", className: "shrink-0 rounded-md p-1.5 text-muted-foreground hover:text-red-400 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" }) })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onSignOut, title: "Sign out", className: "w-full flex justify-center rounded-md p-1.5 text-muted-foreground hover:text-red-400 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" }) }) })
  ] });
}
function Panel({
  title,
  subtitle,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold tracking-tight", children: title }),
      subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: subtitle })
    ] }),
    children
  ] });
}
function Card({
  title,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card/40 backdrop-blur p-6 space-y-4", children: [
    title && /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold uppercase tracking-widest text-muted-foreground font-mono", children: title }),
    children
  ] });
}
function Field({
  label,
  hint,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium", children: label }),
    hint && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: hint }),
    children
  ] });
}
function Input(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ...props, className: `w-full rounded-md border border-border bg-background/60 px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors ${props.className ?? ""}` });
}
function Textarea(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 3, ...props, className: `w-full rounded-md border border-border bg-background/60 px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors resize-none ${props.className ?? ""}` });
}
function SaveBar({
  onSave,
  onReset
}) {
  const [saved, setSaved] = reactExports.useState(false);
  function handleSave() {
    onSave();
    setSaved(true);
    setTimeout(() => setSaved(false), 2e3);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 pt-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleSave, className: "inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-5 py-2.5 text-sm font-bold uppercase tracking-widest shadow-neon hover:scale-[1.02] transition-transform", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4" }),
      saved ? "Saved ✓" : "Save Changes"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: onReset, className: "inline-flex items-center gap-2 rounded-md border border-border px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:border-foreground/50 transition-colors", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-3.5 w-3.5" }),
      "Reset"
    ] })
  ] });
}
function DashboardPanel() {
  const stats = [{
    label: "Total Sections",
    value: "9",
    sub: "Page sections"
  }, {
    label: "Products",
    value: "6",
    sub: "Flavor variants"
  }, {
    label: "Customizable",
    value: "100%",
    sub: "No code needed"
  }, {
    label: "Status",
    value: "Live",
    sub: "Deployed on Vercel",
    accent: true
  }];
  const quickLinks = [{
    id: "hero",
    label: "Hero Banner",
    desc: "Edit headline, tagline & CTA",
    icon: Zap
  }, {
    id: "flavors",
    label: "Flavors",
    desc: "Manage flavor names & details",
    icon: FlaskConical
  }, {
    id: "branding",
    label: "Branding",
    desc: "Colors, logo & typography",
    icon: Palette
  }, {
    id: "seo",
    label: "SEO & Meta",
    desc: "Page title, description & OG",
    icon: Globe
  }, {
    id: "products",
    label: "Products",
    desc: "Pricing & availability",
    icon: ShoppingBag
  }, {
    id: "newsletter",
    label: "Newsletter",
    desc: "Email CTA text & incentive",
    icon: Megaphone
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Panel, { title: "Dashboard", subtitle: "Overview of your XTREAM admin panel.", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: stats.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `text-3xl font-display font-bold ${s.accent ? "text-primary" : ""}`, children: s.value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium", children: s.label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: s.sub })
    ] }, s.label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { title: "Quick Edit", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3", children: quickLinks.map((ql) => {
      const Icon = ql.icon;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "group text-left rounded-lg border border-border bg-background/40 p-4 hover:border-primary/60 hover:bg-primary/5 transition-all", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5 text-primary mb-3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold group-hover:text-primary transition-colors", children: ql.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-0.5", children: ql.desc })
      ] }, ql.id);
    }) }) })
  ] });
}
function HeroPanel() {
  const [vals, setVals] = reactExports.useState({
    badge: "New Drop // V.06",
    headline1: "FUEL",
    headline2: "THE",
    headline3: "IMPOSSIBLE",
    tagline: "Premium Energy. Zero Compromise. 300mg caffeine, nootropic stack, BCAAs — engineered for the relentless.",
    cta1: "Shop Now",
    cta2: "Explore Flavors",
    stat1Label: "Caffeine",
    stat1Value: "300mg",
    stat2Label: "Sugar",
    stat2Value: "0g",
    stat3Label: "Per Can",
    stat3Value: "10kcal",
    announcementBar: "⚡ Free shipping on orders over $50 ⚡ Limited drop live now"
  });
  const set = (k) => (e) => setVals((v) => ({
    ...v,
    [k]: e.target.value
  }));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Panel, { title: "Hero Banner", subtitle: "Top section of the homepage — headline, tagline and CTAs.", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { title: "Announcement Bar", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Bar Text", hint: "The marquee strip shown at very top of the page.", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: vals.announcementBar, onChange: set("announcementBar") }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { title: "Badge & Headline", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Badge Label", hint: 'Small pill above the headline, e.g. "New Drop // V.06"', children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: vals.badge, onChange: set("badge") }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3", children: ["headline1", "headline2", "headline3"].map((k, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: `Word ${i + 1}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: vals[k], onChange: set(k), className: "uppercase font-display" }) }, k)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { title: "Tagline & CTAs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Tagline", hint: "Paragraph below the headline.", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: vals.tagline, onChange: set("tagline") }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Primary CTA", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: vals.cta1, onChange: set("cta1") }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Secondary CTA", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: vals.cta2, onChange: set("cta2") }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { title: "Quick Stats Strip", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3", children: [["stat1Value", "stat1Label"], ["stat2Value", "stat2Label"], ["stat3Value", "stat3Label"]].map(([vk, lk], i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: `Stat ${i + 1} Value`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: vals[vk], onChange: set(vk) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Label", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: vals[lk], onChange: set(lk) }) })
    ] }, i)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SaveBar, { onSave: () => {
    }, onReset: () => {
    } })
  ] });
}
const DEFAULT_FLAVORS = [{
  name: "Neon Surge",
  tag: "Original",
  hex: "#39FF14",
  notes: "Citrus blast with electrolyte kick",
  price: "$3.99"
}, {
  name: "Arctic Bolt",
  tag: "Frost",
  hex: "#00D4FF",
  notes: "Frozen mint with arctic berry",
  price: "$3.99"
}, {
  name: "Solar Flare",
  tag: "Heat",
  hex: "#FFB000",
  notes: "Tropical mango with habanero heat",
  price: "$3.99"
}, {
  name: "Midnight Pulse",
  tag: "Dark",
  hex: "#BF00FF",
  notes: "Dark grape with açaí thunder",
  price: "$3.99"
}, {
  name: "Zero Gravity",
  tag: "Clean",
  hex: "#C0C0C0",
  notes: "Pure clean energy, precision tuned",
  price: "$3.99"
}, {
  name: "Blood Rush",
  tag: "Crimson",
  hex: "#FF0066",
  notes: "Pomegranate with blood orange fury",
  price: "$3.99"
}];
function FlavorsPanel() {
  const [flavors, setFlavors] = reactExports.useState(DEFAULT_FLAVORS);
  const update = (i, k, v) => setFlavors((rows) => rows.map((r, idx) => idx === i ? {
    ...r,
    [k]: v
  } : r));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Panel, { title: "Flavors", subtitle: "Edit each flavor's display name, tag, accent color, description and price.", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: flavors.map((f, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { title: `Flavor ${i + 1}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Name", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: f.name, onChange: (e) => update(i, "name", e.target.value) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Tag / Sub-label", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: f.tag, onChange: (e) => update(i, "tag", e.target.value) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Accent Color (hex)", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "color", value: f.hex, onChange: (e) => update(i, "hex", e.target.value), className: "h-10 w-14 rounded cursor-pointer border border-border bg-transparent p-0.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: f.hex, onChange: (e) => update(i, "hex", e.target.value), className: "font-mono" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Price", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: f.price, onChange: (e) => update(i, "price", e.target.value), className: "font-mono" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Tasting Notes", hint: "Shown on the flavor card.", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: f.notes, onChange: (e) => update(i, "notes", e.target.value), className: "sm:col-span-2" }) })
    ] }) }, i)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SaveBar, { onSave: () => {
    }, onReset: () => setFlavors(DEFAULT_FLAVORS) })
  ] });
}
const DEFAULT_INGREDIENTS = [{
  label: "Caffeine",
  value: "300",
  unit: "mg",
  desc: "Precision-dosed for maximum alertness"
}, {
  label: "Nootropics",
  value: "200",
  unit: "mg",
  desc: "L-Theanine + Alpha-GPC for razor focus"
}, {
  label: "BCAAs",
  value: "5",
  unit: "g",
  desc: "Muscle recovery meets hydration"
}, {
  label: "Sugar",
  value: "0",
  unit: "g",
  desc: "All power. No crash. No compromise."
}, {
  label: "Natural Flavor",
  value: "100",
  unit: "%",
  desc: "Clean ingredients you can pronounce"
}, {
  label: "B-Complex",
  value: "6",
  unit: "x",
  desc: "B6, B12, Niacin — cellular fuel"
}];
function IngredientsPanel() {
  const [rows, setRows] = reactExports.useState(DEFAULT_INGREDIENTS);
  const update = (i, k, v) => setRows((rs) => rs.map((r, idx) => idx === i ? {
    ...r,
    [k]: v
  } : r));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Panel, { title: "Ingredients / Formula", subtitle: 'Numbers and descriptions shown in the "Engineered. Not Mixed." section.', children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: rows.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { title: `Ingredient ${i + 1}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Label", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: r.label, onChange: (e) => update(i, "label", e.target.value) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Value", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: r.value, onChange: (e) => update(i, "value", e.target.value), className: "font-mono" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Unit", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: r.unit, onChange: (e) => update(i, "unit", e.target.value), className: "font-mono" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Description", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: r.desc, onChange: (e) => update(i, "desc", e.target.value) }) })
    ] }, i)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SaveBar, { onSave: () => {
    }, onReset: () => setRows(DEFAULT_INGREDIENTS) })
  ] });
}
const DEFAULT_STATS = [{
  value: "10",
  suffix: "M+",
  label: "Cans Sold"
}, {
  value: "50",
  suffix: "+",
  label: "Countries"
}, {
  value: "500",
  suffix: "K+",
  label: "Community"
}, {
  value: "4.9",
  suffix: "★",
  label: "Rating"
}];
const DEFAULT_PRESS = ["ESPN", "GQ", "Men's Health", "TechCrunch", "Rolling Stone", "Forbes", "Wired", "Hypebeast"];
function StatsPanel() {
  const [stats, setStats] = reactExports.useState(DEFAULT_STATS);
  const [press, setPress] = reactExports.useState(DEFAULT_PRESS.join(", "));
  const updateStat = (i, k, v) => setStats((rs) => rs.map((r, idx) => idx === i ? {
    ...r,
    [k]: v
  } : r));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Panel, { title: "Stats & Social Proof", subtitle: "Numbers displayed in the community section and the press marquee.", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { title: "Counter Stats", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: stats.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Value", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: s.value, onChange: (e) => updateStat(i, "value", e.target.value), className: "font-mono" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Suffix", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: s.suffix, onChange: (e) => updateStat(i, "suffix", e.target.value), className: "font-mono" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Label", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: s.label, onChange: (e) => updateStat(i, "label", e.target.value) }) })
    ] }, i)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { title: "Press Marquee", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Publication Names", hint: "Comma-separated list. These scroll across the 'As Seen In' strip.", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: press, onChange: (e) => setPress(e.target.value), rows: 2 }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SaveBar, { onSave: () => {
    }, onReset: () => {
      setStats(DEFAULT_STATS);
      setPress(DEFAULT_PRESS.join(", "));
    } })
  ] });
}
function ProductsPanel() {
  const [singlePrice, setSinglePrice] = reactExports.useState("3.99");
  const [bundlePrice, setBundlePrice] = reactExports.useState("19.99");
  const [bundleCount, setBundleCount] = reactExports.useState("6");
  const [subDiscount, setSubDiscount] = reactExports.useState("15");
  const [cartCta, setCartCta] = reactExports.useState("Add to Cart");
  const [shopCta, setShopCta] = reactExports.useState("Shop Now");
  const [shippingThreshold, setShippingThreshold] = reactExports.useState("50");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Panel, { title: "Products & Pricing", subtitle: "Configure pricing, bundle options and shopping CTAs.", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { title: "Pricing", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Single Can Price ($)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: singlePrice, onChange: (e) => setSinglePrice(e.target.value), className: "font-mono", type: "number", step: "0.01" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Bundle Price ($)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: bundlePrice, onChange: (e) => setBundlePrice(e.target.value), className: "font-mono", type: "number", step: "0.01" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Bundle Size (cans)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: bundleCount, onChange: (e) => setBundleCount(e.target.value), className: "font-mono", type: "number" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Subscription Discount (%)", hint: "Shown on subscribe & save option.", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: subDiscount, onChange: (e) => setSubDiscount(e.target.value), className: "font-mono w-32", type: "number" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { title: "CTAs & Shipping", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Add to Cart Button Text", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: cartCta, onChange: (e) => setCartCta(e.target.value) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Shop Button Text", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: shopCta, onChange: (e) => setShopCta(e.target.value) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Free Shipping Threshold ($)", hint: "Shown in announcement bar and footer.", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: shippingThreshold, onChange: (e) => setShippingThreshold(e.target.value), className: "font-mono", type: "number" }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SaveBar, { onSave: () => {
    }, onReset: () => {
    } })
  ] });
}
function NewsletterPanel() {
  const [vals, setVals] = reactExports.useState({
    badge: "// Enlist",
    headline: "Join the XTREAM nation.",
    subtext: "10% off your first order. Early access to drops. Zero spam, ever.",
    placeholder: "your@email.com",
    btnText: "Get 10% Off",
    successText: "⚡ You're In",
    discount: "10"
  });
  const set = (k) => (e) => setVals((v) => ({
    ...v,
    [k]: e.target.value
  }));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Panel, { title: "Newsletter Section", subtitle: 'Controls the "Join the XTREAM nation" email capture section.', children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { title: "Copy", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Section Badge", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: vals.badge, onChange: set("badge") }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Headline", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: vals.headline, onChange: set("headline") }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Subtext", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: vals.subtext, onChange: set("subtext"), rows: 2 }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { title: "Form", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Input Placeholder", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: vals.placeholder, onChange: set("placeholder") }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Button Text", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: vals.btnText, onChange: set("btnText") }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Success State Text", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: vals.successText, onChange: set("successText") }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Discount Percentage", hint: "Used in copy.", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: vals.discount, onChange: set("discount"), className: "font-mono w-24", type: "number" }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SaveBar, { onSave: () => {
    }, onReset: () => {
    } })
  ] });
}
function FooterPanel() {
  const [tagline, setTagline] = reactExports.useState("Premium energy. Zero compromise. Built for the relentless.");
  const [copyright, setCopyright] = reactExports.useState("© 2026 XTREAM Energy · All rights reserved");
  const [motto, setMotto] = reactExports.useState("Fuel the impossible.");
  const [socialInstagram, setSocialInstagram] = reactExports.useState("#");
  const [socialYoutube, setSocialYoutube] = reactExports.useState("#");
  const [socialTwitter, setSocialTwitter] = reactExports.useState("#");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Panel, { title: "Footer", subtitle: "Edit footer tagline, copyright text, and social links.", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { title: "Branding Text", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Brand Tagline", hint: "Short line below the logo.", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: tagline, onChange: (e) => setTagline(e.target.value) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Copyright Line", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: copyright, onChange: (e) => setCopyright(e.target.value) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Footer Motto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: motto, onChange: (e) => setMotto(e.target.value) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { title: "Social Links", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Instagram URL", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: socialInstagram, onChange: (e) => setSocialInstagram(e.target.value) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "YouTube URL", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: socialYoutube, onChange: (e) => setSocialYoutube(e.target.value) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Twitter / X URL", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: socialTwitter, onChange: (e) => setSocialTwitter(e.target.value) }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SaveBar, { onSave: () => {
    }, onReset: () => {
    } })
  ] });
}
function BrandingPanel() {
  const [vals, setVals] = reactExports.useState({
    logoText: "XTREAM",
    primaryColor: "#39FF14",
    bgColor: "#0a0a0a",
    fontDisplay: "Bebas Neue",
    fontBody: "Space Grotesk",
    navLinks: "Shop, Flavors, Science, Community"
  });
  const set = (k) => (e) => setVals((v) => ({
    ...v,
    [k]: e.target.value
  }));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Panel, { title: "Branding", subtitle: "Colors, logo text, fonts, and navigation links.", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { title: "Colors", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Primary / Neon Accent", hint: "Main brand color used for glows, buttons and highlights.", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "color", value: vals.primaryColor, onChange: (e) => setVals((v) => ({
          ...v,
          primaryColor: e.target.value
        })), className: "h-10 w-14 rounded cursor-pointer border border-border bg-transparent p-0.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: vals.primaryColor, onChange: set("primaryColor"), className: "font-mono" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Background Color", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "color", value: vals.bgColor, onChange: (e) => setVals((v) => ({
          ...v,
          bgColor: e.target.value
        })), className: "h-10 w-14 rounded cursor-pointer border border-border bg-transparent p-0.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: vals.bgColor, onChange: set("bgColor"), className: "font-mono" })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { title: "Logo & Typography", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Logo Text", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: vals.logoText, onChange: set("logoText"), className: "font-display uppercase" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Display Font", hint: "Used for headlines.", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: vals.fontDisplay, onChange: set("fontDisplay") }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Body Font", hint: "Used for paragraphs and UI.", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: vals.fontBody, onChange: set("fontBody") }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { title: "Navigation", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Nav Links", hint: "Comma-separated list of nav items.", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: vals.navLinks, onChange: set("navLinks") }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SaveBar, { onSave: () => {
    }, onReset: () => {
    } })
  ] });
}
function SeoPanel() {
  const [vals, setVals] = reactExports.useState({
    title: "XTREAM — Fuel The Impossible",
    description: "Premium energy drink. 300mg caffeine. Zero sugar. Six explosive flavors. Built for those who refuse to slow down.",
    ogTitle: "XTREAM — Fuel The Impossible",
    ogDescription: "Premium energy. Zero compromise.",
    twitterCard: "summary_large_image",
    canonical: "/",
    author: "XTREAM"
  });
  const set = (k) => (e) => setVals((v) => ({
    ...v,
    [k]: e.target.value
  }));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Panel, { title: "SEO & Meta", subtitle: "Page title, meta description, Open Graph and Twitter card tags.", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { title: "Basic Meta", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { label: "Page Title", hint: "<title> tag. Keep under 60 characters.", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: vals.title, onChange: set("title") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
          vals.title.length,
          " / 60 chars"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { label: "Meta Description", hint: "Shown in search results. Keep under 160 characters.", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: vals.description, onChange: set("description"), rows: 2 }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
          vals.description.length,
          " / 160 chars"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Author", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: vals.author, onChange: set("author") }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Canonical URL", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: vals.canonical, onChange: set("canonical") }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { title: "Open Graph (Social Sharing)", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "OG Title", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: vals.ogTitle, onChange: set("ogTitle") }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "OG Description", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: vals.ogDescription, onChange: set("ogDescription"), rows: 2 }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { title: "Twitter / X Card", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Card Type", hint: "summary_large_image is recommended.", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: vals.twitterCard, onChange: set("twitterCard"), className: "font-mono" }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SaveBar, { onSave: () => {
    }, onReset: () => {
    } })
  ] });
}
function SettingsPanel({
  email,
  onSignOut
}) {
  const [maintenance, setMaintenance] = reactExports.useState(false);
  const [analyticsId, setAnalyticsId] = reactExports.useState("");
  const [hotjarId, setHotjarId] = reactExports.useState("");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Panel, { title: "Settings", subtitle: "Site-wide configuration, admin account, and integrations.", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { title: "Admin Account", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 rounded-full bg-primary/20 grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-lg text-primary uppercase", children: email?.[0] ?? "A" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: email }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground font-mono", children: "Administrator" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: onSignOut, className: "inline-flex items-center gap-2 rounded-md border border-red-500/40 text-red-400 px-4 py-2.5 text-sm hover:bg-red-500/10 transition-colors", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" }),
        " Sign Out"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { title: "Site Mode", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { label: "Maintenance Mode", hint: "When enabled, visitors see a 'Coming Soon' page.", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setMaintenance((v) => !v), className: `relative inline-flex h-6 w-11 rounded-full transition-colors ${maintenance ? "bg-primary" : "bg-border"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-block h-5 w-5 rounded-full bg-white shadow transition-transform mt-0.5 ${maintenance ? "translate-x-5" : "translate-x-0.5"}` }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `ml-3 text-sm font-medium ${maintenance ? "text-primary" : "text-muted-foreground"}`, children: maintenance ? "Maintenance ON" : "Site Live" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { title: "Analytics Integrations", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Google Analytics ID", hint: "e.g. G-XXXXXXXXXX", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: analyticsId, onChange: (e) => setAnalyticsId(e.target.value), className: "font-mono", placeholder: "G-XXXXXXXXXX" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Hotjar Site ID", hint: "Numeric ID from Hotjar dashboard.", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: hotjarId, onChange: (e) => setHotjarId(e.target.value), className: "font-mono", placeholder: "1234567" }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SaveBar, { onSave: () => {
    }, onReset: () => {
    } })
  ] });
}
function AdminDashboard({
  token,
  email,
  onSignOut
}) {
  const [section, setSection] = reactExports.useState("dashboard");
  const [collapsed, setCollapsed] = reactExports.useState(false);
  function renderPanel() {
    switch (section) {
      case "dashboard":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardPanel, {});
      case "hero":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(HeroPanel, {});
      case "flavors":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(FlavorsPanel, {});
      case "ingredients":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(IngredientsPanel, {});
      case "stats":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(StatsPanel, {});
      case "products":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(ProductsPanel, {});
      case "newsletter":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(NewsletterPanel, {});
      case "footer":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(FooterPanel, {});
      case "branding":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(BrandingPanel, {});
      case "seo":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(SeoPanel, {});
      case "settings":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsPanel, { email, onSignOut });
      default:
        return /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardPanel, {});
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground flex", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Sidebar, { active: section, onNav: setSection, email, onSignOut, collapsed, onToggle: () => setCollapsed((v) => !v) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: `flex-1 min-h-screen transition-all duration-300 ${collapsed ? "ml-16" : "ml-60"}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "sticky top-0 z-30 flex h-16 items-center border-b border-border bg-background/80 backdrop-blur-xl px-6 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[10px] uppercase tracking-[0.35em] text-muted-foreground", children: "Admin Console" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "/", target: "_blank", rel: "noreferrer", className: "inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors font-mono uppercase tracking-widest", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "h-3.5 w-3.5" }),
          "View Site"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 md:p-8 max-w-5xl", children: renderPanel() })
    ] })
  ] });
}
function AdminPage() {
  const [token, setToken] = reactExports.useState(() => {
    if (typeof window === "undefined") return null;
    return window.localStorage.getItem("admin_token");
  });
  const [email, setEmail] = reactExports.useState(() => {
    if (typeof window === "undefined") return "";
    return window.localStorage.getItem("admin_email") ?? "";
  });
  function handleAuthed(t, e) {
    setToken(t);
    setEmail(e);
  }
  function handleSignOut() {
    window.localStorage.removeItem("admin_token");
    window.localStorage.removeItem("admin_email");
    setToken(null);
    setEmail("");
  }
  if (!token) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(LoginScreen, { onAuthed: handleAuthed });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminDashboard, { token, email, onSignOut: handleSignOut });
}
export {
  AdminPage as component
};
