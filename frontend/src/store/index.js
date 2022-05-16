import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tarefas: [],
    usuario: null,
    categorias: ['Pessoal', 'Profissional'],
    showDialog: false,
    tarefaEdicao: null,
  },
  mutations: {
    setUsuario(state, usuario) {
      state.usuario = usuario
      Vue.prototype.$http.defaults.headers.common['Authorization'] = `Bearer ${usuario.token}`
      localStorage.setItem('__minhastarefas_user', JSON.stringify(usuario))
    },
    setTarefas( state, response ) {
      state.tarefas = response.data._embedded.tarefaResponseList
    },
    limparUsuario( state ) {
      state.usuario = null
      delete Vue.prototype.$http.defaults.headers.common['Authorization']
      localStorage.removeItem('__minhastarefas_user')
    },
    setCategorias( state, response ) {
      state.categorias = response.data._embedded.tarefaCategoriaResponseList
    },
    setDialog( state, value ) {
      state.showDialog = value
    },
    setTarefaEdicao(state, tarefa) {
      state.tarefaEdicao = tarefa
    }
  },
  actions: {
    login({ commit }, usuario) {
      Vue.prototype.$http
        .post('http://localhost:8080/minhastarefas/api/auth/login', usuario)
        .then(response => {
          commit('setUsuario', response.data)
          router.push({ name: 'Home' })
        })
        .catch(error => {
          console.log(error)
        })
    },
    carregarUsuario({ commit }) {
      const usuarioString= localStorage.getItem('__minhastarefas_user')

      if (usuarioString) {
        const usuario = JSON.parse(usuarioString)
        commit('setUsuario', usuario)
        Vue.prototype.$http.defaults.headers.common['Authorization'] = `Bearer ${usuario.token}`
      }
    },
    logout({ commit }) {
      commit('limparUsuario')
      router.push({ name: 'Login' })
    },
    carregarTarefas({ commit }) {

      Vue.prototype.$http
      .get('http://localhost:8080/minhastarefas/tarefa')
      .then(response => {
        commit('setTarefas',  response)
      })
      .catch(error => {
        console.log(error)
      })
    },
    executarAcao({ dispatch }, url) {
      Vue.prototype.$http
        .put(url)
        .then((response) => {
          if (response.status === 200)
            dispatch('carregarTarefas')
        })
        .catch((error) => {
          console.log(error);
        });
    },
    salvarTarefa({ dispatch, state }, tarefa) {
      tarefa.usuarioId = state.usuario.id

      Vue.prototype.$http
      .post('http://localhost:8080/minhastarefas/tarefa', tarefa)
      .then(response => {
        if (response.status === 201)
          dispatch('carregarTarefas')
      })
      .catch(error => {
        console.log(error)
      })

    },
    carregarCategorias({ commit }) {
      Vue.prototype.$http
      .get('http://localhost:8080/minhastarefas/categoria')
      .then(response => {
        if (response.status === 200)
          commit('setCategorias', response)
      })
      .catch(error => {
        console.log(error)
      })
    },
    atualizaDialog({ commit }, value) {
      commit('setDialog', value)
    },
    editarTarefa({commit, dispatch}, tarefa) {
      commit('setTarefaEdicao', tarefa)
      dispatch('atualizaDialog', true)
    },
    limparForm({commit}) {
      commit('setTarefaEdicao', {})
    },
    excluirCategoria({dispatch}, { id }) {
      Vue.prototype.$http
      .delete(`http://localhost:8080/minhastarefas/categoria/${id}`)
      .then(response => {
        if (response.status === 204)
        dispatch('carregarCategorias')
      })
      .catch(error => {
        alert('Não é possível excluir esta categoria')
        console.log(error)
      })
    },
    salvarCategoria({dispatch}, categoria) {
      Vue.prototype.$http
      .post(`http://localhost:8080/minhastarefas/categoria`, categoria)
      .then(response => {
        if (response.status === 201)
        dispatch('carregarCategorias')
      })
      .catch(error => {
        alert('Erro ao salvar categoria')
        console.log(error)
      })
    }
  },
  getters: {
    usuario(state) {
      return state.usuario
    },
     // https://vuex.vuejs.org/guide/getters.html#method-style-access
    tarefasPorStatus(state) {
      return status => state.tarefas.filter(
        tarefa => { return tarefa.status == status }
      )
    },
    categorias(state) {
      return state.categorias.map(categoria => {
        return {
          ...categoria
        }
      })
    },
    showDialog(state) {
      return state.showDialog
    },
    tarefaEdicao( state ) {
      return {
        ...state.tarefaEdicao
      }
    }
  },
  modules: {
  }
})
