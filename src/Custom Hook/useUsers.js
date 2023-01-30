// import { useEffect, useState } from 'react';
// import Api from '../Axios/Api';

// const useUsers = () => {
//     const [user, setUser] = useState([]);

//     useEffect(() => {
//         const getUser = async () => {
//             const data = await Api.get('/users/me', {
//                 headers: {
//                     authorization: `Bearer ${localStorage.getItem('accessToken')}`
//                 }
//             });
//             if (data.data.status === 'success') {
//                 setUser(data?.data?.data)
//             }
//         }
//         getUser();
        
//     }, [])
//     // console.log(user);
//     return [user, setUser];
// };

// export default useUsers;