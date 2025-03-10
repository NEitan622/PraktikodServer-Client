import axios from './axiosConfig';


// הגדירי את כתובת ה-api כ-default. השתמשי ב-Config Defaults.
axios.defaults.baseURL = 'https://api.example.com';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const apiUrl = "http://localhost:5041"

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
