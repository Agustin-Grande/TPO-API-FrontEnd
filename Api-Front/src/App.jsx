import { VistosProvider } from "./context/VistosContext";
import { AuthProvider } from "./context/AuthContext";
import Home from "./components/Home";

function App() {
  return (
    <VistosProvider>
      <AuthProvider>
        <Home />
      </AuthProvider>
    </VistosProvider>
  );
}

export default App;
