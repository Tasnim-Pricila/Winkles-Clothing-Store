import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../../../Redux/actions';

const AllUsers = () => {
    const users = useSelector( state => state.allUsers.users );
    // const [user] = useUsers();
    const dispatch = useDispatch();
    // console.log(user?.email);
    console.log(users);

    useEffect( () => {
        dispatch(getUsers())
    }, [dispatch])
    
    return (
        <div>
            
        </div>
    );
};

export default AllUsers;