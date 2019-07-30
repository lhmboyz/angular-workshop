import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MovieService } from '../services/movie.service';

import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
    selector: 'movie',
    templateUrl: './movie.component.html',
    styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit, AfterViewInit {
    movies = [];

    types: string[] = ['Movie', 'Series', 'Episode'];
    filter: any = {};

    @ViewChild('s', { static: false }) s;

    /*
    movies = [
        {
            "Title": "Batman Begins",
            "Year": "2005",
            "imdbID": "tt0372784",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BZmUwNGU2ZmItMmRiNC00MjhlLTg5YWUtODMyNzkxODYzMmZlXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg"
        },
        {
            "Title": "Batman v Superman: Dawn of Justice",
            "Year": "2016",
            "imdbID": "tt2975590",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BYThjYzcyYzItNTVjNy00NDk0LTgwMWQtYjMwNmNlNWJhMzMyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
        },
        {
            "Title": "Batman",
            "Year": "1989",
            "imdbID": "tt0096895",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BMTYwNjAyODIyMF5BMl5BanBnXkFtZTYwNDMwMDk2._V1_SX300.jpg"
        },
        {
            "Title": "Batman Returns",
            "Year": "1992",
            "imdbID": "tt0103776",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BOGZmYzVkMmItM2NiOS00MDI3LWI4ZWQtMTg0YWZkODRkMmViXkEyXkFqcGdeQXVyODY0NzcxNw@@._V1_SX300.jpg"
        },
        {
            "Title": "Batman Forever",
            "Year": "1995",
            "imdbID": "tt0112462",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BNDdjYmFiYWEtYzBhZS00YTZkLWFlODgtY2I5MDE0NzZmMDljXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg"
        },
        {
            "Title": "Batman & Robin",
            "Year": "1997",
            "imdbID": "tt0118688",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BMGQ5YTM1NmMtYmIxYy00N2VmLWJhZTYtN2EwYTY3MWFhOTczXkEyXkFqcGdeQXVyNTA2NTI0MTY@._V1_SX300.jpg"
        },
        {
            "Title": "The Lego Batman Movie",
            "Year": "2017",
            "imdbID": "tt4116284",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BMTcyNTEyOTY0M15BMl5BanBnXkFtZTgwOTAyNzU3MDI@._V1_SX300.jpg"
        },
        {
            "Title": "Batman: Under the Red Hood",
            "Year": "2010",
            "imdbID": "tt1569923",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BYTdlODI0YTYtNjk5ZS00YzZjLTllZjktYmYzNWM4NmI5MmMxXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg"
        }
    ];
    */

    selectedMovie: any = undefined;

    constructor(
        private movieService: MovieService
    ) { }

    ngOnInit() {
        this.filter.s = 'batman';
        this.filter.type = 'movie';
        this.filter.page = 1;
    }

    ngAfterViewInit() {
        this.s.valueChanges
            .pipe(debounceTime(250))
            .pipe(distinctUntilChanged())
            .subscribe((s) => {
                this.filter.page = 1;
                this.getMovies({});
            })
    }

    changeFilter(type,event) {
        switch (type) {
            case 'type':
                this.filter.type = event;
                this.filter.page = 1;
                this.getMovies({});
                break;
        }
    }

    getMovies(params) {
        if (!params.s) { params.s = this.filter.s; }
        if (!params.type) { params.type = this.filter.type; }
        if (!params.page) { params.page = this.filter.page; }
        this.movieService.getMovies(params)
            .subscribe(
                result => {
                    if (this.filter.page == 1) {
                        this.movies = result.Search;
                    }
                    else if (result.Search.length > 0) {
                        for (let i = 0; i < result.Search.length; i++) {
                            this.movies.push(result.Search[i]);
                        }
                    }
                },
                error => {
                    console.log(error);
                }
            )
    }

    onScroll() {
        this.filter.page++;

        this.getMovies({});
    }

    showMovie(movie) {
        this.selectedMovie = movie;
    }

    closeMovie() {
        this.selectedMovie = undefined;
    }
}