<template>
  <v-col md="3">
    <v-card>
      <v-toolbar :color="cor" dark>
        <v-toolbar-title> {{ titulo }} </v-toolbar-title>
      </v-toolbar>

      <v-container>
        <TarefaCard v-for="tarefa in tarefas" :key="tarefa.id" :tarefa="tarefa"/>
      </v-container>
    </v-card>
  </v-col>
</template>

<script>
import TarefaCard from '../tarefa/TarefaCard'

export default {
  components: {
    TarefaCard
  },
  props: [
    'titulo', 'cor', 'tarefas'
  ],
};
</script>

<style>
</style>