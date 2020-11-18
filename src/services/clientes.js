import {http} from "./config";
export default {
    buscar:() =>{          
        return http.get('http://localhost:8000/api/clientes/1');
    }, 

}