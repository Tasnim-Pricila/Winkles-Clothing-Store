import { DeleteForever, Edit } from '@mui/icons-material';
import { Box, Button, Modal, Popover, TableCell, TableRow, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductDeleteSuccess from './Modal/ProductDeleteSuccess';

const ProductTable = ({ product }) => {
    const nav = useNavigate();

    // Modal 
    const [modal, setModal] = React.useState(false);
    const handleOpen = () => setModal(true);
    const close = () => setModal(false);

    // Popover 
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleEditProduct = (id) => {
        nav(`/dashboard/editProduct/${id}`)
    }
    
    // styles 
    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        // border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
   
    const no = {
        bgcolor: '#f06548',
        color: 'white',
        '&:hover': {
            bgcolor: '#f06548',
            color: 'white'
        }
    }


    return (
        <TableRow>
            <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img src={product.image} alt="" width='50px' height='70px' />
                    <Box >
                        <Typography sx={{ textTransform: 'capitalize'}}> {product.title} </Typography>
                        <Typography variant='caption' sx={{ color: '#878a99', textTransform: 'capitalize' }}> Category: {product.category} </Typography>
                    </Box>

                </Box>
            </TableCell>
            <TableCell> {product.quantity} </TableCell>
            <TableCell> {product.price} </TableCell>
            <TableCell sx={{ textTransform: 'capitalize' }}> {product.brand} </TableCell>
            <TableCell>
                <Button aria-describedby={id} onClick={handleClick}
                    sx={{
                        bgcolor: open ? '#2a5fc1' : 'rgba(53, 119, 241, 0.1)',
                        color: open ? 'white' : '#3577f1',
                        p: 1,
                        boxShadow: '0 3px 3px rgba(56,65,74,0.1)',
                        '&:hover': {
                            bgcolor: '#2a5fc1',
                            color: 'white'
                        }
                    }}>
                    ...
                </Button>
                
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    sx={{
                        '.MuiPopover-paper': {
                            boxShadow: '0px 5px 5px -3px rgb(0 0 0 / 9%), 0px 8px 10px 1px rgb(0 0 0 / 3%), 0px 3px 14px 2px rgb(0 0 0 / 0%)'
                        },
                    }}
                >
                    <Typography p={1}>
                        <Button fontSize='small' sx={{ color: '#4b38b3', textTransform: 'capitalize' }} onClick={() => handleEditProduct(product._id)}
                            endIcon={<Edit fontSize='small' />}>
                            Edit
                        </Button>
                        <br />
                        <Button fontSize='small' sx={{ color: '#f06548', textTransform: 'capitalize' }}
                            onClick={handleOpen}
                            endIcon={<DeleteForever fontSize='small' />}>
                            Delete
                        </Button>
                        <Modal
                            open={modal}
                            onClose={close}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={modalStyle}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Are you sure you want to delete this product?
                                </Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, gap: '10px' }}>
                                   
                                    <ProductDeleteSuccess product={product} close={close} />
                                    <Button sx={no} onClick={close}> No </Button>
                                </Box>
                            </Box>
                        </Modal>
                    </Typography>
                </Popover>

            </TableCell>
        </TableRow>
    );
};

export default ProductTable;