import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import styles from './IntroAnimation.module.css';

/* ─── Types ─── */

interface IntroAnimationProps {
  onComplete: () => void;
  onRevealStart?: () => void;
}

/* ─── Component ─── */

export default function IntroAnimation({ onComplete, onRevealStart }: IntroAnimationProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const skippedRef = useRef(false);

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ─── Skip handler (guarded against double-fire) ─── */
  const handleSkip = useCallback(() => {
    if (skippedRef.current) return;
    skippedRef.current = true;
    if (tlRef.current) tlRef.current.kill();
    onRevealStart?.();
    if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.inOut',
        onComplete,
      });
    } else {
      onComplete();
    }
  }, [onComplete, onRevealStart]);

  /* ─── Main GSAP Animation ─── */
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    document.body.style.overflow = 'hidden';

    // Accessibility: reduced motion → instant skip
    if (prefersReducedMotion) {
      onRevealStart?.();
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.4,
        delay: 0.2,
        onComplete: () => {
          document.body.style.overflow = '';
          onComplete();
        },
      });
      return () => {
        document.body.style.overflow = '';
      };
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = '';
          onComplete();
        },
      });
      tlRef.current = tl;

      /* ── Gather DOM refs ── */
      const arcRed = overlay.querySelector('[data-arc="red"]') as HTMLElement;
      const arcOrange = overlay.querySelector('[data-arc="orange"]') as HTMLElement;
      const arcMint = overlay.querySelector('[data-arc="mint"]') as HTMLElement;
      const arcNavy = overlay.querySelector('[data-arc="navy"]') as HTMLElement;
      const arcRose = overlay.querySelector('[data-arc="rose"]') as HTMLElement;
      const allArcs = [arcRed, arcOrange, arcMint, arcNavy, arcRose];

      const ivestaLines = overlay.querySelectorAll('[data-el="ivesta-line"]');
      const sloganLines = overlay.querySelectorAll('[data-el="slogan-line"]');
      const bCorp = overlay.querySelector('[data-el="bcorp"]') as HTMLElement;
      const flash = overlay.querySelector('[data-el="flash"]') as HTMLElement;

      const vw = window.innerWidth;

      // ═══════════════════════════════════════════════════════
      // PHASE 1: ARC ENTRANCE (0 → 2s)
      // Colored arcs sweep in from both sides, matching brand visual
      // ═══════════════════════════════════════════════════════
      tl.addLabel('arcs', 0);

      // Navy circle — enters from right (hero element)
      tl.fromTo(
        arcNavy,
        { xPercent: -50, yPercent: -50, x: vw * 0.3, scale: 0.4, opacity: 0 },
        { x: 0, scale: 1, opacity: 1, duration: 1.8, ease: 'power3.out' },
        'arcs',
      );

      // Mint circle — blooms from its center
      tl.fromTo(
        arcMint,
        { xPercent: -50, yPercent: -50, scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.7, ease: 'back.out(1.1)' },
        'arcs+=0.15',
      );

      // Orange arc — sweeps from left
      tl.fromTo(
        arcOrange,
        { xPercent: -50, yPercent: -50, x: -vw * 0.2, scale: 0.5, opacity: 0 },
        { x: 0, scale: 1, opacity: 1, duration: 1.7, ease: 'power3.out' },
        'arcs+=0.25',
      );

      // Red arc — sweeps from far left
      tl.fromTo(
        arcRed,
        { xPercent: -50, yPercent: -50, x: -vw * 0.3, scale: 0.4, opacity: 0 },
        { x: 0, scale: 1, opacity: 1, duration: 1.7, ease: 'power3.out' },
        'arcs+=0.4',
      );

      // Rose arc — sweeps from far right
      tl.fromTo(
        arcRose,
        { xPercent: -50, yPercent: -50, x: vw * 0.15, scale: 0.5, opacity: 0 },
        { x: 0, scale: 1, opacity: 1, duration: 1.5, ease: 'power3.out' },
        'arcs+=0.5',
      );

      // ═══════════════════════════════════════════════════════
      // PHASE 2: TEXT REVEALS (1.8 → 3.4s)
      // Brand text appears on the composition
      // ═══════════════════════════════════════════════════════
      tl.addLabel('text', 1.8);

      // "IVESTA FAMILY OFFICE" — stagger on mint area
      tl.fromTo(
        ivestaLines,
        { opacity: 0, y: 25, x: -15 },
        { opacity: 1, y: 0, x: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' },
        'text',
      );

      // "LE CHOIX D'ÊTRE LIBRE" — stagger on navy area
      tl.fromTo(
        sloganLines,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out' },
        'text+=0.35',
      );

      // B Corp badge
      tl.fromTo(
        bCorp,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.5)' },
        'text+=1.0',
      );

      // ═══════════════════════════════════════════════════════
      // PHASE 3: HOLD (3.4 → 4.4s)
      // Composition holds for the viewer
      // ═══════════════════════════════════════════════════════
      tl.addLabel('hold', '+=0.6');

      // ═══════════════════════════════════════════════════════
      // PHASE 4: DRAMATIC REVEAL (4.4 → 5.8s)
      // Composition zooms and dissolves to landing page
      // ═══════════════════════════════════════════════════════
      tl.addLabel('reveal', '+=0.8');

      // Fire onRevealStart — hero animations begin behind the fading overlay
      tl.call(
        () => {
          onRevealStart?.();
          document.body.style.overflow = '';
        },
        undefined,
        'reveal',
      );

      // Text fades first
      tl.to(
        [...Array.from(ivestaLines), ...Array.from(sloganLines), bCorp],
        { opacity: 0, duration: 0.5, ease: 'power2.in' },
        'reveal',
      );

      // Arcs zoom out slightly
      tl.to(
        allArcs,
        { scale: 1.08, duration: 0.9, ease: 'power2.in' },
        'reveal',
      );

      // White flash
      tl.to(flash, { opacity: 0.4, duration: 0.08 }, 'reveal+=0.5');
      tl.to(flash, { opacity: 0, duration: 0.4, ease: 'power2.out' }, 'reveal+=0.58');

      // Overlay fades to reveal landing page
      tl.to(
        overlay,
        { opacity: 0, duration: 0.7, ease: 'power2.inOut' },
        'reveal+=0.45',
      );
    }, overlay);

    return () => {
      document.body.style.overflow = '';
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ─── Render ─── */
  return (
    <div ref={overlayRef} className={styles.overlay} aria-hidden="true" onClick={handleSkip}>
      {/* Skip Button */}
      <button
        onClick={handleSkip}
        className={styles.skipButton}
        aria-label="Passer l'animation d'introduction"
      >
        Passer
      </button>

      {/* ─── Colored Arcs (brand visual composition) ─── */}
      <div className={styles.arcsContainer}>
        <div data-arc="red" className={`${styles.arc} ${styles.arcRed}`} />
        <div data-arc="rose" className={`${styles.arc} ${styles.arcRose}`} />
        <div data-arc="orange" className={`${styles.arc} ${styles.arcOrange}`} />
        <div data-arc="mint" className={`${styles.arc} ${styles.arcMint}`} />
        <div data-arc="navy" className={`${styles.arc} ${styles.arcNavy}`} />
      </div>

      {/* ─── IVESTA FAMILY OFFICE (on mint area) ─── */}
      <div className={styles.textIvesta}>
        {['IVESTA', 'FAMILY', 'OFFICE'].map((word, i) => (
          <span key={i} data-el="ivesta-line" className={styles.textIvestaLine}>
            {word}
          </span>
        ))}
      </div>

      {/* ─── LE CHOIX D'ÊTRE LIBRE (on navy area) ─── */}
      <div className={styles.textSlogan}>
        {['LE', 'CHOIX', "D'\u00CATRE", 'LIBRE'].map((word, i) => (
          <span key={i} data-el="slogan-line" className={styles.textSloganLine}>
            {word}
          </span>
        ))}
      </div>

      {/* ─── B Corp Badge ─── */}
      <div data-el="bcorp" className={styles.bCorpBadge}>
        <span className={styles.bCorpLabel}>Entreprise</span>
        <div className={styles.bCorpIcon}>B</div>
        <span className={styles.bCorpLabel}>Certifi&eacute;e</span>
      </div>

      {/* ─── Flash Overlay ─── */}
      <div data-el="flash" className={styles.flashOverlay} />
    </div>
  );
}
