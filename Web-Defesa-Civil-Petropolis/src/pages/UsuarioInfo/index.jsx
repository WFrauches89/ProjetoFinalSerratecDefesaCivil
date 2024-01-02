import { useEffect, useState } from 'react';
import './styles.css';
import { HeaderWeb } from '../../components/HeaderWeb';
import Footer from '../../components/Footer';
import { useLocation, useNavigate } from 'react-router-dom';


const UsuarioInfo = () => {
  const [userLogado, setUserLogado] = useState(JSON.parse(localStorage.getItem('user')))
  const [usuario, setUsuario] = useState({});
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [dataCadastro, setDataCadastro] = useState("");
  const [perfil, setPerfil] = useState("");
  const navi = useNavigate();
  const location = useLocation();

  useEffect(()=> {

    if(location.state != undefined || location.state != null){
      const usuarioState = location.state
      setUsuario(usuarioState)
      setNome(usuarioState.nomeUsuario)
      setEmail(usuarioState.email)
      setDataCadastro(usuarioState.dtCadastro)
      setPerfil(usuarioState.perfil)
    }else {
      setUsuario(userLogado)
      setNome(userLogado.nomeUsuario)
      setEmail(userLogado.email)
      setDataCadastro(userLogado.dtCadastro)
      setPerfil(userLogado.perfil)
    }
  }, [location])

  return (
    <div id="containerUsuarioInfo">
      <HeaderWeb />
      <div style={{width: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center', height: "70%"}}>
        <form onSubmit={(e) => alterarSenha(e)}
        id="containerFormUsuarioInfo"
        >
          <div id="formularioUsuarioInfo">
            <p className="titulosUsuarioInfo">USUARIO {perfil}</p>
            <div className='containerBoxUsuarioInfo'>

              <div className='textosInfosUsuarios'>
                <p style={{marginRight: "10px"}}>Nome: </p>
                <p style={{fontFamily: 'sans-serif'}}>{nome}</p>
              </div>

              <div className='textosInfosUsuarios'>
                <p style={{marginRight: "10px"}}>E-mail: </p>
                <p style={{fontFamily: 'sans-serif'}}>{email}</p>
              </div>

              <div className='textosInfosUsuarios' style={{}}>
                <p style={{marginRight: "10px"}}>Data Cadastro: </p>
                <p style={{fontFamily: 'sans-serif'}}>{dataCadastro}</p>
              </div>

            </div>
          </div>

          {userLogado.perfil === "MASTER" && <div style={{height: "20%", marginBottom: "15px"}}>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: "100%"}}>
              <button className="botaoInfoUsuarios" type="submit"
              style={{width: "48%"}}
              onClick={()=> navi("/EditarUsuario", {state: usuario})}>
                <p>EDITAR</p>
              </button>
              <button className="botaoInfoUsuarios" type="submit"
              style={{width: "48%"}}
              onClick={()=> navi('/ListarUsuarios')}>
                <p>LISTA DE USUARIOS</p>
              </button>
            </div>

            <div>
              <button className="botaoInfoUsuarios" type="submit"
                onClick={()=> navi('/cadastro')}
              >
                <p>CADASTRAR NOVO USUARIO</p>
              </button>
            </div>
          </div>}

          {userLogado.perfil === "ADMIN" && <div style={{}}>
            <button className="botaoEditarUsuario"
              onClick={()=> navi("/EditarUsuario", {state: usuario})}
              style={{width: "100%"}}
            >
              <p>EDITAR</p>
            </button>
          </div>}

        </form>
      </div>

      <Footer />
    </div>
  );
};

export default UsuarioInfo;
