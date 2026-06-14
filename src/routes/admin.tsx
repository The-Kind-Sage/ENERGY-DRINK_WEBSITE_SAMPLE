import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  LayoutDashboard, Zap, FlaskConical, ShoppingBag, Megaphone,
  Image, FileText, Users, Settings, LogOut, Menu, X, ChevronRight,
  Save, RotateCcw, Eye, EyeOff, Palette, Globe, Package,
} from "lucide-react";

import { adminLoginFn } from "@/lib/api/admin.functions";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

/* ─── Types ─────────────────────────────────────────── */
type Section =
  | "dashboard"
  | "hero"
  | "flavors"
  | "ingredients"
  | "stats"
  | "products"
  | "newsletter"
  | "footer"
  | "branding"
  | "seo"
  | "settings";

interface NavItem {
  id: Section;
  label: string;
  icon: React.ElementType;
  badge?: string;
}

/* ─── Sidebar nav config ─────────────────────────────── */
const NAV_GROUPS: { heading: string; items: NavItem[] }[] = [
  {
    heading: "Overview",
    items: [
      { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    ],
  },
  {
    heading: "Page Sections",
    items: [
      { id: "hero",        label: "Hero Banner",   icon: Zap },
      { id: "flavors",     label: "Flavors",       icon: FlaskConical },
      { id: "ingredients", label: "Ingredients",   icon: FlaskConical },
      { id: "stats",       label: "Stats / Social",icon: Users },
      { id: "products",    label: "Products",      icon: Package },
      { id: "newsletter",  label: "Newsletter",    icon: Megaphone },
      { id: "footer",      label: "Footer",        icon: FileText },
    ],
  },
  {
    heading: "Site Settings",
    items: [
      { id: "branding",  label: "Branding",  icon: Palette },
      { id: "seo",       label: "SEO & Meta", icon: Globe },
      { id: "settings",  label: "Settings",   icon: Settings },
    ],
  },
];

/* ══════════════════════════════════════════════════════
   LOGIN SCREEN
══════════════════════════════════════════════════════ */
function LoginScreen({ onAuthed }: { onAuthed: (token: string, email: string) => void }) {
  const [email, setEmail]     = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw]   = useState(false);
  const [error, setError]     = useState<string | null>(null);
  const [busy, setBusy]       = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await adminLoginFn({ data: { email, password } });
      if (!res.ok) { setError(res.reason); return; }
      window.localStorage.setItem("admin_token", res.token);
      window.localStorage.setItem("admin_email", email);
      onAuthed(res.token, email);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4"
      style={{ background: "radial-gradient(ellipse at 50% 40%, oklch(0.18 0.06 142 / 0.5), oklch(0.08 0 0) 65%)" }}>
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="font-display text-5xl tracking-wider mb-1">
            X<span className="text-primary" style={{ textShadow: "0 0 20px var(--neon)" }}>T</span>REAM
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">Admin Console</div>
        </div>

        <form onSubmit={handleLogin}
          className="rounded-xl border border-border bg-card/40 backdrop-blur-xl p-8 space-y-5 shadow-2xl">
          <div>
            <label className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">
              Email
            </label>
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-border bg-background/60 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
              placeholder="admin@xtream.com"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-border bg-background/60 px-4 py-3 pr-11 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                placeholder="••••••••"
              />
              <button type="button" tabIndex={-1}
                onClick={() => setShowPw((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="rounded-md border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={busy || !email || !password}
            className="w-full rounded-md bg-primary text-primary-foreground py-3 text-sm font-bold uppercase tracking-widest shadow-neon hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:scale-100"
          >
            {busy ? "Signing in…" : "Sign In"}
          </button>
        </form>

        <p className="text-center mt-6 text-xs text-muted-foreground font-mono">
          Access restricted to authorized admins only.
        </p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SIDEBAR
══════════════════════════════════════════════════════ */
function Sidebar({
  active, onNav, email, onSignOut, collapsed, onToggle,
}: {
  active: Section;
  onNav: (s: Section) => void;
  email: string;
  onSignOut: () => void;
  collapsed: boolean;
  onToggle: () => void;
}) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 flex flex-col border-r border-border bg-card/60 backdrop-blur-xl transition-all duration-300 ${
        collapsed ? "w-16" : "w-60"
      }`}>
      {/* Header */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-border shrink-0">
        {!collapsed && (
          <span className="font-display text-xl tracking-wider">
            X<span className="text-primary">T</span>REAM
          </span>
        )}
        <button
          onClick={onToggle}
          className="ml-auto rounded-md p-1.5 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          aria-label="Toggle sidebar">
          {collapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 space-y-5 px-2">
        {NAV_GROUPS.map((group) => (
          <div key={group.heading}>
            {!collapsed && (
              <div className="px-2 mb-1.5 font-mono text-[9px] uppercase tracking-[0.35em] text-muted-foreground/60">
                {group.heading}
              </div>
            )}
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = active === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onNav(item.id)}
                    title={collapsed ? item.label : undefined}
                    className={`w-full flex items-center gap-3 rounded-md px-2.5 py-2 text-sm transition-colors ${
                      isActive
                        ? "bg-primary/15 text-primary font-medium"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/60"
                    }`}>
                    <Icon className={`h-4 w-4 shrink-0 ${isActive ? "text-primary" : ""}`} />
                    {!collapsed && <span className="truncate">{item.label}</span>}
                    {!collapsed && isActive && <ChevronRight className="h-3 w-3 ml-auto opacity-60" />}
                    {!collapsed && item.badge && (
                      <span className="ml-auto rounded-full bg-primary/20 text-primary px-1.5 py-0.5 text-[10px] font-mono">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer: user + signout */}
      <div className="shrink-0 border-t border-border p-3">
        {!collapsed ? (
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-primary/20 grid place-items-center shrink-0">
              <span className="font-mono text-xs text-primary font-bold uppercase">
                {email?.[0] ?? "A"}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-medium truncate">{email || "Admin"}</div>
              <div className="text-[10px] text-muted-foreground font-mono">Administrator</div>
            </div>
            <button onClick={onSignOut} title="Sign out"
              className="shrink-0 rounded-md p-1.5 text-muted-foreground hover:text-red-400 transition-colors">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <button onClick={onSignOut} title="Sign out"
            className="w-full flex justify-center rounded-md p-1.5 text-muted-foreground hover:text-red-400 transition-colors">
            <LogOut className="h-4 w-4" />
          </button>
        )}
      </div>
    </aside>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION PANELS
══════════════════════════════════════════════════════ */

/* Shared wrapper */
function Panel({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

function Card({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card/40 backdrop-blur p-6 space-y-4">
      {title && <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground font-mono">{title}</h2>}
      {children}
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium">{label}</label>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      {children}
    </div>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full rounded-md border border-border bg-background/60 px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors ${props.className ?? ""}`}
    />
  );
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      rows={3}
      {...props}
      className={`w-full rounded-md border border-border bg-background/60 px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors resize-none ${props.className ?? ""}`}
    />
  );
}

