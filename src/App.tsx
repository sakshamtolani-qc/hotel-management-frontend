import { LoginPage } from "./components/LoginPage";
import { SignUp } from "./components/SignUp";
import { AuthProvider } from "./providers/providers";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      {/* <LoginPage /> */}
      <SignUp/>
    </AuthProvider>
  );
}

export default App;
