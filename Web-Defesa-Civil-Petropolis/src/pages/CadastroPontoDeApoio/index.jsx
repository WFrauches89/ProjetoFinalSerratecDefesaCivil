import { useEffect, useState } from 'react';
import './styles.css';
import { HeaderWeb } from '../../components/HeaderWeb';
import { cadastrarPontoDeApoio, editarPontoDeApoio } from '../../api/api';
import checkedIcon from '../../assets/checked.png';
import erroIcon from '../../assets/erro.png';
import lixeiraIcon from '../../assets/Trash.png';
import Footer from '../../components/Footer';
import ModalComum from '../../components/Modal';
import { useLocation, useNavigate } from 'react-router-dom';

const CadastroPontoDeApoio = () => {
  const [userLogado, setUserLogado] = useState(JSON.parse(localStorage.getItem('user')))
  const [id, setId] = useState(0);
  const [pApoio, setPApoio] = useState('');
  const [bairro, setBairro] = useState('');
  const [status, setStatus] = useState(false);
  const [endereco, setEndereco] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [telefones, setTelefones] = useState([{ numero: '' }]);
  const navi = useNavigate();
  const location = useLocation();
  const [espera, setEspera] = useState(false)

  useEffect(() => {
    if (location.state != undefined || location.state != null) {
      const pontoEditar = location.state;
      setBairro(pontoEditar.bairro);
      setPApoio(pontoEditar.ponto_apoio);
      setStatus(pontoEditar.status);
      setEndereco(pontoEditar.endereco);
      setId(pontoEditar.id);
      setTelefones(pontoEditar.numerosTelefone);
    } else handleLimpar();
  }, [location]);

  const handleSubmit = (e) => {
    setEspera(true);
    e.preventDefault();

    if (location.state == undefined || location.state == null) {
      cadastrarPontoDeApoio(
        pApoio,
        bairro,
        status,
        endereco,
        telefones,
        userLogado.id,
      ).then(() => {
        setMensagem('cadastrado');
        handleLimpar();
        openModal();
      }).catch(() => {
        setMensagem('erro');
        openModal();
      });
    } else {
      editarPontoDeApoio(
        id,
        pApoio,
        bairro,
        status,
        endereco,
        telefones,
        userLogado.id,
      ).then(() => {
        setMensagem('editado');
        handleLimpar();
        openModal();
      }).catch(() => {
        setMensagem('erro');
        openModal();
      });
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEspera(false);
    navi('/VisualizarPontoDeApoio');
  };

  const handleLimpar = () => {
    setPApoio(''),
      setBairro(''),
      setEndereco(''),
      setStatus(false),
      setTelefones([{ numero: '' }]);
  };

  const handleStatusChange = (e) => {
    const novoStatus = e.target.value === 'Aberto';
    setStatus(novoStatus);
  };

  const handleTelefoneChange = (index, value) => {
    var novoNumero = value.replace(/\D/g, '');

    if (novoNumero.length >= 2) {
      novoNumero =
        '(' + novoNumero.substring(0, 2) + ') ' + novoNumero.substring(2);
    }
    const novosTelefones = [...telefones];
    novosTelefones[index] = { numero: novoNumero };
    setTelefones(novosTelefones);
  };

  const handleAdicionarTelefone = () => {
    if (telefones.length < 0 || telefones.length > 2) {
      return;
    } else {
      setTelefones([...telefones, { numero: '' }]);
    }
  };

  const handleRemoverTelefone = (index) => {
    const novosTelefones = [...telefones];
    novosTelefones.splice(index, 1);
    setTelefones(novosTelefones);
  };

  return (
    <div id="container">
      <HeaderWeb />

      <div id="containerForm">
        <div>
          {location.state == undefined || location.state == null ? (
            <p id="tituloP">CADASTRAR PONTO DE APOIO</p>
          ) : (
            <p id="tituloP">EDITAR PONTO DE APOIO</p>
          )}
        </div>

        <form onSubmit={(e) => handleSubmit(e)}
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div id="formulario">
            <div id="inputEsquerda">
              <div className="containerInput">
                <p id="formularioTitulos">Ponto de apoio *</p>
                <input
                  className="input"
                  placeholder="Informe um ponto de apoio"
                  onChange={(e) => {
                    setPApoio(e.target.value);
                  }}
                  value={pApoio}
                  required
                  maxLength={100}
                />
              </div>

              <div className="containerInput">
                <p id="formularioTitulos">Bairro *</p>
                <input
                  className="input"
                  placeholder="Informe um bairro"
                  onChange={(e) => {
                    setBairro(e.target.value);
                  }}
                  value={bairro}
                  required
                  maxLength={100}
                />
              </div>

              <div className="containerInput">
                <p id="formularioTitulos">Telefone</p>
                {telefones.map((telefone, index) => (
                  <div
                    key={index}
                    style={{ marginBottom: '2px', display: 'flex' }}
                  >
                    <input
                      type="text"
                      className="input"
                      placeholder="Número de Telefone"
                      maxLength={14}
                      value={telefone.numero}
                      onChange={(e) =>
                        handleTelefoneChange(index, e.target.value)
                      }
                      required
                    />

                    <img
                      className="botaoRemover"
                      src={lixeiraIcon}
                      alt="remover"
                      onClick={() => handleRemoverTelefone(index)}
                      tabIndex={0}
                      onKeyDown={() => { (event.key === "Enter") && handleRemoverTelefone(index) }}
                    />
                  </div>
                ))}
                <button
                  className="botaoAdicionarTel"
                  type="button"
                  onClick={handleAdicionarTelefone}
                >
                  Adicionar Número
                </button>
              </div>
            </div>

            <div id="inputEsquerda">
              <div className="containerInput">
                <p id="formularioTitulos">Status *</p>
                <select
                  className="input"
                  style={{ width: '30%', minWidth: '154px' }}
                  value={status ? 'Aberto' : 'Fechado'}
                  onChange={handleStatusChange}
                >
                  <option value="Fechado">Fechado</option>
                  <option value="Aberto">Aberto</option>
                </select>
              </div>

              <div className="containerInput">
                <p id="formularioTitulos">Endereço *</p>
                <input
                  className="input"
                  style={{ width: '100%' }}
                  placeholder="Informe o endereço"
                  onChange={(e) => {
                    setEndereco(e.target.value);
                  }}
                  value={endereco}
                  required
                  maxLength={150}
                />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', width: '50%', marginLeft: '50%' }}>
            <button disabled={espera} className="botaoPA" type="submit">
              {location.state == undefined || location.state == null ? (
                <p>SALVAR</p>
              ) : (
                <p>EDITAR</p>
              )}
            </button>
          </div>
        </form>

        {mensagem == 'cadastrado' && showModal && (
          <ModalComum
            tipoMensagem="SUCESSO"
            mensagem="Cadastro realizado com sucesso"
            icon={checkedIcon}
            onClose={closeModal}
            tabIndex={0}
          />
        )}

        {mensagem == 'erro' && showModal && (
          <ModalComum
            tipoMensagem="ERRO"
            mensagem="Erro ao realizar cadastro"
            icon={erroIcon}
            onClose={closeModal}
            tabIndex={0}
            onKeyDown={() => { (event.key === "Enter") && (closeModal) }}
          />
        )}

        {mensagem == 'editado' && showModal && (
          <ModalComum
            tipoMensagem="SUCESSO"
            mensagem="Alteração realizada com sucesso"
            icon={checkedIcon}
            onClose={closeModal}
            tabIndex={0}
            onKeyDown={() => { (event.key === "Enter") && (closeModal) }}
          />
        )}
      </div>

      <Footer />
    </div>
  );
};

export default CadastroPontoDeApoio;
