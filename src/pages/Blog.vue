<template>
  <div class="q-pa-md bg-primary">
    <q-card class="q-pa-md" @click="AbrirBemVindo">
      <q-img src="../assets/Voxx.png" style="width: 370px; height: 260px" />
      <h1 class="q-mb-md text-h6">Bem-vindos à Conferência de Missão VOX - A voz profética</h1>
      <p class="q-mb text-h5">Aqui você poderá postar e ver o que está rolando na nossa Conferência de Missão 2024!</p>
    </q-card>
    <p/>

    <div v-for="post in reversedBlogPosts" :key="post.id" class="q-mb-md">
      <q-card class="q-pa-md">
        <h1 class="q-mb-md text-h6">{{ post.title }}</h1>
        <p class="q-mb-lg text-h6">{{ formatDate(post.date) }}</p>
        <p class="q-mb-lg text-h6">{{ post.summary }}</p>
        <q-img :src="post.image" style="max-width: 100%; height: auto;" />
      </q-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Blog',
  data() {
    return {
      blogPosts: []
    };
  },
  computed: {
    reversedBlogPosts() {
      return this.blogPosts.slice().reverse();
    }
  },
  methods: {
    AbrirBemVindo() {
      this.$router.push('/');
      console.log('Método AbrirBemVindo foi chamado!');
    },
    loadPosts() {
      const posts = localStorage.getItem('blogPosts');
      if (posts) {
        this.blogPosts = JSON.parse(posts);
      }
    },
    formatDate(date) {
      // Formata a data para DD/MM/AAAA
      const formattedDate = new Date(date);
      const day = formattedDate.getDate().toString().padStart(2, '0');
      const month = (formattedDate.getMonth() + 1).toString().padStart(2, '0');
      const year = formattedDate.getFullYear();
      return `${day}/${month}/${year}`;
    }
  },
  mounted() {
    this.loadPosts();
  }
};
</script>

<style scoped>
.footer-menu {
  background-color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
}

.toolbar-menu {
  display: flex;
  justify-content: space-around;
  width: 100%;
  max-width: 600px;
}

.btn-info {
  width:100px;
  border-radius: 200px;
}

.btn-bib {
  background-color: #F2C037;
  width:100px;
  border-radius: 200px;
}

.text-h6 {
  font-size: 24px;
  font-weight: bold;
}
</style>
