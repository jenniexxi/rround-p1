import { SVGProps } from 'react';

interface Props extends SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  color?: string;
}

const SvgComponent = ({ width = 16, height = 16, color = '#000', ...props }: Props) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={width}
    height={height}
    fill='none'
    {...props}
  >
    <g clipPath='url(#a)'>
      <path
        stroke={color}
        d='M8 15.25A7.25 7.25 0 1 0 8 .75a7.25 7.25 0 0 0 0 14.5Z'
      />
      <path
        fill={color}
        d='M8 6a.75.75 0 1 0 0-1.5A.75.75 0 0 0 8 6Z'
      />
      <rect
        width={1.5}
        height={5}
        x={7.25}
        y={7}
        fill={color}
        rx={0.75}
      />
    </g>
    <defs>
      <clipPath id='a'>
        <path
          fill='#fff'
          d='M0 0h16v16H0z'
        />
      </clipPath>
    </defs>
  </svg>
);

export default SvgComponent;
