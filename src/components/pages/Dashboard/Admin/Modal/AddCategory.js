import { Button, InputLabel, Modal, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import { createCategory, fetchCategories } from '../../../../../Redux/actions';

const AddCategory = ({ id }) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [category, setCategory] = useState({
        name: '',
        description: ''
    })
    const dispatch = useDispatch();

    useEffect(() => {
        // dispatch(getMe())
    }, [dispatch])

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24
    };

    const smallAddBtn = {
        color: 'white',
        backgroundColor: '#45CB85',
        padding: '2px',
        textTransform: 'capitalize',
        boxShadow: '0 3px 3px rgba(56,65,74,0.1)',
        '&:hover': {
            backgroundColor: '#3bad71',
        },
        fontSize: '13px',
        display: { xs: 'initial', lg: 'initial', md: 'none'}
    }
    const smallAddIcon = {
        color: 'white',
        backgroundColor: '#45CB85',
        textTransform: 'capitalize',
        boxShadow: '0 3px 3px rgba(56,65,74,0.1)',
        minWidth: '0px',
        '&:hover': {
            backgroundColor: '#3bad71',
        },
        display: { lg: 'none', xs: 'none', md: 'initial'}
    }

    const handleAddCategory = () => {
        handleOpen();
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(fetchCategories())
        dispatch(createCategory(category))
        dispatch(fetchCategories())
        handleClose()
    }

    return (
        <>
            <Button variant='contained' size='small' sx={smallAddBtn}
                onClick={() => handleAddCategory()} 
            > + Add </Button>
            <Button variant='contained' size='small' sx={smallAddIcon}
                onClick={() => handleAddCategory()} 
            > + </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{
                        fontWeight: 'bold',
                        bgcolor: '#c4b6dc',
                        p: 2
                    }}>
                        Add Category
                    </Typography>

                    <Box sx={{ p: 2 }}>
                        <form onSubmit={handleSubmit}>
                            <InputLabel sx={{ color: 'rgb(51 49 49 / 94%)' }}>
                                Category Name* </InputLabel>
                            <TextField sx={{ width: '100%', mt: 1 }}
                                id="filled-static"
                                size='small'
                                required
                                onChange={(e) => setCategory({ name: e.target.value })}
                            />
                            <InputLabel sx={{ color: 'rgb(51 49 49 / 94%)', mt: 2 }}> Description </InputLabel>
                            <TextField sx={{ width: '100%', mt: 1 }}
                                id="filled-multiline-static"
                                multiline
                                rows={4}
                                onChange={(e) => setCategory({ description: e.target.value })}
                            />
                            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                                <Button type='submit' variant='contained' sx={{ bgcolor: '#885cd3' }}
                                > Add </Button>
                            </Box>
                        </form>
                    </Box>
                </Box>
            </Modal>
        </>

    );
};

export default AddCategory;