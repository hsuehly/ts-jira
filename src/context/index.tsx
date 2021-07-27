import { FC, ReactElement } from "react";
import { AuthProvider } from "context/auth-contex";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { store } from "store";

const AppProviders: FC = ({ children }): ReactElement => {
  const queryClient = new QueryClient();
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>{children}</AuthProvider>
      </QueryClientProvider>
    </Provider>
  );
};

export default AppProviders;