function SaveBar({ onSave, onReset }: { onSave: () => void; onReset: () => void }) {
  const [saved, setSaved] = useState(false);
  function handleSave() {
    onSave();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }
  return (
    <div className="flex items-center gap-3 pt-2">
      <button
        onClick={handleSave}
        className="inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-5 py-2.5 text-sm font-bold uppercase tracking-widest shadow-neon hover:scale-[1.02] transition-transform">
        <Save className="h-4 w-4" />
        {saved ? "Saved ✓" : "Save Changes"}
      </button>
      <button
        onClick={onReset}
        className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:border-foreground/50 transition-colors">
        <RotateCcw className="h-3.5 w-3.5" />
        Reset
      </button>
    </div>
  );
}

/* ── Dashboard ───────────────────────────────────────── */
function DashboardPanel() {
  const stats = [
    { label: "Total Sections",  value: "9",     sub: "Page sections" },
    { label: "Products",        value: "6",     sub: "Flavor variants" },
    { label: "Customizable",    value: "100%",  sub: "No code needed" },
    { label: "Status",          value: "Live",  sub: "Deployed on Vercel", accent: true },
  ];
  const quickLinks: { id: Section; label: string; desc: string; icon: React.ElementType }[] = [
    { id: "hero",        label: "Hero Banner",   desc: "Edit headline, tagline & CTA",    icon: Zap },
    { id: "flavors",     label: "Flavors",       desc: "Manage flavor names & details",   icon: FlaskConical },
    { id: "branding",    label: "Branding",      desc: "Colors, logo & typography",       icon: Palette },
    { id: "seo",         label: "SEO & Meta",    desc: "Page title, description & OG",   icon: Globe },
    { id: "products",    label: "Products",      desc: "Pricing & availability",          icon: ShoppingBag },
    { id: "newsletter",  label: "Newsletter",    desc: "Email CTA text & incentive",     icon: Megaphone },
  ];
  return (
    <Panel title="Dashboard" subtitle="Overview of your XTREAM admin panel.">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <div className={`text-3xl font-display font-bold ${s.accent ? "text-primary" : ""}`}>{s.value}</div>
            <div className="text-sm font-medium">{s.label}</div>
            <div className="text-xs text-muted-foreground">{s.sub}</div>
          </Card>
        ))}
      </div>
      <Card title="Quick Edit">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {quickLinks.map((ql) => {
            const Icon = ql.icon;
            return (
              <button key={ql.id}
                className="group text-left rounded-lg border border-border bg-background/40 p-4 hover:border-primary/60 hover:bg-primary/5 transition-all">
                <Icon className="h-5 w-5 text-primary mb-3" />
                <div className="text-sm font-semibold group-hover:text-primary transition-colors">{ql.label}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{ql.desc}</div>
              </button>
            );
          })}
        </div>
      </Card>
    </Panel>
  );
}

