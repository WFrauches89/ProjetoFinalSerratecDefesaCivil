import { useContext, useEffect, useState } from 'react';
import './styles.css';
import { HeaderWeb } from '../../components/HeaderWeb';
import checkedIcon from '../../assets/checked.png';
import erroIcon from '../../assets/erro.png';
import Footer from '../../components/Footer';
import ModalComum from '../../components/Modal';
import { cadastrarQuemSomos,editarQuemSomos,listarTodosQuemSomos } from '../../api/api';
import { AuthContext } from '../../Context';
import { useLocation, useNavigate } from 'react-router-dom';

const EditarQuemSomos = () => {
  const [userLogado, setUserLogado] = useState(JSON.parse(localStorage.getItem('user')))
  const [id, setId] = useState(null);
  const [descricao, setDescricao] = useState('');
  const [endereco, setEndereco] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [horarioAtendimento, setHorarioAtendimento] = useState('');
  const [secretario, setSecretario] = useState('');
  const [bairro, setBairro] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const navi = useNavigate();
  const [espera, setEspera]=useState(false)
 
  
  
  useEffect(() => {
    const carregarDadosExistente = async () => {
      try {
        const response = await listarTodosQuemSomos();

        if (response && response.data.length > 0) {
          const quemSomosExistente = response.data[0]; 
          setId(quemSomosExistente.id);
          setDescricao(quemSomosExistente.descricao);
          setEndereco(quemSomosExistente.endereco);
          setTelefone(quemSomosExistente.telefone);
          setEmail(quemSomosExistente.email);
          setHorarioAtendimento(quemSomosExistente.horarioAtendimento);
          setSecretario(quemSomosExistente.secretario);
          setBairro(quemSomosExistente.bairro);
        }
      } catch (error) {
        console.error('Erro ao buscar dados existentes:', error);
      }
    };

    carregarDadosExistente();
  }, []);

  const handleSubmit = async (e) => {
    setEspera(true)
    e.preventDefault();
  
    const quemSomosData = {
      id,
      descricao,
      endereco,
      telefone,
      email,
      horarioAtendimento,
      secretario,
      bairro,
      usuarioId: userLogado.id
    };

    try {

      if (id === null) {
        await cadastrarQuemSomos(quemSomosData);
        setMensagem('cadastrado');
      } else {
        
        await editarQuemSomos(id, quemSomosData);
        setMensagem('editado');
      }
  
      
      openModal();
    } catch (error) {
      console.error('Erro ao realizar cadastro/editar:', error);
      setMensagem('erro');
      openModal();
    }
  };
 
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEspera(false)
    navi('/ListarInformesReleazes')   
  };


  return (
    <div id="containerQuemSomos">
      <HeaderWeb />

      <div id="containerFormQuemSomos">
        <div>
          {id === null ? (
            <p id="tituloQ">CADASTRAR QUEM SOMOS</p>
          ) : (
            <p id="tituloQ">EDITAR QUEM SOMOS</p>
          )}
        </div>

        
      <form onSubmit={(e) => handleSubmit(e)}
      style={{height: "85%"}}>
      <div id="formularioQuemSomos">
      <div id="inputEsquerdaQuemSomos">
      
      <div className="containerInputQuemSomos">
        <p id='formularioTitulos'>Telefone *</p>
        <input
          className="inputQuemSomos"
          placeholder="Informe um telefone"
          onChange={(e) => { setTelefone(e.target.value) }}
          value={telefone}
          required
        />
      </div>
      <div className="containerInputQuemSomos">
        <p id='formularioTitulos'>E-mail *</p>
        <input
          className="inputQuemSomos"
          type="email"
          placeholder="Informe o e-mail"
          onChange={(e) => { setEmail(e.target.value) }}
          value={email}
          required
        />
      </div>

      <div className="containerInputQuemSomos">
        <p id='formularioTitulos'>Horário de Atendimento *</p>
        <input
          className="inputQuemSomos"
          placeholder="Informe o horário de atendimento"
          onChange={(e) => { setHorarioAtendimento(e.target.value) }}
          value={horarioAtendimento}
          required
        />
      </div>
      <div className="containerInputQuemSomos">
        <p id='formularioTitulos'>Endereço *</p>
        <input
          className="inputQuemSomos"
          // style={{ width: '50%' }}
          placeholder="Informe o endereço"
          onChange={(e) => { setEndereco(e.target.value) }}
          value={endereco}
          required
        />
      </div>
      <div className="containerInputQuemSomos">
        <p id='formularioTitulos'>Bairro *</p>
        <input
          className="inputQuemSomos"
          placeholder="Informe um bairro"
          onChange={(e) => { setBairro(e.target.value) }}
          value={bairro}
          required
        />
      </div>

      
     </div>
     <div id='inputDireitaQuemSomos'>
     <div className="containerInputQuemSomos">
        <p id='formularioTitulos'>Secretário *</p>
        <input
          className="inputQuemSomos"
          placeholder="Informe o secretário"
          style={{ width: '90%',padding: '1%',
          border:' 1px solid #0a84ff' }}
          onChange={(e) => { setSecretario(e.target.value) }}
          value={secretario}
          required
        />
      </div >
     
      <div className="containerInputQuemSomos">
        <p id='formularioTitulos'>Descrição *</p>
        <textarea
  className="inputQuemSomos"
  placeholder="Informe uma descrição"
  cols="30"
  rows="7"
  type="text"
  style={{ width: '90%',padding: '1%',
  border:' 1px solid #0a84ff' }}
  onChange={(e) => { setDescricao(e.target.value) }}
  value={descricao} 
  required
/>
              <div className="botaoCIQ">
                <button disabled={espera}>SALVAR</button>
              </div>
        
       </div>
       
      
       </div>
       
        </div>
     
        </form>
        {mensagem === 'cadastrado' && showModal && (
          <ModalComum
            tipoMensagem="SUCESSO"
            mensagem="Cadastro realizado com sucesso"
            icon={checkedIcon}
            onClose={closeModal}
          />
        )}

        {mensagem === 'erro' && showModal && (
          <ModalComum
            tipoMensagem="ERRO"
            mensagem="Erro ao realizar cadastro"
            icon={erroIcon}
            onClose={closeModal}
          />
        )}

        {mensagem === 'editado' && showModal && (
          <ModalComum
            tipoMensagem="SUCESSO"
            mensagem="Alteração realizada com sucesso"
            icon={checkedIcon}
            onClose={closeModal}
          />
        )}
      </div>

      <Footer />
    </div>
  );
};

export default EditarQuemSomos;
