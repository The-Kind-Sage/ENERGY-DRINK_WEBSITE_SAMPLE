import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { S as ShoppingBag, A as ArrowRight, C as ChevronDown, P as Plus, Z as Zap, B as Brain, D as Dumbbell, F as Flame, L as Leaf, a as Atom, I as Instagram, Y as Youtube, T as Twitter } from "../_libs/lucide-react.mjs";
import { u as useScroll, a as useTransform, b as useMotionValue, c as useSpring, m as motion } from "../_libs/framer-motion.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const canNeon = "/assets/can-neon-lpeLOtn-.png";
const canArctic = "/assets/can-arctic-C113aqqP.png";
const canSolar = "/assets/can-solar-DIb6FNqG.png";
const canMidnight = "/assets/can-midnight-DXGP6ojc.png";
const canBlood = "/assets/can-blood-Dn3ZjSlg.png";
const canZero = "/assets/can-zero-CONB3Ve5.png";
const lifestyle = "/assets/lifestyle-NSxJz0QX.jpg";
const FLAVORS = [{
  name: "Neon Surge",
  tag: "Original",
  img: canNeon,
  color: "var(--neon)",
  hex: "#39FF14",
  notes: "Citrus blast with electrolyte kick"
}, {
  name: "Arctic Bolt",
  tag: "Frost",
  img: canArctic,
  color: "var(--electric)",
  hex: "#00D4FF",
  notes: "Frozen mint with arctic berry"
}, {
  name: "Solar Flare",
  tag: "Heat",
  img: canSolar,
  color: "var(--cyber)",
  hex: "#FFB000",
  notes: "Tropical mango with habanero heat"
}, {
  name: "Midnight Pulse",
  tag: "Dark",
  img: canMidnight,
  color: "var(--purple-x)",
  hex: "#BF00FF",
  notes: "Dark grape with açaí thunder"
}, {
  name: "Zero Gravity",
  tag: "Clean",
  img: canZero,
  color: "#C0C0C0",
  hex: "#C0C0C0",
  notes: "Pure clean energy, precision tuned"
}, {
  name: "Blood Rush",
  tag: "Crimson",
  img: canBlood,
  color: "var(--magenta)",
  hex: "#FF0066",
  notes: "Pomegranate with blood orange fury"
}];
const INGREDIENTS = [{
  icon: Zap,
  label: "Caffeine",
  value: 300,
  unit: "mg",
  desc: "Precision-dosed for maximum alertness"
}, {
  icon: Brain,
  label: "Nootropics",
  value: 200,
  unit: "mg",
  desc: "L-Theanine + Alpha-GPC for razor focus"
}, {
  icon: Dumbbell,
  label: "BCAAs",
  value: 5,
  unit: "g",
  desc: "Muscle recovery meets hydration"
}, {
  icon: Flame,
  label: "Sugar",
  value: 0,
  unit: "g",
  desc: "All power. No crash. No compromise."
}, {
  icon: Leaf,
  label: "Natural Flavor",
  value: 100,
  unit: "%",
  desc: "Clean ingredients you can pronounce"
}, {
  icon: Atom,
  label: "B-Complex",
  value: 6,
  unit: "x",
  desc: "B6, B12, Niacin — cellular fuel"
}];
const STATS = [{
  v: 10,
  suffix: "M+",
  l: "Cans Sold"
}, {
  v: 50,
  suffix: "+",
  l: "Countries"
}, {
  v: 500,
  suffix: "K+",
  l: "Community"
}, {
  v: 4.9,
  suffix: "★",
  l: "Rating",
  decimals: 1
}];
function Home() {
  const heroAnchor = reactExports.useRef(null);
  const flavorAnchor = reactExports.useRef(null);
  const [phase, setPhase] = reactExports.useState("hero");
  const [flashKey, setFlashKey] = reactExports.useState(0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "relative bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Nav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Hero, { heroAnchorRef: heroAnchor, hideCan: phase !== "hero" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Manifesto, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FlavorShowcase, { flavorAnchorRef: flavorAnchor, attached: phase === "attached", flashKey }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Ingredients, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Lifestyle, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Stats, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Newsletter, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FlyingCan, { heroRef: heroAnchor, flavorRef: flavorAnchor, phase, onPhase: (p) => {
      setPhase((prev) => {
        if (p === "attached" && prev !== "attached") setFlashKey((k) => k + 1);
        return p;
      });
    } })
  ] });
}
function Nav() {
  const [scrolled, setScrolled] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed top-0 z-50 w-full bg-primary text-primary-foreground py-2 text-center text-xs font-mono uppercase tracking-[0.2em]", children: "⚡ Free shipping on orders over $50 ⚡ Limited drop live now" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: `fixed top-8 z-50 w-full transition-all duration-300 ${scrolled ? "backdrop-blur-xl bg-background/70 border-b border-border" : ""}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-7xl items-center justify-between px-6 py-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "#top", className: "font-display text-3xl tracking-wider", children: [
        "X",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary text-glow-neon", children: "T" }),
        "REAM"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "hidden md:flex items-center gap-8 text-sm uppercase tracking-widest font-medium", children: ["Shop", "Flavors", "Science", "Community"].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `#${n.toLowerCase()}`, className: "relative hover:text-primary transition-colors group", children: [
        n,
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all group-hover:w-full" })
      ] }, n)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "group relative inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 font-bold uppercase tracking-wider text-sm shadow-neon transition-transform hover:scale-105", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-4 w-4" }),
        " Shop"
      ] })
    ] }) })
  ] });
}
function Hero({
  heroAnchorRef,
  hideCan
}) {
  const ref = reactExports.useRef(null);
  const {
    scrollYProgress
  } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  const yCan = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const rotCan = useTransform(scrollYProgress, [0, 1], [0, 20]);
  const opacityText = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, {
    stiffness: 60,
    damping: 15
  });
  const sy = useSpring(my, {
    stiffness: 60,
    damping: 15
  });
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left - r.width / 2) / 20);
    my.set((e.clientY - r.top - r.height / 2) / 20);
  };
  const words = ["FUEL", "THE", "IMPOSSIBLE"];
  let charIdx = 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "top", ref, onMouseMove: onMove, className: "relative min-h-[100dvh] overflow-hidden pt-24 bg-grid", style: {
    background: "radial-gradient(ellipse at 50% 50%, oklch(0.2 0.08 142 / 0.4), oklch(0.1 0 0) 60%)"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-primary/15 to-transparent animate-scan" }),
    Array.from({
      length: 24
    }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute h-1 w-1 rounded-full bg-primary/60", style: {
      top: `${i * 37 % 100}%`,
      left: `${i * 53 % 100}%`,
      boxShadow: "0 0 8px var(--neon)",
      animation: `float-slow ${4 + i % 5}s ease-in-out ${i * 0.2}s infinite`
    } }, i)),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2 gap-8 px-6 py-16 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { style: {
        opacity: opacityText
      }, className: "relative z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0,
          x: -20
        }, animate: {
          opacity: 1,
          x: 0
        }, className: "inline-flex items-center gap-2 border border-primary/40 bg-primary/5 px-3 py-1.5 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full bg-primary animate-pulse" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono uppercase tracking-[0.3em] text-primary", children: "New Drop // V.06" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display leading-[0.85] tracking-tight text-[clamp(2.75rem,11vw,7rem)] lg:text-[clamp(3rem,6.4vw,6.5rem)]", children: words.map((word, wi) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block whitespace-nowrap mr-[0.22em] align-top", children: word.split("").map((c) => {
          const i = charIdx++;
          const stroke = word === "IMPOSSIBLE";
          return /* @__PURE__ */ jsxRuntimeExports.jsx(motion.span, { initial: {
            y: 100,
            opacity: 0,
            rotateX: -90
          }, animate: {
            y: 0,
            opacity: 1,
            rotateX: 0
          }, transition: {
            delay: i * 0.04,
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1]
          }, className: `inline-block ${stroke ? "text-stroke" : ""}`, children: c }, i);
        }) }, wi)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.p, { initial: {
          opacity: 0,
          y: 20
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          delay: 1
        }, className: "mt-6 max-w-md text-base md:text-lg text-muted-foreground", children: [
          "Premium Energy. Zero Compromise. ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: "300mg caffeine" }),
          ", nootropic stack, BCAAs — engineered for the relentless."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0,
          y: 20
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          delay: 1.2
        }, className: "mt-8 flex flex-wrap items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "group relative overflow-hidden bg-primary text-primary-foreground px-8 py-4 font-bold uppercase tracking-widest text-sm shadow-neon transition-transform hover:scale-[1.03]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative z-10 inline-flex items-center gap-2", children: [
              "Shop Now ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-1" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "group inline-flex items-center gap-2 border border-border bg-background/40 backdrop-blur-sm px-8 py-4 font-bold uppercase tracking-widest text-sm transition-colors hover:border-primary hover:text-primary", children: "Explore Flavors" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
          opacity: 0
        }, animate: {
          opacity: 1
        }, transition: {
          delay: 1.4
        }, className: "mt-12 grid grid-cols-3 gap-6 max-w-md border-t border-border pt-6", children: [["300mg", "Caffeine"], ["0g", "Sugar"], ["10kcal", "Per Can"]].map(([v, l]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-2xl font-bold text-primary", children: v }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-widest text-muted-foreground", children: l })
        ] }, l)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { style: {
        y: yCan,
        rotate: rotCan,
        x: sx,
        translateY: sy
      }, className: "relative flex justify-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 m-auto h-[420px] w-[420px] rounded-full blur-3xl", style: {
          background: "radial-gradient(circle, var(--neon) 0%, transparent 60%)",
          opacity: 0.6
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 m-auto h-[380px] w-[380px] rounded-full border border-primary/30", style: {
          animation: "pulse-ring 3s ease-out infinite"
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: heroAnchorRef, className: "relative z-10 h-[460px] md:h-[640px] w-[260px] md:w-[360px] flex items-center justify-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "pointer-events-none absolute h-80 w-80 rounded-full animate-ring-burst", style: {
            boxShadow: "0 0 80px 30px var(--neon), inset 0 0 50px var(--neon)",
            border: "2px solid var(--neon)"
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "pointer-events-none absolute h-96 w-96 rounded-full animate-ring-burst", style: {
            boxShadow: "0 0 60px 20px var(--neon)",
            border: "1px solid var(--neon)",
            animationDelay: "0.15s"
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(motion.img, { src: canNeon, alt: "XTREAM Neon Surge energy drink can", width: 896, height: 1408, initial: {
            opacity: 0,
            filter: "brightness(3)"
          }, animate: {
            opacity: hideCan ? 0 : 1,
            filter: "brightness(1)"
          }, transition: {
            opacity: {
              duration: 0.4
            },
            filter: {
              duration: 0.8
            }
          }, className: "h-full w-auto object-contain drop-shadow-[0_30px_60px_rgba(57,255,20,0.4)] animate-float-slow", fetchPriority: "high" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute bottom-8 right-0 font-mono text-[10px] uppercase tracking-[0.4em] text-primary/80", children: "// 16 fl oz · v.06.24" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
      opacity: 0
    }, animate: {
      opacity: 1
    }, transition: {
      delay: 2
    }, className: "absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground", children: "Scroll" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-5 w-5 text-primary animate-bounce" })
    ] })
  ] });
}
function Manifesto() {
  const lines = ["We don't do ordinary.", "We don't do average.", "We exist for those who refuse to slow down.", "XTREAM isn't a drink —", "it's a declaration."];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative py-32 px-6 overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-noise opacity-30 pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-5xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-xs uppercase tracking-[0.4em] text-primary mb-12", children: "// Manifesto" }),
      lines.map((line, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(motion.p, { initial: {
        opacity: 0.1,
        x: -20
      }, whileInView: {
        opacity: 1,
        x: 0
      }, viewport: {
        once: true,
        margin: "-100px"
      }, transition: {
        duration: 0.8,
        delay: i * 0.1
      }, className: `font-display text-[clamp(2rem,6vw,5rem)] leading-[1] tracking-tight ${i === 3 || i === 4 ? "text-primary text-glow-neon" : ""}`, children: line }, i))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-0 top-1/2 -translate-y-1/2 hidden lg:block", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-[20rem] leading-none text-stroke opacity-20", children: "X" }) })
  ] });
}
function FlavorShowcase({
  flavorAnchorRef,
  attached,
  flashKey
}) {
  const [active, setActive] = reactExports.useState(0);
  const f = FLAVORS[active];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "flavors", className: "relative py-24 px-6 overflow-hidden transition-colors duration-700", style: {
    background: `radial-gradient(ellipse at 30% 50%, color-mix(in oklab, ${f.color} 25%, transparent), transparent 60%), var(--background)`
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-xs uppercase tracking-[0.4em] text-primary mb-3", children: "// The Lineup" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-5xl md:text-7xl leading-none", children: [
          "Six Flavors.",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "One Mission."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-sm text-muted-foreground", children: "Each can engineered with the same precision formula. The only difference? How loud you want it." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 items-center min-h-[520px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        scale: 0.9
      }, animate: {
        opacity: 1,
        scale: 1
      }, transition: {
        duration: 0.5
      }, className: "relative flex justify-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 m-auto h-80 w-80 rounded-full blur-3xl", style: {
          background: f.color,
          opacity: 0.45
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: flavorAnchorRef, className: "relative h-[460px] w-[260px] flex items-center justify-center", children: [
          attached && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "pointer-events-none absolute h-72 w-72 rounded-full animate-ring-burst", style: {
            boxShadow: `0 0 60px 20px ${f.hex}, inset 0 0 40px ${f.hex}`,
            border: `2px solid ${f.hex}`
          } }, `ring-${flashKey}`),
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: f.img, alt: `XTREAM ${f.name}`, loading: "lazy", width: 768, height: 1216, style: {
            opacity: attached ? 1 : 0
          }, className: `h-full w-auto object-contain drop-shadow-2xl animate-float-slow ${attached ? "animate-attach-flash" : ""}` }, `flavor-img-${flashKey}-${f.name}`)
        ] })
      ] }, f.name),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0,
          y: 16
        }, animate: {
          opacity: 1,
          y: 0
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono text-xs uppercase tracking-[0.4em] mb-3", style: {
            color: f.hex
          }, children: [
            "0",
            active + 1,
            " / 06 — ",
            f.tag
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-6xl md:text-8xl leading-[0.85] uppercase", children: f.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-lg text-muted-foreground max-w-md", children: f.notes }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 grid grid-cols-3 gap-4 max-w-md", children: [["300", "mg Caffeine"], ["0", "g Sugar"], ["10", "Calories"]].map(([v, l]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border bg-card/40 backdrop-blur p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-2xl font-bold", style: {
              color: f.hex
            }, children: v }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-widest text-muted-foreground mt-1", children: l })
          ] }, l)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "mt-8 inline-flex items-center gap-3 bg-foreground text-background px-7 py-3.5 font-bold uppercase tracking-widest text-sm transition-transform hover:scale-105", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
            " Add to Cart · $3.99"
          ] })
        ] }, f.name + "-text"),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 flex flex-wrap gap-2", children: FLAVORS.map((flv, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setActive(i), className: `group relative px-4 py-3 border text-left transition-all ${active === i ? "border-foreground bg-foreground/5" : "border-border hover:border-foreground/50"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2.5 w-2.5 rounded-full", style: {
            background: flv.hex,
            boxShadow: `0 0 12px ${flv.hex}`
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: [
              "0",
              i + 1
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-base uppercase leading-none mt-0.5", children: flv.name })
          ] })
        ] }) }, flv.name)) })
      ] })
    ] })
  ] }) });
}
function CountUp({
  end,
  decimals = 0
}) {
  const [n, setN] = reactExports.useState(0);
  const ref = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        const start = performance.now(), dur = 1500;
        const tick = (t) => {
          const p = Math.min((t - start) / dur, 1);
          setN(end * (1 - Math.pow(1 - p, 3)));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.disconnect();
      }
    }, {
      threshold: 0.3
    });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { ref, children: n.toFixed(decimals) });
}
function Ingredients() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "science", className: "relative py-32 px-6 bg-charcoal bg-grid", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row justify-between items-end gap-6 mb-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-xs uppercase tracking-[0.4em] text-primary mb-3", children: "// The Formula" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-5xl md:text-7xl leading-none", children: [
          "Engineered.",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "Not Mixed."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-sm text-muted-foreground", children: "Every milligram justified. Every ingredient earns its place." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border", children: INGREDIENTS.map((ing, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
      opacity: 0,
      y: 24
    }, whileInView: {
      opacity: 1,
      y: 0
    }, viewport: {
      once: true
    }, transition: {
      delay: i * 0.08,
      duration: 0.6
    }, className: "group relative bg-background p-8 transition-colors hover:bg-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ing.icon, { className: "h-7 w-7 text-primary transition-transform group-hover:scale-110 group-hover:rotate-6", strokeWidth: 1.5 }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: [
          "0",
          i + 1
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display text-6xl text-foreground leading-none", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CountUp, { end: ing.value, decimals: 0 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl text-primary ml-1", children: ing.unit })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-xs uppercase tracking-[0.3em] text-primary mt-3", children: ing.label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground max-w-[24ch]", children: ing.desc })
    ] }, ing.label)) })
  ] }) });
}
function Lifestyle() {
  const ref = reactExports.useRef(null);
  const {
    scrollYProgress
  } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { ref, className: "relative h-[80vh] overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(motion.img, { src: lifestyle, alt: "Athlete running at night", loading: "lazy", width: 1920, height: 1080, style: {
      y
    }, className: "absolute inset-0 h-[120%] w-full object-cover" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/30" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-noise opacity-40 pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative mx-auto max-w-7xl h-full flex items-center px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-xs uppercase tracking-[0.4em] text-primary mb-4", children: "// Built For" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-5xl md:text-8xl leading-[0.9]", children: [
        "For gamers. Athletes.",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "Creators. Hustlers.",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary text-glow-neon", children: "For anyone who refuses to hit pause." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "mt-10 inline-flex items-center gap-2 border border-primary text-primary px-7 py-3.5 font-bold uppercase tracking-widest text-sm hover:bg-primary hover:text-primary-foreground transition-colors", children: [
        "Join The Movement ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
      ] })
    ] }) })
  ] });
}
function Stats() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "community", className: "relative py-24 border-y border-border overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-7xl px-6 grid grid-cols-2 md:grid-cols-4 gap-8", children: STATS.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
      opacity: 0,
      y: 24
    }, whileInView: {
      opacity: 1,
      y: 0
    }, viewport: {
      once: true
    }, transition: {
      delay: i * 0.1
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display text-6xl md:text-7xl text-primary text-glow-neon leading-none", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CountUp, { end: s.v, decimals: s.decimals ?? 0 }),
        s.suffix
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground", children: s.l })
    ] }, s.l)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-20 relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-xs uppercase tracking-[0.4em] text-muted-foreground text-center mb-6", children: "// As seen in" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex shrink-0 animate-marquee gap-16 pr-16", children: [..."ESPN · GQ · MEN'S HEALTH · TECHCRUNCH · ROLLING STONE · FORBES · WIRED · HYPEBEAST".split(" · "), ..."ESPN · GQ · MEN'S HEALTH · TECHCRUNCH · ROLLING STONE · FORBES · WIRED · HYPEBEAST".split(" · ")].map((name, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-4xl text-muted-foreground/60 tracking-wider whitespace-nowrap", children: name }, i)) }) })
    ] })
  ] });
}
function Newsletter() {
  const [email, setEmail] = reactExports.useState("");
  const [sent, setSent] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative py-32 px-6 overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 -z-10", style: {
      background: "radial-gradient(ellipse at center, color-mix(in oklab, var(--neon) 20%, transparent), transparent 60%)"
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-3xl text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-xs uppercase tracking-[0.4em] text-primary mb-4", children: "// Enlist" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-5xl md:text-7xl leading-[0.9]", children: [
        "Join the ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary text-glow-neon", children: "XTREAM" }),
        " nation."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-muted-foreground", children: "10% off your first order. Early access to drops. Zero spam, ever." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: (e) => {
        e.preventDefault();
        setSent(true);
      }, className: "mt-10 flex flex-col sm:flex-row gap-2 max-w-lg mx-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", required: true, value: email, onChange: (e) => setEmail(e.target.value), placeholder: "your@email.com", className: "flex-1 bg-card/60 backdrop-blur border border-border focus:border-primary focus:outline-none px-5 py-4 font-mono text-sm transition-colors" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "bg-primary text-primary-foreground px-7 py-4 font-bold uppercase tracking-widest text-sm shadow-neon hover:scale-[1.02] transition-transform", children: sent ? "⚡ You're In" : "Get 10% Off" })
      ] })
    ] })
  ] });
}
function Footer() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "relative border-t border-border bg-charcoal pt-20 pb-8 px-6 overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-5 gap-10 mb-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display text-5xl tracking-wider", children: [
          "X",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary text-glow-neon", children: "T" }),
          "REAM"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 max-w-xs text-sm text-muted-foreground", children: "Premium energy. Zero compromise. Built for the relentless." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 flex gap-3", children: [Instagram, Youtube, Twitter].map((Ic, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", "aria-label": "social", className: "h-10 w-10 grid place-items-center border border-border hover:border-primary hover:text-primary transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Ic, { className: "h-4 w-4" }) }, i)) })
      ] }),
      [["Shop", ["All Flavors", "Bundles", "Merch", "Subscribe"]], ["Company", ["About", "Careers", "Press", "Contact"]], ["Support", ["FAQ", "Shipping", "Returns", "Wholesale"]]].map(([title, items]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-xs uppercase tracking-[0.3em] text-primary mb-4", children: title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2.5 text-sm text-muted-foreground", children: items.map((it) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "hover:text-foreground transition-colors", children: it }) }, it)) })
      ] }, title))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: "© 2026 XTREAM Energy · All rights reserved" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: "Fuel the impossible." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute -bottom-20 left-1/2 -translate-x-1/2 font-display text-[20rem] leading-none text-stroke opacity-[0.06] whitespace-nowrap", children: "XTREAM" })
  ] });
}
function FlyingCan({
  heroRef,
  flavorRef,
  phase,
  onPhase
}) {
  const [style, setStyle] = reactExports.useState({
    x: 0,
    y: 0,
    scale: 1,
    rot: 0,
    opacity: 0
  });
  const [flash, setFlash] = reactExports.useState(0);
  reactExports.useEffect(() => {
    let raf = 0;
    const update = () => {
      const hero = heroRef.current;
      const flavor = flavorRef.current;
      if (!hero || !flavor) return;
      const hr = hero.getBoundingClientRect();
      const fr = flavor.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrollY = window.scrollY || window.pageYOffset;
      const heroCenterPageY = hr.top + scrollY + hr.height / 2;
      const flavorCenterPageY = fr.top + scrollY + fr.height / 2;
      const startY = heroCenterPageY - vh * 0.5;
      const endY = flavorCenterPageY - vh * 0.5;
      const raw = (scrollY - startY) / Math.max(1, endY - startY);
      const p = Math.max(0, Math.min(1, raw));
      const e = p * p * (3 - 2 * p);
      const sx = hr.left + hr.width / 2;
      const sy = hr.top + hr.height / 2;
      const tx = fr.left + fr.width / 2;
      const ty = fr.top + fr.height / 2;
      const arcX = Math.sin(e * Math.PI) * Math.min(280, window.innerWidth * 0.18);
      const arcY = -Math.sin(e * Math.PI) * 120;
      const x = sx + (tx - sx) * e + arcX;
      const y = sy + (ty - sy) * e + arcY;
      const FLY_BASE = 460;
      const scale = (hr.height + (fr.height - hr.height) * e) / FLY_BASE;
      const rot = e * 720;
      const nextPhase = p <= 1e-3 ? "hero" : p >= 0.999 ? "attached" : "flying";
      if (nextPhase !== phase) {
        if (nextPhase === "attached") setFlash((k) => k + 1);
        onPhase(nextPhase);
      }
      setStyle({
        x,
        y,
        scale,
        rot,
        opacity: nextPhase === "flying" ? 1 : 0
      });
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, {
      passive: true
    });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [heroRef, flavorRef, phase, onPhase]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "aria-hidden": true, className: "pointer-events-none fixed inset-0 z-40", style: {
    opacity: style.opacity,
    transition: "opacity 150ms linear"
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute", style: {
    left: 0,
    top: 0,
    transform: `translate(${style.x}px, ${style.y}px) translate(-50%, -50%) scale(${style.scale}) rotate(${style.rot}deg)`,
    willChange: "transform"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 m-auto h-[360px] w-[360px] rounded-full blur-3xl", style: {
      background: "radial-gradient(circle, var(--neon) 0%, transparent 65%)",
      opacity: 0.7
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: canNeon, alt: "", width: 896, height: 1408, className: "relative h-[460px] w-auto object-contain drop-shadow-[0_30px_60px_rgba(57,255,20,0.6)]" }, flash)
  ] }) });
}
export {
  Home as component
};