/* ── Hero ────────────────────────────────────────────── */
function HeroPanel() {
  const [vals, setVals] = useState({
    badge: "New Drop // V.06",
    headline1: "FUEL",
    headline2: "THE",
    headline3: "IMPOSSIBLE",
    tagline: "Premium Energy. Zero Compromise. 300mg caffeine, nootropic stack, BCAAs — engineered for the relentless.",
    cta1: "Shop Now",
    cta2: "Explore Flavors",
    stat1Label: "Caffeine", stat1Value: "300mg",
    stat2Label: "Sugar",    stat2Value: "0g",
    stat3Label: "Per Can",  stat3Value: "10kcal",
    announcementBar: "⚡ Free shipping on orders over $50 ⚡ Limited drop live now",
  });
  const set = (k: keyof typeof vals) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setVals((v) => ({ ...v, [k]: e.target.value }));

  return (
    <Panel title="Hero Banner" subtitle="Top section of the homepage — headline, tagline and CTAs.">
      <Card title="Announcement Bar">
        <Field label="Bar Text" hint="The marquee strip shown at very top of the page.">
          <Input value={vals.announcementBar} onChange={set("announcementBar")} />
        </Field>
      </Card>

      <Card title="Badge & Headline">
        <Field label="Badge Label" hint='Small pill above the headline, e.g. "New Drop // V.06"'>
          <Input value={vals.badge} onChange={set("badge")} />
        </Field>
        <div className="grid grid-cols-3 gap-3">
          {(["headline1", "headline2", "headline3"] as const).map((k, i) => (
            <Field key={k} label={`Word ${i + 1}`}>
              <Input value={vals[k]} onChange={set(k)} className="uppercase font-display" />
            </Field>
          ))}
        </div>
      </Card>

      <Card title="Tagline & CTAs">
        <Field label="Tagline" hint="Paragraph below the headline.">
          <Textarea value={vals.tagline} onChange={set("tagline")} />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Primary CTA"><Input value={vals.cta1} onChange={set("cta1")} /></Field>
          <Field label="Secondary CTA"><Input value={vals.cta2} onChange={set("cta2")} /></Field>
        </div>
      </Card>

      <Card title="Quick Stats Strip">
        <div className="grid grid-cols-3 gap-3">
          {([["stat1Value","stat1Label"],["stat2Value","stat2Label"],["stat3Value","stat3Label"]] as const).map(([vk, lk], i) => (
            <div key={i} className="space-y-2">
              <Field label={`Stat ${i+1} Value`}><Input value={vals[vk]} onChange={set(vk)} /></Field>
              <Field label="Label"><Input value={vals[lk]} onChange={set(lk)} /></Field>
            </div>
          ))}
        </div>
      </Card>

      <SaveBar onSave={() => {}} onReset={() => {}} />
    </Panel>
  );
}

