import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  MessageSquareText,
  Search,
  Gavel,
  ClipboardCheck,
  Truck,
  PackageCheck,
  CircleDot,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type StepT = {
  index: string;
  title: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  accent: string;
  description: string;
};

const STEPS: readonly StepT[] = [
  {
    index: "01",
    title: "Tell Us What You Need",
    icon: MessageSquareText,
    accent: "#D78034",
    description:
      "Submit your procurement request with your specifications, quantities, delivery requirements, and technical documents.",
  },
  {
    index: "02",
    title: "We Source & Verify",
    icon: Search,
    accent: "#080A7E",
    description:
      "Our procurement team analyzes your requirements and connects with qualified, vetted suppliers across our global sourcing network.",
  },
  {
    index: "03",
    title: "Suppliers Compete",
    icon: Gavel,
    accent: "#2E7D4F",
    description:
      "For eligible requirements, verified suppliers compete through our secure reverse auction platform, driving competitive pricing while maintaining strict quality standards.",
  },
  {
    index: "04",
    title: "We Evaluate & Select",
    icon: ClipboardCheck,
    accent: "#D78034",
    description:
      "We assess supplier bids, technical compliance, delivery timelines, certifications, and overall value — not just price.",
  },
  {
    index: "05",
    title: "We Manage the Supply Chain",
    icon: Truck,
    accent: "#080A7E",
    description:
      "Once a supplier is selected, we coordinate procurement, inspection, shipping, customs, logistics, and delivery.",
  },
  {
    index: "06",
    title: "You Receive With Confidence",
    icon: PackageCheck,
    accent: "#0A0C3A",
    description:
      "Your equipment or materials arrive at the required destination, backed by transparent procurement management from request to delivery.",
  },
] as const;

const ANIMATION_MS = 700;
const WHEEL_THRESHOLD = 18;
const TOUCH_THRESHOLD = 38;
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const CARD_GAP_LG = 20;
const CARD_GAP_XL = 24;
const CARD_GAP_2XL = 28;
const INNER_PAD = 40;
const ENTER_EXIT_PX_OFFSET = 720;

export default function ProcurementProcessSteps() {
  return (
    <section className="relative w-full bg-white overflow-hidden py-16 sm:py-20 md:py-24 lg:py-0">
      <div className="absolute inset-0 pointer-events-none opacity-60">
        <div className="absolute -top-32 -right-40 h-[420px] w-[420px] rounded-full bg-[#080A7E]/8 blur-3xl" />
        <div className="absolute -bottom-24 -left-40 h-[340px] w-[340px] rounded-full bg-[#D78034]/10 blur-3xl" />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 md:px-10 xl:px-14 2xl:px-20 space-y-12 sm:space-y-14 lg:space-y-0">
        <div className="py-16 sm:py-20 md:py-24 lg:pt-24 lg:pb-10">
          <AnimatedContainer className="mx-auto max-w-3xl text-center space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#080A7E]/14 bg-[#080A7E]/6 px-3 py-1.5">
              <CircleDot className="w-3.5 h-3.5 text-[#080A7E] fill-[#080A7E]" />
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.22em] text-[#080A7E]">
                How It Works
              </span>
            </div>

            <h2 className="font-semibold tracking-tight text-[#0A0C1A] text-[32px] sm:text-[40px] lg:text-[46px] leading-[1.04]">
              How It Works
            </h2>

            <p className="mt-4 text-[15px] sm:text-base leading-relaxed text-[#5A5E7A]">
              From your procurement request to final delivery, Constantflow
              manages the entire sourcing process.
            </p>
          </AnimatedContainer>
        </div>

        <AnimatedContainer delay={0.2}>
          <VerticalTimeline steps={STEPS} />
          <ScrollPinnedHorizontalTimeline steps={STEPS} />
        </AnimatedContainer>
      </div>
    </section>
  );
}

function VerticalTimeline({ steps }: { steps: readonly StepT[] }) {
  return (
    <ol className="relative flex flex-col gap-8 sm:gap-10 lg:hidden max-w-3xl mx-auto">
      <div
        aria-hidden
        className="absolute left-[27px] sm:left-[27px] top-0 bottom-0 w-[2px] rounded-full bg-gradient-to-b from-[#D78034]/35 via-[#080A7E]/30 to-[#0A0C3A]/25"
      />

      {steps.map((step, i) => (
        <li key={i} className="relative pl-20 sm:pl-24">
          <StepBadge step={step} />
          <StepCard step={step} index={i} isLast={i === steps.length - 1} variant="vertical" />
        </li>
      ))}
    </ol>
  );
}

