import { cutDescription } from '../../helpers'
import MovieSearchService from '../../service/movieSearch-service'
import { ContextConsumer } from '../../context/context'
import { format } from 'date-fns'
import { Tag, Typography, Rate } from 'antd'
import React, { Component } from 'react'

import './filmListItem.css'

// 1 more imports is Loader

const { Paragraph } = Typography

export default class FilmListItem extends Component {
    movieSearchService = new MovieSearchService()

    onRateChange(value) {
        const { guestSessionId, updateMovieRating, filmData } = this.props
        const { id } = filmData
        updateMovieRating(id, value)
        this.movieService.rateMovie(value, id, guestSessionId)
    }

    static setRateColor(value) {
        if (value >= 0 && value <= 3) {
            return '#E90000'
        }
        if (value > 3 && value <= 5) {
            return '#E97E00'
        }
        if (value > 5 && value <= 7) {
            return '#E9D100'
        }
        return '#66E900'
    }

    render() {
        // const {poster, title, loading} = this.props.itemProps
        // const {poster, title, loading, filmData} = this.props
        const { loading, filmData } = this.props

        const {
            poster_path: poster,
            title,
            release_date: releaseDate,
            overview,
            vote_average: voteAverage,
            rating,
            genre_ids: movieGenres,
        } = filmData

        const rateColor = FilmListItem.setRateColor(voteAverage)

        const movieDescription = cutDescription(overview)
        const movieReleaseDate = releaseDate ? format(new Date(Date.parse(releaseDate)), 'MMMM d, y') : null


        console.log('filmData')

        return (
          
            <li className="movie-list__item">
                <img className="movie-list__image" src={`https://image.tmdb.org/t/p/original${poster}`} alt="" />
                <div className="movie-list__description">
                    <div className="movie-list__header">
                        <Typography.Title
                            level={5}
                            style={{
                                maxWidth: 200,
                                margin: 0,
                                marginBottom: 7,
                            }}
                        >
                            {title}
                        </Typography.Title>
                        <div className="movie-list__rating" style={{ border: `solid 2px ${rateColor}` }}>
                            {voteAverage}
                        </div>
                    </div>
                    <Paragraph type="secondary" className="movie-list__date">
                        {movieReleaseDate}
                    </Paragraph>
                    <ContextConsumer>
                        {(allGenres) => (
                            <div className="movies-ist__tags">
                                {movieGenres.map((genre) => (
                                    <Tag key={genre} className="movie-list__tag">
                                        {allGenres.find((obj) => obj.id === genre).name}
                                    </Tag>
                                ))}
                            </div>
                        )}
                    </ContextConsumer>
                    <Paragraph>{movieDescription}</Paragraph>
                    <Rate
                        value={rating}
                        onChange={(value) => this.onRateChange(value)}
                        count={10}
                        style={{
                            fontSize: 16,
                            width: 240,
                            position: 'absolute',
                            bottom: 10,
                        }}
                    />
                </div>
            </li>
        )
    }
}
