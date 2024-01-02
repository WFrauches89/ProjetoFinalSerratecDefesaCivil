import './styles.css';
import { HeaderWeb } from '../../components/HeaderWeb';
import { alterarStatus, listarTodosPontosDeApoio, removerPontosDeApoio, } from '../../api/api';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ModalComum from '../../components/Modal';
import Footer from '../../components/Footer';
import lixeiraIcon from '../../assets/Trash.png';
import avisoIcon from '../../assets/aviso.png';
import erroIcon from '../../assets/erro.png';
import editarIcon from '../../assets/edite.png';
import pesquisaIcon from '../../assets/search.png';
import localizacao from '../../assets/localizacao.png';
import ModalComumItem from '../../components/ModalItens';
import { IoMdEye } from "react-icons/io";

const VisualizarPontoDeApoio = () => {
  const [userLogado] = useState(JSON.parse(localStorage.getItem('user')))
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [confirmar, setConfirmar] = useState(false);
  const [box, setBox] = useState(false);
  const [boxItem, setBoxItem] = useState({});
  const [idAlvo, setIdAlvo] = useState(0);
  const [altRemv, setAltRemov] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [filtro, setFiltro] = useState('');
  const [rota, setRota] = useState(null)
  const navi = useNavigate();
  const [selecionaveis, setSelecionaveis] = useState(0);

  useEffect(() => { buscarPontos() }, []);
  useEffect(() => { buscarPontos() }, [filtro]);
  useEffect(() => { }, [data]);

  const buscarPontos = () => {
    listarTodosPontosDeApoio()
      .then((response) => {
        if (filtro == "") {
          setData(response.data);
        } else {
          const pontosPesquisa = response.data.filter(item =>
            item.bairro.toLowerCase().includes(filtro.toLowerCase()) ||
            item.ponto_apoio.toLowerCase().includes(filtro.toLowerCase())
          );
          setData(pontosPesquisa);
        }
      }).catch((e) => {
        console.log(e)
        setMensagem('erro');
        openModal();
      });
  };

  const removerPonto = (idRemove) => {
    setConfirmar(true);
    setIdAlvo(idRemove);
    setAltRemov('remover');
    openModal();
  };

  const alterarStatusPonto = async (idAlterar) => {
    setConfirmar(true);
    setIdAlvo(idAlterar);
    setAltRemov('alterar');
    openModal();
  };

  const editar = (item) => {
    navi('/CadastroPontoDeApoio', { state: item });
  };

  const conf = (condicao) => {
    setConfirmar(false);
    closeModal();
    if (condicao == true && altRemv === 'alterar') {
      alterarStatus(idAlvo, userLogado).then(() => {
        buscarPontos();
      }).catch((e) => { console.log(e) });

    } else if (condicao == true && altRemv === 'remover') {
      removerPontosDeApoio(idAlvo, userLogado).then(() => {
        const listaAtualizada = data.filter((item) => item.id !== idAlvo);
        setData(listaAtualizada);
        buscarPontos();
      }).catch((e) => { console.log(e) });
    }
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

  const obterRota = (item) => {
    setRota(item)
  }

  const abrirBoxItem = (item) => {
    setBoxItem(item)
    setBox(true)
    openModal()
    setSelecionaveis(-1);
  }

  const googleMaps = () => {
    if (rota != null) {
      window.open(rota, '_blank');
      setRota(null);
    }
  }

  return (
    <div id="containerV">
      <HeaderWeb />

      <div id="containerFormV">

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: "0.1rem" }}>
          <p id="tituloListaPontoDeApoio">LISTA DE PONTOS DE APOIO</p>
          <div id='pesquisaPontos'>
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

        <div id="formularioV">
          <div id="tituloBoxV">
            <div style={{ flex: 0 }}>
              <IoMdEye style={{ height: '30px', marginLeft: "18px" }} />
            </div>
            <div style={{ flex: 1, paddingLeft: "5%" }}>
              <p>Bairro</p>
            </div>
            <div style={{ flex: 1, paddingLeft: "5%" }}>
              <p>Ponto de apoio</p>
            </div>
            <div style={{ flex: 0.6, paddingLeft: "5%" }}>
              <p>Status</p>
            </div>
            <div style={{ flex: 0.25, paddingLeft: "5%" }}>

            </div>
          </div>

          <div id="containerListaDePontosV">
            <ul>
              {data.map((item, index) => (
                <li id="visualizarPontoPorId" key={item.id}
                  style={{ backgroundColor: index % 2 !== 1 ? '#ebebeb' : '', cursor: 'pointer' }}
                >
                  <div style={{ flex: 0 }}>
                    <IoMdEye
                      style={{ height: '30px', cursor: 'pointer', color: "#ff6e29", marginLeft: "18px" }}
                      // src={lixeiraIcon}
                      alt="visualizar"
                      onClick={() => abrirBoxItem(item)}
                      tabIndex={selecionaveis}
                      onKeyDown={() => { (event.key === "Enter") && abrirBoxItem(item) }} />
                  </div>
                  <div style={{
                    flex: 1.1, paddingLeft: "5%", overflow: 'hidden', textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                  >
                    <p>{item.bairro}</p>
                  </div>

                  <div style={{ flex: 1.1, display: 'flex', paddingLeft: "5%", alignItems: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    <img
                      style={{ width: '16px', height: '16px', marginRight: "5px", cursor: 'pointer' }}
                      src={localizacao}
                      alt="Descrição do SVG"
                      onClick={() => obterRota(item.localizacao)}
                      tabIndex={selecionaveis}
                      onKeyDown={() => { (event.key === "Enter") && obterRota(item.localizacao) }}
                    />
                    <p
                      style={{ cursor: 'pointer' }}
                      onClick={() => obterRota(item.localizacao)}>
                      {item.ponto_apoio}
                    </p>
                  </div>

                  <div id="statusPontos" style={{ paddingLeft: '5%', flex: 0.6 }}>
                    <div id="corStatusV" style={{ backgroundColor: item.status ? '#66cca7' : '#de5461', cursor: 'pointer', }} onClick={() => alterarStatusPonto(item.id)} tabIndex={selecionaveis} onKeyDown={(e) => { (e.key === "Enter") && (alterarStatusPonto(item.id)) }}>
                    </div>
                    <p onClick={() => alterarStatusPonto(item.id)} style={{ cursor: 'pointer' }}>
                      {item.status ? 'Aberto' : 'Fechado'}
                    </p>
                  </div>

                  <div style={{ flex: 0.5, display: 'flex', alignItems: 'center', gap: '15%', paddingRight: "15px", justifyContent: 'flex-end' }}>
                    <img
                      style={{ height: '1rem', cursor: 'pointer' }}
                      src={editarIcon}
                      alt="editar"
                      onClick={() => editar(item)}
                      tabIndex={selecionaveis}
                      onKeyDown={(e) => { (e.key === "Enter") && (editar(item)) }}
                    />
                    <img
                      style={{ height: '1.5rem', cursor: 'pointer' }}
                      src={lixeiraIcon}
                      alt="remover"
                      onClick={() => removerPonto(item.id)}
                      tabIndex={selecionaveis}
                      onKeyDown={() => { (event.key === "Enter") && removerPonto(item.id) }} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {rota != null && googleMaps()}
      {confirmar && altRemv === 'alterar' && showModal && (
        <ModalComum
          tipoMensagem="ALTERAR"
          icon={avisoIcon}
          mensagem="Confirmar alteração de status?"
          onClose={closeModal}
          conf={conf}
          tabIndex={0}
          onKeyDown={() => { (event.key === "Enter") && (closeModal) }}
        />
      )}

      {confirmar && altRemv === 'remover' && showModal && (
        <ModalComum
          tipoMensagem="REMOVER"
          mensagem="Confirmar remoção? "
          icon={avisoIcon}
          onClose={closeModal}
          conf={conf}
          tabIndex={0}
          onKeyDown={() => { (event.key === "Enter") && (closeModal) }}
        />
      )}

      {mensagem == 'erro' && showModal && (
        <ModalComum
          tipoMensagem="ERRO"
          mensagem="Erro ao carregar lista"
          icon={erroIcon}
          onClose={closeModal}
          tabIndex={0}
          onKeyDown={() => { (event.key === "Enter") && (closeModal) }}
        />
      )}

      {box && showModal && (
        <ModalComumItem
          tipoMensagem={"PONTO DE APOIO"}
          icon={avisoIcon}
          titulo={"PONTO DE APOIO"}
          mensagem={boxItem.ponto_apoio}
          titulo2={"ENDEREÇO"}
          mensagem2={boxItem.endereco}
          titulo3={"BAIRRO"}
          mensagem3={boxItem.bairro}
          titulo4={"STATUS:  " + (boxItem.status ? 'Aberto' : 'Fechado')}
          tel1={boxItem.numerosTelefone[0] ? "TELEFONE: " + boxItem.numerosTelefone[0].numero : ""}
          tel2={boxItem.numerosTelefone[1] ? "TELEFONE: " + boxItem.numerosTelefone[1].numero : ""}
          tel3={boxItem.numerosTelefone[2] ? "TELEFONE: " + boxItem.numerosTelefone[2].numero : ""}
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

export default VisualizarPontoDeApoio;
