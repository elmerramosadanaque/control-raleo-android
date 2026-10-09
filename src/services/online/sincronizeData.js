import axios from '../../api/axios';

export const sincronizeAskService = async () => {
    const res = await axios.get(`/sincronizar-app/index.php`); // <--- API para obtener los datos
    return res.data;
};

export const sincronizeSendService = async({data}) => {
    const res = await axios.post(`/enviar-app/index.php`, data); // <--- API para enviar los datos offline
    return res.data;
};