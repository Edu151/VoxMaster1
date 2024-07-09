<template>
  <div class="q-pa-md">
    <q-card class="q-pa-md">
      <h1 class="q-mb-md text-h6">Com quem eu me encontrei!</h1>

      <q-input v-model="newPost.title" label="Título" filled class="q-mb-md" />
      <q-input v-model="newPost.date" label="Data" type="date" filled class="q-mb-md" />
      <q-input v-model="newPost.summary" label="Resumo" filled type="textarea" class="q-mb-md" />

      <!-- Componente de upload de imagem -->
      <q-uploader
        label="Foto"
        accept="image/*"
        v-model="uploadedFiles"
        @added="onFileAdded"
        auto-expand
        class="q-mb-md"
      >
        <template v-slot:prepend>
          <q-icon name="image" />
        </template>
      </q-uploader>
      <q-btn label="Publicar" color="primary" @click="addPost" class="q-mb-md" />

      <div v-for="(post, index) in blogPosts" :key="post.id" class="q-mb-md">
        <q-card>
          <q-card-section>
            <div class="text-h6">{{ post.title }}</div>
            <div>{{ formatDate(post.date) }}</div>
            <div>{{ post.summary }}</div>
            <img v-if="post.image" :src="post.image" alt="Foto de Capa" class="q-mt-md" style="max-width: 100%;" />
          </q-card-section>
          <q-card-actions align="right">
            <q-btn color="negative" label="Remover" @click="removePost(index)" />
          </q-card-actions>
        </q-card>
      </div>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'Admin',
  data() {
    return {
      newPost: {
        image: '',
        title: '',
        date: '',
        summary: '',
        expiryDate: '' // Nova propriedade para data de expiração
      },
      uploadedFiles: [],
      blogPosts: []
    }
  },
  methods: {
    addPost() {
      if (this.newPost.title && this.newPost.date && this.newPost.summary) {
        // Calcula a data de expiração (24 horas a partir da data de postagem)
        const expiryDate = new Date(this.newPost.date);
        expiryDate.setDate(expiryDate.getDate() + 1); // Adiciona 1 dia
        this.newPost.expiryDate = expiryDate.toISOString();

        this.blogPosts.push({
          ...this.newPost,
          id: Date.now()
        });
        this.newPost.title = '';
        this.newPost.date = '';
        this.newPost.summary = '';
        this.newPost.image = '';
        this.uploadedFiles = [];
        this.savePosts();

        this.removeExpiredPosts(); // Remove postagens expiradas após adicionar uma nova
      }
    },
    removePost(index) {
      this.blogPosts.splice(index, 1);
      this.savePosts();
    },
    savePosts() {
      localStorage.setItem('blogPosts', JSON.stringify(this.blogPosts));
    },
    loadPosts() {
      const posts = localStorage.getItem('blogPosts');
      if (posts) {
        this.blogPosts = JSON.parse(posts);
        this.removeExpiredPosts(); // Remove postagens expiradas ao carregar
      }
    },
    removeExpiredPosts() {
      const currentDate = new Date();
      this.blogPosts = this.blogPosts.filter(post => {
        // Verifica se a data de expiração ainda não passou
        const expiryDate = new Date(post.expiryDate);
        return expiryDate > currentDate;
      });
      this.savePosts(); // Salva novamente após remover as postagens expiradas
    },
    onFileAdded(files) {
      if (files.length > 0) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(files[0]);
        fileReader.onload = (e) => {
          this.newPost.image = e.target.result;
        };
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString(); // Formata a data para exibição
    }
  },
  mounted() {
    this.loadPosts();
  }
}
</script>

<style scoped>
.text-h6 {
  font-size: 24px;
  font-weight: bold;
}
</style>
