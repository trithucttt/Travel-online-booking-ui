import axios from 'axios';

const baseUrl = 'http://localhost:8086/api';

const apiService = {
    request: async (method, endpoint, data = null, headers = {}, params = {}) => {
        const config = {
            method,
            url: `${baseUrl}/${endpoint}`,
            headers,
            data,
            params,
        };

        try {
            const response = await axios(config);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default apiService;

/** ví dụ sử dụng */

// import React from 'react';
// import apiService from './apiService';

// function ExampleComponent() {
//   const fetchData = async () => {
//     try {

//" get " -> phương thức cần gọi
// 'data' -> endpoint cần gọi từ server

//       const data = await apiService.request('get', 'data');
//       console.log(data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <button onClick={fetchData}>Fetch Data</button>
//     </div>
//   );
// }

// export default ExampleComponent;
