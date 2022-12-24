import { BorderColor, Delete, SearchOutlined } from '@mui/icons-material';
import { Box, Button, Card, Grid, InputAdornment, TextField, Toolbar, Table, TableBody, TableCell, TableHead, TableRow, Typography, Divider } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../../../Redux/actions';

const AllUsers = () => {
    const users = useSelector(state => state.allUsers.users);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])

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
                                <Button variant='contained' sx={{ textTransform: 'capitalize' }}> + Add Product </Button>
                                <TextField
                                    id="standard-search"
                                    type="search"
                                    placeholder='Search Products...'
                                    size='small'
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchOutlined/>
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
                            <Divider/>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
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
                                        users.map(product =>
                                            <TableRow>
                                                <TableCell>
                                                    

                                                </TableCell>
                                                <TableCell>  </TableCell>
                                                <TableCell>  </TableCell>
                                                <TableCell>  </TableCell>
                                                <TableCell>  </TableCell>
                                                <TableCell>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                        <BorderColor fontSize='small' />
                                                        <Delete fontSize='small' />
                                                    </Box>

                                                </TableCell>
                                            </TableRow>)
                                    }


                                </TableBody>
                            </Table>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default AllUsers;