import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.25, 0.1, 0.25, 1];

interface Props {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: keyof JSX.IntrinsicElements;
}

/** Slides up + fades in — use for headings and key copy */
export function FadeUp({ children, className, delay = 0 }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, ease, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Pure fade — use for body text, labels, supporting content */
export function FadeIn({ children, className, delay = 0 }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.7, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Reveals line by line — use for long lists or feature rows */
export function FadeList({ items, renderItem, baseDelay = 0 }: {
  items: unknown[];
  renderItem: (item: unknown, i: number) => React.ReactNode;
  baseDelay?: number;
}) {
  return (
    <>
      {items.map((item, i) => (
        <FadeIn key={i} delay={baseDelay + i * 0.06}>
          {renderItem(item, i)}
        </FadeIn>
      ))}
    </>
  );
}
