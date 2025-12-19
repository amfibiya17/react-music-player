import type { SVGProps } from "react";

export type IconProps = SVGProps<SVGSVGElement>;

const PauseIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path
      d="M12,1A11,11,0,1,0,23,12,11.013,11.013,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9.011,9.011,0,0,1,12,21ZM9,8h2v8H9Zm4,0h2v8H13Z"
      fill="currentColor"
    />
  </svg>
);

export default PauseIcon;
