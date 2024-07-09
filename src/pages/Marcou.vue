<template>
  <div class="q-pa-md">
    <q-card class="q-pa-md">
      <h1 class="q-mb-md text-h6">O Que Fui Marcado</h1>

      <q-input v-model="newPost.title" label="Título" filled class="q-mb-md" />
      <q-input v-model="newPost.details" label="Detalhes" filled type="textarea" class="q-mb-md" />

      <q-btn label="Publicar" color="primary" @click="addPost" class="q-mb-md" />

      <div v-for="(post, index) in blogPosts" :key="post.id" class="q-mb-md">
        <q-card>
          <q-card-section>
            <div class="text-h6">{{ post.title }}</div>
            <div>{{ post.details }}</div>
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
  name: 'OQueFuiMarcado',
  data() {
    return {
      newPost: {
        title: '',
        details: ''
      },
      blogPosts: []
    };
  },
  methods: {
    addPost() {
      if (this.newPost.title && this.newPost.details) {
        const newPostCopy = {
          ...this.newPost,
          id: Date.now().toString() // Usar string para ID
        };
        this.blogPosts.push(newPostCopy);
        this.newPost.title = '';
        this.newPost.details = '';
        this.savePosts();
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
      }
    }
  },
  mounted() {
    this.loadPosts();
  }
};
</script>

<style scoped>
.text-h6 {
  font-size: 24px;
  font-weight: bold;
}
</style>
