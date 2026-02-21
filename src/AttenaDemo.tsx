import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
} from "remotion";

const BG = "#0f0f11";
const FG = "#f5f5f5";
const MUTED = "#888";
const GREEN = "#2EC273";
const CARD_BG = "#161619";
const BORDER = "rgba(255,255,255,0.08)";
const KALSHI_GREEN = "#2EC273";
const POLY_BLUE = "#6B93FF";

const QUERY = "Trump markets over $100K volume";

const RESULTS = [
  {
    source: "polymarket",
    category: "politics",
    title: "Will Donald Trump be President on December 31?",
    price: 89,
    outcome: "Yes",
    vol24h: "$1.2M",
    vol: "$45.3M",
    date: "Dec 31",
  },
  {
    source: "kalshi",
    category: "politics",
    title: "Trump approval rating above 50% in March?",
    price: 34,
    outcome: "Yes",
    vol24h: "$340K",
    vol: "$8.7M",
    date: "Mar 31",
  },
  {
    source: "polymarket",
    category: "politics",
    title: "Trump to issue executive order on crypto in Q1?",
    price: 72,
    outcome: "Yes",
    vol24h: "$890K",
    vol: "$12.1M",
    date: "Mar 31",
  },
  {
    source: "kalshi",
    category: "politics",
    title: "Will Trump impose new tariffs on China by June?",
    price: 61,
    outcome: "Yes",
    vol24h: "$210K",
    vol: "$5.4M",
    date: "Jun 30",
  },
  {
    source: "polymarket",
    category: "politics",
    title: "Trump to pardon more than 100 people in 2026?",
    price: 18,
    outcome: "Yes",
    vol24h: "$156K",
    vol: "$3.2M",
    date: "Dec 31",
  },
];

const SearchBar: React.FC<{ typedChars: number }> = ({ typedChars }) => {
  const displayText = QUERY.slice(0, typedChars);
  const showCursor = typedChars < QUERY.length;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        background: CARD_BG,
        border: `1px solid ${typedChars > 0 ? GREEN : BORDER}`,
        borderRadius: 12,
        padding: "14px 20px",
        width: "100%",
        maxWidth: 700,
        transition: "border-color 0.3s",
      }}
    >
      {/* Search icon */}
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={MUTED}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ marginRight: 12, flexShrink: 0 }}
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
      <span style={{ color: FG, fontSize: 18, fontFamily: "Inter, system-ui, sans-serif" }}>
        {displayText}
      </span>
      {showCursor && (
        <span
          style={{
            display: "inline-block",
            width: 2,
            height: 22,
            background: GREEN,
            marginLeft: 1,
          }}
        />
      )}
      {!showCursor && typedChars === 0 && (
        <span style={{ color: "#555", fontSize: 18, fontFamily: "Inter, system-ui, sans-serif" }}>
          Search 80,000+ prediction markets...
        </span>
      )}
    </div>
  );
};

