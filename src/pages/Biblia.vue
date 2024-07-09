<template>
  <div class="biblia-container">
    <q-card class="biblia-card">
      <h1 class="text-h6">Livros da Bíblia</h1>

      <q-select
        v-model="selectedBook"
        :options="filteredBooks"
        label="Selecionar Livro"
        option-value="abrev"
        option-label="nome"
        dense
        rounded filled
        class="book-select"
        input-class="custom-qselect-input"
        menu-class="custom-qselect-menu"
      />

      <q-select
        v-model="selectedChapter"
        :options="getChapters(selectedBook)"
        label="Selecionar Capítulo"
        dense
        rounded filled
        class="chapter-select"
        input-class="custom-qselect-input"
        menu-class="custom-qselect-menu"
      />

      <q-card v-if="selectedChapter && selectedBook" class="chapter-card">
        <h2 class="text-h6">Capítulo {{ selectedChapter }}</h2>
        <div v-for="(verse, index) in getChapterVerses(selectedBook.abrev, selectedChapter)" :key="index" class="verse-container">
          <p><strong>{{ index + 1 }}</strong> {{ verse }}</p>
        </div>
      </q-card>

      <!-- Botão flutuante para voltar ao topo -->
      <q-btn
        icon="arrow_upward"
        class="scroll-top-btn"
        @click="scrollToTop"
        fab
        color="primary"
        style="bottom: 20px; z-index: 1000;"
      />
    </q-card>
  </div>
</template>

<script>
import bibleData from '../services/biblialivre.json';

export default {
  name: 'Biblia',
  data() {
    return {
      books: [],
      filteredBooks: [],
      selectedBook: null,
      selectedChapter: null,
      searchQuery: '',
      loading: true,
    };
  },
  created() {
    this.loadBooks();
  },
  methods: {
    async loadBooks() {
      try {
        this.books = bibleData.filter(item => item.nome);
        this.filteredBooks = this.books;
        console.log('Livros carregados:', this.books);
      } catch (error) {
        console.error('Erro ao carregar livros da Bíblia:', error);
        alert('Erro ao carregar livros da Bíblia');
      } finally {
        this.loading = false;
      }
    },
    selectBook(book) {
      this.selectedBook = book;
      this.selectedChapter = null;
    },
    getChapters(selectedBook) {
      if (selectedBook) {
        return new Array(selectedBook.capitulos.length).fill().map((_, index) => index + 1);
      }
      return [];
    },
    getChapterVerses(bookAbrev, chapterNumber) {
      if (bookAbrev && chapterNumber && this.books.length > 0) {
        const book = this.books.find(book => book.abrev === bookAbrev);
        if (book && book.capitulos.length >= chapterNumber) {
          return book.capitulos[chapterNumber - 1];
        }
      }
      return [];
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  },
};
</script>

<style scoped>
.biblia-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.biblia-card {
  width: 100%;
  max-width: 600px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
}

.book-list {
  margin-top: 10px;
  width: 100%;
}

.loading-spinner {
  margin-top: 20px;
}

.chapter-card {
  width: 100%;
  max-width: 600px;
  background-color: #f0f0f0;
  border-radius: 8px;
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
  padding: 20px;
  margin-bottom: 20px;
}

.text-h6 {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}

.search-container {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.search-input {
  flex: 1;
  margin-right: 10px;
}

.search-btn {
  min-width: 100px;
}

.verse-container {
  margin-bottom: 10px;
}

.chapter-select {
  margin-top: 10px;
}

.book-select {
  margin-bottom: 10px;
}

.custom-qselect-input {
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
}

.custom-qselect-menu {
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  border: 1px solid #ccc;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

@media (max-width: 600px) {
  .biblia-card, .chapter-card {
    padding: 10px;
  }

  .text-h6 {
    font-size: 20px;
  }

  .search-container {
    flex-direction: column;
    align-items: stretch;
  }

  .search-input, .search-btn {
    margin: 5px 0;
  }
}

.scroll-top-btn {
  margin-top: auto;
  margin-left: 350px;
  position: relative;
  z-index: 1000; /* Garante que o botão esteja acima de outros elementos */
}
</style>
