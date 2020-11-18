import {http} from "./config";
export default {
    listar:() =>{
        return http.get('http://localhost:8000/api/saques');
    },
    salvar:(saques)=>{
        return http.post('http://localhost:8000/api/saques',saques);
    }   
}