const ResultCard: React.FC<{
  result: (typeof RESULTS)[0];
  opacity: number;
  translateY: number;
}> = ({ result, opacity, translateY }) => {
  const isKalshi = result.source === "kalshi";

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        background: CARD_BG,
        border: `1px solid ${BORDER}`,
        borderRadius: 12,
        padding: "14px 20px",
        width: "100%",
        maxWidth: 700,
      }}
    >
      {/* Top row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 8,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: isKalshi ? KALSHI_GREEN : POLY_BLUE,
              fontFamily: "Inter, system-ui, sans-serif",
            }}
          >
            {isKalshi ? "Kalshi" : "Polymarket"}
          </span>
          <span style={{ color: "rgba(255,255,255,0.25)" }}>·</span>
          <span
            style={{
              fontSize: 12,
              color: "rgba(255,255,255,0.5)",
              fontFamily: "Inter, system-ui, sans-serif",
            }}
          >
            {result.category}
          </span>
        </div>
        <span
          style={{
            fontSize: 12,
            color: "rgba(255,255,255,0.5)",
            fontFamily: "Inter, system-ui, sans-serif",
          }}
        >
          {result.date}
        </span>
      </div>

      {/* Title + Price */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 24,
        }}
      >
        <span
          style={{
            fontSize: 17,
            fontWeight: 500,
            color: FG,
            lineHeight: 1.4,
            flex: 1,
            fontFamily: "Inter, system-ui, sans-serif",
          }}
        >
          {result.title}
        </span>
        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <span
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: FG,
              fontFamily: "JetBrains Mono, monospace",
              lineHeight: 1,
            }}
          >
            {result.price}%
          </span>
          <div
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.45)",
              marginTop: 4,
              fontFamily: "Inter, system-ui, sans-serif",
            }}
          >
            {result.outcome}
          </div>
        </div>
      </div>

      {/* Volume row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          marginTop: 10,
        }}
      >
        <span
          style={{
            fontSize: 10,
            fontWeight: 500,
            background: "rgba(255,255,255,0.06)",
            borderRadius: 4,
            padding: "2px 6px",
            color: "rgba(255,255,255,0.5)",
            fontFamily: "Inter, system-ui, sans-serif",
          }}
        >
          24h: {result.vol24h}
        </span>
        <span
          style={{
            fontSize: 10,
            fontWeight: 500,
            background: "rgba(255,255,255,0.04)",
            borderRadius: 4,
            padding: "2px 6px",
            color: "rgba(255,255,255,0.4)",
            fontFamily: "Inter, system-ui, sans-serif",
          }}
        >
          vol: {result.vol}
        </span>
      </div>
    </div>
  );
};

export const AttenaDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Timeline (10 seconds total at 30fps = 300 frames)
  // 0-0.5s: Logo fades in
  // 0.5-1s: Search bar appears
  // 1-3.5s: Typing animation
  // 3.5-4s: Brief pause
  // 4-7s: Results appear one by one
  // 7-10s: Hold / subtle pulse on results

  // Logo
  const logoOpacity = interpolate(frame, [0, 0.5 * fps], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Search bar
  const searchBarOpacity = interpolate(
    frame,
    [0.4 * fps, 0.8 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Typing: starts at 1s, ~2 chars per frame at 30fps → ~1 char every 3 frames
  const typingStart = 1 * fps;
  const charsPerFrame = 1 / 3;
  const typedChars = Math.min(
    Math.max(0, Math.floor((frame - typingStart) * charsPerFrame)),
    QUERY.length
  );

  // Results appear starting at 3.8s, staggered 0.2s each
  const resultsStart = 3.8 * fps;
  const stagger = 0.18 * fps;

  // Result count label
  const allResultsIn = resultsStart + stagger * RESULTS.length;
  const resultCountOpacity = interpolate(
    frame,
    [allResultsIn, allResultsIn + 0.3 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: BG,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "40px 0 0",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      {/* Logo area */}
      <div
        style={{
          opacity: logoOpacity,
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 28,
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: `linear-gradient(135deg, ${GREEN}, #1a9e5a)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            fontWeight: 700,
            color: "#fff",
          }}
        >
          A
        </div>
        <span
          style={{
            fontSize: 26,
            fontWeight: 600,
            color: FG,
            letterSpacing: -0.5,
          }}
        >
          attena
        </span>
        <span
          style={{
            fontSize: 10,
            fontWeight: 600,
            color: GREEN,
            background: "rgba(46,194,115,0.12)",
            padding: "2px 8px",
            borderRadius: 6,
            marginLeft: 4,
          }}
        >
          BETA
        </span>
      </div>

      {/* Search bar */}
      <div style={{ opacity: searchBarOpacity, width: "100%", maxWidth: 700, paddingLeft: 40, paddingRight: 40 }}>
        <SearchBar typedChars={frame >= typingStart ? typedChars : 0} />
      </div>

      {/* Results count */}
      <div
        style={{
          opacity: resultCountOpacity,
          width: "100%",
          maxWidth: 700,
          paddingLeft: 40,
          paddingRight: 40,
          marginTop: 16,
          marginBottom: 4,
        }}
      >
        <span style={{ fontSize: 13, color: MUTED }}>
          {RESULTS.length} results · sorted by relevance
        </span>
      </div>

      {/* Results */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          width: "100%",
          maxWidth: 700,
          paddingLeft: 40,
          paddingRight: 40,
          marginTop: 8,
        }}
      >
        {RESULTS.map((result, i) => {
          const resultFrame = resultsStart + i * stagger;
          const s = spring({
            frame: frame - resultFrame,
            fps,
            config: { damping: 20, stiffness: 120, mass: 0.5 },
          });
          const opacity = interpolate(s, [0, 1], [0, 1], {
            extrapolateRight: "clamp",
          });
          const translateY = interpolate(s, [0, 1], [20, 0], {
            extrapolateRight: "clamp",
          });

          return (
            <ResultCard
              key={i}
              result={result}
              opacity={frame >= resultFrame ? opacity : 0}
              translateY={frame >= resultFrame ? translateY : 20}
            />
          );
        })}
      </div>
    </div>
  );
};
