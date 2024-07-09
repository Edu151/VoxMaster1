import axios from 'axios';

const API_KEY = 'sua_chave_de_api_aqui';
const API_BASE_URL = 'https://www.abibliadigital.com.br/api';

export const getBooks = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/books`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar livros: ', error);
    throw error;
  }
};

export const getChapter = async (abbrev, chapter) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/verses/${abbrev}/${chapter}`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar capítulo ${chapter}: `, error);
    throw error;
  }
};
