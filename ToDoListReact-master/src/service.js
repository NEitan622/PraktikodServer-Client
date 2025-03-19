import axios from './axiosConfig';


// הגדירי את כתובת ה-api כ-default. השתמשי ב-Config Defaults.
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
 axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const apiUrl = process.env.REACT_APP_API_URL

export default {
  getTasks: async () => {
    try {
      const result = await axios.get(`${apiUrl}/tasks`)
      console.log(result.data);

      return result.data;
    }
    catch (error) {
      throw error;


    }
  },

  addTask: async (name) => {
    try {
      const response = await axios.post(`${apiUrl}/add`, name, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('addTask', name);

      return response.data;
    }
    catch (error) {
      throw error;
    }
  }

  ,

  setCompleted: async (id) => {
    try {
      const result = await axios.put(`${apiUrl}/update/${id}`)
      return result.data;
    }
    catch (error) {
      throw error;
    }
  },

  deleteTask: async (id) => {
    try {
      const result = await axios.delete(`${apiUrl}/delete/${id}`)
      console.log('deleteTask')
      return result.data;
    }
    catch (error) {
      throw error; 
    }
  }
};
