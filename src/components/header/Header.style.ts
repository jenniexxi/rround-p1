import styled from 'styled-components';

export const HeaderContainer = styled.header<{ $isStick: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 56px;
  padding: 0 16px;
  background-color: #fff;
  border-bottom: 1px solid #eee;

  // isStick이 true일 때 적용되는 스타일
  ${({ $isStick }) =>
    $isStick &&
    `
    position: sticky;
    top: 0;
    z-index: 100;
  `}
`;

export const LeftSection = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 9rem;
`;

export const RightSection = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 9rem;
`;

export const TitleWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  padding: 0 0.8rem;
`;

export const Title = styled.h1`
  font-size: 1.8rem;
  margin: 0;
  padding: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  width: 100%;
  max-width: 100%;
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  padding: 0;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`;
