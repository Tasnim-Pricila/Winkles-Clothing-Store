import React, { useEffect, useState } from 'react';
import Api from '../Axios/Api';

const useUsers = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        const getUsers = async () => {
            await Api.get('/users')
                .then(res => {
                    setUsers(res.data);
                })
                .catch(err => {
                    console.log(err.message)
                })
        }
        getUsers();
    }, [])

    return [users, setUsers];
};

export default useUsers;