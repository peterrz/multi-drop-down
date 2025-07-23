import React, { SVGProps } from 'react';

interface SvgIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

const ArrowIcon: React.FC<SvgIconProps> = ({
  size = 14,  
  width,
  height,
  fill = '#808080', 
  stroke = '#808080',
}) => {
  const w = width ?? size;
  const h = height ?? size;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={w}
      height={h}
      viewBox="0 -19.04 75.803 75.803"
      fill={fill}
      stroke={stroke}
      strokeWidth={8}
    >
      <g id="SVGRepo_iconCarrier">
        <g
          id="Group_66"
          data-name="Group 66"
          transform="translate(-619.375 -560.018)"
        >
          <path
            id="Path_58"
            d="M695.178 596.248a1.5 1.5 0 0 1-2.561 1.061l-33.56-33.557a2.53 2.53 0 0 0-3.564 0l-33.558 33.557a1.5 1.5 0 0 1-2.121-2.121l33.557-33.557a5.53 5.53 0 0 1 7.808 0l33.559 33.557a1.5 1.5 0 0 1 .44 1.06Z"
            data-name="Path 58"
          />
        </g>
      </g>
    </svg>
  );
};

export default ArrowIcon;
