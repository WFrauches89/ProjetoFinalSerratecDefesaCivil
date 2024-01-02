import './styles.css';
import { HeaderWeb } from '../../components/HeaderWeb';
import { configToken, listaDeUsuarios } from '../../api/api';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import lixeiraIcon from '../../assets/Trash.png';
import pesquisaIcon from '../../assets/search.png';
import { IoMdEye } from "react-icons/io";


const ListarUsuarios = () => {
  const [data, setData] = useState([]);
  const [filtro, setFiltro] = useState('');
  const navi = useNavigate();

  useEffect(() => { buscarPontos() }, []);
  useEffect(() => { buscarPontos() }, [filtro]);
  useEffect(() => { }, [data]);

  const buscarPontos = () => {
    listaDeUsuarios().then((response) => {
      setData(response.data);
      if (filtro == "") {
      } else {
        const pontosPesquisa = response.data.filter(item =>
          item.email.toLowerCase().includes(filtro.toLowerCase()) ||
          (item.id + "").toLowerCase().includes(filtro.toLowerCase())
        );
        setData(pontosPesquisa);
      }
    }).catch((e) => {
      console.log(e)
    });
  };

  return (
    <div id="containerListaUsuarios">
      <HeaderWeb />

      <div id="containerFormListaUsuarios">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <p id="tituloListaUsuarios">LISTA DE USUARIOS</p>
          <div id='pesquisaUsuario'>
            <img
              src={pesquisaIcon}
              alt="Descrição do SVG"
            />

            <input
              type="text"
              value={filtro}
              placeholder="Pesquisar"
              onChange={(e) => setFiltro(e.target.value)}
            />
          </div>
        </div>


        <div id="formularioListaUsuarios">
          <div id="tituloBoxListaUsuarios">
            <div style={{ paddingLeft: "5%", width: "20%" }}>
              <p>#ID</p>
            </div>

            <div style={{ width: "60%" }}>
              <p>EMAIL</p>
            </div>

            <div style={{ paddingLeft: "5%", width: "20%" }}>

            </div>
          </div>

          <div id="containerListaUsuarios">
            <ul>
              {data.map((item, index) => (
                <li id="visualizarUsuarioPorId" key={item.id}
                  style={{
                    backgroundColor: index % 2 !== 1 ? '#ebebeb' : ''
                  }}
                >

                  <div style={{ width: "20%", paddingLeft: "5%" }}>
                    <p>{item.id}</p>
                  </div>

                  <div style={{ width: "60%" }}>
                    <p>{item.email}</p>
                  </div>


                  <div style={{
                    width: "20%",
                    display: 'flex',
                    alignItems: 'center',
                    gap: '35%',
                    paddingLeft: "5%",
                    justifyContent: 'flex-end',
                    paddingRight: "35px"
                  }}>

                    <IoMdEye
                      style={{ height: '30px', cursor: 'pointer', color: "#ff6e29" }}
                      src={lixeiraIcon}
                      alt="visualizar"
                      onClick={() => navi("/UsuarioInfo", { state: item })}
                      tabIndex={0}
                      onKeyDown={() => { (event.key === "Enter") && (navi("/UsuarioInfo", { state: item })) }} />
                  </div>

                </li>
              ))}
            </ul>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ListarUsuarios;
