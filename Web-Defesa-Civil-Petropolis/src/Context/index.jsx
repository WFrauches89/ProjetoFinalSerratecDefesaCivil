import { createContext, useEffect, useState } from 'react';
import { cadastraUser, configToken, verificaLogin } from '../api/api';
import { useNavigate } from 'react-router-dom';
import ModalComum from '../components/Modal';
import checkedIcon from '../assets/checked.png';
import erroIcon from '../assets/erro.png';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('authToken'));
  console.log('Token recuperado ao inicializar Context:', token);

  const [user, setUser] = useState(null);
  const [id, setId] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEspera(false);
    navigate('/')
  };

  const navigate = useNavigate();

  const verificaTokenStorage = async (storedToken) => {
    try {
      if (!storedToken) {
        throw new Error('Token não encontrado no localStorage');
      }
      console.log('Token foi encontrado no localStorage');
      configToken(storedToken);
      setToken(storedToken);

      console.log(user);
      setAuthenticated(true);
      navigate('/');
    } catch (error) {
      console.error('Erro no verifica Login com stored token: ', error);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');

    if (storedToken) {
      verificaTokenStorage(storedToken);
      console.log('Token armazenado no localStorage:', storedToken);
    }
  }, []);

  const verificaLoginContext = async (
    email,
    senha,
    onLoginSuccess,
    storedToken,
  ) => {
    console.log('Iniciando verifica login context...');
    if (storedToken) {
      console.log('Token recolhido no localStorage... :', storedToken);
      configToken(storedToken);
      setToken(storedToken);
      setAuthenticated(true);
    } else {
      try {
        console.log('Token recolhido na APPI...');
        const response = await verificaLogin(email, senha);
        console.log('Login bem-sucedido!', response);
        configToken(response.data.token);
        setUser(response.data.usuario);
        setId(response.data.usuario);
        setToken(response.data.token);
        console.log('Usuário autenticado context:', isAuthenticated());
        console.log('Token no login:', response.data.token);
        setAuthenticated(true);
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.usuario));
        onLoginSuccess();
      } catch (error) {
        console.log('Erro no verifica Login context: ', error);
        setMensagem('erro')
        openModal()
      }
    }
    console.log('Finalizando verifica login context...');
  };

  const isAuthenticated = () => {
    return authenticated;
  };

  const cadastrarUsuario = async (
    nomeUsuario,
    email,
    senha,
    confirmarSenha,
    onCadastroSuccess,
  ) => {
    try {
      if (senha !== confirmarSenha) {
        console.error('As senhas não coincidem');
        // return alert('As senhas devem ser idênticas...');
        return "senhas não coincidem"
      }
      console.log('Chegou aqui senhas iguais ');
      cadastraUser(nomeUsuario, email, senha).then((response) => {
        console.log(
          'Cadastro bem-sucedido!',
          response,
          nomeUsuario,
          email,
          senha,
        );
        // alert('Cadastro realizado com sucesso!');
        onCadastroSuccess();
        return "realizado";
      }).catch((e) => {
        return "Erro";
      });
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      return "Erro"
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated,
        user,
        verificaLoginContext,
        cadastrarUsuario,
      }}
    >
      {children}

      {mensagem == 'sucesso' && showModal && (
        <ModalComum
          tipoMensagem="SUCESSO"
          mensagem="Usuario cadastro realizado com sucesso"
          icon={checkedIcon}
          onClose={closeModal}
        />
      )}

      {mensagem == 'erro' && showModal && (
        <ModalComum
          tipoMensagem="ERRO"
          mensagem="Erro ao realizar login"
          icon={erroIcon}
          onClose={closeModal}
        />
      )}
    </AuthContext.Provider>
  );
};
