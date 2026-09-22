export default function CircuitDivider({ className = "" }: { className?: string }) {
  return (
    <div
      className={`w-full max-w-7xl mx-auto my-6 sm:my-10 px-4 sm:px-6 flex items-center justify-center overflow-visible ${className}`}
      aria-hidden="true"
    >
      <svg
        className="w-full h-10 sm:h-12 overflow-visible"
        viewBox="0 0 1200 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="circuitLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#A0E34F" stopOpacity="0" />
            <stop offset="6%" stopColor="#A0E34F" stopOpacity="0.8" />
            <stop offset="88%" stopColor="#A0E34F" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#A0E34F" stopOpacity="0" />
          </linearGradient>

          <filter id="circuitGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* The Circuit Trace Line */}
        <path
          d="M 20 24 L 440 24 L 450 14 L 582 14 M 618 14 L 710 14 L 728 32 L 840 32 L 864 8 L 1180 8"
          stroke="url(#circuitLineGrad)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />

        {/* Center Circular Node */}
        {/* Outer Halo Circle */}
        <circle
          cx="600"
          cy="14"
          r="16"
          stroke="#A0E34F"
          strokeWidth="1.25"
          strokeOpacity="0.45"
          fill="#f2f9e8"
        />

        {/* Center Glowing Dot */}
        <circle
          cx="600"
          cy="14"
          r="4.5"
          fill="#A0E34F"
          filter="url(#circuitGlow)"
        />
      </svg>
    </div>
  );
}
