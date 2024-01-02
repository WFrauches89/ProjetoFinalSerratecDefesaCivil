import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routes';
import Vlibras from '@djpfs/react-vlibras';
import { AuthProvider } from './Context/index';

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          {/* <Vlibras /> */}

          <AppRouter />
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
