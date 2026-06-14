import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Zap, Brain, Dumbbell, Flame, Leaf, Atom, ArrowRight, ShoppingBag,
  Instagram, Youtube, Twitter, ChevronDown, Plus,
} from "lucide-react";

import canNeon from "@/assets/can-neon.png";
import canArctic from "@/assets/can-arctic.png";
import canSolar from "@/assets/can-solar.png";
import canMidnight from "@/assets/can-midnight.png";
import canBlood from "@/assets/can-blood.png";
import canZero from "@/assets/can-zero.png";
import lifestyle from "@/assets/lifestyle.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "XTREAM — Fuel The Impossible" },
      { name: "description", content: "Premium energy drink. 300mg caffeine. Zero sugar. Six explosive flavors. Built for those who refuse to slow down." },
      { property: "og:title", content: "XTREAM — Fuel The Impossible" },
      { property: "og:description", content: "Premium energy. Zero compromise." },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const FLAVORS = [
  { name: "Neon Surge",     tag: "Original",   img: canNeon,     color: "var(--neon)",     hex: "#39FF14", notes: "Citrus blast with electrolyte kick" },
  { name: "Arctic Bolt",    tag: "Frost",      img: canArctic,   color: "var(--electric)", hex: "#00D4FF", notes: "Frozen mint with arctic berry" },
  { name: "Solar Flare",    tag: "Heat",       img: canSolar,    color: "var(--cyber)",    hex: "#FFB000", notes: "Tropical mango with habanero heat" },
  { name: "Midnight Pulse", tag: "Dark",       img: canMidnight, color: "var(--purple-x)", hex: "#BF00FF", notes: "Dark grape with açaí thunder" },
  { name: "Zero Gravity",   tag: "Clean",      img: canZero,     color: "#C0C0C0",         hex: "#C0C0C0", notes: "Pure clean energy, precision tuned" },
  { name: "Blood Rush",     tag: "Crimson",    img: canBlood,    color: "var(--magenta)",  hex: "#FF0066", notes: "Pomegranate with blood orange fury" },
];

const INGREDIENTS = [
  { icon: Zap,      label: "Caffeine",     value: 300, unit: "mg", desc: "Precision-dosed for maximum alertness" },
  { icon: Brain,    label: "Nootropics",   value: 200, unit: "mg", desc: "L-Theanine + Alpha-GPC for razor focus" },
  { icon: Dumbbell, label: "BCAAs",        value: 5,   unit: "g",  desc: "Muscle recovery meets hydration" },
  { icon: Flame,    label: "Sugar",        value: 0,   unit: "g",  desc: "All power. No crash. No compromise." },
  { icon: Leaf,     label: "Natural Flavor", value: 100, unit: "%", desc: "Clean ingredients you can pronounce" },
  { icon: Atom,     label: "B-Complex",    value: 6,   unit: "x",  desc: "B6, B12, Niacin — cellular fuel" },
];

const STATS = [
  { v: 10, suffix: "M+", l: "Cans Sold" },
  { v: 50, suffix: "+",  l: "Countries" },
  { v: 500, suffix: "K+", l: "Community" },
  { v: 4.9, suffix: "★",  l: "Rating", decimals: 1 },
];

function Home() {
  const heroAnchor = useRef<HTMLDivElement>(null);
  const flavorAnchor = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<"hero" | "flying" | "attached">("hero");
  const [flashKey, setFlashKey] = useState(0);

  const [cartCount, setCartCount] = useState(0);

  return (
    <main className="relative bg-background text-foreground">
      <Nav cartCount={cartCount} />
      <Hero
        heroAnchorRef={heroAnchor}
        hideCan={phase !== "hero"}
        onShop={() => document.getElementById("flavors")?.scrollIntoView({ behavior: "smooth", block: "start" })}
        onExploreFlavors={() => document.getElementById("flavors")?.scrollIntoView({ behavior: "smooth", block: "start" })}
      />
      <Manifesto />
      <FlavorShowcase
        flavorAnchorRef={flavorAnchor}
        attached={phase === "attached"}
        flashKey={flashKey}
        onAddToCart={() => setCartCount((c) => c + 1)}
      />
      <Ingredients />
      <Lifestyle onJoinMovement={() => document.getElementById("newsletter")?.scrollIntoView({ behavior: "smooth", block: "start" })} />
      <Stats />
      <Newsletter />
      <Footer />
      <FlyingCan
        heroRef={heroAnchor}
        flavorRef={flavorAnchor}
        phase={phase}
        onPhase={(p) => {
          setPhase((prev) => {
            if (p === "attached" && prev !== "attached") setFlashKey((k) => k + 1);
            return p;
          });
        }}
      />
    </main>
  );
}

