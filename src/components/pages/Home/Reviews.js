import { Avatar, Card, Rating, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviewbyProductId } from '../../../Redux/actions';
import RatingModal from './RatingModal';

const Reviews = ({ id, user }) => {
    const dispatch = useDispatch();
    const reviews = useSelector(state => state.reviews.review);

    useEffect(() => {
        dispatch(fetchReviewbyProductId(id))
    }, [dispatch, id])
    
    // console.log(reviews)

    return (
        <Card variant="outlined" sx={{ p: 4, boxShadow: '0 3px 3px rgba(56,65,74,0.1)', mx: 16 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant='h6' fontWeight='bold'> Share your thoughts with other customers </Typography>
                <Box>
                    <RatingModal id={id}> </RatingModal>
                </Box>
            </Box>
            <Box mt={4}>
                {
                    reviews?.length > 0 ?
                        reviews?.map((review, i) =>
                            <Box mb={3}>
                                <Box sx={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                                    <Avatar src={user?.imageUrl ? user?.imageurl : ''} />
                                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                        <Typography fontWeight='bold' sx={{ fontSize: '15px' }}>
                                            {review.postedBy}
                                        </Typography>
                                        <Typography sx={{ display: 'flex', fontSize: '14px', alignItems: 'center', gap: '10px' }}>
                                            <Rating name="read-only" size="small" value={review.rating} precision={0.5} readOnly />
                                            {review.summary}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Typography mt={1} sx={{ fontSize: '15px' }}> {review?.review} </Typography>
                            </Box>
                        )
                        :
                        <Typography sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                            No Reviews
                        </Typography>
                }
            </Box>
        </Card>
    );
};

export default Reviews;