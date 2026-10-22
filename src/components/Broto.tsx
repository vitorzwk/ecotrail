export type BrotoMood = "feliz" | "comemorando" | "pensativo" | "motivado";

const labels: Record<BrotoMood, string> = {
  feliz: "Broto feliz",
  comemorando: "Broto comemorando",
  pensativo: "Broto pensativo",
  motivado: "Broto motivado",
};

export function Broto({ mood = "feliz", size = 96 }: { mood?: BrotoMood; size?: number }) {
  const anim = mood === "comemorando" ? "anim-bounce-soft" : "anim-sway";
  return (
    <svg key={mood} role="img" aria-label={labels[mood]} width={size} height={size} viewBox="0 0 120 120" className={anim}>
      {/* vaso */}
      <path d="M30 78 h60 l-7 34 h-46 z" className="fill-primary-deep" />
      <rect x="26" y="72" width="68" height="10" rx="4" className="fill-primary-deep" />
      {/* caule */}
      <path d="M60 72 C60 58 60 48 60 40" strokeWidth="5" strokeLinecap="round" className="stroke-primary" fill="none" />
      {/* folhas */}
      <path
        d={mood === "comemorando" || mood === "motivado" ? "M60 44 C40 20 18 26 16 30 C24 48 46 50 60 44" : "M60 46 C44 30 24 36 20 42 C30 56 48 54 60 46"}
        className="fill-primary"
      />
      <path
        d={mood === "comemorando" || mood === "motivado" ? "M60 44 C80 20 102 26 104 30 C96 48 74 50 60 44" : "M60 46 C76 30 96 36 100 42 C90 56 72 54 60 46"}
        className="fill-leaf"
      />
      {/* rosto no vaso */}
      {mood === "pensativo" ? (
        <>
          <line x1="44" y1="90" x2="52" y2="90" strokeWidth="3" strokeLinecap="round" className="stroke-primary-soft" />
          <line x1="68" y1="90" x2="76" y2="90" strokeWidth="3" strokeLinecap="round" className="stroke-primary-soft" />
          <path d="M52 102 q8 -4 16 0" strokeWidth="3" fill="none" strokeLinecap="round" className="stroke-primary-soft" />
        </>
      ) : (
        <>
          <circle cx="48" cy="90" r="3.5" className="fill-primary-soft" />
          <circle cx="72" cy="90" r="3.5" className="fill-primary-soft" />
          <path
            d={mood === "comemorando" ? "M48 98 q12 12 24 0 z" : "M50 99 q10 8 20 0"}
            strokeWidth="3"
            strokeLinecap="round"
            className={mood === "comemorando" ? "fill-highlight stroke-primary-soft" : "fill-none stroke-primary-soft"}
          />
        </>
      )}
      {mood === "motivado" && <path d="M98 64 l4 -8 l4 8 l-4 8 z" className="fill-highlight" />}
      {mood === "comemorando" && (
        <>
          <circle cx="18" cy="70" r="3" className="fill-highlight" />
          <circle cx="104" cy="66" r="3" className="fill-info" />
          <circle cx="96" cy="16" r="2.5" className="fill-highlight" />
        </>
      )}
    </svg>
  );
}

export function BrotoSays({ mood, children }: { mood: BrotoMood; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3" aria-live="polite">
      <Broto mood={mood} size={72} />
      <div className="relative rounded-2xl bg-primary-soft px-4 py-3 text-sm font-medium text-primary-deep">{children}</div>
    </div>
  );
}
