import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const fadeOut = keyframes`
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0; transform: translateY(-20px); }
`;

export const ToastWrapper = styled.div<{ $isClosing: boolean }>`
  background-color: #333;
  color: white;
  padding: 12px 20px;
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
  animation: ${({ $isClosing }) => ($isClosing ? fadeOut : fadeIn)} 0.3s ease-in-out;
`;

export const ToastContainerWrapper = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  left: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