/* ── Flavors ─────────────────────────────────────────── */
const DEFAULT_FLAVORS = [
  { name: "Neon Surge",     tag: "Original", hex: "#39FF14", notes: "Citrus blast with electrolyte kick",    price: "$3.99" },
  { name: "Arctic Bolt",    tag: "Frost",    hex: "#00D4FF", notes: "Frozen mint with arctic berry",         price: "$3.99" },
  { name: "Solar Flare",    tag: "Heat",     hex: "#FFB000", notes: "Tropical mango with habanero heat",     price: "$3.99" },
  { name: "Midnight Pulse", tag: "Dark",     hex: "#BF00FF", notes: "Dark grape with açaí thunder",          price: "$3.99" },
  { name: "Zero Gravity",   tag: "Clean",    hex: "#C0C0C0", notes: "Pure clean energy, precision tuned",    price: "$3.99" },
  { name: "Blood Rush",     tag: "Crimson",  hex: "#FF0066", notes: "Pomegranate with blood orange fury",    price: "$3.99" },
];
type FlavorRow = typeof DEFAULT_FLAVORS[0];

function FlavorsPanel() {
  const [flavors, setFlavors] = useState<FlavorRow[]>(DEFAULT_FLAVORS);
  const update = (i: number, k: keyof FlavorRow, v: string) =>
    setFlavors((rows) => rows.map((r, idx) => idx === i ? { ...r, [k]: v } : r));

  return (
    <Panel title="Flavors" subtitle="Edit each flavor's display name, tag, accent color, description and price.">
      <div className="space-y-4">
        {flavors.map((f, i) => (
          <Card key={i} title={`Flavor ${i + 1}`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Name">
                <Input value={f.name} onChange={(e) => update(i, "name", e.target.value)} />
              </Field>
              <Field label="Tag / Sub-label">
                <Input value={f.tag} onChange={(e) => update(i, "tag", e.target.value)} />
              </Field>
              <Field label="Accent Color (hex)">
                <div className="flex gap-2 items-center">
                  <input type="color" value={f.hex}
                    onChange={(e) => update(i, "hex", e.target.value)}
                    className="h-10 w-14 rounded cursor-pointer border border-border bg-transparent p-0.5" />
                  <Input value={f.hex} onChange={(e) => update(i, "hex", e.target.value)} className="font-mono" />
                </div>
              </Field>
              <Field label="Price">
                <Input value={f.price} onChange={(e) => update(i, "price", e.target.value)} className="font-mono" />
              </Field>
              <Field label="Tasting Notes" hint="Shown on the flavor card.">
                <Input value={f.notes} onChange={(e) => update(i, "notes", e.target.value)} className="sm:col-span-2" />
              </Field>
            </div>
          </Card>
        ))}
      </div>
      <SaveBar onSave={() => {}} onReset={() => setFlavors(DEFAULT_FLAVORS)} />
    </Panel>
  );
}

/* ── Ingredients ─────────────────────────────────────── */
const DEFAULT_INGREDIENTS = [
  { label: "Caffeine",      value: "300", unit: "mg", desc: "Precision-dosed for maximum alertness" },
  { label: "Nootropics",    value: "200", unit: "mg", desc: "L-Theanine + Alpha-GPC for razor focus" },
  { label: "BCAAs",         value: "5",   unit: "g",  desc: "Muscle recovery meets hydration" },
  { label: "Sugar",         value: "0",   unit: "g",  desc: "All power. No crash. No compromise." },
  { label: "Natural Flavor",value: "100", unit: "%",  desc: "Clean ingredients you can pronounce" },
  { label: "B-Complex",     value: "6",   unit: "x",  desc: "B6, B12, Niacin — cellular fuel" },
];
type IngRow = typeof DEFAULT_INGREDIENTS[0];

function IngredientsPanel() {
  const [rows, setRows] = useState<IngRow[]>(DEFAULT_INGREDIENTS);
  const update = (i: number, k: keyof IngRow, v: string) =>
    setRows((rs) => rs.map((r, idx) => idx === i ? { ...r, [k]: v } : r));

  return (
    <Panel title="Ingredients / Formula" subtitle='Numbers and descriptions shown in the "Engineered. Not Mixed." section.'>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {rows.map((r, i) => (
          <Card key={i} title={`Ingredient ${i + 1}`}>
            <div className="grid grid-cols-3 gap-2">
              <Field label="Label">
                <Input value={r.label} onChange={(e) => update(i, "label", e.target.value)} />
              </Field>
              <Field label="Value">
                <Input value={r.value} onChange={(e) => update(i, "value", e.target.value)} className="font-mono" />
              </Field>
              <Field label="Unit">
                <Input value={r.unit} onChange={(e) => update(i, "unit", e.target.value)} className="font-mono" />
              </Field>
            </div>
            <Field label="Description">
              <Input value={r.desc} onChange={(e) => update(i, "desc", e.target.value)} />
            </Field>
          </Card>
        ))}
      </div>
      <SaveBar onSave={() => {}} onReset={() => setRows(DEFAULT_INGREDIENTS)} />
    </Panel>
  );
}

/* ── Stats ───────────────────────────────────────────── */
const DEFAULT_STATS = [
  { value: "10", suffix: "M+", label: "Cans Sold" },
  { value: "50", suffix: "+",  label: "Countries" },
  { value: "500",suffix: "K+", label: "Community" },
  { value: "4.9",suffix: "★",  label: "Rating" },
];
const DEFAULT_PRESS = ["ESPN", "GQ", "Men's Health", "TechCrunch", "Rolling Stone", "Forbes", "Wired", "Hypebeast"];

function StatsPanel() {
  const [stats, setStats] = useState(DEFAULT_STATS);
  const [press, setPress] = useState(DEFAULT_PRESS.join(", "));
  const updateStat = (i: number, k: keyof typeof stats[0], v: string) =>
    setStats((rs) => rs.map((r, idx) => idx === i ? { ...r, [k]: v } : r));

  return (
    <Panel title="Stats & Social Proof" subtitle="Numbers displayed in the community section and the press marquee.">
      <Card title="Counter Stats">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <div key={i} className="space-y-2">
              <Field label="Value">
                <Input value={s.value} onChange={(e) => updateStat(i, "value", e.target.value)} className="font-mono" />
              </Field>
              <Field label="Suffix">
                <Input value={s.suffix} onChange={(e) => updateStat(i, "suffix", e.target.value)} className="font-mono" />
              </Field>
              <Field label="Label">
                <Input value={s.label} onChange={(e) => updateStat(i, "label", e.target.value)} />
              </Field>
            </div>
          ))}
        </div>
      </Card>

      <Card title="Press Marquee">
        <Field label="Publication Names" hint="Comma-separated list. These scroll across the 'As Seen In' strip.">
          <Textarea value={press} onChange={(e) => setPress(e.target.value)} rows={2} />
        </Field>
      </Card>

      <SaveBar onSave={() => {}} onReset={() => { setStats(DEFAULT_STATS); setPress(DEFAULT_PRESS.join(", ")); }} />
    </Panel>
  );
}

