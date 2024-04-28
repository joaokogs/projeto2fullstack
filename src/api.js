const API_URL = 'https://temtem-api.mael.tech/api/temtems/';

export const fetchTemtemById = async (id) => {
    try {
        const response = await fetch(API_URL + id);
        if (!response.ok) {
            throw new Error('Erro ao buscar Temtem: ' + response.statusText);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao buscar Temtem:', error);
        throw error;
    }
};
