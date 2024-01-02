import React, { useEffect, useState } from 'react';
import './styles.css';
import { HeaderWeb } from '../../components/HeaderWeb';
import Footer from '../../components/Footer';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { ObterInformeReleaze, api } from '../../api/api';
import { useNavigate } from 'react-router-dom';
import ModalComum from '../../components/Modal';
import checkedIcon from '../../assets/checked.png';
import erroIcon from '../../assets/erro.png';

const validationPost = yup.object().shape({
  titulo: yup

    .string()
    .required('Preencha o titulo')
    .max(100, 'Até 100 caract.'),
  descricao: yup.string().required('Preencha a descriçao'),
});

export default function CadastroInformeReleases() {
  const [userLogado, setUserLogado] = useState(JSON.parse(localStorage.getItem('user')))
  const userId = { usuarioId: userLogado.id }
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [informe, setInforme] = useState({});
  const [id, setId] = useState();
  const navi = useNavigate();
  const [mensagem, setMensagem] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [espera, setEspera] = useState(false)

  useEffect(() => {
    setId(localStorage.getItem('ediçao'));
    pegar();
  }, []);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEspera(false)
    navi('/ListarInformesReleazes');
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationPost) });

  const pegar = async () => {
    console.log('pegar');
    const idd = localStorage.getItem('ediçao');
    if (idd != 0) {
      await ObterInformeReleaze(idd)
        .then((valor) => {
          setInforme(valor.data);

        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      setInforme({ tipo: ' ' })
    }
  };

  const addPost = async (data) => {
    setEspera(true)
    if (id === '0') {
      try {
        Object.assign(data, userId);
        await api.post('informativo/cadastrar', data);
        handleShow();
        setMensagem('cadastrado');
        openModal();
      } catch (error) {
        console.log();
        setMensagem('erro');
        openModal();
      }
    } else {
      try {
        Object.assign(data, userId);
        await api.put(`informativo/atualizar/${id}`, data);
        handleShow();
        setMensagem('Cadastro alterado');
        openModal();
      } catch (error) {
        setMensagem('erro');
        openModal();
      }
    }

  };



  return (
    <div id="containerI">
      <HeaderWeb />

      <div className="cardCI">
        <div>
          <p id="tituloI">
            {id == 0 ? 'CADASTRAR INFORMATIVO' : 'ALTERAR INFORMATIVO'}
          </p>
        </div>
        <form onSubmit={handleSubmit(addPost)}>
          <div className="formularioCI">
            <div className="esquerda">
              <div className="containerInputI">
                <p id="formularioTitulos">Titulo *</p>
                <input
                  className="camposCI"
                  placeholder="Informe um Título"
                  defaultValue={informe.titulo}
                  type="text"
                  id="titulo"
                  name="titulo"
                  {...register('titulo')}
                />
                <p className="error-message">{errors.titulo?.message}</p>
              </div>

              <div className="containerInputI">
                <p id="formularioTitulos">Data do evento (Opcional)</p>
                <input
                  className="camposCI"
                  defaultValue={informe.dataEvento}
                  type="date"
                  id="dataEvento"
                  name="dataEvento"
                  {...register('dataEvento')}
                />
              </div>

              <div className="containerInputI">
                <p style={{ marginTop: '4vh' }} id="formularioTitulos">
                  Tipo *
                </p>
                {informe.tipo && <select
                  defaultValue={informe?.tipo}
                  className="camposCI"
                  style={{ width: '30%' }}
                  id="tipo"
                  name="tipo"
                  {...register('tipo')}
                >
                  <option value="Informe">Informe</option>
                  <option value="Alerta">Alerta</option>
                </select>}
              </div>
            </div>

            <div className="direita">
              <div
                style={{ display: 'flex', flex: 1, flexDirection: 'column' }}
              >
                <p id="formularioTitulos">Descrição *</p>
                <textarea
                  className="camposCID"
                  defaultValue={informe.descricao}
                  placeholder="Informe uma descrição"
                  cols="30"
                  rows="7"
                  type="text"
                  id="descricao"
                  name="descricao"
                  {...register('descricao')}
                  style={{ resize: 'none' }}
                />
                <p className="error-message">{errors.descricao?.message}</p>
              </div>

              <div className="botaoCI">
                <button disabled={espera}>SALVAR</button>
              </div>
            </div>
          </div>
        </form>

        {mensagem == 'cadastrado' && showModal && (
          <ModalComum
            tipoMensagem="SUCESSO"
            mensagem="informe criado com sucesso"
            icon={checkedIcon}
            onClose={closeModal}
          />
        )}
        {mensagem == 'Cadastro alterado' && showModal && (
          <ModalComum
            tipoMensagem="SUCESSO"
            mensagem="informe alterado com sucesso"
            icon={checkedIcon}
            onClose={closeModal}
            tabIndex={0}
            onKeyDown={() => { (event.key === "Enter") && (closeModal) }}
          />
        )}

        {mensagem == 'erro' && showModal && (
          <ModalComum
            tipoMensagem="ERRO"
            mensagem="Erro ao salvar informe"
            icon={erroIcon}
            onClose={closeModal}
            tabIndex={0}
            onKeyDown={() => { (event.key === "Enter") && (closeModal) }}
          />
        )}
      </div>

      <Footer />
    </div>
  );
}
