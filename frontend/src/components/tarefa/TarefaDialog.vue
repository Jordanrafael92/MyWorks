<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-fab-transition>
        <v-btn
          color="pink"
          fab
          dark
          small
          absolute
          bottom
          right
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-fab-transition>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Nova Tarefa</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="12" md="12">
              <v-text-field label="Descricao" required v-model="tarefa.descricao"></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-menu
                ref="menu1"
                v-model="menu1"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="dateFormatted"
                    label="Date"
                    hint="MM/DD/YYYY format"
                    persistent-hint
                    prepend-icon="mdi-calendar"
                    v-bind="attrs"
                    @blur="date = parseDate(dateFormatted)"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date"
                  no-title
                  @input="menu1 = false"
                ></v-date-picker>
              </v-menu>

            </v-col>

            <v-col cols="12" sm="12" md="6">
              <v-select
                :items="categorias"
                label="Categoria"
                item-text="nome"
                item-value="id"
                v-model="categoriaId"
                required
              ></v-select>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">
          Cancelar
        </v-btn>
        <v-btn color="blue darken-1" text @click="salvar">
          Salvar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      dateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),
      menu1: false,
      tarefa: {},
      categoriaId: null
    };
  },
  computed: {
    categorias() {
      return this.$store.getters.categorias
    },
    dialog: {
      get: function() {
        return this.$store.getters.showDialog
      },
      set: function(value) {
        this.$store.dispatch('atualizaDialog', value)
      }
    }
  },
  watch: {
    date (val) {
      this.dateFormatted = this.formatDate(val)
    },
    dialog() {
      if (this.dialog) {
        this.$store.dispatch('carregarCategorias')
        this.tarefa = this.$store.getters.tarefaEdicao
        this.date = this.tarefa.dataEntrega
        this.categoriaId = this.tarefa.categoriaId

      } else {
        this.date = null
        this.$store.dispatch('limparForm')
      }
    }
  },
  methods: {
    novaTarefa() {
      this.$store.dispatch('novaTarefa')
    },
    salvar() {
      this.tarefa.dataEntrega = this.date
      this.tarefa.categoriaId = this.categoriaId

      this.$store.dispatch('salvarTarefa', this.tarefa)

      this.dialog = false
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;
      const [day, month, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
  }
};
</script>

<style>
</style>