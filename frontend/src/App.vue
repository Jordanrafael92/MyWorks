<template>
  <v-app>
    <Header />

    <v-main>
      <v-container>
        <router-view></router-view>  
      </v-container>
    </v-main>

    <Footer />
  </v-app>
</template>

<script>
import Header from './components/template/Header'
import Footer from './components/template/Footer'

export default {
  name: 'App',

  components: {
    Header, Footer
  },

  data: () => ({
    //
  }),
};
</script>
