import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const cardVariants = cva(
  "relative flex flex-col justify-end h-full w-full overflow-hidden rounded-2xl border border-white/10 shadow-[0_10px_34px_rgba(10,12,26,0.08)] transition-shadow duration-300 hover:shadow-[0_26px_66px_rgba(10,12,26,0.18)]",
  {
    variants: {
      gradient: {
        navy:
          "bg-[radial-gradient(circle_at_top_left,_#171B5B_0%,_#0A0C3A_55%,_#060828_100%)]",
        gold:
          "bg-[radial-gradient(circle_at_top_left,_#FFF2D9_0%,_#FFE1B0_55%,_#FFCC82_100%)] border-[#D78034]/20",
        "navy-alt":
          "bg-[radial-gradient(circle_at_bottom_right,_#222776_0%,_#0E1152_55%,_#070936_100%)]",
        "gold-alt":
          "bg-[radial-gradient(circle_at_bottom_right,_#FFE9C5_0%,_#FFD496_55%,_#F7B863_100%)] border-[#D78034]/20",
      },
    },
    defaultVariants: {
      gradient: "navy",
    },
  }
);

export interface GradientCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  badgeColor: string;
  title: string;
  ctaText: string;
  ctaHref: string;
  imageUrl: string;
  bullets?: string[];
}

const GradientCard = React.forwardRef<HTMLDivElement, GradientCardProps>(
  (
    {
      className,
      gradient,
      badgeColor,
      title,
      ctaText,
      ctaHref,
      imageUrl,
      bullets,
      ...props
    },
    ref
  ) => {
    const cardAnimation = {
      rest: { scale: 1, y: 0 },
      hover: { scale: 1.025, y: -4 },
    };

    const imageAnimation = {
      rest: { scale: 1, x: 0, y: 0, rotate: -0.6 },
      hover: { scale: 1.04, x: 4, y: -5, rotate: -0.2 },
    };

    const isDark =
      gradient === "navy" || gradient === "navy-alt" || !gradient;

    return (
      <motion.div
        variants={cardAnimation}
        initial="rest"
        whileHover="hover"
        animate="rest"
        className="h-full"
        ref={ref}
      >
        <div
          className={cn(cardVariants({ gradient }), className)}
          {...props}
          style={{ minHeight: 340 }}
        >
          <div className="pointer-events-none absolute inset-0">
            <div
              className={`absolute top-0 right-0 h-40 w-40 rounded-full blur-3xl opacity-50 ${
                isDark ? "bg-[#D78034]" : "bg-[#080A7E]"
              }`}
            />
            <div
              className={`absolute -bottom-16 -left-12 h-48 w-48 rounded-full blur-3xl opacity-40 ${
                isDark ? "bg-[#080A7E]" : "bg-[#D78034]"
              }`}
            />
          </div>

          <motion.img
            src={imageUrl}
            alt={`${title} product`}
            variants={imageAnimation}
            transition={{ type: "spring", stiffness: 380, damping: 20 }}
            className="absolute top-[14px] sm:top-[18px] right-[-6px] sm:right-[-2px] w-[58%] sm:w-[60%] lg:w-[62%] max-w-[248px] sm:max-w-[252px] object-contain object-right-top drop-shadow-[0_24px_38px_rgba(0,0,0,0.28)] pointer-events-none select-none"
            draggable={false}
          />

          <div className="relative z-10 flex flex-col justify-end pt-[140px] sm:pt-[150px] lg:pt-[155px] pb-5 sm:pb-6 lg:pb-7 px-5 sm:px-6 lg:px-7 min-h-[340px] sm:min-h-[340px] lg:min-h-[350px]">
            <div
              className="mb-3 inline-flex h-[6px] w-14 rounded-full"
              style={{ backgroundColor: badgeColor }}
            />
            <h3
              className={`text-[20px] sm:text-[22px] lg:text-[24px] font-bold tracking-tight leading-[1.05] max-w-[85%] ${
                isDark ? "text-white" : "text-[#0A0C1A]"
              }`}
            >
              {title}
            </h3>

            {bullets && bullets.length > 0 && (
              <ul className="mt-4 space-y-2">
                {bullets.map((b) => (
                  <li
                    key={b}
                    className={`flex items-start gap-2 text-[12.5px] sm:text-[13px] leading-snug ${
                      isDark ? "text-white/80" : "text-[#2B2E45]"
                    }`}
                  >
                    <span
                      className="mt-[7px] inline-flex h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: badgeColor }}
                    />
                    <span className="max-w-[88%]">{b}</span>
                  </li>
                ))}
              </ul>
            )}

            <a
              href={ctaHref}
              className={`group mt-5 inline-flex items-center gap-2 text-[12.5px] font-bold uppercase tracking-[0.16em] ${
                isDark ? "text-[#FFD89B]" : "text-[#080A7E]"
              }`}
            >
              {ctaText}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </motion.div>
    );
  }
);
GradientCard.displayName = "GradientCard";

export { GradientCard, cardVariants };
