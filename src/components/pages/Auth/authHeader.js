
const authheader = () => {
    const token = localStorage.getItem('accessToken');
    // console.log(token);
    if (token) {
        return { 
            'authorization': `Bearer ${token}` 
        }
    }
    else {
        return ;
    }
};

export default authheader;