import { FC, ReactElement } from "react";
import { AuthProvider } from "context/auth-contex";
import { QueryClient, QueryClientProvider } from "react-query";

const AppProviders: FC = ({ children }): ReactElement => {
  return (
    <QueryClientProvider
      client={
        new QueryClient({
          defaultOptions: {
            queries: {
              refetchInterval: false,
            },
          },
        })
      }
    >
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
};

export default AppProviders;
