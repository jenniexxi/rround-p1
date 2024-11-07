import { useEffect } from 'react';

import { CookiesProvider } from 'react-cookie';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';

import { ModalContainer } from '@components/modal/ModalContainer';
import { ToastContainer } from '@components/toast/Toast';

import RootRouter from '@router/RootRouter.tsx';

import GlobalStyles from '@styles/globalStyles.ts';
import theme from '@styles/theme.ts';

import { cookieManager } from '@apis/api';
import SystemAPI from '@apis/systemApi';

function App() {
  const queryClient = new QueryClient();

  useEffect(() => {
    // const session = cookieManager.getSessionID();
    // SystemAPI.forceLogin().then((resp: any) => {
    //   if ((resp !== null && session !== resp) || !session) {
    //     cookieManager.setSessionID(resp);
    //   }
    // });
  }, []);

  return (
    <ThemeProvider theme={theme.lightTheme}>
      <CookiesProvider>
        <QueryClientProvider client={queryClient}>
          <GlobalStyles />
          <RootRouter />
          <ToastContainer />
          <ModalContainer />
        </QueryClientProvider>
      </CookiesProvider>
    </ThemeProvider>
  );
}

export default App;
