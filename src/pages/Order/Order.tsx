import { useEffect, useState } from 'react';

import DaumPostcode from 'react-daum-postcode';
import { useLocation } from 'react-router-dom';

import { Accordion } from '@components';
import { Modal } from '@components';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { useHeader } from '@hooks/useHeader';

import BuyersApi, { CreateBuyersBody } from '@apis/buyersApi';
import orderApi from '@apis/orderApi';

import * as S from './Order.style';
import { MyAddress, OrderList, OrderSummary } from './features';

const QUERY_KEYS = {
  myAddresses: ['getMyAddresses'] as const,
};

const selectData = [
  { label: '배송요청사항을 선택해주세요.', value: '' },
  { label: '문 앞에 놓아주세요.', value: '1' },
  { label: '배송 전에 미리 연락 바랍니다.', value: '2' },
  { label: '부재 시 경비실에 맡겨 주세요.', value: '3' },
  { label: '부재 시 전화 주시거나 문자 남겨주세요.', value: '4' },
  { label: '직접 입력', value: '5' },
];

const Order = () => {
  useHeader('주문결제');
  const location = useLocation();
  const queryClient = useQueryClient();

  // 배송지 관련 상태
  const [deliveryRequest, setDeliveryRequest] = useState<string>();
  const [directInput, setDirectInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState({
    prefix: '010',
    mid: '',
    suffix: '',
  });
  const [receiverName, setReceiverName] = useState('');
  const [selectedAddress, setSelectedAddress] = useState({
    zipCode: '',
    address: '',
    addressDetail: '',
  });
  const [addressName, setAddressName] = useState('');

  // 모달 관련
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 쿼리
  const { data: addressCount } = useQuery({
    queryKey: ['getMyAddressCount'],
    queryFn: () => BuyersApi.getMyAddressCount(),
  });

  const { data: addressData } = useQuery({
    queryKey: QUERY_KEYS.myAddresses,
    queryFn: () => BuyersApi.getMyAddresses(),
  });


  const { data: orderItems } = useQuery({
    queryKey: ['getOrderItem', location.state?.selectedCartId],
    queryFn: () => orderApi.getOrderPage(location.state?.selectedCartId),
    enabled: !!location.state?.selectedCartId,
  });

  const { data: orderSummary } = useQuery({
    queryKey: ['getOrderSummary', location.state?.selectedCartId],
    queryFn: () =>
      orderApi.getOrderSummary({
        cartIdList: location.state?.selectedCartId,
        zipCode: '06744',
      }),
    enabled: !!location.state?.selectedCartId,
  });

  // 배송지 관련 핸들러
  const handleDeliveryRequest = (value: string) => {
    setDeliveryRequest(value);
    if (value !== '5') setDirectInput('');
  };

  const handleDirectInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 30) setDirectInput(value);
  };

  const handlePhoneChange = (part: 'prefix' | 'mid' | 'suffix', value: string) => {
    if (!/^\d*$/.test(value)) return;
    setPhoneNumber((prev) => ({ ...prev, [part]: value }));
  };

  const handleAddressComplete = async (data: any) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    setSelectedAddress({
      zipCode: data.zonecode,
      address: fullAddress,
      addressDetail: '',
    });

    setIsModalOpen(false);

    try {
      const newAddressData: CreateBuyersBody = {
        receiverName,
        receiverAddress: fullAddress,
        receiverCellPhone: `${phoneNumber.prefix}-${phoneNumber.mid}-${phoneNumber.suffix}`,
        zipCode: data.zonecode,
        buildingCode: data.buildingCode || '',
        receiverAddressDetail: selectedAddress.addressDetail,
        defaultYn: addressCount?.data === 0, // hasNoAddress 대신 직접 계산
        name: addressName,
      };

      await BuyersApi.createBuyers(newAddressData);
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.myAddresses });
      setIsOpen(false);
    } catch (error) {
      console.error('배송지 등록 실패:', error);
    }
  };

  const addressProps = {
    deliveryRequest,
    directInput,
    isOpen,
    phoneNumber,
    receiverName,
    selectedAddress,
    addressName,
    addressCount,
    addressData,
    selectData,
    onReceiverNameChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      setReceiverName(e.target.value);
    },
    onDirectInput: handleDirectInput,
    onPhoneChange: handlePhoneChange,
    onAddressComplete: handleAddressComplete,
    onAddressDetailChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedAddress((prev) => ({
        ...prev,
        addressDetail: e.target.value,
      }));
    },
    onDeliveryRequest: handleDeliveryRequest,
    setIsOpen,
    onAddressNameChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (value.length <= 10) {
        setAddressName(value);
      }
    },
  };

  // 모달 관련 핸들러
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const accordionItems = [
    {
      title: '배송 정보',
      content: (
        <MyAddress
          {...addressProps}
          onAddressSelect={handleModalOpen}
        />
      ),
    },
    {
      title: '주문 상품',
      content: <OrderList cartList={orderItems?.data?.cartList} />,
    },
    {
      title: '결제금액',
      content: <OrderSummary summaryData={orderSummary?.data} />,
    },
  ];

  return (
    <S.OrderContainer>
      <Accordion
        items={accordionItems}
        isGroup={false}
        defaultOpenIndex={[0, 1, 2]}
      />
      {isModalOpen && (
        <Modal
          onHide={handleModalClose}
          type='center'
          showCloseBtn={false}
        >
          <DaumPostcode
            onComplete={handleAddressComplete}
            autoClose={false}
          />
        </Modal>
      )}
    </S.OrderContainer>
  );
};

export default Order;
