import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "@phosphor-icons/react";

const SLIDES = [
  {
    pre: "PROGETTAZIONE E GARE D'APPALTO",
    title: "SPECIALISTI IN OFFERTE TECNICHE",
    highlight: "MIGLIORATIVE",
    desc: "Oltre dieci anni di esperienza nel settore degli appalti pubblici: competenza tecnica e visione strategica per offerte più competitive e orientate al massimo punteggio.",
    link: "/servizi/gare",
    btn: "Gare OEPV",
  },
  {
    pre: "PROGETTAZIONE E GARE D'APPALTO",
    title: "PROGETTIAMO",
    highlight: "IL FUTURO",
    desc: "In ogni gara progettiamo il futuro lavoro insieme ai nostri clienti. Ogni aggiudicazione è continuità per l'impresa e crescita per il nostro studio.",
    link: "/servizi/gare",
    btn: "Gare OEPV",
  },
  {
    pre: "PROGETTAZIONE E GARE D'APPALTO",
    title: "UN APPROCCIO MULTIDISCIPLINARE,",
    highlight: "UN UNICO OBIETTIVO",
    desc: "Architetti, ingegneri, specialisti BIM e restauratori: competenze integrate per offerte tecniche complete, coerenti e orientate all'aggiudicazione.",
    link: "/servizi/gare",
    btn: "Gare OEPV",
  },
];

