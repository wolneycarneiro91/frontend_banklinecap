<template>
  <div class="container">
    <form @submit.prevent="depositar">
      <label>Digite o numero da agência</label>
      <input type="text" placeholder="AG" />
      <label>Digite o numero da conta corrente</label>
      <input
        type="number"
        placeholder="Digite: 5536789451"
        v-model="conta.CC"
      />
      <label>Valor</label>
      <input
        type="text"
        placeholder="Valor"
        v-model="deposito.valor_deposito"
      />
      <button class="waves-effect #waves-light btn-small ">
        Depositar<i class="material-icons left">attach_money</i>
      </button>
    </form>
    <table>
      <thead>
        <tr>
          <th>COD</th>
          <th>Valor</th>
          <th>Data</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="deposito of depositos" :key="deposito.id">
          <td>{{ deposito.id }}</td>
          <td>R${{ deposito.valor_deposito }}</td>
          <td>{{ formatar_data(deposito.created_at) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import Deposito from "../services/depositos";
import Conta from "../services/contas";
export default {
  data() {
    return {
      conta: {
        AG: "",
        CC: "",
      },
      deposito: {
        conta_corrente_id: "",
        valor_deposito: "",
      },
      depositos: [],
      contas: [],
    };
  },
  mounted() {
    this.listar_depositos();
  },
  methods: {
    listar_depositos() {
      Deposito.listar().then((resposta) => {
        this.depositos = resposta.data;
      });
    },
    async localizar_conta() {
      await Conta.buscar(this.conta.CC).then((resposta) => {
        this.contas = resposta.data[0] || resposta.data;
      });
    },
    async atualizar_conta(conta) {
      await Conta.atualizar(conta).then((resposta) => {
        console.log(resposta);
      });
    },
    async depositar() {
      await this.localizar_conta();
      console.log(this.contas);
      if (Object.prototype.hasOwnProperty.call(this.contas, "id")) {
        this.contas.saldo =
          parseFloat(this.contas.saldo) +
          parseFloat(this.deposito.valor_deposito);       
        await this.atualizar_conta(this.contas);
        this.deposito.conta_corrente_id = this.contas.id;
        Deposito.salvar(this.deposito).then((resposta) => {
          this.deposito = {};
          alert("Salvo com sucesso \n Saldo atual: R$"+this.contas.saldo);          
          console.log(resposta.data);
          document.location.reload(true);
          this.listar_depositos();
        });
      } else {
        alert("Conta não localizada");
      }
    },
    formatar_data(d) {
      var nomeMeses = [
        "JAN",
        "FEV",
        "MAR",
        "ABR",
        "MAI",
        "JUN",
        "JUL",
        "AGO",
        "SET",
        "OUT",
        "NOV",
        "DEZ",
      ];
      var data = new Date(d);
      var dia = data.getDate();
      var mes = data.getMonth();
      mes = nomeMeses[mes];
      var ano = data.getFullYear();
      return [dia, mes, ano].join(" ");
    },
  },
};
</script>