/* ============ NAV ============ */
function Nav({ cartCount }: { cartCount: number }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on(); window.addEventListener("scroll", on); return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <>
      <div className="fixed top-0 z-50 w-full bg-primary text-primary-foreground py-2 text-center text-xs font-mono uppercase tracking-[0.2em]">
        ⚡ Free shipping on orders over $50 ⚡ Limited drop live now
      </div>
      <header className={`fixed top-8 z-50 w-full transition-all duration-300 ${scrolled ? "backdrop-blur-xl bg-background/70 border-b border-border" : ""}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#top" className="font-display text-3xl tracking-wider">
            X<span className="text-primary text-glow-neon">T</span>REAM
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest font-medium">
            {["Shop", "Flavors", "Science", "Community"].map((n) => (
              <a key={n} href={`#${n.toLowerCase()}`} className="relative hover:text-primary transition-colors group">
                {n}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all group-hover:w-full" />
              </a>
            ))}
          </nav>
          <button
            onClick={() => document.getElementById("flavors")?.scrollIntoView({ behavior: "smooth", block: "start" })}
            className="group relative inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 font-bold uppercase tracking-wider text-sm shadow-neon transition-transform hover:scale-105"
          >
            <ShoppingBag className="h-4 w-4" />
            Shop
            {cartCount > 0 ? (
              <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary-foreground/15 px-1 text-[10px] font-mono">
                {cartCount}
              </span>
            ) : null}
          </button>
        </div>
      </header>
    </>
  );
}