function getCardGap(viewportWidth: number): number {
  if (viewportWidth >= 1536) return CARD_GAP_2XL;
  if (viewportWidth >= 1280) return CARD_GAP_XL;
  return CARD_GAP_LG;
}

type LayoutState = {
  cardWidth: number;
  gap: number;
  viewportInnerWidth: number;
};

function computeLayout(viewportInnerWidth: number, gap: number): LayoutState {
  const totalCards = 6;
  const cardWidth = (viewportInnerWidth - (totalCards - 1) * gap) / totalCards;
  return { cardWidth, gap, viewportInnerWidth };
}

function computeCardCenteredPositions(
  visibleCount: number,
  layout: LayoutState
): number[] {
  const { cardWidth, gap, viewportInnerWidth } = layout;
  const totalWidth = visibleCount * cardWidth + Math.max(0, visibleCount - 1) * gap;
  const startX = (viewportInnerWidth - totalWidth) / 2;
  return Array.from({ length: visibleCount }, (_, i) => startX + i * (cardWidth + gap));
}

type CardRenderState = {
  xPx: number;
  widthPx: number;
  opacity: number;
  zIndex: number;
  visibleInGroup: boolean;
};

function computeCardRenderStates(
  activeStep: number,
  layout: LayoutState,
  justEnteredIndex: number | null,
  justExitedIndex: number | null,
  prevLayout: LayoutState | null
): CardRenderState[] {
  const total = STEPS.length;
  const visibleCount = activeStep + 1;
  const positionsNow = computeCardCenteredPositions(visibleCount, layout);
  const prevVisibleCount = Math.max(0, Math.min(total, justEnteredIndex != null ? activeStep : justExitedIndex != null ? activeStep + 2 : visibleCount));
  const baseLayout = prevLayout ?? layout;
  const positionsPrev = computeCardCenteredPositions(
    Math.max(1, prevVisibleCount),
    baseLayout
  );

  const out: CardRenderState[] = [];
  for (let i = 0; i < total; i++) {
    if (i > activeStep) {
      // Future cards: hide them off-screen right (no layout role)
      out.push({
        xPx: layout.viewportInnerWidth + ENTER_EXIT_PX_OFFSET,
        widthPx: layout.cardWidth,
        opacity: 0,
        zIndex: 0,
        visibleInGroup: false,
      });
      continue;
    }
    if (justExitedIndex === i) {
      // Exiting to the right from its previous position in the (larger) group
      const prevIdxInGroup = i;
      const prevX =
        prevIdxInGroup < positionsPrev.length
          ? positionsPrev[prevIdxInGroup]
          : (positionsNow[positionsNow.length - 1] ?? layout.viewportInnerWidth / 2);
      out.push({
        xPx: prevX + ENTER_EXIT_PX_OFFSET,
        widthPx: layout.cardWidth,
        opacity: 0,
        zIndex: 1,
        visibleInGroup: false,
      });
      continue;
    }
    if (justEnteredIndex === i) {
      // Newest card: starts at current targetX but animated from far RIGHT + opacity 0 → 1 via CSS transition on the NEXT paint, so we set initial style then state commits; actually here always set the final target X and opacity 1, but start with a rightward shift. However since transition-duration is constant, we need the card's FIRST rendered transform to be the offset right, then on the same tick after DOM paint we set target, so CSS transition animates from offset → target. We can't do two states here cleanly. Simpler: use xPx here as target, but use an "entering" flag read by the JSX to prepend an offset transform with a key reset. But this is layout compute. For simplicity compute target here, and we'll wrap the just-entered card with a wrapper class that handles the offset+transition via CSS classes toggled with requestAnimationFrame.
      out.push({
        xPx: positionsNow[i] ?? 0,
        widthPx: layout.cardWidth,
        opacity: 1,
        zIndex: 20 + i,
        visibleInGroup: true,
      });
      continue;
    }
    // In-group card (not just entered)
    out.push({
      xPx: positionsNow[i] ?? 0,
      widthPx: layout.cardWidth,
      opacity: 1,
      zIndex: 10 + i,
      visibleInGroup: true,
    });
  }
  return out;
}

