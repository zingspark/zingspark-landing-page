import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export const Icons = {
  logo: (props: IconProps) => (
    <svg
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 65 65"
      {...props}
    >
      <mask
        id="zs-mask"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="65"
        height="65"
      >
        <path
          d="M32.447 0c.68 0 1.273.465 1.439 1.125a38.904 38.904 0 001.999 5.905c2.152 5 5.105 9.376 8.854 13.125 3.751 3.75 8.126 6.703 13.125 8.855a38.98 38.98 0 005.906 1.999c.66.166 1.124.758 1.124 1.438 0 .68-.464 1.273-1.125 1.439a38.902 38.902 0 00-5.905 1.999c-5 2.152-9.375 5.105-13.125 8.854-3.749 3.751-6.702 8.126-8.854 13.125a38.973 38.973 0 00-2 5.906 1.485 1.485 0 01-1.438 1.124c-.68 0-1.272-.464-1.438-1.125a38.913 38.913 0 00-2-5.905c-2.151-5-5.103-9.375-8.854-13.125-3.75-3.749-8.125-6.702-13.125-8.854a38.973 38.973 0 00-5.905-2A1.485 1.485 0 010 32.448c0-.68.465-1.272 1.125-1.438a38.903 38.903 0 005.905-2c5-2.151 9.376-5.104 13.125-8.854 3.75-3.749 6.703-8.125 8.855-13.125a38.972 38.972 0 001.999-5.905A1.485 1.485 0 0132.447 0z"
          fill="url(#zs-grad)"
        />
      </mask>
      <g mask="url(#zs-mask)">
        <rect width="65" height="65" fill="url(#zs-grad)" />
        <g filter="url(#zs-f0)">
          <circle cx="5" cy="40" r="18" fill="#FFE432" />
        </g>
        <g filter="url(#zs-f1)">
          <circle cx="30" cy="5" r="18" fill="#FC413D" />
        </g>
        <g filter="url(#zs-f2)">
          <circle cx="18" cy="60" r="22" fill="#00B95C" />
        </g>
        <g filter="url(#zs-f3)">
          <circle cx="55" cy="25" r="18" fill="#3186FF" />
        </g>
        <g filter="url(#zs-f4)">
          <circle cx="40" cy="42" r="16" fill="#3186FF" />
        </g>
        <g filter="url(#zs-f5)">
          <circle cx="-5" cy="22" r="18" fill="#FBBC04" />
        </g>
      </g>
      <defs>
        <linearGradient
          id="zs-grad"
          x1="18"
          y1="43"
          x2="52"
          y2="15"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4893FC" />
          <stop offset=".27" stopColor="#4893FC" />
          <stop offset=".777" stopColor="#969DFF" />
          <stop offset="1" stopColor="#BD99FE" />
        </linearGradient>
        <filter
          id="zs-f0"
          x="-23"
          y="12"
          width="56"
          height="56"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur stdDeviation="5" />
        </filter>
        <filter
          id="zs-f1"
          x="2"
          y="-23"
          width="56"
          height="56"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur stdDeviation="5" />
        </filter>
        <filter
          id="zs-f2"
          x="-14"
          y="28"
          width="64"
          height="64"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur stdDeviation="5" />
        </filter>
        <filter
          id="zs-f3"
          x="27"
          y="-3"
          width="56"
          height="56"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur stdDeviation="5" />
        </filter>
        <filter
          id="zs-f4"
          x="14"
          y="16"
          width="52"
          height="52"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur stdDeviation="5" />
        </filter>
        <filter
          id="zs-f5"
          x="-33"
          y="-6"
          width="56"
          height="56"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>
    </svg>
  ),
  sun: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  ),
  moon: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  ),
  globe: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  ),
  chevronDown: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  ),
  mail: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
  mapPin: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  send: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
      <path d="m21.854 2.147-10.94 10.939" />
    </svg>
  ),
};

// --- JD Section SVG Line Icons ---

type LineIconProps = { className?: string };

export function AgentIcon({ className }: LineIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="5" y="2" width="14" height="14" rx="3" />
      <circle cx="9.5" cy="9" r="1" />
      <circle cx="14.5" cy="9" r="1" />
      <path d="M9 13h6" />
      <path d="M12 16v3" />
      <path d="M8 22h8" />
      <path d="M2 6h3" />
      <path d="M19 6h3" />
    </svg>
  );
}

export function BrainIcon({ className }: LineIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 2a5 5 0 0 0-4.8 3.6A4 4 0 0 0 4 9.5a4.5 4.5 0 0 0 1 8.4A5 5 0 0 0 12 22" />
      <path d="M12 2a5 5 0 0 1 4.8 3.6A4 4 0 0 1 20 9.5a4.5 4.5 0 0 1-1 8.4A5 5 0 0 1 12 22" />
      <path d="M12 2v20" />
      <path d="M8 8h.5" />
      <path d="M15.5 8H16" />
      <path d="M8 14h.5" />
      <path d="M15.5 14H16" />
    </svg>
  );
}

export function ArchitectIcon({ className }: LineIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <path d="M10 6.5h4" />
      <path d="M6.5 10v4" />
      <path d="M17.5 10v4" />
      <path d="M10 17.5h4" />
    </svg>
  );
}

export function ChipIcon({ className }: LineIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="5" y="5" width="14" height="14" rx="2" />
      <rect x="9" y="9" width="6" height="6" rx="1" />
      <path d="M9 2v3" />
      <path d="M15 2v3" />
      <path d="M9 19v3" />
      <path d="M15 19v3" />
      <path d="M2 9h3" />
      <path d="M2 15h3" />
      <path d="M19 9h3" />
      <path d="M19 15h3" />
    </svg>
  );
}

export function SearchIcon({ className }: LineIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m16.5 16.5 5 5" />
      <path d="M8 11h6" />
      <path d="M11 8v6" />
    </svg>
  );
}

export function GlobeIcon({ className }: LineIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
      <path d="M4.5 7h15" />
      <path d="M4.5 17h15" />
    </svg>
  );
}

export function ClipboardIcon({ className }: LineIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="5" y="4" width="14" height="18" rx="2" />
      <path d="M9 2h6a1 1 0 0 1 1 1v1H8V3a1 1 0 0 1 1-1z" />
      <path d="M9 12h6" />
      <path d="M9 16h4" />
    </svg>
  );
}

export function UsersIcon({ className }: LineIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="9" cy="7" r="3" />
      <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M21 21v-1.5a3 3 0 0 0-3-3h-.5" />
    </svg>
  );
}

export function PaletteIcon({ className }: LineIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="8" cy="9" r="1.5" fill="currentColor" />
      <circle cx="12" cy="7" r="1.5" fill="currentColor" />
      <circle cx="16" cy="9" r="1.5" fill="currentColor" />
      <circle cx="8" cy="13" r="1.5" fill="currentColor" />
      <path d="M15.5 13a2.5 2.5 0 0 1 2.5 2.5c0 2.5-2 3.5-6 3.5a8 8 0 0 1-1-.06" />
    </svg>
  );
}
