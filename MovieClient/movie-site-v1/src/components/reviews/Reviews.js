import { useEffect, useRef } from "react";
import api from '../../api/axiosConfig';
import { useParams } from "react-router-dom";
import { Container,Row,Col } from "react-bootstrap";
import ReviewForm from "../reviewForm/ReviewForm";

import React from 'react'

const Reviews = ({getMovieData,movie,reviews,setReviews}) => {

    const revText = useRef();
    let params = useParams();
    const movieId = params.movieId;

    useEffect(() => {
        getMovieData(movieId);
    },[movieId])

    const currentReviews = reviews[movie?.imdbId] || [];

    const addReview = async (e) => {
        e.preventDefault();

        const rev = revText.current;

        try
        {
            
            const response = await api.post("/api/v1/reviews", {reviewBody:rev.value,imdbId:movieId});

            //const updatedReviews = [...reviews,{body:rev.value}];

            const updatedReviews = [...currentReviews, { body: rev.value }];

            rev.value = "";

            //setReviews(updatedReviews);

            setReviews(prevReviews => ({
                ...prevReviews,
                [movie.imdbId]: updatedReviews // Update the specific movie's reviews
            }));

        }
        catch(err)
        {
            console.error(err)
        }

    }

  return (
    <Container>
        <Row>
            <Col><h3>Reviews</h3></Col>
        </Row>
        <Row className="mt-2">
            <Col>
                <img src={movie?.poster} alt="" />
            </Col>
            <Col>
                {
                    <>
                        <Row>
                            <Col>
                                <ReviewForm handleSubmit={addReview} revText={revText} labelText="Write a Review..."/>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <hr />
                            </Col>
                        </Row>
                    </>
                }
                {
                    //reviews?.map((review, index) => {
                    currentReviews.map((review, index) => {
                        return(
                            <>
                                <Row key={index}>
                                    <Col>{review.body}</Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <hr />
                                    </Col>
                                </Row>
                            </>
                        )
                    })
                }
            </Col>
        </Row>
        <Row>
            <Col>
                <hr />
            </Col>
        </Row>
    </Container>
  )
}

export default Reviews