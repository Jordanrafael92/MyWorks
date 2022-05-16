<template>
  <v-row>
    <v-col cols="12">
      <template>
        <v-data-table
          :headers="headers"
          :items="categorias"
          :items-per-page="5"
          class="elevation-2"
        >
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editar(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="excluir(item)"> mdi-delete </v-icon>
          </template>
        </v-data-table>
      </template>
    </v-col>

    <v-col cols="12">
      <v-card elevation="2">
        <v-card-title> Categoria {{ categoria.id ? categoria.id : '' }} </v-card-title>

        <v-card-text>
          <v-text-field label="Nome" v-model="categoria.nome" />
        </v-card-text>

        <v-card-actions>
          <v-btn class="success" @click="novo">Novo</v-btn>
          <v-btn class="primary mr-3" @click="salvar">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { text: "ID", align: "start", sortable: true, value: "id" },
        { text: "Nome", align: "start", sortable: true, value: "nome" },
        { text: "Actions", value: "actions", sortable: false, width: "10%" },
      ],
      categoria: {}
    };
  },
  computed: {
    categorias() {
      return this.$store.getters.categorias
    }
  },
  methods: {
    novo() {
      this.categoria = {}
    },
    salvar() {
      this.$store.dispatch('salvarCategoria', this.categoria)
      this.novo()
    },
    editar(categoria) {
      this.categoria = {
        ...categoria
        }
    },
    excluir(categoria) {
      this.$store.dispatch('excluirCategoria', categoria)  
      this.novo()
    },
  },
  mounted() {
    this.$store.dispatch('carregarCategorias')
  }
};
</script>

<style>
</style>