/* ── Products ────────────────────────────────────────── */
function ProductsPanel() {
  const [singlePrice, setSinglePrice]   = useState("3.99");
  const [bundlePrice, setBundlePrice]   = useState("19.99");
  const [bundleCount, setBundleCount]   = useState("6");
  const [subDiscount, setSubDiscount]   = useState("15");
  const [cartCta, setCartCta]           = useState("Add to Cart");
  const [shopCta, setShopCta]           = useState("Shop Now");
  const [shippingThreshold, setShippingThreshold] = useState("50");

  return (
    <Panel title="Products & Pricing" subtitle="Configure pricing, bundle options and shopping CTAs.">
      <Card title="Pricing">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Field label="Single Can Price ($)">
            <Input value={singlePrice} onChange={(e) => setSinglePrice(e.target.value)} className="font-mono" type="number" step="0.01" />
          </Field>
          <Field label="Bundle Price ($)">
            <Input value={bundlePrice} onChange={(e) => setBundlePrice(e.target.value)} className="font-mono" type="number" step="0.01" />
          </Field>
          <Field label="Bundle Size (cans)">
            <Input value={bundleCount} onChange={(e) => setBundleCount(e.target.value)} className="font-mono" type="number" />
          </Field>
        </div>
        <Field label="Subscription Discount (%)" hint="Shown on subscribe & save option.">
          <Input value={subDiscount} onChange={(e) => setSubDiscount(e.target.value)} className="font-mono w-32" type="number" />
        </Field>
      </Card>

      <Card title="CTAs & Shipping">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Add to Cart Button Text">
            <Input value={cartCta} onChange={(e) => setCartCta(e.target.value)} />
          </Field>
          <Field label="Shop Button Text">
            <Input value={shopCta} onChange={(e) => setShopCta(e.target.value)} />
          </Field>
          <Field label="Free Shipping Threshold ($)" hint="Shown in announcement bar and footer.">
            <Input value={shippingThreshold} onChange={(e) => setShippingThreshold(e.target.value)} className="font-mono" type="number" />
          </Field>
        </div>
      </Card>

      <SaveBar onSave={() => {}} onReset={() => {}} />
    </Panel>
  );
}