export default function ScrollWorldHero() {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // ── Framer Motion scroll progress tied to containerRef ──
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // ── Pre-fetch video blob for smooth scrub ──
  useEffect(() => {
    let blobUrl: string | null = null;
    let cancelled = false;

    fetch("/flight.mp4")
      .then((r) => r.blob())
      .then((blob) => {
        if (cancelled) return;
        blobUrl = URL.createObjectURL(blob);
        if (videoRef.current) {
          videoRef.current.src = blobUrl;
          videoRef.current.load();
        }
      })
      .catch(() => {
        // Fallback already playing direct src
      });

    return () => {
      cancelled = true;
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  }, []);

  // ── RAF lerp loop for 60fps smooth scrubbing ──
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let animId: number;
    let currentTargetTime = 0;
    let targetTime = 0;

    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (video.duration && !isNaN(video.duration)) {
        targetTime = latest * (video.duration - 0.05);
      }
    });

    const updateScrub = () => {
      if (video.duration && !isNaN(video.duration)) {
        // Lerp factor 0.12 for smooth motion
        currentTargetTime += (targetTime - currentTargetTime) * 0.12;

        if (
          !video.seeking &&
          Math.abs(video.currentTime - currentTargetTime) > 0.008
        ) {
          video.currentTime = Math.min(
            Math.max(currentTargetTime, 0),
            video.duration - 0.02
          );
        }
      }
      animId = requestAnimationFrame(updateScrub);
    };

    animId = requestAnimationFrame(updateScrub);

    return () => {
      unsubscribe();
      cancelAnimationFrame(animId);
    };
  }, [scrollYProgress]);

  // ── STRICT NON-OVERLAPPING NARRATIVE STAGES ──
  // Slide 1: 0% → 28% (Exit: 18%-28%)
  const slide1Y = useTransform(scrollYProgress, [0, 0.18, 0.28], ["0%", "0%", "-30%"]);
  const slide1Opacity = useTransform(scrollYProgress, [0, 0.18, 0.28], [1, 1, 0]);
  const slide1Display = useTransform(slide1Opacity, (o) => (o > 0.01 ? "flex" : "none"));

  // Slide 2: 30% → 66% (Entry: 30%-38%, Exit: 58%-66%)
  const slide2Y = useTransform(
    scrollYProgress,
    [0.30, 0.38, 0.58, 0.66],
    ["30%", "0%", "0%", "-30%"]
  );
  const slide2Opacity = useTransform(
    scrollYProgress,
    [0.30, 0.38, 0.58, 0.66],
    [0, 1, 1, 0]
  );
  const slide2Display = useTransform(slide2Opacity, (o) => (o > 0.01 ? "flex" : "none"));

  // Slide 3: 68% → 100% (Entry: 68%-76%, Active: 76%-100%)
  const slide3Y = useTransform(
    scrollYProgress,
    [0.68, 0.76, 1.0],
    ["30%", "0%", "0%"]
  );
  const slide3Opacity = useTransform(
    scrollYProgress,
    [0.68, 0.76, 1.0],
    [0, 1, 1]
  );
  const slide3Display = useTransform(slide3Opacity, (o) => (o > 0.01 ? "flex" : "none"));

  // Progress bar width
  const barWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[450vh] w-full bg-[#080e1c]"
    >
      {/* Sticky Viewport */}
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex items-center justify-center">

        {/* ── VIDEO LAYER ── */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <video
            ref={videoRef}
            src="/flight.mp4"
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover object-center opacity-90"
          />

          {/* Clean cinematic scrims */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#080e1c]/80 via-[#080e1c]/30 to-[#080e1c]/85 pointer-events-none" />
        </div>

        {/* ── NARRATIVE CONTENT LAYER ── */}
        <div className="relative z-20 w-full max-w-5xl mx-auto px-6 h-full flex flex-col justify-between pt-28 pb-10 pointer-events-auto">

          {/* Slides Stack Container */}
          <div className="relative flex-1 flex items-center justify-center text-center">

            {/* Slide 1 */}
            <motion.div
              style={{
                y: slide1Y,
                opacity: slide1Opacity,
                display: slide1Display,
              }}
              className="absolute flex flex-col items-center justify-center max-w-3xl space-y-6"
            >
              <span className="text-[#B8972A] text-[11px] font-bold uppercase tracking-[0.5em] block">
                {SLIDES[0].pre}
              </span>
              <h1 className="text-white text-3xl sm:text-5xl md:text-6xl font-bold leading-[1.15] uppercase tracking-tighter drop-shadow-2xl">
                {SLIDES[0].title}{" "}
                <span className="text-[#B8972A]">{SLIDES[0].highlight}</span>
              </h1>
              <p className="text-white/80 text-sm sm:text-base font-light leading-relaxed max-w-[50ch] drop-shadow">
                {SLIDES[0].desc}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <Link to={SLIDES[0].link} className="btn-ghost-light px-9 py-4 group">
                  {SLIDES[0].btn}{" "}
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform inline-block" />
                </Link>
                <Link to="/studio" className="btn-ghost-light px-9 py-4 group">
                  Scopri lo Studio{" "}
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform inline-block" />
                </Link>
              </div>
            </motion.div>

            {/* Slide 2 */}
            <motion.div
              style={{
                y: slide2Y,
                opacity: slide2Opacity,
                display: slide2Display,
              }}
              className="absolute flex flex-col items-center justify-center max-w-3xl space-y-6"
            >
              <span className="text-[#B8972A] text-[11px] font-bold uppercase tracking-[0.5em] block">
                {SLIDES[1].pre}
              </span>
              <h2 className="text-white text-3xl sm:text-5xl md:text-6xl font-bold leading-[1.15] uppercase tracking-tighter drop-shadow-2xl">
                {SLIDES[1].title}{" "}
                <span className="text-[#B8972A]">{SLIDES[1].highlight}</span>
              </h2>
              <p className="text-white/80 text-sm sm:text-base font-light leading-relaxed max-w-[50ch] drop-shadow">
                {SLIDES[1].desc}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <Link to={SLIDES[1].link} className="btn-ghost-light px-9 py-4 group">
                  {SLIDES[1].btn}{" "}
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform inline-block" />
                </Link>
              </div>
            </motion.div>

            {/* Slide 3 */}
            <motion.div
              style={{
                y: slide3Y,
                opacity: slide3Opacity,
                display: slide3Display,
              }}
              className="absolute flex flex-col items-center justify-center max-w-3xl space-y-6"
            >
              <span className="text-[#B8972A] text-[11px] font-bold uppercase tracking-[0.5em] block">
                {SLIDES[2].pre}
              </span>
              <h2 className="text-white text-3xl sm:text-5xl md:text-6xl font-bold leading-[1.15] uppercase tracking-tighter drop-shadow-2xl">
                {SLIDES[2].title}{" "}
                <span className="text-[#B8972A]">{SLIDES[2].highlight}</span>
              </h2>
              <p className="text-white/80 text-sm sm:text-base font-light leading-relaxed max-w-[50ch] drop-shadow">
                {SLIDES[2].desc}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <Link to={SLIDES[2].link} className="btn-ghost-light px-9 py-4 group">
                  {SLIDES[2].btn}{" "}
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform inline-block" />
                </Link>
                <Link to="/studio" className="btn-ghost-light px-9 py-4 group">
                  Scopri lo Studio{" "}
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform inline-block" />
                </Link>
              </div>
            </motion.div>

          </div>

          {/* Bottom Bar Controls */}
          <div className="flex items-center justify-between border-t border-white/15 pt-4 text-xs text-white/60">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#B8972A]">
              Scorri per guidare la camera 3D
            </span>

            {/* Progress bar */}
            <div className="w-32 h-[3px] bg-white/15 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#B8972A] rounded-full"
                style={{ width: barWidth }}
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
