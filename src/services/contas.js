import {http} from "./config";
export default {
    listar:() =>{
        return http.get('http://localhost:8000/api/contas');
    },
    salvar:(conta)=>{
        return http.post('http://localhost:8000/api/contas',conta);
    },
     buscar: async (CC) =>{          
        return await http.get('http://localhost:8000/api/contas_cc/CC/'+CC);
        
    },  
    saldo:() =>{          
        return http.get('http://localhost:8000/api/contas/1');
    },  
    atualizar: async (conta) =>{          
        return await http.put('http://localhost:8000/api/contas/1',conta);        
    },      

}