import type { SVGProps } from "react";

export type IconProps = SVGProps<SVGSVGElement>;

const VolumeDownIcon = (props: IconProps) => (
  <svg viewBox="0 0 16 16" aria-hidden="true" {...props}>
    <path d="M6 1H8V15H6L2 11H0V5H2L6 1Z" fill="currentColor" />
  </svg>
);

export default VolumeDownIcon;
