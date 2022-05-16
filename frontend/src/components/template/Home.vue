<template>
  <div>
    <v-row cols="12">
      <Coluna titulo="Aberto" cor="indigo" :tarefas="tarefasAbertas" />

      <Coluna titulo="Em andamento" cor="primary" :tarefas="tarefasEmAndamento" />

      <Coluna titulo="Concluídas" cor="success" :tarefas="tarefasConcluidas" />

      <Coluna titulo="Canceladas" cor="error" :tarefas="tarefasCanceladas" />
    </v-row>

    <TarefaDialog />
  </div>
</template>

<script>
import Coluna from "../../components/coluna/Coluna"
import TarefaDialog from '../tarefa/TarefaDialog'

export default {
  components: {
    Coluna, TarefaDialog
  },
  computed: {
    tarefasAbertas() {
      // https://vuex.vuejs.org/guide/getters.html#method-style-access
      return this.$store.getters.tarefasPorStatus('ABERTA')      
    },
    tarefasEmAndamento() {
      return this.$store.getters.tarefasPorStatus('EM_ANDAMENTO')      
    },
    tarefasConcluidas() {
      return this.$store.getters.tarefasPorStatus('CONCLUIDA')      
    },
    tarefasCanceladas() {
      return this.$store.getters.tarefasPorStatus('CANCELADA')      
    },
  },
};
</script>

<style>
</style>