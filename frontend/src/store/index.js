import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tarefas: [
      {
        id: 1,
        descricao: "Tarefa X",
        status: "ABERTA",
      },
      {
        id: 2,
        descricao: "Tarefa Z",
        status: "EM_ANDAMENTO",
      },
      {
        id: 3,
        descricao: "Tarefa W",
        status: "CONCLUIDA",
      },
      {
        id: 4,
        descricao: "Tarefa Y",
        status: "CANCELADA",
      },
    ]
  },
  mutations: {
  },
  actions: {
  },
  getters: {
     // https://vuex.vuejs.org/guide/getters.html#method-style-access
    tarefasPorStatus(state) {
      return status => state.tarefas.filter(
        tarefa => { return tarefa.status == status }
      )
    },
  },
  modules: {
  }
})
