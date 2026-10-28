// Original, lightweight SVG illustrations. All decorative (aria-hidden); animation lives in
// styles/illustrations.css and is switched off by prefers-reduced-motion.
import { useId } from 'react';

const GREEN = '#183F32';
const ORANGE = '#F47B35';
const CREAM = '#FFF7E9';
const YELLOW = '#FFD66B';
const RED = '#DB493B';
const SKIN = '#EBAE80';

const base = (extra) => ({ 'aria-hidden': true, focusable: 'false', ...extra });

/* ───────────────────────────── Chef ───────────────────────────── */
export function Chef({ className = '' }) {
  return (
    <svg className={`illo chef ${className}`} viewBox="0 0 240 320" {...base()}>
      <ellipse cx="120" cy="309" rx="82" ry="9" fill={GREEN} opacity=".16" />
      {/* body */}
      <path d="M58 302 L64 200 Q66 160 120 160 Q174 160 176 200 L182 302 Z" fill={GREEN} />
      <path d="M120 166 V302" stroke="#0F2B22" strokeWidth="3" />
      {[196, 222, 248].map((y) => (
        <g key={y}>
          <circle cx="104" cy={y} r="5.5" fill={YELLOW} />
          <circle cx="136" cy={y} r="5.5" fill={YELLOW} />
        </g>
      ))}
      <path d="M94 163 L146 163 L120 198 Z" fill={ORANGE} />
      {/* waving arm */}
      <g className="chef-wave">
        <path d="M170 190 Q202 176 208 138" stroke={GREEN} strokeWidth="26" strokeLinecap="round" fill="none" />
        <circle cx="209" cy="124" r="14" fill={SKIN} />
        <path d="M201 112 q-2 -9 2 -12 M209 109 q0 -10 4 -12 M217 112 q3 -8 7 -8" stroke={SKIN} strokeWidth="6" strokeLinecap="round" fill="none" />
      </g>
      {/* spoon arm */}
      <g>
        <path d="M70 192 Q40 206 40 240" stroke={GREEN} strokeWidth="26" strokeLinecap="round" fill="none" />
        <circle cx="40" cy="248" r="13" fill={SKIN} />
        <path d="M40 246 L26 190" stroke="#B9B5A8" strokeWidth="6" strokeLinecap="round" />
        <ellipse cx="24" cy="182" rx="11" ry="15" fill="#D9D6CC" transform="rotate(14 24 182)" />
      </g>
      {/* head */}
      <circle cx="78" cy="116" r="9" fill={SKIN} />
      <circle cx="162" cy="116" r="9" fill={SKIN} />
      <circle cx="120" cy="114" r="46" fill={SKIN} />
      {/* hat */}
      <rect x="76" y="64" width="88" height="22" rx="6" fill={CREAM} stroke={GREEN} strokeWidth="3" />
      <circle cx="84" cy="52" r="24" fill={CREAM} stroke={GREEN} strokeWidth="3" />
      <circle cx="156" cy="52" r="24" fill={CREAM} stroke={GREEN} strokeWidth="3" />
      <circle cx="120" cy="40" r="30" fill={CREAM} stroke={GREEN} strokeWidth="3" />
      <rect x="78" y="62" width="84" height="24" rx="6" fill={CREAM} />
      <path d="M78 76 H162" stroke={GREEN} strokeWidth="3" />
      {/* face */}
      <g className="chef-eyes">
        <circle cx="104" cy="112" r="4.6" fill="#242824" />
        <circle cx="136" cy="112" r="4.6" fill="#242824" />
      </g>
      <path d="M94 101 q10 -7 20 0 M126 101 q10 -7 20 0" stroke="#7A4B2A" strokeWidth="3.4" strokeLinecap="round" fill="none" />
      <circle cx="94" cy="128" r="8" fill={ORANGE} opacity=".35" />
      <circle cx="146" cy="128" r="8" fill={ORANGE} opacity=".35" />
      <path d="M102 128 Q120 148 138 128" fill="#fff" stroke="#242824" strokeWidth="3.4" strokeLinejoin="round" />
      <path d="M92 138 q28 12 56 0 q-4 10 -28 12 q-24 -2 -28 -12" fill="#4A2E1A" opacity=".0" />
    </svg>
  );
}