/* ── Newsletter ──────────────────────────────────────── */
function NewsletterPanel() {
  const [vals, setVals] = useState({
    badge: "// Enlist",
    headline: "Join the XTREAM nation.",
    subtext: "10% off your first order. Early access to drops. Zero spam, ever.",
    placeholder: "your@email.com",
    btnText: "Get 10% Off",
    successText: "⚡ You're In",
    discount: "10",
  });
  const set = (k: keyof typeof vals) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setVals((v) => ({ ...v, [k]: e.target.value }));

  return (
    <Panel title="Newsletter Section" subtitle='Controls the "Join the XTREAM nation" email capture section.'>
      <Card title="Copy">
        <Field label="Section Badge"><Input value={vals.badge} onChange={set("badge")} /></Field>
        <Field label="Headline"><Input value={vals.headline} onChange={set("headline")} /></Field>
        <Field label="Subtext"><Textarea value={vals.subtext} onChange={set("subtext")} rows={2} /></Field>
      </Card>

      <Card title="Form">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Input Placeholder"><Input value={vals.placeholder} onChange={set("placeholder")} /></Field>
          <Field label="Button Text"><Input value={vals.btnText} onChange={set("btnText")} /></Field>
          <Field label="Success State Text"><Input value={vals.successText} onChange={set("successText")} /></Field>
          <Field label="Discount Percentage" hint="Used in copy.">
            <Input value={vals.discount} onChange={set("discount")} className="font-mono w-24" type="number" />
          </Field>
        </div>
      </Card>

      <SaveBar onSave={() => {}} onReset={() => {}} />
    </Panel>
  );
}

/* ── Footer ──────────────────────────────────────────── */
function FooterPanel() {
  const [tagline, setTagline] = useState("Premium energy. Zero compromise. Built for the relentless.");
  const [copyright, setCopyright] = useState("© 2026 XTREAM Energy · All rights reserved");
  const [motto, setMotto] = useState("Fuel the impossible.");
  const [socialInstagram, setSocialInstagram] = useState("#");
  const [socialYoutube, setSocialYoutube]     = useState("#");
  const [socialTwitter, setSocialTwitter]     = useState("#");

  return (
    <Panel title="Footer" subtitle="Edit footer tagline, copyright text, and social links.">
      <Card title="Branding Text">
        <Field label="Brand Tagline" hint="Short line below the logo.">
          <Input value={tagline} onChange={(e) => setTagline(e.target.value)} />
        </Field>
        <Field label="Copyright Line">
          <Input value={copyright} onChange={(e) => setCopyright(e.target.value)} />
        </Field>
        <Field label="Footer Motto">
          <Input value={motto} onChange={(e) => setMotto(e.target.value)} />
        </Field>
      </Card>

      <Card title="Social Links">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Field label="Instagram URL"><Input value={socialInstagram} onChange={(e) => setSocialInstagram(e.target.value)} /></Field>
          <Field label="YouTube URL"><Input value={socialYoutube} onChange={(e) => setSocialYoutube(e.target.value)} /></Field>
          <Field label="Twitter / X URL"><Input value={socialTwitter} onChange={(e) => setSocialTwitter(e.target.value)} /></Field>
        </div>
      </Card>

      <SaveBar onSave={() => {}} onReset={() => {}} />
    </Panel>
  );
}

