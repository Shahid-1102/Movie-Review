package com.citadel.movies.service;

import com.citadel.movies.model.Movie;
import com.citadel.movies.repo.MovieRepo;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MovieService {

    @Autowired
    private MovieRepo movieRepo;

    public List<Movie> getAllMovies() {
        return movieRepo.findAll();
    }

    public Optional<Movie> getMovieById(ObjectId id) {
        return movieRepo.findById(id);
    }

    public Optional<Movie> getMovieByImdbId(String id) {
        return movieRepo.findMovieByImdbId(id);
    }
}
