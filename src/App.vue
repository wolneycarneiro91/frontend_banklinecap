<template>
  <div id="app">
    <div class="row">
      <div class="col s12">
        <div class="card-panel #01579b light-blue darken-4">
          <span class="white-text">BANKLINE CAP <PageCliente/><br><PageConta/> </span>
          
        </div>
      </div>      
    </div>    
    <div class="row">
      <div class="col s6">
        <PageDeposito />
      </div>
      <div class="col s6">
        <PageSaque />
      </div>
    </div>
  </div>
</template>
 
<script>
import PageCliente from "./components/Cliente.vue";
import PageConta from "./components/Conta.vue";
import PageDeposito from "./components/Deposito.vue";
import PageSaque from "./components/Saque.vue";

export default {
  components: {
    PageDeposito,
    PageSaque,
    PageCliente,
    PageConta,
  },
};
</script>

<style>
</style>