/* ── Branding ────────────────────────────────────────── */
function BrandingPanel() {
  const [vals, setVals] = useState({
    logoText: "XTREAM",
    primaryColor: "#39FF14",
    bgColor: "#0a0a0a",
    fontDisplay: "Bebas Neue",
    fontBody: "Space Grotesk",
    navLinks: "Shop, Flavors, Science, Community",
  });
  const set = (k: keyof typeof vals) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setVals((v) => ({ ...v, [k]: e.target.value }));

  return (
    <Panel title="Branding" subtitle="Colors, logo text, fonts, and navigation links.">
      <Card title="Colors">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Primary / Neon Accent" hint="Main brand color used for glows, buttons and highlights.">
            <div className="flex gap-2 items-center">
              <input type="color" value={vals.primaryColor}
                onChange={(e) => setVals((v) => ({ ...v, primaryColor: e.target.value }))}
                className="h-10 w-14 rounded cursor-pointer border border-border bg-transparent p-0.5" />
              <Input value={vals.primaryColor}
                onChange={set("primaryColor")} className="font-mono" />
            </div>
          </Field>
          <Field label="Background Color">
            <div className="flex gap-2 items-center">
              <input type="color" value={vals.bgColor}
                onChange={(e) => setVals((v) => ({ ...v, bgColor: e.target.value }))}
                className="h-10 w-14 rounded cursor-pointer border border-border bg-transparent p-0.5" />
              <Input value={vals.bgColor} onChange={set("bgColor")} className="font-mono" />
            </div>
          </Field>
        </div>
      </Card>

      <Card title="Logo & Typography">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Field label="Logo Text">
            <Input value={vals.logoText} onChange={set("logoText")} className="font-display uppercase" />
          </Field>
          <Field label="Display Font" hint="Used for headlines.">
            <Input value={vals.fontDisplay} onChange={set("fontDisplay")} />
          </Field>
          <Field label="Body Font" hint="Used for paragraphs and UI.">
            <Input value={vals.fontBody} onChange={set("fontBody")} />
          </Field>
        </div>
      </Card>

      <Card title="Navigation">
        <Field label="Nav Links" hint="Comma-separated list of nav items.">
          <Input value={vals.navLinks} onChange={set("navLinks")} />
        </Field>
      </Card>

      <SaveBar onSave={() => {}} onReset={() => {}} />
    </Panel>
  );
}

/* ── SEO ─────────────────────────────────────────────── */
function SeoPanel() {
  const [vals, setVals] = useState({
    title: "XTREAM — Fuel The Impossible",
    description: "Premium energy drink. 300mg caffeine. Zero sugar. Six explosive flavors. Built for those who refuse to slow down.",
    ogTitle: "XTREAM — Fuel The Impossible",
    ogDescription: "Premium energy. Zero compromise.",
    twitterCard: "summary_large_image",
    canonical: "/",
    author: "XTREAM",
  });
  const set = (k: keyof typeof vals) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setVals((v) => ({ ...v, [k]: e.target.value }));

  return (
    <Panel title="SEO & Meta" subtitle="Page title, meta description, Open Graph and Twitter card tags.">
      <Card title="Basic Meta">
        <Field label="Page Title" hint="<title> tag. Keep under 60 characters.">
          <Input value={vals.title} onChange={set("title")} />
          <p className="text-xs text-muted-foreground mt-1">{vals.title.length} / 60 chars</p>
        </Field>
        <Field label="Meta Description" hint="Shown in search results. Keep under 160 characters.">
          <Textarea value={vals.description} onChange={set("description")} rows={2} />
          <p className="text-xs text-muted-foreground mt-1">{vals.description.length} / 160 chars</p>
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Author"><Input value={vals.author} onChange={set("author")} /></Field>
          <Field label="Canonical URL"><Input value={vals.canonical} onChange={set("canonical")} /></Field>
        </div>
      </Card>

      <Card title="Open Graph (Social Sharing)">
        <Field label="OG Title"><Input value={vals.ogTitle} onChange={set("ogTitle")} /></Field>
        <Field label="OG Description"><Textarea value={vals.ogDescription} onChange={set("ogDescription")} rows={2} /></Field>
      </Card>

      <Card title="Twitter / X Card">
        <Field label="Card Type" hint="summary_large_image is recommended.">
          <Input value={vals.twitterCard} onChange={set("twitterCard")} className="font-mono" />
        </Field>
      </Card>

      <SaveBar onSave={() => {}} onReset={() => {}} />
    </Panel>
  );
}

