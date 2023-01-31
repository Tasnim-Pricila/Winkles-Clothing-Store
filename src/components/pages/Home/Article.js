import { Grid, Link, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchBlogs } from '../../../Redux/actions';
import Loading from '../Loading/Loading';

const Article = () => {
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
        <Box>
            <Typography variant='h4' sx={{ textAlign: 'center', pt: 10, textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold', fontSize: '26px' }}>
                Latest From Blog
            </Typography>

            <Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 4 }} sx={{
                mt: 4,
                px: 16,
                mb: 10
            }}>
                {
                    blogs?.length > 0 ?
                    blogs.slice(-3).reverse()?.map(blog =>
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
                                color: '#A4A4A4', textDecorationColor: '#A4A4A4',
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
        </Box>
    );
};

export default Article;