/* ───────────────────────────── Cloche ───────────────────────────── */
export function Cloche({ className = '', open = false, auto = true }) {
  return (
    <svg
      className={`illo cloche ${open ? 'is-open' : ''} ${auto && !open ? 'is-auto' : ''} ${className}`}
      viewBox="0 0 260 220"
      {...base()}
    >
      <ellipse cx="130" cy="184" rx="112" ry="15" fill="#000" opacity=".1" />
      <ellipse cx="130" cy="176" rx="110" ry="16" fill="#E6E1D3" />
      <ellipse cx="130" cy="171" rx="100" ry="12" fill="#FFFCF4" />
      <g className="cloche-food">
        <ellipse cx="130" cy="158" rx="62" ry="22" fill="#F2B84B" />
        <circle cx="130" cy="142" r="20" fill="#FFF1BF" />
        <circle cx="106" cy="148" r="8" fill={RED} />
        <circle cx="154" cy="150" r="7" fill="#6DBB7C" />
        {[96, 112, 128, 146, 160].map((x, i) => (
          <circle key={x} cx={x} cy={158 + (i % 2) * 6} r="2.4" fill="#C98B2C" />
        ))}
        <path className="steam s1" d="M110 128 q-10 -16 0 -30 q10 -14 0 -28" />
        <path className="steam s2" d="M132 124 q-10 -16 0 -30 q10 -14 0 -28" />
        <path className="steam s3" d="M154 128 q-10 -16 0 -30 q10 -14 0 -28" />
      </g>
      <g className="cloche-lid">
        <path d="M36 172 Q36 62 130 62 Q224 62 224 172 Z" fill="#DAD6CA" />
        <path d="M54 150 Q58 92 108 76" stroke="#fff" strokeWidth="7" strokeLinecap="round" fill="none" opacity=".65" />
        <rect x="30" y="166" width="200" height="9" rx="4.5" fill="#B9B5A8" />
        <circle cx="130" cy="55" r="11" fill="#B9B5A8" />
      </g>
    </svg>
  );
}

/* ───────────────────────────── Steaming bowl ───────────────────────────── */
export function SteamBowl({ className = '' }) {
  return (
    <svg className={`illo steam-bowl ${className}`} viewBox="0 0 200 190" {...base()}>
      <path className="steam s1" d="M70 76 q-12 -18 0 -34 q12 -16 0 -32" />
      <path className="steam s2" d="M100 70 q-12 -18 0 -34 q12 -16 0 -32" />
      <path className="steam s3" d="M130 76 q-12 -18 0 -34 q12 -16 0 -32" />
      <ellipse cx="100" cy="176" rx="46" ry="8" fill="#000" opacity=".1" />
      <path d="M18 96 Q18 168 100 168 Q182 168 182 96 Z" fill={ORANGE} />
      <path d="M30 118 Q100 140 170 118" stroke="#FFD66B" strokeWidth="5" strokeLinecap="round" fill="none" opacity=".8" />
      <ellipse cx="100" cy="96" rx="82" ry="16" fill="#D8601E" />
      <ellipse cx="100" cy="96" rx="72" ry="11" fill="#F2B84B" />
      {[64, 84, 108, 130, 142].map((x, i) => (
        <circle key={x} cx={x} cy={95 + (i % 2) * 3} r="3" fill={i % 2 ? '#6DBB7C' : RED} />
      ))}
    </svg>
  );
}