/* ── Settings ────────────────────────────────────────── */
function SettingsPanel({ email, onSignOut }: { email: string; onSignOut: () => void }) {
  const [maintenance, setMaintenance] = useState(false);
  const [analyticsId, setAnalyticsId] = useState("");
  const [hotjarId, setHotjarId]       = useState("");

  return (
    <Panel title="Settings" subtitle="Site-wide configuration, admin account, and integrations.">
      <Card title="Admin Account">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-primary/20 grid place-items-center">
            <span className="font-display text-lg text-primary uppercase">{email?.[0] ?? "A"}</span>
          </div>
          <div>
            <div className="font-medium">{email}</div>
            <div className="text-xs text-muted-foreground font-mono">Administrator</div>
          </div>
        </div>
        <button onClick={onSignOut}
          className="inline-flex items-center gap-2 rounded-md border border-red-500/40 text-red-400 px-4 py-2.5 text-sm hover:bg-red-500/10 transition-colors">
          <LogOut className="h-4 w-4" /> Sign Out
        </button>
      </Card>

      <Card title="Site Mode">
        <Field label="Maintenance Mode" hint="When enabled, visitors see a 'Coming Soon' page.">
          <button
            onClick={() => setMaintenance((v) => !v)}
            className={`relative inline-flex h-6 w-11 rounded-full transition-colors ${
              maintenance ? "bg-primary" : "bg-border"
            }`}>
            <span className={`inline-block h-5 w-5 rounded-full bg-white shadow transition-transform mt-0.5 ${
              maintenance ? "translate-x-5" : "translate-x-0.5"
            }`} />
          </button>
          <span className={`ml-3 text-sm font-medium ${maintenance ? "text-primary" : "text-muted-foreground"}`}>
            {maintenance ? "Maintenance ON" : "Site Live"}
          </span>
        </Field>
      </Card>

      <Card title="Analytics Integrations">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Google Analytics ID" hint="e.g. G-XXXXXXXXXX">
            <Input value={analyticsId} onChange={(e) => setAnalyticsId(e.target.value)} className="font-mono" placeholder="G-XXXXXXXXXX" />
          </Field>
          <Field label="Hotjar Site ID" hint="Numeric ID from Hotjar dashboard.">
            <Input value={hotjarId} onChange={(e) => setHotjarId(e.target.value)} className="font-mono" placeholder="1234567" />
          </Field>
        </div>
      </Card>

      <SaveBar onSave={() => {}} onReset={() => {}} />
    </Panel>
  );
}

/* ══════════════════════════════════════════════════════
   DASHBOARD SHELL
══════════════════════════════════════════════════════ */
function AdminDashboard({ token, email, onSignOut }: { token: string; email: string; onSignOut: () => void }) {
  const [section, setSection] = useState<Section>("dashboard");
  const [collapsed, setCollapsed] = useState(false);

  function renderPanel() {
    switch (section) {
      case "dashboard":   return <DashboardPanel />;
      case "hero":        return <HeroPanel />;
      case "flavors":     return <FlavorsPanel />;
      case "ingredients": return <IngredientsPanel />;
      case "stats":       return <StatsPanel />;
      case "products":    return <ProductsPanel />;
      case "newsletter":  return <NewsletterPanel />;
      case "footer":      return <FooterPanel />;
      case "branding":    return <BrandingPanel />;
      case "seo":         return <SeoPanel />;
      case "settings":    return <SettingsPanel email={email} onSignOut={onSignOut} />;
      default:            return <DashboardPanel />;
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <Sidebar
        active={section}
        onNav={setSection}
        email={email}
        onSignOut={onSignOut}
        collapsed={collapsed}
        onToggle={() => setCollapsed((v) => !v)}
      />

      {/* Main content */}
      <main
        className={`flex-1 min-h-screen transition-all duration-300 ${collapsed ? "ml-16" : "ml-60"}`}>
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center border-b border-border bg-background/80 backdrop-blur-xl px-6 gap-4">
          <div className="flex-1">
            <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
              Admin Console
            </div>
          </div>
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors font-mono uppercase tracking-widest">
            <Image className="h-3.5 w-3.5" />
            View Site
          </a>
        </header>

        {/* Panel content */}
        <div className="p-6 md:p-8 max-w-5xl">
          {renderPanel()}
        </div>
      </main>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   ROOT PAGE
══════════════════════════════════════════════════════ */
function AdminPage() {
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return window.localStorage.getItem("admin_token");
  });
  const [email, setEmail] = useState<string>(() => {
    if (typeof window === "undefined") return "";
    return window.localStorage.getItem("admin_email") ?? "";
  });

  function handleAuthed(t: string, e: string) {
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
    return <LoginScreen onAuthed={handleAuthed} />;
  }

  return <AdminDashboard token={token} email={email} onSignOut={handleSignOut} />;
}
