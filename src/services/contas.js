import {http} from "./config";
export default {
    listar:() =>{
        return http.get('http://localhost:8000/api/contas');
    },
    salvar:(conta)=>{
        return http.post('http://localhost:8000/api/contas',conta);
    },
    buscar:(CC) =>{          
        return http.get('http://localhost:8000/api/contas_cc/CC/'+CC);
        
    },    

}