/* ───────────────────────────── Idli plate ───────────────────────────── */
export function Idli({ className = '' }) {
  const idli = (x, y) => (
    <g transform={`translate(${x} ${y})`} key={`${x}${y}`}>
      <path d="M-27 8 Q-27 -26 0 -26 Q27 -26 27 8 Q0 20 -27 8Z" fill="#FFFDF5" stroke="#E6DFC8" strokeWidth="3" />
      <path d="M-16 -8 Q-12 -18 -2 -19" stroke="#fff" strokeWidth="4" strokeLinecap="round" fill="none" />
    </g>
  );
  return (
    <svg className={`illo idli ${className}`} viewBox="0 0 200 150" {...base()}>
      <ellipse cx="100" cy="128" rx="92" ry="16" fill="#000" opacity=".1" />
      <ellipse cx="100" cy="112" rx="92" ry="26" fill="#FFFCF4" stroke="#D9D6CC" strokeWidth="3" />
      <ellipse cx="100" cy="112" rx="70" ry="17" fill="none" stroke="#E8E3D6" strokeWidth="3" />
      {idli(66, 98)}
      {idli(112, 98)}
      {idli(88, 78)}
      <ellipse cx="156" cy="112" rx="20" ry="9" fill="#6DBB7C" stroke="#fff" strokeWidth="3" />
      <ellipse cx="160" cy="98" rx="14" ry="7" fill={RED} stroke="#fff" strokeWidth="3" />
    </svg>
  );
}

/* ───────────────────────────── Dosa ───────────────────────────── */
export function Dosa({ className = '' }) {
  return (
    <svg className={`illo dosa ${className}`} viewBox="0 0 230 150" {...base()}>
      <ellipse cx="115" cy="128" rx="104" ry="16" fill="#000" opacity=".1" />
      <ellipse cx="115" cy="112" rx="104" ry="26" fill="#FFFCF4" stroke="#D9D6CC" strokeWidth="3" />
      <path d="M28 108 Q112 20 206 62 L198 90 Q112 60 40 126 Z" fill="#E3A74D" />
      <path d="M44 106 Q112 44 196 68 M52 116 Q116 66 190 80" stroke="#B87723" strokeWidth="3" strokeLinecap="round" fill="none" opacity=".6" />
      <ellipse cx="202" cy="76" rx="9" ry="16" fill="#F8D27A" transform="rotate(14 202 76)" />
      <ellipse cx="60" cy="118" rx="14" ry="6" fill="#6DBB7C" stroke="#fff" strokeWidth="3" />
    </svg>
  );
}

/* ───────────────────────────── Banana ───────────────────────────── */
export function Banana({ className = '' }) {
  return (
    <svg className={`illo banana ${className}`} viewBox="0 0 160 120" {...base()}>
      <path d="M14 28 Q44 112 142 74 Q152 68 146 56 Q86 90 34 14 Z" fill={YELLOW} stroke="#C9962B" strokeWidth="4" strokeLinejoin="round" />
      <path d="M30 36 Q58 88 122 74" stroke="#fff" strokeWidth="4" strokeLinecap="round" fill="none" opacity=".5" />
      <path d="M0 40 Q40 126 134 84 Q144 80 140 70 Q90 96 24 22 Z" fill="#F2BD3E" stroke="#C9962B" strokeWidth="4" strokeLinejoin="round" opacity=".95" />
      <circle cx="30" cy="14" r="6" fill="#8A5A36" />
      <circle cx="146" cy="60" r="5" fill="#8A5A36" />
    </svg>
  );
}

/* ───────────────────────────── Laddu ───────────────────────────── */
export function Laddu({ className = '' }) {
  return (
    <svg className={`illo laddu ${className}`} viewBox="0 0 100 100" {...base()}>
      <path d="M20 58 L80 58 L72 90 L28 90Z" fill="#fff" stroke="#E4D6B3" strokeWidth="3" />
      <path d="M26 58 L30 90 M40 58 L42 90 M60 58 L58 90 M74 58 L70 90" stroke="#E4D6B3" strokeWidth="2" />
      <circle cx="50" cy="42" r="30" fill="#F2A33A" />
      {[[38, 32], [56, 28], [62, 46], [44, 50], [34, 46], [50, 40]].map(([x, y]) => (
        <circle key={`${x}${y}`} cx={x} cy={y} r="2.6" fill="#C0752A" />
      ))}
      <path d="M30 34 Q34 20 48 17" stroke="#fff" strokeWidth="4" strokeLinecap="round" fill="none" opacity=".55" />
      <ellipse cx="50" cy="16" rx="6" ry="3.4" fill="#E9B44C" transform="rotate(-20 50 16)" />
    </svg>
  );
}

