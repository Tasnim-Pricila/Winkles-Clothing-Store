import { Box, Breadcrumbs, Grid, Link, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Footer from '../../shared/Footer';
import { Link as Routerlink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs } from '../../../Redux/actions';
import Loading from '../Loading/Loading';

const Blogs = () => {
    const dispatch = useDispatch(); 
    const nav = useNavigate(); 
    const blogs = useSelector(state => state.blogs.blogs)
    useEffect(() => {
        dispatch(fetchBlogs())
    }, [dispatch])

    const handleClick = (id) => {
        // nav(`/blog/${id}`)
        nav('/soon')
    }

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 16, py: 5, bgcolor: '#FF8E78' }}>
                <Typography variant='h5' sx={{ textTransform: 'uppercase', fontWeight: 600 }}>
                    Blogs
                </Typography>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link to="/" underline="hover" color="inherit"  component={Routerlink}>
                    Home
                    </Link>
                    <Typography color="text.primary">Blogs</Typography>
                </Breadcrumbs>
            </Box>

            <Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 4 }} sx={{
                mt: 4,
                px: 16,
                mb: 10
            }}>
               {
                    blogs?.length > 0 ?
                    blogs?.map(blog =>
                        <Grid item md={4}
                            sx={{
                                '&:hover img': {
                                    transform: 'scale(1.2)'
                                }
                            }}>
                            <Box sx={{ overflow: 'hidden' }} >
                                <img src={blog?.imageUrl} alt="" width='100%'
                                    style={{
                                        transition: '3s ease-in-out',
                                        cursor: 'pointer'
                                    }} />
                            </Box>
                            <Typography color='#A4A4A4' pt={1} pb={2}>
                                {blog?.createdAt}
                            </Typography>
                            <Typography variant='h5' sx={{ '&:hover': { color: '#FF8E78', transitionDuration: '.5s' }, cursor: 'pointer', pr: 4 }}>
                                {blog?.title}
                            </Typography>
                            <Typography py={2}>
                                {blog?.description}
                            </Typography>
                            <Link onClick={() => handleClick(blog?._id)} sx={{
                                color: '#A4A4A4', textDecorationColor: '#A4A4A4', cursor: 'pointer',
                                '&:hover': { color: '#FF8E78', transitionDuration: '.5s' }
                            }}>
                                Read More
                            </Link>
                        </Grid>
                    )
                    :
                    <Loading/>
                }
            </Grid>
            <Footer></Footer>
        </>

    );
};

export default Blogs;