import { Block, SearchOutlined } from '@mui/icons-material';
import { Box, Button, Card, Grid, InputAdornment, TextField, Toolbar, Table, TableBody, TableCell, TableHead, TableRow, Divider } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useDispatch } from 'react-redux';
import { updateUserById } from '../../../../Redux/actions';

const AllUsers = () => {
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: () =>
            fetch(`https://winkles-server.onrender.com/users`)
                .then(res => res.json())

    })
    if (isLoading) {
        console.log('dddd');
    }
    console.log(data)
    // const users = useSelector(state => state.allUsers.users);
    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(getUsers())
    // }, [dispatch])

    const handleBlock = (id) => {
        refetch();
        dispatch(updateUserById(id, {
            status: 'blocked'
        }))
        refetch();
    }
    const handleActive = (id) => {
        refetch();
        dispatch(updateUserById(id, {
            status: 'active'
        }))
        refetch();
    }
    const addBtn = {
        color: 'white',
        backgroundColor: '#45CB85',
        padding: '5px 10px',
        textTransform: 'capitalize',
        boxShadow: '0 3px 3px rgba(56,65,74,0.1)',
        '&:hover': {
            backgroundColor: '#3bad71',
        }
    }

    return (
        <Box mb={4}>
            <Toolbar sx={{
                boxShadow: '0 3px 3px rgba(56,65,74,0.1)',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                color: '#495057',
                letterSpacing: '-0.5px'
            }}>
                Manage Products
            </Toolbar>
            <Box p={3}>
                <Grid container spacing={2}>
                    <Grid item md={12}>
                        <Card variant="outlined" sx={{ p: 2, boxShadow: '0 3px 3px rgba(56,65,74,0.1)' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 2 }}>
                                <Button variant='contained' sx={addBtn}> + Add User </Button>
                                <TextField
                                    id="standard-search"
                                    type="search"
                                    placeholder='Search Users...'
                                    size='small'
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchOutlined />
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
                                        '.css-1xp6qmi-MuiInputBase-input-MuiOutlinedInput-input': {
                                            fontSize: '14px'
                                        }
                                    }}
                                />
                            </Box>
                            <Divider />
                            <Table aria-label="simple table">
                                <TableHead sx={{ bgcolor: '#f3f6f9' }}>
                                    <TableRow sx={{
                                        '.MuiTableCell-root': {
                                            color: '#878a99',
                                            fontWeight: 'bold',
                                            textTransform: 'uppercase'
                                        }
                                    }} >
                                        <TableCell sx={{ fontWeight: 'bold' }}> # </TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}> User </TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}> Email </TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}> Phone </TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}> Joining Date </TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}> Status </TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}> Action </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        data?.data?.result.map((user, i) =>
                                            <TableRow>
                                                <TableCell> {i + 1} </TableCell>
                                                <TableCell> {user.firstName} {user.lastName} </TableCell>
                                                <TableCell> {user.email} </TableCell>
                                                <TableCell> {user?.phone}  </TableCell>
                                                <TableCell> {user.createdAt} </TableCell>
                                                <TableCell> {user.status} </TableCell>
                                                {
                                                    user?.status === 'active' ?
                                                        <TableCell>
                                                            <Button variant='contained' size='small' endIcon={<Block fontSize='small' />}
                                                                onClick={() => handleBlock(user._id)}>
                                                                Block
                                                            </Button>
                                                        </TableCell>
                                                        :
                                                        <TableCell>
                                                            <Button variant='contained' size='small'
                                                                endIcon={<Block fontSize='small' />}
                                                                onClick={() => handleActive(user._id)}>
                                                                Activate
                                                            </Button>
                                                        </TableCell>
                                                }

                                            </TableRow>)
                                    }
                                </TableBody>
                            </Table>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Box >
    );
};

export default AllUsers;