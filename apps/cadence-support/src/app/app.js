// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { RecoilRoot, useResetRecoilState } from 'recoil';
import styles from './app.module.scss';

import {
  Route,
  Routes,
  Link,
  BrowserRouter,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query';

import RoleRoutes from './rbac/RoleRoutes';
import Login from './pages/Login/Login';
import MessageProvider from 'libs/context/src/lib/MessageContext';
import { MessageStack } from '@cadence-support/widgets';
import { userInfo } from '@cadence-support/atoms';
import { ENV } from '@cadence-support/environments';
import { SocketContext } from '@cadence-support/context';
import RingoverRedirect from './pages/Redirect/RingoverRedirect/RingoverRedirect';

export function App() {
  const resetUser = useResetRecoilState(userInfo);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
    queryCache: new QueryCache({
      onError: (err) => {
        if (
          err?.response?.data?.msg?.includes('Session timed out') &&
          err?.response?.status === 400
        )
          resetUser();
        // window.location.replace(ENV.FRONTEND + '/login');
      },
    }),
  });

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <RecoilRoot>
          {/* <SocketContext> */}
          <MessageProvider>
            <MessageStack />
            <Routes>
              <Route path="/" exact element={<Navigate to="/login" />} />
              <Route path="/login" exact element={<Login />} />
              <Route path="/oauth/ringover" element={<RingoverRedirect />} />
              <Route path="/*" element={<RoleRoutes />} />
            </Routes>
          </MessageProvider>
          {/* </SocketContext> */}
        </RecoilRoot>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
