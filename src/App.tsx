import { useAuth } from "context/auth-contex";
import { AuthenticatedApp } from "authenticated-app";
import UnauthenticatedApp from "unauthenticated-app";
import "./App.css";
function App() {
  const { user } = useAuth();
  return <>{user ? <AuthenticatedApp /> : <UnauthenticatedApp />}</>;
}

export default App;
