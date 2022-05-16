<template>
  <v-card class="mx-auto" outlined>
    <v-card-title> {{ tarefa.descricao }} </v-card-title>

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
            return this.tarefa.status == 'ABERTA'
        },
        showConcluir() {
            return this.tarefa.status == 'ABERTA' || this.tarefa.status == 'EM_ANDAMENTO'
        },
        showCancelar() {
            return this.tarefa.status == 'ABERTA' || this.tarefa.status == 'EM_ANDAMENTO'
        },
    },
    methods: {
        iniciar() {
          console.log('inciar')
        },
        concluir() {
            console.log('concluir')
        },
        cancelar() {
            console.log('cancelar')
        }
    }
};
</script>

<style>
</style>