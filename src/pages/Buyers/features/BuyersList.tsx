import { Button, TwoButton } from '@components';

import { BuyersType, Encrypt } from '@apis/buyersApi';

import * as S from './_Buyers.style';

type BuyersListProps = {
  addresses?: (BuyersType & Encrypt)[];
  onUpdateClick: (address: BuyersType & Encrypt) => void;
  onDeleteClick: (address: Encrypt) => void;
};

const BuyersList = ({ addresses, onUpdateClick, onDeleteClick }: BuyersListProps) => {
  if (!addresses || addresses.length === 0) {
    return <div>등록된 배송지가 없습니다.</div>;
  }

  return (
    <S.BuyersList>
      {addresses.map((address, index) => (
        <S.BuyersListItem key={index}>
          <p>
            {address.receiverName}
            {address.name && ` (${address.name})`}
            {address.defaultYn && <span className='flag'>기본배송지</span>}
          </p>
          <p>{address.zipCode}</p>
          <p>{address.receiverAddress}</p>
          <p>{address.receiverAddressDetail}</p>
          <p>{address.receiverCellPhone}</p>
          <div>
            {address.defaultYn ? (
              <Button
                title='수정'
                type='common.outline.bk'
                size='tiny'
                onClick={() => onUpdateClick(address)}
              />
            ) : (
              <TwoButton
                leftTitle={'수정'}
                rightTitle={'삭제'}
                leftSize={5}
                rightSize={5}
                btnGap={20}
                leftType='common.outline.bk'
                rightType='common.outline.bk'
                size='tiny'
                leftonClick={() => onUpdateClick(address)}
                rightonClick={() => onDeleteClick(address)}
              />
            )}
          </div>
        </S.BuyersListItem>
      ))}
    </S.BuyersList>
  );
};

export default BuyersList;
