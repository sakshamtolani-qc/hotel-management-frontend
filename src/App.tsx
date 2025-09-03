import { LoginPage } from "./components/LoginPage";
import { AuthProvider } from "./providers/providers";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <LoginPage />
    </AuthProvider>
  );
}

export default App;
