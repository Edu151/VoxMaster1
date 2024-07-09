<template>
  <div class="q-pa-md bg-primary">
    <q-card class="q-pa-md">
      <h1 class="q-mb-md text-h6">Pedido de Oração</h1>
      <form @submit.prevent="enviarPedido" class="q-mb-md">
        <q-input
          v-model="pedido"
          outlined
          placeholder="Digite seu pedido de oração"
          dense
          class="q-mb-lg"
        />
        <q-btn
          type="submit"
          color="primary"
          label="Enviar Pedido"
          class="btn-bib"
        />
      </form>
      <div class="q-mt-lg">
        <a :href="whatsappLink" target="_blank" class="btn-whatsapp btn-bib">Enviar via WhatsApp</a>
      </div>
    </q-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pedido: ''
    };
  },
  computed: {
    whatsappLink() {
      // Monta o link do WhatsApp com a mensagem preenchida
      const mensagem = encodeURIComponent(`Pedido de Oração: ${this.pedido}`);
      return `https://wa.me/556492506597?text=${mensagem}`;
    }
  },
  methods: {
    enviarPedido() {
      // Aqui você pode implementar a lógica para enviar o pedido
      // Por exemplo, enviar para um endpoint de API, enviar por email, etc.
      alert(`Pedido enviado: ${this.pedido}`);
      this.pedido = ''; // Limpar o campo após enviar
    }
  }
};
</script>

<style scoped>
.q-card {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.q-input {
  width: 100%;
}

.btn-bib {
  width: 100%;
  border-radius: 200px;
}

.text-h6 {
  font-size: 24px;
  font-weight: bold;
}

.btn-whatsapp {
  display: inline-block;
  padding: 12px 20px;
  background-color: #25D366;
  color: #fff;
  text-decoration: none;
  border-radius: 200px;
  text-align: center;
}
.btn-whatsapp:hover {
  background-color: #128C7E;
}
</style>
