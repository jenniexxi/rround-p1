import CloseButtonSVG from '@assets/svg/CloseButtonSVG';

type Props = {
  onClick: () => void;
  size?: number;
  strokeWidth?: number;
};

const CloseButton = ({ onClick, size, strokeWidth }: Props) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <CloseButtonSVG
        size={size}
        strokeWidth={strokeWidth}
      />
    </button>
  );
};

export default CloseButton;