/* ───────────────────────────── Ladle ───────────────────────────── */
export function Ladle({ className = '' }) {
  return (
    <svg className={`illo ladle ${className}`} viewBox="0 0 80 240" {...base()}>
      <rect x="35" y="6" width="10" height="150" rx="5" fill="#B9B5A8" />
      <circle cx="40" cy="16" r="5" fill="#fff" opacity=".7" />
      <path d="M12 152 Q12 224 40 224 Q68 224 68 152 Z" fill="#D9D6CC" />
      <ellipse cx="40" cy="152" rx="28" ry="8" fill="#B9B5A8" />
      <path d="M20 170 Q22 204 36 212" stroke="#fff" strokeWidth="4" strokeLinecap="round" fill="none" opacity=".6" />
    </svg>
  );
}

/* ───────────────────────────── Plate with cutlery ───────────────────────────── */
export function PlateSet({ className = '' }) {
  return (
    <svg className={`illo plate-set ${className}`} viewBox="0 0 180 150" {...base()}>
      <circle cx="90" cy="76" r="56" fill="#FFFCF4" stroke="#D9D6CC" strokeWidth="4" />
      <circle cx="90" cy="76" r="38" fill="none" stroke="#E8E3D6" strokeWidth="3" />
      <circle cx="90" cy="76" r="14" fill={ORANGE} />
      <circle cx="90" cy="76" r="7" fill={YELLOW} />
      <path d="M22 26 V130 M16 26 V58 Q16 66 22 66 Q28 66 28 58 V26" stroke="#B9B5A8" strokeWidth="5" strokeLinecap="round" fill="none" />
      <ellipse cx="158" cy="44" rx="9" ry="16" fill="#B9B5A8" />
      <path d="M158 58 V130" stroke="#B9B5A8" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

/* ───────────────────────────── Rolling pin ───────────────────────────── */
export function RollingPin({ className = '' }) {
  return (
    <svg className={`illo rolling-pin ${className}`} viewBox="0 0 230 56" {...base()}>
      <rect x="2" y="21" width="48" height="14" rx="7" fill="#B9763E" />
      <rect x="180" y="21" width="48" height="14" rx="7" fill="#B9763E" />
      <rect x="40" y="6" width="150" height="44" rx="20" fill="#D79A5B" />
      <path d="M60 12 H170" stroke="#fff" strokeWidth="4" strokeLinecap="round" opacity=".45" />
      <path d="M72 6 V50 M158 6 V50" stroke="#B9763E" strokeWidth="2.5" opacity=".6" />
    </svg>
  );
}

/* ───────────────────────────── Sparkle / confetti ───────────────────────────── */
export function Sparkle({ className = '', color = YELLOW }) {
  return (
    <svg className={`illo sparkle ${className}`} viewBox="0 0 24 24" {...base()}>
      <path d="M12 0 C13 8 16 11 24 12 C16 13 13 16 12 24 C11 16 8 13 0 12 C8 11 11 8 12 0Z" fill={color} />
    </svg>
  );
}

const CONFETTI = [
  [6, 12, 0, ORANGE], [24, 6, 40, YELLOW], [44, 20, 80, RED], [62, 8, 20, '#6DBB7C'], [82, 16, 60, YELLOW],
  [12, 44, 110, YELLOW], [34, 54, 30, ORANGE], [56, 46, 70, RED], [76, 58, 10, '#6DBB7C'], [93, 40, 50, ORANGE],
  [9, 82, 90, RED], [30, 92, 20, '#6DBB7C'], [52, 80, 60, YELLOW], [72, 93, 100, ORANGE], [91, 78, 40, YELLOW],
];
// Small fixed-size paper bits scattered by percentage (not an SVG, so they never stretch).
export function Confetti({ className = '' }) {
  return (
    <span className={`confetti ${className}`} aria-hidden="true">
      {CONFETTI.map(([x, y, r, c], i) => (
        <i key={i} style={{ left: `${x}%`, top: `${y}%`, background: c, '--r': `${r}deg`, animationDelay: `${(i % 5) * 0.5}s` }} />
      ))}
    </span>
  );
}

/* ───────────────────────────── Logo mark ───────────────────────────── */
export function SunriseMark({ className = '' }) {
  return (
    <svg className={`sunrise-mark ${className}`} viewBox="0 0 64 64" {...base()}>
      <g stroke={YELLOW} strokeWidth="3.6" strokeLinecap="round">
        <path d="M32 8v7" />
        <path d="M13 17l5 5" />
        <path d="M51 17l-5 5" />
        <path d="M5 35h7" />
        <path d="M59 35h-7" />
      </g>
      <path d="M14 44a18 18 0 0 1 36 0z" fill={ORANGE} />
      <path d="M22 30 q3 -5 8 -6" stroke={CREAM} strokeWidth="3" strokeLinecap="round" fill="none" opacity=".7" />
      <rect x="6" y="46" width="52" height="5" rx="2.5" fill="currentColor" />
      <path d="M22 56h20" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

/* ───────────────────────────── Squiggle underline ───────────────────────────── */
export function Squiggle({ className = '', color = ORANGE }) {
  return (
    <svg className={`squiggle ${className}`} viewBox="0 0 200 14" preserveAspectRatio="none" {...base()}>
      <path d="M2 8 Q14 -2 26 8 T50 8 T74 8 T98 8 T122 8 T146 8 T170 8 T198 8" stroke={color} strokeWidth="4" strokeLinecap="round" fill="none" />
    </svg>
  );
}

/* ───────────────────────────── Sun with rays ───────────────────────────── */
export function SunBurst({ className = '' }) {
  const rays = Array.from({ length: 16 }, (_, i) => i * 22.5);
  return (
    <svg className={`illo sunburst ${className}`} viewBox="0 0 400 400" {...base()}>
      <g className="sun-rays">
        {rays.map((a) => (
          <path key={a} d="M200 8 L212 78 L188 78Z" fill={YELLOW} transform={`rotate(${a} 200 200)`} opacity=".9" />
        ))}
      </g>
      <circle cx="200" cy="200" r="118" fill={ORANGE} />
      <circle cx="200" cy="200" r="96" fill="#F9923F" />
    </svg>
  );
}

/* ───────────────────────────── Rotating text sticker ───────────────────────────── */
export function BadgeSticker({ text = 'MADE WITH CARE • SERVED WITH LOVE • ', className = '' }) {
  const id = useId().replace(/:/g, '');
  return (
    <svg className={`badge-sticker ${className}`} viewBox="0 0 200 200" {...base()}>
      <circle cx="100" cy="100" r="98" fill={GREEN} />
      <circle cx="100" cy="100" r="64" fill={YELLOW} />
      <defs>
        <path id={`ring-${id}`} d="M100 100 m-78 0 a78 78 0 1 1 156 0 a78 78 0 1 1 -156 0" />
      </defs>
      <g className="badge-ring">
        <text fill={CREAM} fontSize="15" fontWeight="700" fontFamily="DM Sans, system-ui, sans-serif">
          <textPath href={`#ring-${id}`} textLength="484" lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </g>
      <path d="M100 66 C102 86 112 96 134 100 C112 104 102 114 100 134 C98 114 88 104 66 100 C88 96 98 86 100 66Z" fill={ORANGE} />
    </svg>
  );
}

/* ───────────────────────────── Leaf sprig ───────────────────────────── */
export function Sprig({ className = '' }) {
  return (
    <svg className={`illo sprig ${className}`} viewBox="0 0 90 120" {...base()}>
      <path d="M45 118 Q40 70 48 8" stroke="#2A6B3F" strokeWidth="4" strokeLinecap="round" fill="none" />
      {[[40, 92, -1], [48, 70, 1], [40, 50, -1], [50, 30, 1]].map(([y0, y, d], i) => (
        <path key={i} d={`M${d > 0 ? 48 : 43} ${y} q${d * 32} -6 ${d * 36} -26 q${-d * 30} 2 ${-d * 36} 26z`} fill={i % 2 ? '#6DBB7C' : '#3E8E55'} />
      ))}
    </svg>
  );
}
