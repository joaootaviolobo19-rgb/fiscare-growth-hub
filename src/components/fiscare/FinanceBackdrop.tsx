import { motion } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";

const chartPath =
  "M-20 706 L118 694 L182 652 L250 670 L318 600 L398 616 L468 540 L540 562 L618 470 L698 502 L778 420 L858 448 L938 360 L1018 390 L1098 300 L1178 332 L1258 250 L1338 278 L1462 198";

const bars = [
  { x: 1128, y: 796, h: 64 },
  { x: 1188, y: 780, h: 80 },
  { x: 1248, y: 806, h: 54 },
  { x: 1308, y: 768, h: 92 },
  { x: 1368, y: 790, h: 70 },
];

// Cada vela acompanha uma barra de volume, como num gráfico de mercado.
const candles = [
  { x: 1135, h: 70, up: true },
  { x: 1195, h: 104, up: false },
  { x: 1255, h: 84, up: true },
  { x: 1315, h: 126, up: true },
  { x: 1375, h: 96, up: false },
];

// Mapa-múndi em pontos, gerado a partir das silhuetas dos continentes.
const mapRows = [
  "............#.....######................................",
  "..........##.##.###....#######...####...................",
  "..###########.#.#............#.#######################..",
  "..#...#######..##...........##.##################...#...",
  ".......#######.###..........######################......",
  "........#########..........######################.......",
  "........########..........##..##..##############........",
  "........#######...........#..#.####.##########.#........",
  ".........######...........#####..#############..........",
  ".........###..#..........#######.##.##########..........",
  "...........#.............############.###.###...........",
  ".........................########.##...#..##............",
  ".........................#########.........#............",
  "...............###.......##########.....................",
  "...............####..........#####......................",
  "..............#######........####.......................",
  "...............#######.......####.................#.....",
  "...............######........#####..............##......",
  "................#####........####.............####......",
  "................####..........###............######.....",
  "................###...........##.............######.....",
  "................##...............................##.....",
  "................#.......................................",
  "...............##.......................................",
  "...............#........................................",
];

const MAP = { x: 70, y: 112, step: 10 };

const mapDots = mapRows.flatMap((row, r) =>
  [...row].flatMap((cell, c) =>
    cell === "#" ? [{ x: MAP.x + c * MAP.step, y: MAP.y + r * MAP.step }] : [],
  ),
);

const mapBounds = {
  x: MAP.x - 12,
  y: MAP.y - 12,
  width: (mapRows[0]?.length ?? 56) * MAP.step + 12,
  height: mapRows.length * MAP.step + 12,
};

const ticks = [
  { x: 96, y: 124, text: "22,81" },
  { x: 506, y: 116, text: "4,72" },
];

// Cena vertical: o recorte horizontal da arte principal não funciona no celular.
const compactMapDots = mapDots.map((dot) => ({
  x: 46 + (dot.x - MAP.x) * 0.55,
  y: 18 + (dot.y - MAP.y) * 0.55,
}));

const compactChart =
  "M-10 668 L58 646 L104 604 L152 620 L198 566 L246 586 L292 528 L338 546 L392 492";

