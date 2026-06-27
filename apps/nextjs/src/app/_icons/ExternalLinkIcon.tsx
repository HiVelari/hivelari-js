interface IconProps {
  size?: number;
  className?: string;
}

export function ExternalLinkIcon({ size = 10, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
      <path d="M2 10L10 2M10 2H5M10 2V7" />
    </svg>
  );
}
