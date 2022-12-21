import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMe } from '../../../Redux/actions';
const MyProfile = () => {

    const user = useSelector( state => state.allUsers.user );
    // const [user] = useUsers();
    const dispatch = useDispatch();
    // console.log(user?.email);
    console.log(user);

    useEffect( () => {
        dispatch(getMe())
    }, [dispatch])

    return (
        <div>
            
        </div>
    );
};

export default MyProfile;