<template>
  <div class="container">
    <form @submit.prevent="sacar">
      <label>Digite o numero da agência</label>
      <input type="text" placeholder="AG" />
      <label>Digite o numero da conta corrente</label>
      <input
        type="number"
        placeholder="Digite: 5536789451"
        v-model="conta.CC"
      />
      <label>Valor</label>
      <input type="text" placeholder="Valor" v-model="saque.valor_saque" />
      <button class="waves-effect waves-light btn-small ">
        Sacar<i class="material-icons left">get_app</i>
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
        <tr v-for="saque of saques" :key="saque.id">
          <td>{{ saque.id }}</td>
          <td>R${{ saque.valor_saque }}</td>
          <td>{{ formatar_data(saque.created_at) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import Saque from "../services/saques";
import Conta from "../services/contas";
export default {
  data() {
    return {
      conta: {
        AG: "",
        CC: "",
      },
      saque: {
        conta_corrente_id: "",
        valor_saque: "",
      },
      saques: [],
      contas: [],
    };
  },
  mounted() {
    this.listar_saques();
  },
  methods: {
    listar_saques() {
      Saque.listar().then((resposta) => {
        this.saques = resposta.data;
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
    async sacar() {
      await this.localizar_conta();
      if (Object.prototype.hasOwnProperty.call(this.contas, "id")) {
        this.saque.conta_corrente_id = this.contas.id;
        if (
          parseFloat(this.contas.saldo) >= parseFloat(this.saque.valor_saque)
        ) {
          this.contas.saldo =
            parseFloat(this.contas.saldo) - parseFloat(this.saque.valor_saque);
          await this.atualizar_conta(this.contas);

          Saque.salvar(this.saque).then((resposta) => {
            this.saque = {};
            alert("Retire as notas \n Saldo: R$"+this.contas.saldo);            
            console.log(resposta.data);
            document.location.reload(true);
            this.listar_saques();
          });
        } else {
          alert("Saldo indisponivel");
        }
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