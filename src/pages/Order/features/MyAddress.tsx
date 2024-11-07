import { useNavigate } from 'react-router-dom';

import { Input, Selector } from '@components';
import { Button } from '@components';

import { type Option } from '@components/selector/Selector';

import { PAGE_ROUTES } from '@router/Routes';

import { MyAddressCountResp, MyAddressResp } from '@apis/buyersApi';

import * as S from './_Order.style';

type Props = {
  deliveryRequest: string | undefined;
  directInput: string;
  phoneNumber: {
    prefix: string;
    mid: string;
    suffix: string;
  };
  receiverName: string;
  selectedAddress: {
    zipCode: string;
    address: string;
    addressDetail: string;
  };
  addressName: string;
  addressCount: MyAddressCountResp | undefined;
  addressData: MyAddressResp | undefined;
  selectData: Option<string>[];
  onDeliveryRequest: (value: string) => void;
  onDirectInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPhoneChange: (part: 'prefix' | 'mid' | 'suffix', value: string) => void;
  onReceiverNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddressDetailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddressNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddressSelect: () => void;
};

const MyAddress = ({
  deliveryRequest,
  directInput,
  phoneNumber,
  receiverName,
  selectedAddress,
  addressName,
  addressCount,
  addressData,
  selectData,
  onDeliveryRequest,
  onDirectInput,
  onPhoneChange,
  onReceiverNameChange,
  onAddressNameChange,
  onAddressDetailChange,
  onAddressSelect,
}: Props) => {
  const hasNoAddress = addressCount?.data === 0;
  const defaultAddress = addressData?.data?.filter((address: any) => address.defaultYn === true) ?? [];

  const navigate = useNavigate();
  // 장바구니 이동버튼 추가
  const goToBuyers = () => {
    navigate(PAGE_ROUTES.BUYERS.path);
  };

  return (
    <>
      {hasNoAddress && (
        <S.AddressContainer>
          <S.FormGroup>
            <S.Label htmlFor='receiverName'>
              받는 분 <S.Required>*</S.Required>
            </S.Label>
            <Input
              name='receiverName'
              value={receiverName}
              onChange={onReceiverNameChange}
              placeholder='받으실 분의 이름을 입력하세요'
            />
          </S.FormGroup>

          <S.FormGroup>
            <S.Label htmlFor='zipCode'>
              주소 <S.Required>*</S.Required>
            </S.Label>
            <S.AddressInputGroup>
              <Input
                name='zipCode'
                value={selectedAddress.zipCode}
                readOnly
                placeholder='우편번호'
              />
              <Button
                onClick={onAddressSelect}
                title='주소찾기'
                size='md'
                width={100}
                type='primary'
              />
            </S.AddressInputGroup>
            <Input
              name='address'
              value={selectedAddress.address}
              readOnly
              placeholder='주소'
              style={{ marginBottom: '8px' }}
            />
            <Input
              name='addressDetail'
              value={selectedAddress.addressDetail}
              onChange={onAddressDetailChange}
              placeholder='상세 주소를 입력하세요'
            />
          </S.FormGroup>

          <S.FormGroup>
            <S.Label htmlFor='phonePrefix'>
              휴대폰번호 <S.Required>*</S.Required>
            </S.Label>
            <S.PhoneInputGroup>
              <S.PhoneSelect
                id='phonePrefix'
                defaultValue={phoneNumber.prefix}
                onChange={(e) => onPhoneChange('prefix', e.target.value)}
              >
                <option value='010'>010</option>
                <option value='011'>011</option>
                <option value='016'>016</option>
                <option value='017'>017</option>
                <option value='018'>018</option>
                <option value='019'>019</option>
              </S.PhoneSelect>
              <S.Separator>-</S.Separator>
              <Input
                name='phoneMiddle'
                value={phoneNumber.mid}
                onChange={(e) => onPhoneChange('mid', e.target.value)}
                maxLength={4}
                width={80}
              />
              <S.Separator>-</S.Separator>
              <Input
                name='phoneLast'
                value={phoneNumber.suffix}
                onChange={(e) => onPhoneChange('suffix', e.target.value)}
                maxLength={4}
                width={80}
              />
            </S.PhoneInputGroup>
          </S.FormGroup>

          <S.FormGroup>
            <S.Label htmlFor='addressName'>배송지명</S.Label>
            <Input
              name='addressName'
              value={addressName}
              onChange={onAddressNameChange}
              placeholder='배송지명을 입력해주세요 (예: 집, 회사)'
              maxLength={10}
              width={400}
            />

            <S.CheckboxLabel>
              <S.Checkbox
                type='checkbox'
                checked={true}
                disabled={true}
              />
              <S.CheckboxText>기본배송지로 저장</S.CheckboxText>
            </S.CheckboxLabel>

            <S.Label htmlFor='deliveryRequest'>배송요청사항</S.Label>
            <Selector<string>
              placeholder='배송요청사항을 선택해 주세요.'
              defaultValue={deliveryRequest}
              options={selectData}
              onChange={onDeliveryRequest}
            />
            {deliveryRequest === '5' && (
              <S.DirectInputWrapper>
                <Input
                  name='directInput'
                  value={directInput}
                  onChange={onDirectInput}
                  maxLength={30}
                  placeholder='배송요청사항을 입력해주세요 (30자 이내)'
                  height='md'
                />
              </S.DirectInputWrapper>
            )}
          </S.FormGroup>
        </S.AddressContainer>
      )}

      {!hasNoAddress &&
        defaultAddress?.map((address) => (
          <S.ExistingAddressCard key={address.buyerAddressIdEncrypt}>
            <S.AddressHeader>
              <S.AddressInfo>
                <S.ReceiverName>{address.receiverName}</S.ReceiverName>
                {address.name && <S.AddressName>({address.name})</S.AddressName>}
                {address.defaultYn && <S.DefaultBadge>기본배송지</S.DefaultBadge>}
              </S.AddressInfo>
              <Button
                type='primary'
                onClick={() => {
                  goToBuyers();
                }}
                title='변경'
                size='sm'
                width={80}
              />
            </S.AddressHeader>
            <S.AddressText>{address.receiverAddress}</S.AddressText>
            <S.AddressText>{address.receiverAddressDetail}</S.AddressText>
            <S.PhoneText>{address.receiverCellPhone}</S.PhoneText>
          </S.ExistingAddressCard>
        ))}
    </>
  );
};

export default MyAddress;
