import React, { useState, useEffect, useContext } from 'react';
import './styles.css';
import { HeaderWeb } from '../../components/HeaderWeb';
import Footer from '../../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { TfiEmail } from "react-icons/tfi";
import { FaKey } from "react-icons/fa";
import { AuthContext } from '../../Context/index';
import { FaEyeSlash, FaEye } from "react-icons/fa";

export default function Login() {
  const { verificaLoginContext, verificaLoginStorage, isAuthenticated } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [autenticado, setAutenticado] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [espera, setEspera] = useState(false)

  const handleLogin = async (e) => {
    setEspera(true)
    await verificaLoginContext(email, senha, () => {
      setAutenticado(true);
      console.log('Usuário autenticado dentro do Login:', isAuthenticated());
      console.log('Usuário logado é:', email);
      navigate('/');
    });
    setEspera(false)
  };

  useEffect(() => {
    console.log(
      'Usuário autenticado dentro do Login UseEffect:',
      isAuthenticated(),
    );
  }, [isAuthenticated]);

  useEffect(() => {
    console.log('Usuário autenticado localmente:', autenticado);
  }, [autenticado]);

  const clickMostrarSenha = () => {
    setMostrarSenha(!mostrarSenha);
  };



  return (
    <div id="containerLogin">
      <HeaderWeb />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: "65%" }}>
        <div id="containerLoginLogin">
          <div id="containerTituloLogin">
            <p className="tituloBoxLogin">LOGIN</p>
          </div>

          <div className="areaInputsLogin">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

              <div style={{ position: 'relative', width: '90%' }}>
                <TfiEmail style={{ width: '40px', position: 'absolute', left: '0px', top: '11%', }} />
                <input
                  className="inputsLogin"
                  type="email"
                  placeholder="Digite seu e-mail"
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ paddingLeft: '40px', marginBottom: "35px" }}
                  required
                />
              </div>

              <div style={{ position: 'relative', width: '90%' }}>
                <FaKey style={{ width: '40px', position: 'absolute', left: '0px', top: '21%' }} />
                <input
                  className="inputsLogin"
                  type={mostrarSenha ? 'text' : 'password'}
                  placeholder="Digite sua senha"
                  onChange={(e) => setSenha(e.target.value)}
                  style={{ paddingLeft: '40px' }}
                  required
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '60%',
                    right: '10px',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer',
                    color: 'gray',
                    fontSize: 20
                  }}
                  onClick={clickMostrarSenha}
                >
                  {mostrarSenha ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>

            </div>
          </div>
          <div className="logarLogin">
            <button
              disabled={espera}
              className="buttonlogarLogin"
              onClick={handleLogin}
              type="submit"
            >
              Logar
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
