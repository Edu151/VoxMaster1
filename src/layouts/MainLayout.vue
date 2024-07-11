<template>
  <q-layout view="lHh Lpr lFf">
    <!-- Cabeçalho -->
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          VOX - A voz profética<q-img style="width: 50px; height: 50px;margin-left: auto" src="src/assets/img.jpeg"/>
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
        <q-btn class="btn-bib" icon="fa-solid fa-hands-praying" @click="Oracao" />
        <q-btn class="btn-bib" icon="fa-solid fa-user-check" @click="Marcou" />
        <q-btn class="btn-bib" icon="fa-solid fa-book-bible" @click="GoToBibliaDois" />
        <q-btn class="btn-bib" icon="fa-solid fa-user-group" @click="ComQuem" />
        <q-btn class="btn-bib" icon="fa-solid fa-upload" @click="goToAdmin" />

      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MainLayout',
  methods: {
    Marcou() {
      this.$router.push('/Marcou');
      console.log('Método Marcou foi chamado!');
    },
    Oracao() {
      this.$router.push('/Oracao');
      console.log('Método Pedido de oração foi chamado!');
    },
    GoToBibliaDois() {
      this.$router.push('/BibliaDois');
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
