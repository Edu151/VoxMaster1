<template>
  <div class="q-pa-md bg-primary">
    <q-card class="q-pa-md">
      <q-img src="../assets/Voxx.png" style="width: 370px; height: 260px" />
      <h1 class="q-mb-md text-h6">{{ pageTitle }}</h1>
      <p class="q-mb text-h5">Aqui você poderá postar e ver o que está rolando na nossa Conferência de Missão 2024!</p>
    </q-card>
    <p/>

    <div v-for="post in reversedBlogPosts" :key="post.id" class="q-mb-md">
      <q-card class="q-pa-md" >
        <h1 class="q-mb-md text-h6">{{ post.title }}</h1>
        <p class="q-mb-lg text-h6">{{ post.summary }}</p>
        <q-img :src="post.image" style="max-width: 100%; height: auto;" />
      </q-card>
    </div>
  </div>
</template>

<script>
import { createClient } from '@supabase/supabase-js';

export default {
  name: 'Blog',
  data() {
    return {
      blogPosts: [],
      supabase: null,
      pageTitle: 'Vox' // Adicione a propriedade pageTitle
    };
  },
  computed: {
    reversedBlogPosts() {
      return this.blogPosts.slice().reverse();
    }
  },
  async created() {
    this.supabase = createClient(
      'https://hsrvfcaciiagdojujxch.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhzcnZmY2FjaWlhZ2RvanVqeGNoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMDcwNzM5OCwiZXhwIjoyMDM2MjgzMzk4fQ.wV96_b2i6Jw9o09Y163oTIusvCXMUNmkSAZ2K8yTn4c'
    );
    await this.loadPosts();
    this.setPageTitle(); // Chame a função para definir o título da página
  },
  methods: {
    async loadPosts() {
      try {
        console.log('Iniciando a solicitação para buscar posts...');
        const { data, error } = await this.supabase
          .from('posts')
          .select('*');

        if (error) {
          console.error('Erro ao buscar posts:', error);
        } else {
          console.log('Dados recebidos:', data);
          this.blogPosts = data;
        }
      } catch (err) {
        console.error('Erro durante a solicitação de dados:', err);
      }
    },
    formatDate(date) {
      const formattedDate = new Date(date);
      const day = formattedDate.getDate().toString().padStart(2, '0');
      const month = (formattedDate.getMonth() + 1).toString().padStart(2, '0');
      const year = formattedDate.getFullYear();
      return `${day}/${month}/${year}`;
    },
    setPageTitle() {
      // Defina o título da página com base na lógica desejada
      this.pageTitle = 'Bem-vindos à Conferência de Missão VOX - A voz profética';
    }
  }
};
</script>

<style scoped>
.text-h6 {
  font-size: 24px;
  font-weight: bold;
}
</style>