export function FinanceBackdrop({ variant = "hero" }: { variant?: "hero" | "band" }) {
  const reduced = useReducedMotionSafe();
  const gradientId = `fb-fill-${variant}`;
  const sweepId = `fb-sweep-${variant}`;
  const mapClipId = `fb-map-clip-${variant}`;

  return (
    <div className={`finance-backdrop finance-backdrop-${variant}`} aria-hidden="true">
      <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMax slice" focusable="false">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--cta)" stopOpacity="0.14" />
            <stop offset="100%" stopColor="var(--cta)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={sweepId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--cta)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--cta)" stopOpacity="0.22" />
            <stop offset="100%" stopColor="var(--cta)" stopOpacity="0" />
          </linearGradient>
          <clipPath id={mapClipId}>
            <rect
              x={mapBounds.x}
              y={mapBounds.y}
              width={mapBounds.width}
              height={mapBounds.height}
            />
          </clipPath>
        </defs>

        <g className="fb-rules">
          {[220, 360, 500, 640, 780].map((y) => (
            <line key={y} x1="0" y1={y} x2="1440" y2={y} />
          ))}
        </g>

        <g className="fb-map-clip" clipPath={`url(#${mapClipId})`}>
          <g className="fb-map">
            {mapDots.map((dot) => (
              <circle key={`${dot.x}-${dot.y}`} cx={dot.x} cy={dot.y} r="2" />
            ))}
          </g>
          <rect
            className="fb-sweep"
            x={mapBounds.x - 140}
            y={mapBounds.y}
            width="140"
            height={mapBounds.height}
            fill={`url(#${sweepId})`}
          />
        </g>

        <g className="fb-ticks">
          {ticks.map((tick) => (
            <text key={tick.text} x={tick.x} y={tick.y}>
              {tick.text}
            </text>
          ))}
        </g>

        <g className="fb-guilloche">
          {[300, 360, 420, 480, 540, 600, 660, 720, 780, 840].map((rx, i) => (
            <ellipse
              key={rx}
              cx="40"
              cy="1000"
              rx={rx}
              ry={rx * 0.72}
              className={i % 3 === 1 ? "is-accent" : undefined}
            />
          ))}
        </g>

        <circle className="fb-wheel" cx="1010" cy="500" r="196" />
        <circle className="fb-wheel fb-wheel-inner" cx="1010" cy="500" r="148" />

        <g className="fb-candles">
          {candles.map((candle, i) => (
            <g key={candle.x} className={candle.up ? "is-up" : "is-down"}>
              <line
                className="fb-candle-wick"
                x1={candle.x + 7}
                y1={752 - candle.h - 16}
                x2={candle.x + 7}
                y2={752 + 12}
                style={{ animationDelay: `${0.2 + i * 0.1}s` }}
              />
              <rect
                className="fb-candle-body"
                x={candle.x}
                y={752 - candle.h}
                width="14"
                height={candle.h}
                style={{ animationDelay: `${0.2 + i * 0.1}s` }}
              />
            </g>
          ))}
        </g>

        <g className="fb-bars">
          {bars.map((bar, i) => (
            <rect
              key={bar.x}
              x={bar.x}
              y={bar.y}
              width="30"
              height={bar.h}
              style={{ animationDelay: `${0.25 + i * 0.12}s` }}
            />
          ))}
        </g>

        <path
          className="fb-area"
          d={`${chartPath} L1462 900 L-20 900 Z`}
          fill={`url(#${gradientId})`}
        />
        <motion.path
          className="fb-line"
          d={chartPath}
          initial={{ pathLength: reduced ? 1 : 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: reduced ? 0 : 2.6,
            ease: [0.22, 1, 0.36, 1],
            delay: reduced ? 0 : 0.35,
          }}
        />

        <g className="fb-coin">
          <circle cx="1238" cy="188" r="54" />
          <text x="1238" y="201" textAnchor="middle">
            R$
          </text>
        </g>

        <text className="fb-pct" x="86" y="300">
          %
        </text>
        <text className="fb-pct fb-pct-small" x="330" y="808">
          R$
        </text>
      </svg>

      {/* No celular a cena principal é recortada; esta versão vertical cobre o topo do hero. */}
      {variant === "hero" && (
        <svg
          className="fb-scene-mobile"
          viewBox="0 0 390 820"
          preserveAspectRatio="xMidYMin meet"
          focusable="false"
        >
          <defs>
            <linearGradient id={`fb-mfill-${variant}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--cta)" stopOpacity="0.1" />
              <stop offset="100%" stopColor="var(--cta)" stopOpacity="0" />
            </linearGradient>
          </defs>

          <g className="fb-map">
            {compactMapDots.map((dot) => (
              <circle key={`mm-${dot.x}-${dot.y}`} cx={dot.x} cy={dot.y} r="1.7" />
            ))}
          </g>

          <g className="fb-guilloche fb-guilloche-compact">
            {[260, 320, 380, 440, 500].map((rx, i) => (
              <ellipse
                key={rx}
                cx="390"
                cy="900"
                rx={rx}
                ry={rx * 0.72}
                className={i % 2 === 1 ? "is-accent" : undefined}
              />
            ))}
          </g>

          <path
            className="fb-area"
            d={`${compactChart} L392 860 L-10 860 Z`}
            fill={`url(#fb-mfill-${variant})`}
          />
          <motion.path
            className="fb-line"
            d={compactChart}
            initial={{ pathLength: reduced ? 1 : 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: reduced ? 0 : 2.6,
              ease: [0.22, 1, 0.36, 1],
              delay: reduced ? 0 : 0.35,
            }}
          />
        </svg>
      )}
    </div>
  );
}
