<template>
  <div class="q-pa-md">
    <q-card class="q-pa-md">
      <h1 class="q-mb-md text-h6 ">{{ pageTitle }}</h1>

      <q-input v-model="newPost.title" label="Título" filled class="q-mb-md" />
      <q-input v-model="newPost.date" label="Data" type="date" filled class="q-mb-md" />
      <q-input v-model="newPost.summary" label="Resumo" filled class="q-mb-md" />

      <q-uploader
        label="Foto do Encontro/Galera!"
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
      <q-btn label="Adicionar Postagem" color="primary" @click="addPost" class="q-mb-md" />

      <div v-for="(post, index) in blogPosts" :key="post.id" class="q-mb-md">
        <q-card>
          <q-card-section >
            <div class="text-h6">{{ post.title }}</div>
            <div>{{ formatDate(post.date) }}</div>
            <div>{{ post.summary }}</div>
            <img v-if="post.image" :src="post.image" alt="Foto de Capa" class="q-mt-md" style="max-width: 100%;" />
          </q-card-section>
          <q-card-actions align="right">
            <q-btn color="negative" label="Remover" @click="removePost(post.id)" />
          </q-card-actions>
        </q-card>
      </div>
    </q-card>
  </div>
</template>

<script>
import { createClient } from '@supabase/supabase-js';

export default {
  name: 'Admin',
  data() {
    return {
      newPost: {
        image: '',
        title: 'Encontros Inesperados!',
        date: '',
        summary: ''
      },
      uploadedFiles: [],
      blogPosts: [],
      supabase: null,
      pageTitle:'Encontros Inesperados!',
    };
  },
  async created() {
    this.supabase = createClient('https://hsrvfcaciiagdojujxch.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhzcnZmY2FjaWlhZ2RvanVqeGNoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMDcwNzM5OCwiZXhwIjoyMDM2MjgzMzk4fQ.wV96_b2i6Jw9o09Y163oTIusvCXMUNmkSAZ2K8yTn4c');
    await this.loadPosts();
  },
  methods: {
    async addPost() {
      if (this.newPost.title && this.newPost.date && this.newPost.summary && this.newPost.image) {
        try {
          const { data, error } = await this.supabase
            .from('posts')
            .insert([this.newPost])
            .select();

          if (error) {
            console.error('Erro ao adicionar postagem:', error);
          } else {
            console.log('Postagem adicionada com sucesso:', data);
            this.blogPosts.push(data[0]);
            this.newPost = {
              image: '',
              title: '',
              date: '',
              summary: ''
            };
            this.uploadedFiles = [];
          }
        } catch (err) {
          console.error('Erro durante a adição da postagem:', err);
        }
      } else {
        console.error('Todos os campos são obrigatórios');
      }
    },
    async removePost(postId) {
      try {
        const { data, error } = await this.supabase
          .from('posts')
          .delete()
          .eq('id', postId)
          .select();

        if (error) {
          console.error('Erro ao remover postagem:', error);
        } else {
          console.log('Postagem removida com sucesso:', data);
          this.blogPosts = this.blogPosts.filter(post => post.id !== postId);
        }
      } catch (err) {
        console.error('Erro durante a remoção da postagem:', err);
      }
    },
    async loadPosts() {
      try {
        const { data, error } = await this.supabase
          .from('posts')
          .select('*');

        if (error) {
          console.error('Erro ao carregar postagens:', error);
        } else {
          console.log('Postagens carregadas com sucesso:', data);
          this.blogPosts = data;
        }
      } catch (err) {
        console.error('Erro durante o carregamento das postagens:', err);
      }
    },
    async onFileAdded(files) {
      if (files.length > 0) {
        const file = files[0];
        const filePath = `public/${Date.now()}_${file.name}`;

        try {
          const { data: uploadData, error: uploadError } = await this.supabase.storage
            .from('images')
            .upload(filePath, file);

          if (uploadError) {
            console.error('Erro ao fazer upload:', uploadError);
          } else {
            console.log('Upload bem-sucedido:', uploadData);
            const { data: publicURL, error: urlError } = this.supabase.storage
              .from('images')
              .getPublicUrl(filePath);

            if (urlError) {
              console.error('Erro ao obter URL pública:', urlError);
            } else {
              this.newPost.image = publicURL.publicUrl;
              console.log('URL da imagem:', this.newPost.image);
            }
          }
        } catch (err) {
          console.error('Erro durante o upload do arquivo:', err);
        }
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    }
  },
  async mounted() {
    await this.loadPosts();
  }
}
</script>

<style scoped>
.text-h6 {
  font-size: 24px;
  font-weight: bold;
}
</style>