/* ============ HERO ============ */
function Hero({
  heroAnchorRef,
  hideCan,
  onShop,
  onExploreFlavors,
}: {
  heroAnchorRef: React.RefObject<HTMLDivElement | null>;
  hideCan: boolean;
  onShop: () => void;
  onExploreFlavors: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const yCan = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const rotCan = useTransform(scrollYProgress, [0, 1], [0, 20]);
  const opacityText = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Magnetic mouse tilt
  const mx = useMotionValue(0); const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 15 });
  const sy = useSpring(my, { stiffness: 60, damping: 15 });
  const onMove = (e: React.MouseEvent) => {
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    mx.set((e.clientX - r.left - r.width / 2) / 20);
    my.set((e.clientY - r.top - r.height / 2) / 20);
  };

  const words = ["FUEL", "THE", "IMPOSSIBLE"];
  let charIdx = 0;

  return (
    <section id="top" ref={ref} onMouseMove={onMove}
      className="relative min-h-[100dvh] overflow-hidden pt-24 bg-grid"
      style={{ background: "radial-gradient(ellipse at 50% 50%, oklch(0.2 0.08 142 / 0.4), oklch(0.1 0 0) 60%)" }}>

      {/* scan line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-primary/15 to-transparent animate-scan" />

      {/* floating particles */}
      {Array.from({ length: 24 }).map((_, i) => (
        <span key={i} className="absolute h-1 w-1 rounded-full bg-primary/60"
          style={{
            top: `${(i * 37) % 100}%`, left: `${(i * 53) % 100}%`,
            boxShadow: "0 0 8px var(--neon)",
            animation: `float-slow ${4 + (i % 5)}s ease-in-out ${i * 0.2}s infinite`,
          }} />
      ))}

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2 gap-8 px-6 py-16 items-center">
        {/* Text */}
        <motion.div style={{ opacity: opacityText }} className="relative z-10">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 border border-primary/40 bg-primary/5 px-3 py-1.5 mb-6">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-primary">New Drop // V.06</span>
          </motion.div>

          <h1 className="font-display leading-[0.85] tracking-tight text-[clamp(2.75rem,11vw,7rem)] lg:text-[clamp(3rem,6.4vw,6.5rem)]">
            {words.map((word, wi) => (
              <span key={wi} className="inline-block whitespace-nowrap mr-[0.22em] align-top">
                {word.split("").map((c) => {
                  const i = charIdx++;
                  const stroke = word === "IMPOSSIBLE";
                  return (
                    <motion.span key={i}
                      initial={{ y: 100, opacity: 0, rotateX: -90 }}
                      animate={{ y: 0, opacity: 1, rotateX: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      className={`inline-block ${stroke ? "text-stroke" : ""}`}>
                      {c}
                    </motion.span>
                  );
                })}
              </span>
            ))}
          </h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}
            className="mt-6 max-w-md text-base md:text-lg text-muted-foreground">
            Premium Energy. Zero Compromise. <span className="text-foreground font-medium">300mg caffeine</span>, nootropic stack, BCAAs — engineered for the relentless.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}
            className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={onShop}
              className="group relative overflow-hidden bg-primary text-primary-foreground px-8 py-4 font-bold uppercase tracking-widest text-sm shadow-neon transition-transform hover:scale-[1.03]"
            >
              <span className="relative z-10 inline-flex items-center gap-2">Shop Now <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
              <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
            </button>
            <button
              onClick={onExploreFlavors}
              className="group inline-flex items-center gap-2 border border-border bg-background/40 backdrop-blur-sm px-8 py-4 font-bold uppercase tracking-widest text-sm transition-colors hover:border-primary hover:text-primary"
            >
              Explore Flavors
            </button>
          </motion.div>

          {/* stat strip */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
            className="mt-12 grid grid-cols-3 gap-6 max-w-md border-t border-border pt-6">
            {[["300mg", "Caffeine"], ["0g", "Sugar"], ["10kcal", "Per Can"]].map(([v, l]) => (
              <div key={l}>
                <div className="font-mono text-2xl font-bold text-primary">{v}</div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{l}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Can */}
        <motion.div style={{ y: yCan, rotate: rotCan, x: sx, translateY: sy }} className="relative flex justify-center">
          <div className="absolute inset-0 m-auto h-[420px] w-[420px] rounded-full blur-3xl"
               style={{ background: "radial-gradient(circle, var(--neon) 0%, transparent 60%)", opacity: 0.6 }} />
          <span className="absolute inset-0 m-auto h-[380px] w-[380px] rounded-full border border-primary/30"
                style={{ animation: "pulse-ring 3s ease-out infinite" }} />
          {/* Anchor wraps the can; used by the flying-can overlay to measure source position */}
          <div ref={heroAnchorRef} className="relative z-10 h-[460px] md:h-[640px] w-[260px] md:w-[360px] flex items-center justify-center">
            {/* BOOM burst on hero entry — triggers as the can scales in */}
            <span
              className="pointer-events-none absolute h-80 w-80 rounded-full animate-ring-burst"
              style={{ boxShadow: "0 0 80px 30px var(--neon), inset 0 0 50px var(--neon)", border: "2px solid var(--neon)" }}
            />
            <span
              className="pointer-events-none absolute h-96 w-96 rounded-full animate-ring-burst"
              style={{ boxShadow: "0 0 60px 20px var(--neon)", border: "1px solid var(--neon)", animationDelay: "0.15s" }}
            />
            <motion.img
              src={canNeon} alt="XTREAM Neon Surge energy drink can"
              width={896} height={1408}
              initial={{ opacity: 0, filter: "brightness(3)" }}
              animate={{ opacity: hideCan ? 0 : 1, filter: "brightness(1)" }}
              transition={{ opacity: { duration: 0.4 }, filter: { duration: 0.8 } }}
              className="h-full w-auto object-contain drop-shadow-[0_30px_60px_rgba(57,255,20,0.4)] animate-float-slow"
              fetchPriority="high"
            />
          </div>
          {/* orbit text */}
          <div className="pointer-events-none absolute bottom-8 right-0 font-mono text-[10px] uppercase tracking-[0.4em] text-primary/80">
            // 16 fl oz · v.06.24
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">Scroll</span>
        <ChevronDown className="h-5 w-5 text-primary animate-bounce" />
      </motion.div>
    </section>
  );
}

/* ============ MANIFESTO ============ */
function Manifesto() {
  const lines = [
    "We don't do ordinary.",
    "We don't do average.",
    "We exist for those who refuse to slow down.",
    "XTREAM isn't a drink —",
    "it's a declaration.",
  ];
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none" />
      <div className="mx-auto max-w-5xl">
        <div className="font-mono text-xs uppercase tracking-[0.4em] text-primary mb-12">// Manifesto</div>
        {lines.map((line, i) => (
          <motion.p key={i}
            initial={{ opacity: 0.1, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
            className={`font-display text-[clamp(2rem,6vw,5rem)] leading-[1] tracking-tight ${
              i === 3 || i === 4 ? "text-primary text-glow-neon" : ""
            }`}>
            {line}
          </motion.p>
        ))}
      </div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:block">
        <div className="font-display text-[20rem] leading-none text-stroke opacity-20">X</div>
      </div>
    </section>
  );
}

/* ============ FLAVORS ============ */
function FlavorShowcase({
  flavorAnchorRef,
  attached,
  flashKey,
  onAddToCart,
}: {
  flavorAnchorRef: React.RefObject<HTMLDivElement | null>;
  attached: boolean;
  flashKey: number;
  onAddToCart: () => void;
}) {
  const [active, setActive] = useState(0);
  const f = FLAVORS[active];
  return (
    <section id="flavors" className="relative py-24 px-6 overflow-hidden transition-colors duration-700"
      style={{ background: `radial-gradient(ellipse at 30% 50%, color-mix(in oklab, ${f.color} 25%, transparent), transparent 60%), var(--background)` }}>
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.4em] text-primary mb-3">// The Lineup</div>
            <h2 className="font-display text-5xl md:text-7xl leading-none">Six Flavors.<br/>One Mission.</h2>
          </div>
          <p className="max-w-sm text-muted-foreground">Each can engineered with the same precision formula. The only difference? How loud you want it.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 items-center min-h-[520px]">
          {/* Active can */}
          <motion.div key={f.name} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }} className="relative flex justify-center">
            <div className="absolute inset-0 m-auto h-80 w-80 rounded-full blur-3xl"
                 style={{ background: f.color, opacity: 0.45 }} />
            {/* Anchor measured by the flying-can overlay. Real image hides until "attached". */}
            <div ref={flavorAnchorRef} className="relative h-[460px] w-[260px] flex items-center justify-center">
              {attached && (
                <span
                  key={`ring-${flashKey}`}
                  className="pointer-events-none absolute h-72 w-72 rounded-full animate-ring-burst"
                  style={{ boxShadow: `0 0 60px 20px ${f.hex}, inset 0 0 40px ${f.hex}`, border: `2px solid ${f.hex}` }}
                />
              )}
              <img
                key={`flavor-img-${flashKey}-${f.name}`}
                src={f.img}
                alt={`XTREAM ${f.name}`}
                loading="lazy"
                width={768}
                height={1216}
                style={{ opacity: attached ? 1 : 0 }}
                className={`h-full w-auto object-contain drop-shadow-2xl animate-float-slow ${attached ? "animate-attach-flash" : ""}`}
              />
            </div>
          </motion.div>

          {/* Detail + selector */}
          <div>
            <motion.div key={f.name + "-text"} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
              <div className="font-mono text-xs uppercase tracking-[0.4em] mb-3" style={{ color: f.hex }}>
                0{active + 1} / 06 — {f.tag}
              </div>
              <h3 className="font-display text-6xl md:text-8xl leading-[0.85] uppercase">{f.name}</h3>
              <p className="mt-6 text-lg text-muted-foreground max-w-md">{f.notes}</p>

              <div className="mt-8 grid grid-cols-3 gap-4 max-w-md">
                {[["300", "mg Caffeine"], ["0", "g Sugar"], ["10", "Calories"]].map(([v, l]) => (
                  <div key={l} className="border border-border bg-card/40 backdrop-blur p-4">
                    <div className="font-mono text-2xl font-bold" style={{ color: f.hex }}>{v}</div>
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">{l}</div>
                  </div>
                ))}
              </div>

              <button
                onClick={onAddToCart}
                className="mt-8 inline-flex items-center gap-3 bg-foreground text-background px-7 py-3.5 font-bold uppercase tracking-widest text-sm transition-transform hover:scale-105"
              >
                <Plus className="h-4 w-4" /> Add to Cart · $3.99
              </button>
            </motion.div>

            {/* Flavor selector strip */}
            <div className="mt-12 flex flex-wrap gap-2">
              {FLAVORS.map((flv, i) => (
                <button key={flv.name} onClick={() => setActive(i)}
                  className={`group relative px-4 py-3 border text-left transition-all ${
                    active === i ? "border-foreground bg-foreground/5" : "border-border hover:border-foreground/50"
                  }`}>
                  <div className="flex items-center gap-3">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: flv.hex, boxShadow: `0 0 12px ${flv.hex}` }} />
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">0{i + 1}</div>
                      <div className="font-display text-base uppercase leading-none mt-0.5">{flv.name}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ INGREDIENTS ============ */
function CountUp({ end, decimals = 0 }: { end: number; decimals?: number }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        const start = performance.now(), dur = 1500;
        const tick = (t: number) => {
          const p = Math.min((t - start) / dur, 1);
          setN(end * (1 - Math.pow(1 - p, 3)));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick); obs.disconnect();
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end]);
  return <span ref={ref}>{n.toFixed(decimals)}</span>;
}

function Ingredients() {
  return (
    <section id="science" className="relative py-32 px-6 bg-charcoal bg-grid">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.4em] text-primary mb-3">// The Formula</div>
            <h2 className="font-display text-5xl md:text-7xl leading-none">Engineered.<br/>Not Mixed.</h2>
          </div>
          <p className="max-w-sm text-muted-foreground">Every milligram justified. Every ingredient earns its place.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {INGREDIENTS.map((ing, i) => (
            <motion.div key={ing.label}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.6 }}
              className="group relative bg-background p-8 transition-colors hover:bg-card">
              <div className="flex items-start justify-between mb-8">
                <ing.icon className="h-7 w-7 text-primary transition-transform group-hover:scale-110 group-hover:rotate-6" strokeWidth={1.5} />
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">0{i + 1}</span>
              </div>
              <div className="font-display text-6xl text-foreground leading-none">
                <CountUp end={ing.value} decimals={0} /><span className="text-2xl text-primary ml-1">{ing.unit}</span>
              </div>
              <div className="font-mono text-xs uppercase tracking-[0.3em] text-primary mt-3">{ing.label}</div>
              <p className="mt-3 text-sm text-muted-foreground max-w-[24ch]">{ing.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ LIFESTYLE ============ */
function Lifestyle({ onJoinMovement }: { onJoinMovement: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  return (
    <section ref={ref} className="relative h-[80vh] overflow-hidden">
      <motion.img src={lifestyle} alt="Athlete running at night" loading="lazy" width={1920} height={1080}
        style={{ y }} className="absolute inset-0 h-[120%] w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/30" />
      <div className="absolute inset-0 bg-noise opacity-40 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl h-full flex items-center px-6">
        <div className="max-w-2xl">
          <div className="font-mono text-xs uppercase tracking-[0.4em] text-primary mb-4">// Built For</div>
          <h2 className="font-display text-5xl md:text-8xl leading-[0.9]">
            For gamers. Athletes.<br/>
            Creators. Hustlers.<br/>
            <span className="text-primary text-glow-neon">For anyone who refuses to hit pause.</span>
          </h2>
          <button
            onClick={onJoinMovement}
            className="mt-10 inline-flex items-center gap-2 border border-primary text-primary px-7 py-3.5 font-bold uppercase tracking-widest text-sm hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            Join The Movement <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ============ STATS / MARQUEE ============ */
function Stats() {
  return (
    <section id="community" className="relative py-24 border-y border-border overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {STATS.map((s, i) => (
          <motion.div key={s.l}
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
            <div className="font-display text-6xl md:text-7xl text-primary text-glow-neon leading-none">
              <CountUp end={s.v} decimals={s.decimals ?? 0} />{s.suffix}
            </div>
            <div className="mt-3 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">{s.l}</div>
          </motion.div>
        ))}
      </div>

      <div className="mt-20 relative">
        <div className="font-mono text-xs uppercase tracking-[0.4em] text-muted-foreground text-center mb-6">// As seen in</div>
        <div className="flex overflow-hidden">
          <div className="flex shrink-0 animate-marquee gap-16 pr-16">
            {[..."ESPN · GQ · MEN'S HEALTH · TECHCRUNCH · ROLLING STONE · FORBES · WIRED · HYPEBEAST".split(" · "),
              ..."ESPN · GQ · MEN'S HEALTH · TECHCRUNCH · ROLLING STONE · FORBES · WIRED · HYPEBEAST".split(" · ")
            ].map((name, i) => (
              <span key={i} className="font-display text-4xl text-muted-foreground/60 tracking-wider whitespace-nowrap">{name}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ NEWSLETTER ============ */
function Newsletter() {
  const [email, setEmail] = useState(""); const [sent, setSent] = useState(false);
  return (
    <section id="newsletter" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 -z-10"
        style={{ background: "radial-gradient(ellipse at center, color-mix(in oklab, var(--neon) 20%, transparent), transparent 60%)" }} />
      <div className="mx-auto max-w-3xl text-center">
        <div className="font-mono text-xs uppercase tracking-[0.4em] text-primary mb-4">// Enlist</div>
        <h2 className="font-display text-5xl md:text-7xl leading-[0.9]">
          Join the <span className="text-primary text-glow-neon">XTREAM</span> nation.
        </h2>
        <p className="mt-6 text-muted-foreground">10% off your first order. Early access to drops. Zero spam, ever.</p>

        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          className="mt-10 flex flex-col sm:flex-row gap-2 max-w-lg mx-auto">
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="flex-1 bg-card/60 backdrop-blur border border-border focus:border-primary focus:outline-none px-5 py-4 font-mono text-sm transition-colors" />
          <button type="submit"
            className="bg-primary text-primary-foreground px-7 py-4 font-bold uppercase tracking-widest text-sm shadow-neon hover:scale-[1.02] transition-transform">
            {sent ? "⚡ You're In" : "Get 10% Off"}
          </button>
        </form>
      </div>
    </section>
  );
}

/* ============ FOOTER ============ */
function Footer() {
  return (
    <footer className="relative border-t border-border bg-charcoal pt-20 pb-8 px-6 overflow-hidden">
      <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">
        <div className="col-span-2">
          <div className="font-display text-5xl tracking-wider">X<span className="text-primary text-glow-neon">T</span>REAM</div>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">Premium energy. Zero compromise. Built for the relentless.</p>
          <div className="mt-6 flex gap-3">
            {[Instagram, Youtube, Twitter].map((Ic, i) => (
              <a key={i} href="/" aria-label="social" className="h-10 w-10 grid place-items-center border border-border hover:border-primary hover:text-primary transition-colors">
                <Ic className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        {[
          ["Shop", ["All Flavors", "Bundles", "Merch", "Subscribe"]],
          ["Company", ["About", "Careers", "Press", "Contact"]],
          ["Support", ["FAQ", "Shipping", "Returns", "Wholesale"]],
        ].map(([title, items]) => (
          <div key={title as string}>
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-4">{title}</div>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {(items as string[]).map((it) => (
                <li key={it}>
                  <a href="/" className="hover:text-foreground transition-colors">{it}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-border">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">© 2026 XTREAM Energy · All rights reserved</span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Fuel the impossible.</span>
      </div>
      <div className="pointer-events-none absolute -bottom-20 left-1/2 -translate-x-1/2 font-display text-[20rem] leading-none text-stroke opacity-[0.06] whitespace-nowrap">
        XTREAM
      </div>
    </footer>
  );
}

/* ============ FLYING CAN (scroll-driven hero→flavor traversal) ============ */
function FlyingCan({
  heroRef,
  flavorRef,
  phase,
  onPhase,
}: {
  heroRef: React.RefObject<HTMLDivElement | null>;
  flavorRef: React.RefObject<HTMLDivElement | null>;
  phase: "hero" | "flying" | "attached";
  onPhase: (p: "hero" | "flying" | "attached") => void;
}) {
  const [style, setStyle] = useState<{ x: number; y: number; scale: number; rot: number; opacity: number }>({
    x: 0, y: 0, scale: 1, rot: 0, opacity: 0,
  });
  const [flash, setFlash] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const hero = heroRef.current;
      const flavor = flavorRef.current;
      if (!hero || !flavor) return;
      const hr = hero.getBoundingClientRect();
      const fr = flavor.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrollY = window.scrollY || window.pageYOffset;

      // Page-Y coordinates of source (hero) and target (flavor) centers
      const heroCenterPageY = hr.top + scrollY + hr.height / 2;
      const flavorCenterPageY = fr.top + scrollY + fr.height / 2;

      // Flight begins when hero center has scrolled past viewport center,
      // ends when flavor center is at viewport center — i.e. spans the manifesto.
      const startY = heroCenterPageY - vh * 0.5;
      const endY = flavorCenterPageY - vh * 0.5;
      const raw = (scrollY - startY) / Math.max(1, endY - startY);
      const p = Math.max(0, Math.min(1, raw));
      // ease (smoothstep)
      const e = p * p * (3 - 2 * p);

      // Source/target centers in viewport coords
      const sx = hr.left + hr.width / 2;
      const sy = hr.top + hr.height / 2;
      const tx = fr.left + fr.width / 2;
      const ty = fr.top + fr.height / 2;

      // Arc: dramatic horizontal sweep + lift mid-flight
      const arcX = Math.sin(e * Math.PI) * Math.min(280, window.innerWidth * 0.18);
      const arcY = -Math.sin(e * Math.PI) * 120;

      const x = sx + (tx - sx) * e + arcX;
      const y = sy + (ty - sy) * e + arcY;

      // Scale from hero size → flavor size (base img is 460px, match hero exactly at e=0)
      const FLY_BASE = 460;
      const scale = (hr.height + (fr.height - hr.height) * e) / FLY_BASE;
      // Multi-spin: 2 full rotations during flight, settle at 0
      const rot = e * 720;


      // Phase
      const nextPhase: "hero" | "flying" | "attached" =
        p <= 0.001 ? "hero" : p >= 0.999 ? "attached" : "flying";
      if (nextPhase !== phase) {
        if (nextPhase === "attached") setFlash((k) => k + 1);
        onPhase(nextPhase);
      }

      setStyle({
        x,
        y,
        scale,
        rot,
        opacity: nextPhase === "flying" ? 1 : 0,
      });
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [heroRef, flavorRef, phase, onPhase]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-40"
      style={{ opacity: style.opacity, transition: "opacity 150ms linear" }}
    >
      <div
        className="absolute"
        style={{
          left: 0,
          top: 0,
          transform: `translate(${style.x}px, ${style.y}px) translate(-50%, -50%) scale(${style.scale}) rotate(${style.rot}deg)`,
          willChange: "transform",
        }}
      >
        {/* trailing glow */}
        <div
          className="absolute inset-0 m-auto h-[360px] w-[360px] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, var(--neon) 0%, transparent 65%)", opacity: 0.7 }}
        />
        <img
          key={flash}
          src={canNeon}
          alt=""
          width={896}
          height={1408}
          className="relative h-[460px] w-auto object-contain drop-shadow-[0_30px_60px_rgba(57,255,20,0.6)]"
        />
      </div>
    </div>
  );
}
