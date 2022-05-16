<template>
  <v-card max-width="350px" class="mx-auto pa-5" elevation="5">
    <v-card-title primary-title>
      <h4>Acessar</h4>
    </v-card-title>

    <v-text-field v-model="user.nome" label="Nome" prepend-icon="mdi-account" required/>
    <v-text-field v-model="user.senha" label="Senha" prepend-icon="mdi-lock" type="password"/>

    <v-card-actions class="d-flex justify-center">
      <v-btn color="success" @click="login()" >Acessar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>

export default {

  data() {
    return {
      user: {}
    }
  },

  methods: {
    login() {
       this.$store.dispatch('login', this.user)
    }
  }


}
</script>

<style>

</style>