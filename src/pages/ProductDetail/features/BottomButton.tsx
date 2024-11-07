import { Button } from '@components';

import * as S from './_ProductDetail.style';

type Props = {
  onClickButton: () => void;
};
const BottomButton = ({ onClickButton }: Props) => {
  return (
    <S.BottomButtonContainer>
      <Button
        title='구매하기'
        onClick={onClickButton}
      />
    </S.BottomButtonContainer>
  );
};

export default BottomButton;
