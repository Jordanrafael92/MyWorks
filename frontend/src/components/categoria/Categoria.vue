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
        <v-card-title> Categoria</v-card-title>

        <v-card-text>
          <v-text-field label="Nome" />
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
        { text: "Nome", align: "start", sortable: true, value: "nome" },
        { text: "Actions", value: "actions", sortable: false, width: "10%" },
      ],
      categorias: [{ nome: "Pessoal" }, { nome: "Profissional" }],
    };
  },
  methods: {
    novo() {
      console.log("novo");
    },
    salvar() {
      console.log("salvar");
    },
    editar(categoria) {
      console.log("editar", categoria);
    },
    excluir(categoria) {
      console.log("excluir", categoria);
    },
  },
};
</script>

<style>
</style>