import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://35.184.203.56:8017/api'
});

export const configToken = (token) => {
  localStorage.setItem('authToken', token);
  api.defaults.headers.common['Authorization'] = token;

  console.log('Token setado no localStorage:', token);
};

export function verificaLogin(email, senha) {
  return api.post('/usuarios/login', { email, senha });
}

export function verificarsenhaatual(email, senha) {
  return api.post('/usuarios/verificarsenhaatual', { email, senha });
}

export function listaDeUsuarios() {
  return api.get('usuarios');
}

export function cadastrarPontoDeApoio(ponto_apoio,bairro,status,endereco,numerosTelefone,usuarioId) {
  return api.post('pontosdeapoio', {ponto_apoio,bairro,status,endereco,numerosTelefone,usuarioId});
}

export async function cadastraUser(nomeUsuario, email, senha) {
  try {
    return await api.post('/usuarios', {
      nomeUsuario,
      email,
      senha,
    });
  } catch (error) {
    console.log('erro da api');
    return "erro"
  }
}

export function obterPontoDeApoio(id) {
  return api.get(`pontosdeapoio/${id}`);
}

export function listarTodosPontosDeApoio() {
  return api.get('pontosdeapoio');
}

export function alterarStatus(id, user) {
  return api.patch(`pontosdeapoio/alterarStatus/${id}`, {},{
    params: {
      idUsuario: user.id,
    }
  });
}

export function removerPontosDeApoio(id, user) {
  const usu = user.id;
  return api.patch(`pontosdeapoio/removerPontosDeApoio/${id}`, {},{
   params: {
     idUsuario: usu
   }
  });
 }

export function editarPontoDeApoio(id, ponto_apoio, bairro, status, endereco, numerosTelefone, usuarioId) {
  return api.put(`pontosdeapoio/${id}`, { ponto_apoio, bairro, status, endereco, numerosTelefone, usuarioId });
}

export function obterInformesReleazes(id) {
  return api.get(`informativo/${id}`);
}

export function VizualizarInformesReleazes() {
  return api.get('informativo/listarInformes');
}

export async function DeletarInformesReleazes(id, userId) {
  return await api.delete(`informativo/deletar/${id}`, {
    params: {
      usuarioId: userId
    }
  });
}

export async function ObterInformeReleaze(id) {
  return await api.get(`informativo/${id}`);
}

export async function cadastrarQuemSomos({ bairro, endereco, telefone, email, horarioAtendimento, secretario, descricao ,usuarioId}) {
console.log(usuarioId);
  return await api.post(`quemsomos`, { bairro, endereco, telefone, email, horarioAtendimento, secretario, descricao ,usuarioId});
}

export async function editarQuemSomos(id, { bairro, endereco, telefone, email, horarioAtendimento, secretario, descricao  ,usuarioId}) {
  console.log(usuarioId);
  return await api.put(`quemsomos/${id}`, { bairro, endereco, telefone, email, horarioAtendimento, secretario, descricao  ,usuarioId});
}

export async function obterQuemSomos(id) {
  return await api.get(`quemsomos/${id}`);
}

export async function listarTodosQuemSomos() {
  return await api.get(`quemsomos`);
}

// export async function editarUsuarioApi(id, nomeUsuario, email) {
//   console.log(id, nomeUsuario, email)
//   return await api.patch(`usuarios/${id}`, { nomeUsuario, email });
// }

// export async function editarUsuarioApiComSenha(id, nomeUsuario, email, senha) {
//   return await api.patch(`usuarios/${id}`, { nomeUsuario, email, senha });
// }

export async function editarUsuarioApi(id, nomeUsuario, email, senha) {

  try {
    const requestBody = senha
      ? { nomeUsuario, email, senha }
      : { nomeUsuario, email };

    return await api.patch(`usuarios/${id}`, requestBody);
  } catch (error) {
    console.error('Erro na chamada da API:', error);
    throw error; // Rejeitar o erro para que a chamada externa possa lidar com isso
  }
}

