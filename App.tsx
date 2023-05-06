import { AuthProvider } from './src/ContextApi/authProvider';
import Routes from './src/routes';

export default function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}