function ScrollPinnedHorizontalTimeline({ steps }: { steps: readonly StepT[] }) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);

  const [activeStep, setActiveStep] = useState(0);
  const [pinned, setPinned] = useState(false);
  const [layout, setLayout] = useState<LayoutState>({
    cardWidth: 260,
    gap: CARD_GAP_LG,
    viewportInnerWidth: 1600,
  });
  const [justEnteredIndex, setJustEnteredIndex] = useState<number | null>(null);
  const [justExitedIndex, setJustExitedIndex] = useState<number | null>(null);

  const activeStepRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const isPinnedRef = useRef(false);
  const wheelAccumulatorRef = useRef(0);
  const pendingTimeoutRef = useRef<number | null>(null);
  const setPinTimeoutRef = useRef<number | null>(null);
  const prevLayoutRef = useRef<LayoutState | null>(null);

  const reduceMotion = Boolean(useReducedMotion());
  const reduceMotionRef = useRef(reduceMotion);
  useEffect(() => {
    reduceMotionRef.current = reduceMotion;
  }, [reduceMotion]);

  const goToStep = useCallback(
    (nextIdx: number) => {
      if (isAnimatingRef.current) return;
      const clamped = Math.max(0, Math.min(steps.length - 1, nextIdx));
      const current = activeStepRef.current;
      if (clamped === current) return;
      const dir = clamped > current ? 1 : -1;
      isAnimatingRef.current = true;
      activeStepRef.current = clamped;
      prevLayoutRef.current = layout;
      if (dir === 1) {
        setJustEnteredIndex(clamped);
        setJustExitedIndex(null);
      } else {
        setJustExitedIndex(current);
        setJustEnteredIndex(null);
      }
      setActiveStep(clamped);

      const dur = reduceMotionRef.current ? 0 : ANIMATION_MS;
      if (dur > 0) {
        pendingTimeoutRef.current = window.setTimeout(() => {
          isAnimatingRef.current = false;
          pendingTimeoutRef.current = null;
          setJustEnteredIndex(null);
          setJustExitedIndex(null);
          prevLayoutRef.current = null;
        }, dur + 40);
      } else {
        isAnimatingRef.current = false;
        setJustEnteredIndex(null);
        setJustExitedIndex(null);
        prevLayoutRef.current = null;
      }
    },
    [layout, steps.length]
  );

  const advance = useCallback(
    (dir: 1 | -1) => {
      const current = activeStepRef.current;
      if (isAnimatingRef.current) return false;
      if (dir === 1 && current >= steps.length - 1) return false;
      if (dir === -1 && current <= 0) return false;
      goToStep(current + dir);
      return true;
    },
    [goToStep, steps.length]
  );

  const releasePinIfAtBoundary = useCallback((yDelta: number): boolean => {
    const atLast = activeStepRef.current === steps.length - 1;
    const atFirst = activeStepRef.current === 0;
    if (yDelta > 0 && atLast) return true;
    if (yDelta < 0 && atFirst) return true;
    return false;
  }, [steps.length]);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        const vRatio = entry.intersectionRatio;
        const isInView = entry.isIntersecting && vRatio >= 0.35;
        if (isInView && !isPinnedRef.current) {
          isPinnedRef.current = true;
          setPinned(true);
        }
      },
      {
        threshold: [0, 0.1, 0.25, 0.35, 0.5, 0.75, 0.9, 1],
        root: null,
      }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const measure = () => {
      const viewport = viewportRef.current;
      if (!viewport) return;
      const width = viewport.clientWidth - INNER_PAD * 2;
      if (width <= 0) return;
      const gap = getCardGap(window.innerWidth);
      const newLayout = computeLayout(Math.max(800, width), gap);
      setLayout((prev) => {
        if (
          Math.abs(prev.cardWidth - newLayout.cardWidth) < 0.5 &&
          prev.gap === newLayout.gap &&
          Math.abs(prev.viewportInnerWidth - newLayout.viewportInnerWidth) < 1
        ) {
          return prev;
        }
        prevLayoutRef.current = prev;
        return newLayout;
      });
    };
    measure();
    window.addEventListener("resize", measure);
    let raf = 0;
    const onRaf = () => {
      measure();
    };
    raf = requestAnimationFrame(onRaf);
    return () => {
      window.removeEventListener("resize", measure);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (!isPinnedRef.current) return;
      const y = e.deltaY;
      if (Math.abs(y) < 1) return;
      const atBoundary = releasePinIfAtBoundary(y);
      if (atBoundary) {
        if (setPinTimeoutRef.current) window.clearTimeout(setPinTimeoutRef.current);
        setPinTimeoutRef.current = window.setTimeout(() => {
          isPinnedRef.current = false;
          setPinned(false);
          setPinTimeoutRef.current = null;
        }, 120);
        return;
      }
      if (setPinTimeoutRef.current) {
        window.clearTimeout(setPinTimeoutRef.current);
        setPinTimeoutRef.current = null;
      }
      e.preventDefault();
      e.stopPropagation();
      wheelAccumulatorRef.current += y;
      if (Math.abs(wheelAccumulatorRef.current) < WHEEL_THRESHOLD) return;
      const dir: 1 | -1 = wheelAccumulatorRef.current > 0 ? 1 : -1;
      wheelAccumulatorRef.current = 0;
      advance(dir);
    };
    window.addEventListener("wheel", onWheel, { passive: false, capture: true });

    let touchStartY: number | null = null;
    const onTouchStart = (e: TouchEvent) => {
      if (!isPinnedRef.current) return;
      touchStartY = e.touches[0]?.clientY ?? null;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!isPinnedRef.current || touchStartY == null) return;
      const yNow = e.touches[0]?.clientY ?? 0;
      const dy = touchStartY - yNow;
      if (Math.abs(dy) < 12) return;
      if (releasePinIfAtBoundary(dy)) return;
      e.preventDefault();
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (!isPinnedRef.current || touchStartY == null) return;
      const yEnd = e.changedTouches[0]?.clientY ?? 0;
      const dy = touchStartY - yEnd;
      touchStartY = null;
      if (Math.abs(dy) < TOUCH_THRESHOLD) return;
      const dir: 1 | -1 = dy > 0 ? 1 : -1;
      if (releasePinIfAtBoundary(dy)) {
        if (setPinTimeoutRef.current) window.clearTimeout(setPinTimeoutRef.current);
        setPinTimeoutRef.current = window.setTimeout(() => {
          isPinnedRef.current = false;
          setPinned(false);
          setPinTimeoutRef.current = null;
        }, 120);
        return;
      }
      advance(dir);
    };
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false, capture: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    const onKey = (e: KeyboardEvent) => {
      if (!isPinnedRef.current) return;
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag && (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT")) return;
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        advance(1);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        advance(-1);
      } else if (e.key === "Home") {
        e.preventDefault();
        goToStep(0);
      } else if (e.key === "End") {
        e.preventDefault();
        goToStep(steps.length - 1);
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("wheel", onWheel, true);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove, true);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKey);
      if (pendingTimeoutRef.current != null) {
        window.clearTimeout(pendingTimeoutRef.current);
        pendingTimeoutRef.current = null;
      }
      if (setPinTimeoutRef.current != null) {
        window.clearTimeout(setPinTimeoutRef.current);
        setPinTimeoutRef.current = null;
      }
    };
  }, [advance, goToStep, releasePinIfAtBoundary, steps.length]);

  const cardRenderStates = useMemo(
    () =>
      computeCardRenderStates(
        activeStep,
        layout,
        justEnteredIndex,
        justExitedIndex,
        prevLayoutRef.current
      ),
    [activeStep, layout, justEnteredIndex, justExitedIndex]
  );

  const transitionStyle = reduceMotion
    ? "none"
    : `transform ${ANIMATION_MS}ms cubic-bezier(${EASE.join(",")}), opacity ${ANIMATION_MS}ms cubic-bezier(${EASE.join(",")})`;

  return (
    <div className="hidden lg:block w-full">
      <div ref={wrapperRef} className="w-full relative">
        <div
          ref={stageRef}
          className={cn(
            "w-full transition-[opacity] duration-300",
            pinned ? "lg:sticky lg:top-0" : ""
          )}
          style={{ height: "100vh", maxHeight: "980px", minHeight: "760px" }}
        >
          <div className="relative w-full h-full">
            <div className="absolute inset-0 flex flex-col items-start justify-start pt-0 pb-0 px-0">
              <StepIndicatorBar
                steps={steps}
                activeStep={activeStep}
                onJump={goToStep}
              />

              <div
                ref={viewportRef}
                className="relative w-full flex-1 mt-6"
                aria-roledescription="carousel"
                aria-live="polite"
              >
                <div
                  className="relative w-full h-full overflow-hidden"
                  style={{ padding: `0 ${INNER_PAD}px` }}
                >
                  <div className="relative w-full h-full">
                    {steps.map((step, i) => {
                      const rs = cardRenderStates[i];
                      const isJustEntered = justEnteredIndex === i;
                      const isJustExited = justExitedIndex === i;

                      return (
                        <CenteredCardSlot
                          key={step.index}
                          step={step}
                          cardIndex={i}
                          renderState={rs}
                          widthPx={rs.widthPx}
                          transition={transitionStyle}
                          isEntering={isJustEntered}
                          isExiting={isJustExited}
                          enterOffsetPx={ENTER_EXIT_PX_OFFSET}
                          reduceMotion={reduceMotion}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CenteredCardSlot(props: {
  step: StepT;
  cardIndex: number;
  renderState: CardRenderState;
  widthPx: number;
  transition: string;
  isEntering: boolean;
  isExiting: boolean;
  enterOffsetPx: number;
  reduceMotion: boolean;
}) {
  const {
    step,
    cardIndex,
    renderState,
    widthPx,
    transition,
    isEntering,
    isExiting,
    enterOffsetPx,
    reduceMotion,
  } = props;
  const [phase, setPhase] = useState<"initial" | "target">("target");
  const [lastKey, setLastKey] = useState(`${cardIndex}-${isEntering}-${isExiting}`);

  useEffect(() => {
    const key = `${cardIndex}-${isEntering}-${isExiting}`;
    if (key === lastKey) return;
    setLastKey(key);
    if (isEntering) {
      setPhase("initial");
      let raf1 = 0;
      let raf2 = 0;
      raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => setPhase("target"));
      });
      return () => {
        cancelAnimationFrame(raf1);
        cancelAnimationFrame(raf2);
      };
    }
    if (isExiting) {
      setPhase("initial");
      return;
    }
    setPhase("target");
    return undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEntering, isExiting, cardIndex, lastKey]);

  const offsetX =
    phase === "initial" && (isEntering || isExiting) ? enterOffsetPx : 0;
  const opacityNow =
    phase === "initial" && (isEntering || isExiting) ? 0 : renderState.opacity;
  const appliedTransition = reduceMotion
    ? "none"
    : isEntering && phase === "initial"
    ? "none"
    : transition;

  return (
    <div
      aria-hidden={!renderState.visibleInGroup ? true : undefined}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: `${widthPx}px`,
        height: "100%",
        transform: `translate3d(${renderState.xPx + offsetX}px, 0, 0)`,
        opacity: opacityNow,
        zIndex: renderState.zIndex,
        transition: appliedTransition,
        willChange: "transform, opacity",
        pointerEvents: renderState.visibleInGroup ? "auto" : "none",
      }}
    >
      <div className="absolute inset-x-0 top-0 flex items-start justify-start pt-0 pb-0 px-0 h-full">
        <div className="w-full flex items-start justify-start h-full">
          <div className="w-full max-w-full h-full">
            <StepCard
              step={step}
              index={cardIndex}
              isLast={cardIndex === STEPS.length - 1}
              variant="horizontalAccum"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function StepIndicatorBar({
  steps,
  activeStep,
  onJump,
}: {
  steps: readonly StepT[];
  activeStep: number;
  onJump: (i: number) => void;
}) {
  return (
    <nav aria-label="Procurement process steps" className="relative w-full px-6">
      <div className="relative flex items-start justify-between w-full">
        <div
          aria-hidden
          className="absolute left-6 right-6 top-[27px] h-[2px] rounded-full bg-gradient-to-r from-[#D78034]/35 via-[#080A7E]/30 to-[#0A0C3A]/25"
        />
        {steps.map((step, i) => {
          const isActive = i === activeStep;
          const isPast = i < activeStep;
          return (
            <div
              key={i}
              className="relative z-10 flex flex-col items-center w-[calc((100%-0px)/6)] shrink-0"
            >
              <button
                type="button"
                aria-label={`Go to step ${step.index}: ${step.title}`}
                aria-current={isActive ? "step" : undefined}
                onClick={() => onJump(i)}
                className="group flex flex-col items-center focus:outline-none"
              >
                <div
                  aria-label={`Step ${step.index}`}
                  className={cn(
                    "relative w-[56px] h-[56px] shrink-0 rounded-full flex items-center justify-center ring-[3px] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    isActive
                      ? "scale-105 shadow-[0_16px_32px_rgba(10,12,26,0.22),inset_0_1px_0_rgba(255,255,255,0.26)] ring-white"
                      : isPast
                      ? "scale-100 shadow-[0_10px_22px_rgba(10,12,26,0.14),inset_0_1px_0_rgba(255,255,255,0.20)] ring-white/80"
                      : "scale-95 shadow-[0_10px_22px_rgba(10,12,26,0.12),inset_0_1px_0_rgba(255,255,255,0.16)] ring-white/60 group-hover:scale-100 group-hover:shadow-[0_14px_28px_rgba(10,12,26,0.16),inset_0_1px_0_rgba(255,255,255,0.20)]"
                  )}
                  style={{
                    backgroundColor: isPast || isActive ? step.accent : "#ffffff",
                    borderColor: !isPast && !isActive ? `${step.accent}33` : undefined,
                    borderWidth: !isPast && !isActive ? "1px" : undefined,
                    borderStyle: !isPast && !isActive ? "solid" : undefined,
                  }}
                >
                  <span
                    className={cn("font-bold leading-none tracking-tight transition-colors duration-300 text-[18px]")}
                    style={{ color: isPast || isActive ? "#ffffff" : `${step.accent}` }}
                  >
                    {step.index}
                  </span>
                  {isActive && (
                    <span
                      aria-hidden
                      className="absolute inset-0 rounded-full opacity-55"
                      style={{ boxShadow: `0 0 0 4px ${step.accent}24` }}
                    />
                  )}
                </div>
              </button>
            </div>
          );
        })}
      </div>
    </nav>
  );
}

function StepBadge({
  step,
  variant = "vertical",
}: {
  step: StepT;
  variant?: "vertical" | "horizontal";
}) {
  return (
    <div
      aria-label={`Step ${step.index}`}
      className={cn(
        variant === "vertical" ? "absolute left-0 top-1" : "relative left-auto top-auto",
        "w-[56px] h-[56px] shrink-0 rounded-full flex items-center justify-center shadow-[0_12px_28px_rgba(10,12,26,0.18),inset_0_1px_0_rgba(255,255,255,0.22)] ring-[3px] ring-white"
      )}
      style={{ backgroundColor: step.accent }}
    >
      <span className="text-white font-bold text-[18px] sm:text-[19px] leading-none tracking-tight">
        {step.index}
      </span>
    </div>
  );
}

function StepCard({
  step,
  index,
  isLast,
  variant = "vertical",
}: {
  step: StepT;
  index: number;
  isLast: boolean;
  variant?: "vertical" | "horizontal" | "horizontalAccum";
}) {
  const Icon = step.icon;
  const isEven = index % 2 === 0;
  const horizontal = variant === "horizontal";
  const accumVariant = variant === "horizontalAccum";

  const cardBase = cn(
    "relative rounded-[22px] sm:rounded-[24px] border bg-gradient-to-br shadow-[0_18px_38px_rgba(10,12,26,0.08)] w-full",
    accumVariant
      ? "p-4 md:p-5 lg:p-5 xl:p-[22px] min-h-[280px] md:min-h-[292px] lg:min-h-[300px] xl:min-h-[308px] 2xl:min-h-[324px]"
      : horizontal
      ? "p-5 xl:p-5 2xl:p-6 h-full"
      : "p-5 sm:p-6 md:p-7",
    isEven
      ? "from-white via-white to-[#F4F2FB] border-[#080A7E]/10"
      : "from-white via-white to-[#FEF3E7] border-[#D78034]/14"
  );

  const iconPill = (sizeClass?: string) => (
    <div
      className={cn(
        "shrink-0 h-12 w-12 xl:h-[50px] xl:w-[50px] 2xl:h-12 2xl:w-12 rounded-2xl flex items-center justify-center border",
        "shadow-[0_8px_20px_rgba(10,12,26,0.08),inset_0_1px_0_rgba(255,255,255,0.85)] bg-white",
        sizeClass
      )}
      style={{ color: step.accent, borderColor: `${step.accent}20` }}
    >
      <Icon className={cn(accumVariant ? "size-6" : "size-6 xl:size-[22px] 2xl:size-6")} strokeWidth={1.8} aria-hidden />
    </div>
  );

  const stepLabelText = (sizeClass?: string) => (
    <span
      className={cn(
        "font-bold uppercase",
        accumVariant
          ? "text-[10px] md:text-[11px] tracking-[0.18em] whitespace-nowrap"
          : "text-[10px] xl:text-[11px] 2xl:text-xs tracking-[0.16em] whitespace-nowrap",
        sizeClass
      )}
      style={{ color: step.accent }}
    >
      Step {step.index}
    </span>
  );

  const horizontalDivider = (
    <div className="flex-1 h-px bg-gradient-to-r from-[#DDE1EF]/0 via-[#DDE1EF] to-[#DDE1EF]/0" />
  );

  return (
    <div className={cardBase}>
      {accumVariant ? (
        <div className="flex flex-col h-full gap-3 md:gap-4">
          {iconPill("h-[44px] w-[44px] md:h-12 md:w-12 mb-0")}
          <div className="flex items-center gap-2 mb-0.5">
            {stepLabelText()}
            {horizontalDivider}
          </div>
          <h3 className="mt-0.5 text-[15px] md:text-[16px] xl:text-[15px] font-semibold tracking-tight text-[#0A0C1A] leading-snug">
            {step.title}
          </h3>
          <p className="mt-2 text-[12px] md:text-[13px] xl:text-[12.5px] leading-relaxed text-[#5A5E7A] flex-1">
            {step.description}
          </p>
          {!isLast && (
            <div className="mt-3 md:mt-4 flex items-center justify-end">
              <div
                className="h-[22px] w-[22px] rounded-full flex items-center justify-center border shrink-0"
                style={{
                  borderColor: `${step.accent}26`,
                  color: step.accent,
                  backgroundColor: `${step.accent}0C`,
                }}
                aria-hidden
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M3 3L9 6L3 9V3Z" fill="currentColor" />
                </svg>
              </div>
            </div>
          )}
        </div>
      ) : horizontal ? (
        <div className="flex flex-col h-full">
          {iconPill("mb-4")}
          <div className="flex items-center gap-2 xl:gap-2 mb-1">
            {stepLabelText()}
            {horizontalDivider}
          </div>
          <h3 className="mt-1 text-[17px] xl:text-[16px] 2xl:text-[18px] font-semibold tracking-tight text-[#0A0C1A] leading-snug">
            {step.title}
          </h3>
          <p className={cn("mt-3 text-[13px] xl:text-[13px] 2xl:text-[14px] leading-relaxed text-[#5A5E7A]", "flex-1")}>
            {step.description}
          </p>
          {!isLast && (
            <div className="mt-5 flex items-center justify-end">
              <div
                className="h-[22px] w-[22px] rounded-full flex items-center justify-center border shrink-0"
                style={{
                  borderColor: `${step.accent}26`,
                  color: step.accent,
                  backgroundColor: `${step.accent}0C`,
                }}
                aria-hidden
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M3 3L9 6L3 9V3Z" fill="currentColor" />
                </svg>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-start gap-4 sm:gap-5 h-full">
          {iconPill()}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 sm:gap-3 mb-1">
              {stepLabelText("text-[11px] sm:text-xs tracking-[0.18em]")}
              {horizontalDivider}
            </div>
            <h3 className="mt-1 text-[18px] sm:text-[19px] md:text-[20px] font-semibold tracking-tight text-[#0A0C1A] leading-snug">
              {step.title}
            </h3>
            <p className="mt-3 text-[14px] sm:text-[15px] leading-relaxed text-[#5A5E7A]">
              {step.description}
            </p>
            {!isLast && (
              <div className="mt-5 flex items-center justify-end">
                <div
                  className="h-[22px] w-[22px] rounded-full flex items-center justify-center border"
                  style={{
                    borderColor: `${step.accent}26`,
                    color: step.accent,
                    backgroundColor: `${step.accent}0C`,
                  }}
                  aria-hidden
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M3 3L9 6L3 9V3Z" fill="currentColor" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

type AnimatedContainerProps = {
  delay?: number;
  className?: React.ComponentProps<typeof motion.div>["className"];
  children: React.ReactNode;
};

function AnimatedContainer({
  className,
  delay = 0.1,
  children,
}: AnimatedContainerProps) {
  const shouldReduceMotion = useReducedMotion();
  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div
      initial={{ filter: "blur(4px)", y: -8, opacity: 0 }}
      whileInView={{ filter: "blur(0px)", y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ delay, duration: 0.75, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
