import { useEffect, useState } from 'react';
import './styles.css';
import { HeaderWeb } from '../../components/HeaderWeb';
import Footer from '../../components/Footer';
import { useLocation, useNavigate } from 'react-router-dom';
import { editarUsuarioApi, verificarsenhaatual } from '../../api/api';
import ModalComum from '../../components/Modal';
import checkedIcon from '../../assets/checked.png';
import erroIcon from '../../assets/erro.png';
import { FaEyeSlash, FaEye } from "react-icons/fa";



const EditarUsuario = () => {
  const [userLogado, setUserLogado] = useState(JSON.parse(localStorage.getItem('user')))
  const [usuario, setUsuario] = useState({})
  const [nomeUsuario, setNomeUsuario] = useState("")
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [senhaAtual, setSenhaAtual] = useState("")
  const [confirmarSenha, setConfirmarSenha] = useState("")
  const [id, setId] = useState(0)
  const [dataCadastro, setDataCadastro] = useState("")
  const [perfil, setPerfil] = useState("")
  const [editarSenha, setEditarSenha] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const navi = useNavigate();
  const location = useLocation();
  const [mostrarSenha, setMostrarSenha] = useState(false);

  useEffect(() => {
    const usuarioState = location.state
    setUsuario(location.state)
    setNomeUsuario(usuarioState.nomeUsuario)
    setEmail(usuarioState.email)
    setDataCadastro(usuarioState.dtCadastro)
    setId(usuarioState.id)
    setPerfil(usuarioState.perfil)
  }, [location])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userLogado.perfil === "ADMIN" ? await verificarSenhaAtual() : true &&
      usuario.perfil === "MASTER" ? await verificarSenhaAtual() : true) {
      if (senha === confirmarSenha) {
        editarUsuarioApi(id, nomeUsuario, email, senha).then((response) => {
          console.log("certo")
          console.log(response.data)
          setUsuario({ id, nomeUsuario, email, senha, dtCadastro: dataCadastro, perfil })
          setMensagem('editado');
          openModal();

        }).catch(() => {
          console.log("errado")
          console.log(usuario)
          setMensagem('erro');
          openModal();
        });
      } else {
        setMensagem('senhaIncorreta')
        openModal();
      }
    } else {
      setMensagem('senhaAtualIncorreta')
      openModal();
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    if (mensagem === 'editado') {
      navi('/UsuarioInfo', { state: usuario });
    }
  };

  const editarSenhaUsuario = (e) => {
    e.preventDefault();
    setEditarSenha(editarSenha === true ? false : true)
    setSenha("")
  };

  const verificarSenhaAtual = async () => {
    return verificarsenhaatual(email, senhaAtual).then((response) => {
      console.log(usuario)
      console.log(userLogado)
      return response.data;
    })
      .catch((error) => {
        throw error;
      });
  }

  const clickMostrarSenha = () => {
    setMostrarSenha(!mostrarSenha);
  };

  return (
    <div id="containerEditarUsuario">
      <HeaderWeb />
      <div style={{ width: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center', height: "65%" }}>
        <form onSubmit={(e) => alterarSenha(e)}
          id="containerFormEditarUsuario"
        >

          <div id="formularioEditarUsuario">

            <div>
              <p className="titulosEditarUsuario">EDITAR USUARIO {usuario.perfil}</p>
              <div className='containerBoxEditarUsuario'>

                <div className='textosEditarUsuario'>
                  <p style={{ marginRight: "10px" }}>Nome: </p>
                  <input
                    className="inputEditarUsuario"
                    placeholder="Nome"
                    onChange={(e) => {
                      setNomeUsuario(e.target.value);
                    }}
                    value={nomeUsuario}
                    required
                    readOnly={userLogado.perfil === "MASTER" ? false : true}

                  />
                </div>

                <div className='textosEditarUsuario'>
                  <p style={{ marginRight: "10px" }}>E-mail: </p>
                  <input
                    className="inputEditarUsuario"
                    placeholder="E-mail"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    value={email}
                    required
                    readOnly={userLogado.perfil === "MASTER" ? false : true}
                  />
                </div>

                {userLogado.perfil === "MASTER" && <div className="containerInput"
                  style={{ alignItems: 'end', width: "48%" }}>
                  <button className="botaoEditarUsuario"
                    onClick={editarSenhaUsuario}
                    style={{ width: "100%", marginBottom: "5px" }}
                  >
                    <p>EDITAR SENHA</p>
                  </button>

                  {editarSenha && <div
                    style={{ marginBottom: '2px', display: 'flex', flexDirection: 'column' }}
                  >
                    {usuario.perfil === "MASTER" && <div className='textosEditarUsuario'>
                      <input
                        type={mostrarSenha ? 'text' : 'password'}
                        className="inputEditarUsuario"
                        placeholder="Senha atual"
                        onChange={(e) => {
                          setSenhaAtual(e.target.value);
                        }}
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
                          fontSize: 17
                        }}
                        onClick={clickMostrarSenha}
                      >
                        {mostrarSenha ? <FaEyeSlash /> : <FaEye />}
                      </div>
                    </div>}

                    <div className='textosEditarUsuario'>
                      <input
                        type={mostrarSenha ? 'text' : 'password'}
                        className="inputEditarUsuario"
                        placeholder="Nova senha"
                        onChange={(e) => {
                          setSenha(e.target.value);
                        }}
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
                          fontSize: 17
                        }}
                        onClick={clickMostrarSenha}
                      >
                        {mostrarSenha ? <FaEyeSlash /> : <FaEye />}
                      </div>
                    </div>

                    <div className='textosEditarUsuario'>
                      <input
                        type={mostrarSenha ? 'text' : 'password'}
                        className="inputEditarUsuario"
                        placeholder="Confirmar senha"
                        onChange={(e) => {
                          setConfirmarSenha(e.target.value);
                        }}
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
                          fontSize: 17
                        }}
                        onClick={clickMostrarSenha}
                      >
                        {mostrarSenha ? <FaEyeSlash /> : <FaEye />}
                      </div>
                    </div>
                  </div>}
                </div>}

                {userLogado.perfil === "ADMIN" && <div className="containerInput">
                  <p style={{ marginRight: "10px" }}>ALTERAR SENHA </p>
                  <div className='textosEditarUsuario'>
                    <input
                      type={mostrarSenha ? 'text' : 'password'}
                      className="inputEditarUsuario"
                      placeholder="Senha atual"
                      onChange={(e) => {
                        setSenhaAtual(e.target.value);
                      }}
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
                        fontSize: 17
                      }}
                      onClick={clickMostrarSenha}
                    >
                      {mostrarSenha ? <FaEyeSlash /> : <FaEye />}
                    </div>
                  </div>

                  <div className='textosEditarUsuario'>
                    <input
                      type={mostrarSenha ? 'text' : 'password'}
                      className="inputEditarUsuario"
                      placeholder="Nova senha"
                      onChange={(e) => {
                        setSenha(e.target.value);
                      }}
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
                        fontSize: 17
                      }}
                      onClick={clickMostrarSenha}
                    >
                      {mostrarSenha ? <FaEyeSlash /> : <FaEye />}
                    </div>
                  </div>

                  <div className='textosEditarUsuario'>
                    <input
                      type={mostrarSenha ? 'text' : 'password'}
                      className="inputEditarUsuario"
                      placeholder="Confirmar"
                      onChange={(e) => {
                        setConfirmarSenha(e.target.value);
                      }}
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
                        fontSize: 17
                      }}
                      onClick={clickMostrarSenha}
                    >
                      {mostrarSenha ? <FaEyeSlash /> : <FaEye />}
                    </div>
                  </div>
                </div>}


              </div>
            </div>

            <div style={{ display: 'flex', gap: 15 }}>
              <button className="botaoInfoUsuarios"
                onClick={handleSubmit}
                style={{ width: "100%" }}
              >
                <p>SALVAR</p>
              </button>

              <button className="botaoInfoUsuarios"
                onClick={() => navi('/UsuarioInfo', { state: usuario })}
                style={{ width: "100%" }}
              >
                <p>CANCELAR</p>
              </button>
            </div>

          </div>
        </form>
        {mensagem == 'erro' && showModal && (
          <ModalComum
            tipoMensagem="ERRO"
            mensagem="Erro ao realizar cadastro"
            icon={erroIcon}
            onClose={closeModal}
          />
        )}

        {mensagem == 'senhaIncorreta' && showModal && (
          <ModalComum
            tipoMensagem="ERRO"
            mensagem="Senhas não coincidem"
            icon={erroIcon}
            onClose={closeModal}
          />
        )}

        {mensagem == 'editado' && showModal && (
          <ModalComum
            tipoMensagem="SUCESSO"
            mensagem="Alteração realizada com sucesso"
            icon={checkedIcon}
            onClose={closeModal}
          />
        )}

        {mensagem == 'senhaAtualIncorreta' && showModal && (
          <ModalComum
            tipoMensagem="ERRO"
            mensagem="Senha atual incorreta!"
            icon={erroIcon}
            onClose={closeModal}
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default EditarUsuario;
