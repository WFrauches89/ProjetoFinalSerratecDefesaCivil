import React, { useState } from 'react';
import './styles.css';
import { HeaderWeb } from '../../components/HeaderWeb';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import { FaEyeSlash, FaEye, FaUser } from "react-icons/fa";
import ModalComum from '../../components/Modal';
import checkedIcon from '../../assets/checked.png';
import erroIcon from '../../assets/erro.png';
import { cadastraUser } from '../../api/api.js';
import { TfiEmail } from "react-icons/tfi";
import { FaKey } from "react-icons/fa";

export default function Cadastro() {

  const navigate = useNavigate();
  const [mensagem, setMensagem] = useState('');
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [espera, setEspera] = useState(false)
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const handleCadastro = async () => {
    setEspera(true)
    try {
      if (senha !== confirmarSenha) {
        console.error('As senhas não coincidem');
        setMensagem("senha")
        openModal()
        return
      }
      const algo = await cadastraUser(nomeUsuario, email, senha)
      setMensagem("cadastrado")
      console.log(algo);
      algo === "erro" && (
        setMensagem(algo))

      openModal()

    } catch (error) {
      setMensagem("erro")
      openModal()
    }
    setEspera(false)
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEspera(false);
    mensagem == 'cadastrado' && (
      navigate('/ListarUsuarios'))
  };

  const clickMostrarSenha = () => {
    setMostrarSenha(!mostrarSenha)
  }

  return (
    <div id="containerCCadastro">
      <HeaderWeb />
      <div className='corpoCU'>
        <div id="containerCadastro">
          <div id="containerTituloC">
            <p className="tituloBoxC">Cadastrar</p>
          </div>

          <div className="areaInputsC">
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%', flexDirection: 'row', marginBottom: '1rem', position: 'relative' }}>

              <FaUser style={{
                width: '40px', position: 'absolute', left: '0px', top: '11%',
              }} />
              <input
                className="inputsC"
                type="text"
                placeholder="Nome do usuário"
                onChange={(e) => setNomeUsuario(e.target.value)}
                required
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginBottom: '1rem', position: 'relative' }}>

              <TfiEmail style={{
                cursor: 'pointer',
                fontSize: 20,
                width: '40px', position: 'absolute', left: '-0px', top: '20%',
              }} />
              <input
                className="inputsC"
                type="e-mail"
                placeholder="E-mail"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', width: '100%',  marginBottom: '1rem', position: 'relative' }}>
              <FaKey style={{
                cursor: 'pointer',
                fontSize: 20,
                position: 'relative',
                left: '-5px',
                top: '7px',
              }} />

              <input
                className="inputsC"
                type={mostrarSenha ? 'password' : 'text'}
                placeholder="Digite sua senha"
                onChange={(e) => setSenha(e.target.value)}
                required
              />

              {mostrarSenha ? <FaEyeSlash style={{
                position: 'relative',
                left: '-25px',
                top: '8px',
                cursor: 'pointer',
                color: 'gray',
                fontSize: 18
              }} onClick={clickMostrarSenha} /> : <FaEye style={{
                position: 'relative',
                left: '-25px',
                top: '8px',
                cursor: 'pointer',
                color: 'gray',
                fontSize: 18
              }} onClick={clickMostrarSenha} />}

            </div>
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginBottom: '1rem', position: 'relative' }}>
              <FaKey style={{
                cursor: 'pointer',
                fontSize: 20,
                position: 'relative',
                left: '-5px',
                top: '7px',
              }} />
              <input
                className="inputsC"
                placeholder="Confirmar senha"
                type={mostrarSenha ? 'password' : 'text'}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                required
              />
              {mostrarSenha ? <FaEyeSlash style={{
                      position: 'relative',
                      left: '-25px',
                      top: '8px',
                      cursor: 'pointer',
                      color: 'gray',
                      fontSize: 18
              }}
                onClick={clickMostrarSenha} /> :
                <FaEye style={{
                  position: 'relative',
                  left: '-25px',
                  top: '8px',
                  cursor: 'pointer',
                  color: 'gray',
                  fontSize: 18
                }}
                  onClick={clickMostrarSenha} />}

            </div>
          </div>
          <div className="cadastrarC">
            <button disabled={espera} className="buttonC" onClick={handleCadastro}>
              Cadastrar
            </button>
          </div>
        </div>
        {mensagem == 'cadastrado' && showModal && (
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
            mensagem="Erro ao realizar cadastro"
            icon={erroIcon}
            onClose={closeModal}
          />
        )}
        {mensagem == 'senha' && showModal && (
          <ModalComum
            tipoMensagem="ERRO"
            mensagem="Senhas tem que ser iguais"
            icon={erroIcon}
            onClose={closeModal}
          />
        )}
      </div>
      <Footer />
    </div>
  );
}
