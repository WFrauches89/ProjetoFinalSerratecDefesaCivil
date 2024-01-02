import './styles.css';
import { HeaderWeb } from '../../components/HeaderWeb';
import { DeletarInformesReleazes, VizualizarInformesReleazes, } from '../../api/api';
import { useEffect, useState } from 'react';
import lixeiraIcon from '../../assets/Trash.png';
import editarIcon from '../../assets/edite.png';
import erroIcon from '../../assets/erro.png';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import ModalComum from '../../components/Modal';
import avisoIcon from '../../assets/aviso.png';
import ModalComumItem from '../../components/ModalItens';
import { IoMdEye } from "react-icons/io";

const ListarInformesReleazes = () => {
  const [userLogado] = useState(JSON.parse(localStorage.getItem('user')))
  const [data, setData] = useState([]);
  const [confirmar, setConfirmar] = useState(false);
  const [altRemv, setAltRemov] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [box, setBox] = useState(false);
  const [boxItem, setBoxItem] = useState({});
  const navi = useNavigate();
  const [idAlvo, setIdAlvo] = useState(0);
  const [selecionaveis, setSelecionaveis] = useState(0);

  const buscarInformesReleazes = () => {
    VizualizarInformesReleazes()
      .then((response) => {
        setData(response.data);
        const novaData = response.data.filter((item) => item.ativo !== false);
        const ordem = novaData.sort((a, b) =>
          a.dataEdicao > b.dataEdicao ? -1 :
            a.dataEdicao < b.dataEdicao ? 1 : 0,
        )
        setData(ordem);
        console.log(response.data);
      })
      .catch((error) => {
        setMensagem('erro');
        openModal();
      });
  };

  useEffect(() => {
    buscarInformesReleazes();
  }, []);

  const removerPonto = (idAlvo) => {
    setConfirmar(true);
    setIdAlvo(idAlvo);
    setAltRemov('remover');
    openModal();
  };

  const conf = (condicao) => {
    setConfirmar(false);
    closeModal();
    if (condicao == true && altRemv === 'remover') {
      DeletarInformesReleazes(idAlvo, userLogado.id)
        .then((response) => {
          const listaAtualizada = data.filter((item) => item.id !== idAlvo);
          setData(listaAtualizada);
          buscarInformesReleazes();
        })
        .catch((error) => { });
    }
  };

  const editar = (id) => {
    localStorage.setItem('ediçao', id);
    navi('/CadastroInformeReleases');
  };
  const openModal = () => {
    setShowModal(true);
    setSelecionaveis(-1);
  };

  const closeModal = () => {
    setBox(false)
    setShowModal(false);
    setSelecionaveis(0);
  };

  const abrirBoxItem = (item) => {
    console.log(item)
    setBoxItem(item)
    setBox(true)
    openModal()
    setSelecionaveis(-1);
  }

  return (
    <div id="containerVI">
      <HeaderWeb />

      <div id="containerFormVI">
        <div>
          <p id="tituloVI">LISTA DE INFORMATIVOS E ALERTAS</p>
        </div>

        <div id="formularioVI">
          <div id="tituloBoxVI">
            <div style={{ flex: 0 }}>
              <IoMdEye style={{ height: '30px', marginLeft: "18px" }} />
            </div>
            <p style={{ flex: 1, paddingLeft: "5%" }}>Título</p>
            <p style={{ flex: 1, paddingLeft: "5%" }}>Mensagem</p>
            <p style={{ flex: 0.52, paddingLeft: "5%" }}>Data Postagem</p>
            <p style={{ flex: 0.5, paddingLeft: "5%" }}>Tipo</p>
            <p style={{ flex: 0.1, paddingLeft: "5%" }}></p>
          </div>

          <div id="containerListaDePontosVI">
            <ul>
              {data.map((item, index) => (
                <li id="visualizarPontoPorIdVI" key={item.id}
                  style={{
                    backgroundColor: index % 2 !== 1 ? '#ebebeb' : ''
                  }}
                >

                  <div style={{ flex: 0 }}>
                    <IoMdEye
                      style={{ height: '30px', cursor: 'pointer', color: "#ff6e29", marginLeft: "18px" }}
                      alt="visualizar"
                      onClick={() => abrirBoxItem(item)}
                      tabIndex={selecionaveis}
                      onKeyDown={() => { (event.key === "Enter") && (abrirBoxItem(item)) }} />
                  </div>

                  <p style={{
                    flex: 1, paddingLeft: "5%", overflow: 'hidden', textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    {item.titulo}
                  </p>

                  <div style={{
                    flex: 1, paddingLeft: "5%", overflow: 'hidden', textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    <p>{item?.descricao.substring(0, 50)}</p>
                  </div>

                  <div style={{
                    flex: 0.5, paddingLeft: "5%", overflow: 'hidden', textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    <p>{item.dataPostagem.toLocaleString().split(" ")[0]}</p>
                  </div>

                  <div
                    style={{
                      flex: 0.3,
                      paddingLeft: "5%",
                      display: 'flex',
                      alignItems: "center"
                    }}
                  >
                    {item.tipo === 'Alerta' ? (
                      <div
                        style={{
                          width: '10px',
                          height: '10px',
                          backgroundColor: '#de5461',
                          borderRadius: '5px',
                          marginRight: '7px',
                        }}
                      ></div>
                    ) : (
                      <div
                        style={{
                          width: '10px',
                          height: '10px',
                          backgroundColor: '#66cca7',
                          borderRadius: '5px',
                          marginRight: '7px',
                        }}
                      ></div>
                    )}
                    <p>{item.tipo}</p>
                  </div>

                  <div style={{ flex: 0.2, paddingLeft: "5%", display: 'flex', justifyContent: 'space-around', gap: '40%', paddingRight: "15px" }}>
                    <img
                      style={{
                        height: '20px',
                        cursor: 'pointer',
                      }}
                      src={editarIcon}
                      alt="Descrição do SVG"
                      onClick={() => editar(item.id)}
                      tabIndex={selecionaveis}
                      onKeyDown={() => { (event.key === "Enter") && (editar(item.id)) }}
                    />
                    <img
                      style={{
                        height: '30px',
                        cursor: 'pointer',
                      }}
                      src={lixeiraIcon}
                      alt="Descrição do SVG"
                      onClick={() => removerPonto(item.id)}
                      tabIndex={selecionaveis}
                      onKeyDown={() => { (event.key === "Enter") && (removerPonto(item.id)) }}
                    />
                  </div>

                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {confirmar && altRemv === 'remover' && showModal && (
        <ModalComum
          tipoMensagem="REMOVER"
          mensagem="Confirmar remoção? "
          icon={avisoIcon}
          onClose={closeModal}
          tabIndex={1}
          conf={conf}
          onKeyDown={() => { (event.key === "Enter") && (closeModal) }}
        />
      )}

      {mensagem == 'erro' && showModal && (
        <ModalComum
          tipoMensagem="ERRO"
          mensagem="Erro ao carregar lista"
          icon={erroIcon}
          onClose={closeModal}
          onKeyDown={() => { (event.key === "Enter") && (closeModal) }}
        />
      )}

      {box && showModal && (
        <ModalComumItem
          tipoMensagem={"INFORMATIVOS E ALERTAS"}
          icon={avisoIcon}
          titulo={"Título"}
          mensagem={boxItem.titulo}
          titulo2={"Mensagem"}
          mensagem2={boxItem.descricao}
          titulo3={"POSTAGEM: " + boxItem.dataPostagem.toLocaleString().split(" ")[0]}
          titulo4={"DATA EVENTO: " + boxItem.dataEvento.toLocaleString().split(" ")[0]}
          titulo5={"TIPO: " + boxItem.tipo}
          dtUserAtt={"ATUALIZADO:" + boxItem.dataEdicao + " POR " + boxItem.usuario.email}
          onClose={closeModal}
          tabIndex={0}
          onKeyDown={() => { (event.key === "Enter") && (closeModal) }}
        />
      )}
      <Footer />
    </div>
  );
};

export default ListarInformesReleazes;
