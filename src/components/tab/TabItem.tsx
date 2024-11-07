import { TabItemTypeInfo } from './Tab';
import * as S from './Tab.style';

type Props = {
  onSelect: () => void;
  isSelected: boolean;
  label: string;
  width?: number;
  height?: number;
  typeInfo: TabItemTypeInfo;
  isFlex: boolean;
};

const TabItem = ({ onSelect, isSelected, label, typeInfo, isFlex }: Props) => {
  return (
    <S.TabItem
      $isSelected={isSelected}
      $tabItemType={typeInfo}
      onClick={onSelect}
      $isFixedWidth={typeInfo.style.isFixedWidth || false}
      $width={typeInfo.style.width}
      $height={typeInfo.style.height}
      $isFlex={isFlex}
    >
      {label}
    </S.TabItem>
  );
};

export default TabItem;
