<template>
  <v-card class="mx-auto" outlined>
    <v-card-title @click="editarTarefa" class="descricao"> {{ tarefa.descricao }} </v-card-title>

    <v-card-actions>
      <v-btn ico class="primary" @click="iniciar" v-if="showIniciar"><v-icon>mdi-play</v-icon></v-btn>
      <v-btn ico class="success" @click="concluir" v-if="showConcluir"><v-icon>mdi-check</v-icon></v-btn>
      <v-btn ico class="error" @click="cancelar" v-if="showCancelar"><v-icon>mdi-cancel</v-icon></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: [
      'tarefa'
  ],
  computed: {
    showIniciar() {
        return this.tarefa._links.iniciar
    },
    showConcluir() {
      return this.tarefa._links.concluir
    },
    showCancelar() {
      return this.tarefa._links.cancelar
    },
  },
  methods: {
    iniciar() {
      this.$store.dispatch('executarAcao', this.tarefa._links.iniciar.href)
    },
    concluir() {
      this.$store.dispatch('executarAcao', this.tarefa._links.concluir.href)
    },
    cancelar() {
      this.$store.dispatch('executarAcao', this.tarefa._links.cancelar.href)
    },
    editarTarefa() {
      this.$store.dispatch('editarTarefa', this.tarefa)
    }
  },
};
</script>

<style>
.descricao:hover {
  cursor: pointer;
}
</style>