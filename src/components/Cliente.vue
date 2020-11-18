<template>
  <span class="right name_user">Olá {{ cliente.nome }}</span>
</template>
<script>
import Cliente from "../services/clientes";
export default {
  data() {
    return {
      cliente: {
        nome: "",
      },
      clientes: [],
    };
  },
  mounted() {
    this.buscar_clientes();
  },
  methods: {
    buscar_clientes() {
      Cliente.buscar().then((resposta) => {
        console.log("Cliente = ", resposta.data.nome);
        this.cliente.nome = resposta.data.nome;
      });
    },
  },
};
</script>
<style  scoped>
.name_user {
  font-size: 10px;
}
</style>