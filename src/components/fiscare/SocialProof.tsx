import { ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play, Star } from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";

import { googleReviews } from "@/lib/landing-content";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";
import { Reveal } from "./shared";

const AUTO_ADVANCE_MS = 4200;

function Stars({ label }: { label: string }) {
  return (
    <span className="review-stars" role="img" aria-label={label}>
      {[0, 1, 2, 3, 4].map((star) => (
        <Star key={star} size={14} strokeWidth={0} aria-hidden="true" />
      ))}
    </span>
  );
}

function GoogleMark() {
  return (
    <svg className="review-google" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  );
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? "") : "";
  return `${first}${last}`.toUpperCase();
}

type Review = (typeof googleReviews.items)[number];

function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="review-card">
      <div className="review-top">
        <Stars label="5 de 5 estrelas" />
        <GoogleMark />
      </div>
      <blockquote className="review-text">
        <p>{review.text}</p>
      </blockquote>
      <figcaption className="review-author">
        <span className="review-avatar" aria-hidden="true">
          {initials(review.name)}
        </span>
        <span>
          <strong>{review.name}</strong>
          <span className="review-source">Avaliação no Google</span>
        </span>
      </figcaption>
    </figure>
  );
}

export function SocialProof() {
  const reduced = useReducedMotionSafe();
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const geometryRef = useRef({ step: 0, setWidth: 0 });
  const holdRef = useRef(false);
  const inViewRef = useRef(true);
  const [paused, setPaused] = useState(false);
  const [position, setPosition] = useState(0);
  const count = googleReviews.items.length;

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track || track.children.length < count + 1) return;
    const first = track.children[0] as HTMLElement;
    const second = track.children[1] as HTMLElement;
    const cloneStart = track.children[count] as HTMLElement;
    geometryRef.current = {
      step: second.offsetLeft - first.offsetLeft,
      setWidth: cloneStart.offsetLeft - first.offsetLeft,
    };
  }, [count]);

  useEffect(() => {
    measure();
    const viewport = viewportRef.current;
    if (!viewport || typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", measure);
      return () => window.removeEventListener("resize", measure);
    }
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, [measure]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) inViewRef.current = entry.isIntersecting;
      },
      { threshold: 0.2 },
    );
    observer.observe(viewport);
    return () => observer.disconnect();
  }, []);

  const glide = useCallback(
    (left: number) => {
      const viewport = viewportRef.current;
      if (!viewport) return;
      if (typeof viewport.scrollTo === "function") {
        viewport.scrollTo({ left, behavior: reduced ? "auto" : "smooth" });
      } else {
        viewport.scrollLeft = left;
      }
    },
    [reduced],
  );

  const advance = useCallback(
    (direction: 1 | -1) => {
      const viewport = viewportRef.current;
      const { step, setWidth } = geometryRef.current;
      if (!viewport || step <= 0 || setWidth <= 0) return;
      let left = viewport.scrollLeft;
      // O trilho repete as avaliações: ao cruzar a emenda, volta ao início sem salto visível.
      if (left >= setWidth) {
        left -= setWidth;
        viewport.scrollLeft = left;
      }
      if (direction === -1 && left <= 0) {
        left = setWidth;
        viewport.scrollLeft = left;
      }
      glide(left + direction * step);
    },
    [glide],
  );

  useEffect(() => {
    if (reduced || paused) return;
    const id = window.setInterval(() => {
      if (holdRef.current || !inViewRef.current || document.hidden) return;
      advance(1);
    }, AUTO_ADVANCE_MS);
    return () => window.clearInterval(id);
  }, [reduced, paused, advance]);

  const handleScroll = useCallback(() => {
    const viewport = viewportRef.current;
    const { step } = geometryRef.current;
    if (!viewport || step <= 0) return;
    const index = Math.round(viewport.scrollLeft / step) % count;
    setPosition(((index % count) + count) % count);
  }, [count]);

  const hold = () => {
    holdRef.current = true;
  };
  const release = () => {
    holdRef.current = false;
  };

  // Arraste com mouse/caneta; no toque o navegador já rola o trilho nativamente.
  const dragRef = useRef<{ id: number; startX: number; startLeft: number } | null>(null);
  const [dragging, setDragging] = useState(false);
  const dragStart = (event: ReactPointerEvent<HTMLDivElement>) => {
    hold();
    if (event.pointerType === "touch" || (event.pointerType === "mouse" && event.button !== 0))
      return;
    const viewport = viewportRef.current;
    if (!viewport) return;
    dragRef.current = {
      id: event.pointerId,
      startX: event.clientX,
      startLeft: viewport.scrollLeft,
    };
    viewport.classList.add("is-dragging");
    setDragging(true);
  };

  useEffect(() => {
    if (!dragging) return;
    const move = (event: PointerEvent) => {
      const drag = dragRef.current;
      const viewport = viewportRef.current;
      if (!drag || !viewport || drag.id !== event.pointerId) return;
      viewport.scrollLeft = drag.startLeft - (event.clientX - drag.startX);
    };
    const end = (event: PointerEvent) => {
      if (dragRef.current?.id !== event.pointerId) return;
      dragRef.current = null;
      viewportRef.current?.classList.remove("is-dragging");
      setDragging(false);
      release();
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", end);
    window.addEventListener("pointercancel", end);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", end);
      window.removeEventListener("pointercancel", end);
    };
  }, [dragging]);

  return (
    <section id="avaliacoes" className="section reviews">
      <div className="site-container">
        <div className="reviews-head">
          <Reveal>
            <h2 className="section-title">Quem já confia na Fiscare.</h2>
          </Reveal>
          <Reveal delay={0.08} className="reviews-meta">
            <span className="reviews-rating">
              <GoogleMark />
              <strong>{googleReviews.rating}</strong>
              <Stars label={`Nota ${googleReviews.rating} de 5 estrelas`} />
            </span>
            <span className="reviews-count">{googleReviews.count} avaliações</span>
            <a className="reviews-link" href={googleReviews.url} target="_blank" rel="noreferrer">
              Ver todas no Google <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <div
            className="reviews-carousel"
            onPointerEnter={hold}
            onPointerLeave={release}
            onPointerDown={hold}
            onPointerUp={release}
            onPointerCancel={release}
            onFocus={hold}
            onBlur={release}
          >
            <div className="reviews-bar">
              <p className="reviews-hint">Arraste para ler mais depoimentos</p>
              <div className="reviews-controls">
                <span className="reviews-position" aria-hidden="true">
                  {String(position + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
                </span>
                <button
                  type="button"
                  className="reviews-btn"
                  onClick={() => advance(-1)}
                  aria-label="Avaliação anterior"
                >
                  <ArrowLeft size={16} aria-hidden="true" />
                </button>
                {!reduced && (
                  <button
                    type="button"
                    className="reviews-btn"
                    onClick={() => setPaused((value) => !value)}
                    aria-label={paused ? "Retomar rotação automática" : "Pausar rotação automática"}
                    aria-pressed={paused}
                  >
                    {paused ? (
                      <Play size={15} aria-hidden="true" />
                    ) : (
                      <Pause size={15} aria-hidden="true" />
                    )}
                  </button>
                )}
                <button
                  type="button"
                  className="reviews-btn"
                  onClick={() => advance(1)}
                  aria-label="Próxima avaliação"
                >
                  <ArrowRight size={16} aria-hidden="true" />
                </button>
              </div>
            </div>

            <div
              ref={viewportRef}
              className="reviews-viewport"
              tabIndex={0}
              role="region"
              aria-roledescription="carrossel"
              aria-label="Avaliações de clientes no Google"
              onScroll={handleScroll}
              onPointerDown={dragStart}
            >
              <ul ref={trackRef} className="reviews-track">
                {googleReviews.items.map((review, index) => (
                  <li
                    key={review.name}
                    className="reviews-slide"
                    role="group"
                    aria-roledescription="depoimento"
                    aria-label={`${index + 1} de ${count}`}
                  >
                    <ReviewCard review={review} />
                  </li>
                ))}
                {googleReviews.items.map((review) => (
                  <li key={`copia-${review.name}`} className="reviews-slide" aria-hidden="true">
                    <ReviewCard review={review} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
