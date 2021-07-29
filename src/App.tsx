import { lazy, Suspense } from "react";
import { useAuth } from "context/auth-contex";
// import AuthenticatedApp  from "authenticated-app";
// import UnauthenticatedApp from "unauthenticated-app";
import "./App.css";
import { ErrorBoundary } from "components/error-boundary";
import { FUllPageErrorFallback, FullPageLoading } from "components/lib";

// 配置懒加载
const AuthenticatedApp = lazy(() => import("authenticated-app"));
const UnauthenticatedApp = lazy(() => import("unauthenticated-app"));
function App() {
  const { user } = useAuth();
  return (
    <>
      <ErrorBoundary fallbackRender={FUllPageErrorFallback}>
        <Suspense fallback={<FullPageLoading />}>
          {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

export default App;
