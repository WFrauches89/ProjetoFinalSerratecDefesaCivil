import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import CadastroInformeReleases from '../pages/CadastroInfomesReleases';
import CadastroPontoDeApoio from '../pages/CadastroPontoDeApoio';
import VisualizarPontoDeApoio from '../pages/VisualizarPontoDeApoio';
import ListarInformesReleazes from '../pages/VizualizarInformesRealizes';
import Login from '../pages/Login';
import { AuthContext } from '../Context/index';
import UsuarioInfo from '../pages/UsuarioInfo';
import Cadastro from '../pages/CadastroUser';
import EditarQuemSomos from '../pages/EditarQuemSomos';
import ListarUsuarios from '../pages/ListarUsuarios';
import EditarUsuario from '../pages/EditarUsuario';

function AppRouter() {
  const { isAuthenticated } = useContext(AuthContext);

  const AuthRoute = ({ element }) => {
    return isAuthenticated() ? element : <Navigate to="/Login" replace />;
  };

  return (
    <div>
      <Routes>
        <Route path="/Login" element={<Login />}></Route>

        <Route
          path="/VisualizarPontoDeApoio"
          element={<AuthRoute element={<VisualizarPontoDeApoio />} />}
        ></Route>

        <Route
          path="/"
          element={<AuthRoute element={<ListarInformesReleazes />} />}
        ></Route>

        <Route
          path="/ListarInformesReleazes"
          element={<AuthRoute element={<ListarInformesReleazes />} />}
        ></Route>

        <Route
          path="/UsuarioInfo"
          element={<AuthRoute element={<UsuarioInfo />} />}
        />

        <Route
          path="/ListarUsuarios"
          element={<AuthRoute element={<ListarUsuarios />} />}
        />

        <Route
          path="/EditarUsuario"
          element={<AuthRoute element={<EditarUsuario />} />}
        />

        <Route
          path="/CadastroInformeReleases"
          element={<AuthRoute element={<CadastroInformeReleases />} />}
        />
        <Route
          path="/cadastro"
          element={<AuthRoute element={<Cadastro />} />}
        ></Route>
        <Route
          path="/CadastroPontoDeApoio"
          element={<AuthRoute element={<CadastroPontoDeApoio />} />}
        />
        <Route
          path="/EditarQuemSomos"
          element={<AuthRoute element={<EditarQuemSomos />} />}
        ></Route>
      </Routes>
    </div>
  );
}
export default AppRouter;
