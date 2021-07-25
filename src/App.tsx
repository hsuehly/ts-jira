import { useAuth } from "context/auth-contex";
import { AuthenticatedApp } from "authenticated-app";
import UnauthenticatedApp from "unauthenticated-app";
import "./App.css";
import { ErrorBoundary } from "components/error-boundary";
import { FUllPageErrorFallback } from "components/lib";
function App() {
  const { user } = useAuth();
  return (
    <>
      <ErrorBoundary fallbackRender={FUllPageErrorFallback}>
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </ErrorBoundary>
    </>
  );
}

export default App;
