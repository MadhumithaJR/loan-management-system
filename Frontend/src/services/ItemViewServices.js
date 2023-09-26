import axios from "axios";


class ItemViewServices {
    static getAllItems(){
        return axios.get('http://localhost:8090/lms/api/admin/items');
    }

    static createItem(item){
        return axios.post('http://localhost:8090/lms/api/admin/items',item);
    }

    static updateItem(item,itemId){
        return axios.put('http://localhost:8090/lms/api/admin/items'+'/'+itemId,item);
    }

    static getItemById(itemId){
        return axios.get('http://localhost:8090/lms/api/admin/items'+'/'+itemId);
    }

    static deleteItem(itemId){
        return axios.delete('http://localhost:8090/lms/api/admin/items'+'/'+itemId);
    }
    
}

export default ItemViewServices;