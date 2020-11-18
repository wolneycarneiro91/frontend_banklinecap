<template>
  <span>
    <span class="left name_user">AG: {{ conta.AG }}, </span>
    <span class="left name_user"> CC: {{ conta.CC }}</span>
    <span class="right name_user">Saldo: R$ {{ conta.saldo }}</span>
  </span>
</template>
<script>
import Conta from "../services/contas";
export default {
  data() {
    return {
      conta: {
        AG: "",
        CC: "",
        saldo: "",
      },
      contas: [],
    };
  },
  mounted() {
    this.buscar_saldo();
  },
  methods: {
    buscar_saldo() {
      Conta.saldo().then((resposta) => {
        console.log("Cliente = ", resposta.data.saldo);
        this.conta.AG = resposta.data.AG;
        this.conta.CC = resposta.data.CC;
        this.conta.saldo = resposta.data.saldo;
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