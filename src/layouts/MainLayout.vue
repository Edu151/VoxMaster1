<template>
  <q-layout view="lHh Lpr lFf">
    <!-- Cabeçalho -->
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          VOX - A voz profética
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <!-- Menu lateral -->


    <!-- Conteúdo da página -->
    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- Rodapé -->
    <q-footer class="q-pa-md footer-menu">
      <q-toolbar class="q-gutter-md">

        <q-btn class="btn-bib" icon="home" @click="HomePage" />
        <q-btn class="btn-bib" icon="" @click="Oracao" />
        <q-btn class="btn-bib" icon="check" @click="Marcou" />
        <q-btn class="btn-bib" icon='church' @click="AbrirBiblia" />
        <q-btn class="btn-bib" icon='portrait' @click="ComQuem" />
        <q-btn class="btn-bib" icon="upload" @click="goToAdmin" />


      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue';
import { ref } from 'vue'
import Essential from '../components/EssentialLink.vue';

const linksList = [
  {
    title: 'Entrar',
    icon: 'home',
  },
  {
    title: 'WhatsApp',
    icon: 'book-bible',
    link: ''
  },
  {
    title: 'Instagram',
    icon: 'instagram',
    link: 'https://www.instagram.com/saldaterramorrinhos/'
  },
  {
    title: 'Facebook',
    icon: 'facebook',
    link: 'https://www.facebook.com/salmorrinhos/?locale=pt_BR'
  }
];

export default defineComponent({
  name: 'MainLayout',
  components: {
    Essential
  },
  data() {
    return {
      leftDrawerOpen: false,
      linksList: linksList
    };
  },
  methods: {
    AbrirBiblia() {
      this.$router.push('/Biblia');
      console.log('Método AbrirBiblia foi chamado!');
    },
    Marcou() {
      this.$router.push('/Marcou');
      console.log('Método Marcou foi chamado!');
    },
    Oracao() {
      this.$router.push('/Oracao');
      console.log('Método Pedido de oração foi chamado!');
    },
    HomePage() {
      this.$router.push('/');
      console.log('Método HomePage foi chamado!');
    },
    goToAdmin() {
      this.$router.push('/admin');
      console.log('Método goToAdmin foi chamado!');
    },
    ComQuem() {
      this.$router.push('/Quem');
      console.log('Método ComQuem foi chamado!');
    }
  }
});
</script>

<style scoped>
.btn-bib {
  color: #333333;
  background-color: #F2C037;
  transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
}

@media (max-width: 768px) {
  .btn-bib {
    margin-left: 12px;
    font-size: 14px; /* Ajuste o tamanho da fonte para telas menores */
    padding: 15px 15px; /* Ajuste o padding para melhor usabilidade em dispositivos móveis */
  }
}

@media (max-width: 480px) {

}




@media (max-width: 768px) {
  .footer-menu {
    padding: 10px; /* Reduz o padding do rodapé em telas menores */
  }
}
</style>
