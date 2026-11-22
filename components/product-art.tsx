type ProductArtProps = {
  visual: string;
  title: string;
  className?: string;
};

export function ProductArt({ visual, title, className = "" }: ProductArtProps) {
  return (
    <div
      className={`relative overflow-hidden bg-[radial-gradient(ellipse_at_center,#1a160f_0%,#070707_72%)] ${className}`}
      aria-hidden="true"
    >
      <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(201,169,98,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(201,169,98,0.07)_1px,transparent_1px)] [background-size:28px_28px]" />
      <svg viewBox="0 0 320 400" className="relative h-full w-full" role="img">
        <title>{title}</title>
        {renderVisual(visual)}
      </svg>
    </div>
  );
}

function gold(opacity = 1) {
  return `rgba(201,169,98,${opacity})`;
}

function renderVisual(visual: string) {
  switch (visual) {
    case "tee":
      return (
        <g fill="none" stroke={gold(0.85)} strokeWidth="1.4">
          <path d="M96 118 L128 92 L160 108 L192 92 L224 118 L210 148 L198 140 V292 H122 V140 L110 148 Z" />
          <path d="M128 92 C146 118 174 118 192 92" />
          <path d="M148 292 H172" stroke={gold(0.45)} />
        </g>
      );
    case "shirt":
      return (
        <g fill="none" stroke={gold(0.85)} strokeWidth="1.4">
          <path d="M88 120 L124 88 L160 118 L196 88 L232 120 L214 156 L204 148 V300 H116 V148 L106 156 Z" />
          <path d="M160 118 L148 148 V300" />
          <path d="M160 118 L172 148" />
          <circle cx="168" cy="176" r="2.2" fill={gold(0.9)} stroke="none" />
          <circle cx="168" cy="204" r="2.2" fill={gold(0.9)} stroke="none" />
          <circle cx="168" cy="232" r="2.2" fill={gold(0.9)} stroke="none" />
        </g>
      );
    case "trousers":
      return (
        <g fill="none" stroke={gold(0.85)} strokeWidth="1.4">
          <path d="M118 86 H202 L210 118 L198 118 L206 312 H166 L160 170 L154 312 H114 L122 118 L110 118 Z" />
          <path d="M150 86 H170" stroke={gold(0.4)} />
        </g>
      );
    case "hoodie":
      return (
        <g fill="none" stroke={gold(0.85)} strokeWidth="1.4">
          <path d="M160 78 C132 78 118 108 118 128 L92 150 L108 176 L120 168 V292 C120 308 136 318 160 318 C184 318 200 308 200 292 V168 L212 176 L228 150 L202 128 C202 108 188 78 160 78 Z" />
          <path d="M140 128 C148 146 172 146 180 128" />
          <path d="M148 168 H172 V210 H148 Z" stroke={gold(0.5)} />
          <path d="M152 128 C140 148 140 168 152 176" stroke={gold(0.55)} />
        </g>
      );
    case "overshirt":
      return (
        <g fill="none" stroke={gold(0.85)} strokeWidth="1.4">
          <path d="M84 124 L122 86 L160 116 L198 86 L236 124 L218 162 L206 154 V306 H114 V154 L102 162 Z" />
          <rect x="126" y="168" width="36" height="44" />
          <path d="M160 116 V306" stroke={gold(0.4)} />
        </g>
      );
    case "bomber":
      return (
        <g fill="none" stroke={gold(0.9)} strokeWidth="1.5">
          <path d="M78 150 L118 96 L160 122 L202 96 L242 150 L220 176 L208 166 V268 C208 286 186 298 160 298 C134 298 112 286 112 268 V166 L100 176 Z" />
          <path d="M112 268 H208" />
          <path d="M160 122 V268" stroke={gold(0.35)} />
          <path d="M128 214 H152" stroke={gold(0.7)} />
        </g>
      );
    case "bottle-crystal":
      return bottle(150, 72, 20, 8);
    case "bottle-crest":
      return bottle(148, 68, 28, 10, true);
    case "bottle-facet":
      return bottle(142, 78, 16, 6);
    case "bottle-slab":
      return bottle(132, 86, 22, 12);
    case "bottle-navy":
      return bottle(146, 70, 18, 7);
    case "bottle-clear":
      return bottle(154, 64, 24, 9);
    default:
      return (
        <circle cx="160" cy="200" r="48" fill="none" stroke={gold(0.8)} strokeWidth="1.4" />
      );
  }
}

function bottle(
  top: number,
  width: number,
  neck: number,
  lip: number,
  crest = false,
) {
  const x = 160 - width / 2;
  const bodyTop = top + 46;
  return (
    <g fill="none" stroke={gold(0.88)} strokeWidth="1.4">
      <rect x={160 - lip} y={top} width={lip * 2} height="12" />
      <path d={`M${160 - neck / 2} ${top + 12} V${bodyTop} H${160 + neck / 2} V${top + 12}`} />
      <path
        d={`M${x} ${bodyTop} H${x + width} V${bodyTop + 196} Q160 ${bodyTop + 220} ${x} ${bodyTop + 196} Z`}
      />
      {crest ? (
        <path d={`M160 ${bodyTop + 36} l10 16 h-8 l3 18 -13 -12 -13 12 3 -18 h-8 z`} stroke={gold(0.7)} />
      ) : (
        <line x1="160" y1={bodyTop + 28} x2="160" y2={bodyTop + 168} stroke={gold(0.28)} />
      )}
    </g>
  );
}
