import { useState } from 'react';

import DaumPostcode from 'react-daum-postcode';

import { Tab } from '@components';
import { Modal } from '@components';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useHeader } from '@hooks/useHeader';

import BuyersApi, { BuyersType, CreateBuyersBody, Encrypt } from '@apis/buyersApi';

import { BuyersForm, BuyersList } from './features';

const Buyers = () => {
  useHeader('배송지 변경');
  const queryClient = useQueryClient();
  const [selectedAddress, setSelectedAddress] = useState<(BuyersType & Encrypt) | undefined>(undefined);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [activeTab, setActiveTab] = useState(0); // 탭 인덱스
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Query
  const { data: addressesData } = useQuery({
    queryKey: ['getMyAddresses'],
    queryFn: () => BuyersApi.getMyAddresses(),
  });

  // Mutations
  const createMutation = useMutation({
    mutationFn: (data: CreateBuyersBody) => BuyersApi.createBuyers(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getMyAddresses'] });
      setActiveTab(0);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: CreateBuyersBody }) => BuyersApi.updateBuyers(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getMyAddresses'] });
      setActiveTab(0);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (buyerAddressIdEncrypt: string) => BuyersApi.deleteBuyers(buyerAddressIdEncrypt),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getMyAddresses'] });
    },
  });

  // Handlers
  const handleUpdateClick = (address: BuyersType & Encrypt): void => {
    setSelectedAddress(address);
    setIsUpdateMode(true);
    setActiveTab(1);
  };

  const handleDelClick = (address: Encrypt) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      deleteMutation.mutate(address.buyerAddressIdEncrypt);
    }
  };

  const handleSubmit = (data: CreateBuyersBody): void => {
    if (isUpdateMode && selectedAddress) {
      updateMutation.mutate({
        id: selectedAddress.buyerAddressIdEncrypt,
        data,
      });
    } else {
      createMutation.mutate(data);
    }
    setIsUpdateMode(false);
    setSelectedAddress(undefined);
  };

  const sortedAddresses = addressesData?.data?.slice().sort((a, b) => {
    if (a.defaultYn === b.defaultYn) return 0;
    return a.defaultYn ? -1 : 1;
  });

  const handleTabChange = (index: number): void => {
    if (index === 1) {
      // 배송지 추가/수정 탭으로 직접 이동할 경우
      setIsUpdateMode(false); // 수정 모드 해제
      setSelectedAddress(undefined); // 선택된 배송지 초기화
    }
    setActiveTab(index);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  const handleAddressComplete = (data: any): void => {
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

    // 새로운 배송지 데이터 생성
    const newAddress: CreateBuyersBody = {
      receiverName: '',
      receiverAddress: fullAddress,
      receiverCellPhone: '',
      zipCode: data.zonecode,
      buildingCode: data.buildingCode || '',
      receiverAddressDetail: '',
      defaultYn: addressesData?.data?.length === 0,
      name: '',
    };

    createMutation.mutate(newAddress);
    setIsModalOpen(false);
  };
  const tabsData = [
    {
      title: '배송지 목록',
      content: (
        <BuyersList
          addresses={sortedAddresses}
          onUpdateClick={handleUpdateClick}
          onDeleteClick={handleDelClick}
        />
      ),
    },
    {
      title: '배송지 추가/수정',
      content: (
        <BuyersForm
          isUpdateMode={isUpdateMode}
          initialData={selectedAddress}
          onSubmit={handleSubmit}
          addressCount={addressesData?.data?.length || 0}
          handleModalOpen={handleModalOpen}
        />
      ),
    },
  ];
  return (
    <>
      <Tab
        tabs={tabsData}
        isFlex={false}
        isStickyTab={false}
        height={50}
        activeIndex={activeTab}
        onChange={handleTabChange}
        tabItemTypeInfo={{
          type: 'spread',
          style: {
            itemGap: 0,
            isFixedWidth: false,
            height: 50,
            isBorder: true,
            fontWeight: 500,
            fontColor: '#666666',
            backgroundColor: '#ffffff',
            borderColor: '#e5e5e5',
            borderWidth: 1,
            selectedFontColor: '#000000',
            selecteFontWeight: 700,
            selectedBackgroundColor: '#ffffff',
            selectedBorderColor: '#000000',
            selectedBorderWidth: 2,
          },
        }}
      />
      {isModalOpen && (
        <Modal
          onHide={handleModalClose}
          type='center'
          showCloseBtn={true}
        >
          <DaumPostcode
            onComplete={handleAddressComplete}
            autoClose={false}
          />
        </Modal>
      )}
    </>
  );
};

export default Buyers;
