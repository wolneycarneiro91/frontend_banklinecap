import {http} from "./config";
export default {
    listar:() =>{
        return http.get('http://localhost:8000/api/depositos');
    },
    salvar:(deposito)=>{
        return http.post('http://localhost:8000/api/depositos',deposito);
    }   
}