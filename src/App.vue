<template>
  <div id="app">
    <div class="row">
      <div class="col s12 ">
        <div class="card-panel teal">
          <span class="white-text">BANKLINE CAP
          </span>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col s6">
        <div class="container">
          <form @submit.prevent="depositar">
            <label>Digite o numero da agência</label>
            <input type="text" placeholder="AG" />
            <label>Digite o numero da conta corrente</label>
            <input type="number" placeholder="CC" v-model="conta.CC" />
            <label>Valor</label>
            <input
              type="text"
              placeholder="Valor"
              v-model="deposito.valor_deposito"
            />
            <button class="waves-effect waves-light btn">
              Depositar<i class="material-icons left">attach_money</i>
            </button>
          </form>
          <table>
            <thead>
              <tr>
                <th>COD</th>
                <th>valor</th>
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
      </div>
      <div class="col s6">
        <div class="container">
          <form @submit.prevent="sacar">
            <label>Digite o numero da agência</label>
            <input type="text" placeholder="AG" />
            <label>Digite o numero da conta corrente</label>
            <input type="number" placeholder="CC" v-model="conta.CC" />
            <label>Valor</label>
            <input
              type="text"
              placeholder="Valor"
              v-model="saque.valor_saque"
            />
            <button class="waves-effect waves-light btn">
              Sacar<i class="material-icons left">get_app</i>
            </button>
          </form>
          <table>
            <thead>
              <tr>
                <th>COD</th>
                <th>valor</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="saque of saques" :key="saque.id">
                <td>{{ saque.id }}</td>
                <td>R${{ saque.valor_saque }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>      
    </div>            
  </div>  
</template>

 

<script>
import Deposito from "./services/depositos";
import Saque from "./services/saques";
import Conta from "./services/contas";
export default {
  data() {
    return {
      conta:{
        AG:'',
        CC:'',
      },
      deposito: {
        conta_corrente_id: "",
        valor_deposito: "",
      },
      saque: {
        conta_corrente_id: "",
        valor_saque: "",
      },      
      depositos: [],
      saques: [],
      contas: [],
    };
  },
  mounted() {
    this.listar_depositos();
    this.listar_saques();
  },
  methods: {
    listar_depositos() {
      Deposito.listar().then((resposta) => {  
        this.depositos = resposta.data;
      });
    },
    listar_saques() {
      Saque.listar().then((resposta) => {  
        this.saques = resposta.data;
      });
    },    
     localizar_conta(){      
       Conta.buscar(this.conta.CC).then((resposta) => {        
         //console.log("localizar_conta",resposta.data[0].id);
         this.contas = resposta.data[0];
      });      

    },
    depositar() {
      this.localizar_conta();
      if(this.contas.id>0){
        this.deposito.conta_corrente_id = this.contas.id;
        Deposito.salvar(this.deposito).then((resposta) => {        
          this.deposito = {};
          alert("Salvo com sucesso");
          console.log(resposta.data);
          this.listar_depositos();
        });
      }else{
        alert("Conta não localizada");
      }
    },
    sacar() {
      this.localizar_conta();
      if(this.contas.id>0){
        this.saque.conta_corrente_id = this.contas.id;
        Saque.salvar(this.saque).then((resposta) => {        
          this.saque = {};
          alert("Salvo com sucesso");
          console.log(resposta.data);
          this.listar_saques();
        });
      }else{
        alert("Conta não localizada");
      }
    },    
    formatar_data(d) {
        var nomeMeses = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ']
        var data = new Date(d);
        var dia = data.getDate();
        var mes = data.getMonth();
        mes = nomeMeses[mes];
        var ano = data.getFullYear();
        return [dia, mes, ano].join(' ');
    },   
    
  },
};
</script>

<style>
</style>
