import React from 'react'
import { format } from 'date-fns'
import { enGB } from 'date-fns/locale'
import RateStars from './RateStars'
import Genre from './Genre'
import { noPosterImage } from '../poster'
import PropTypes from 'prop-types'
import makeLessString from '../assets/makeLessString'

function CardList({ array, sendRate, genres }) {
    if (array !== undefined)
        return array.map((item) => (
            <article key={item.id} className="card">
                <div className="card-image">
                    <img
                        width="183px"
                        src={
                            item.poster_path === null
                                ? noPosterImage
                                : 'http://image.tmdb.org/t/p/original/' + item.poster_path
                        }
                        alt="постер к фильму"
                    ></img>
                </div>
                <div className="card-content">
                    <div className="movie-title-rate">
                        <h2 className="movie-title-rate__title">{item.title}</h2>
                        <div
                            className={
                                item.vote_average >= 3 && item.vote_average < 5
                                    ? 'movie-title-rate__circle orange'
                                    : item.vote_average >= 5 && item.vote_average <= 7
                                    ? 'movie-title-rate__circle yellow'
                                    : item.vote_average > 7 && item.vote_average <= 10
                                    ? 'movie-title-rate__circle green'
                                    : 'movie-title-rate__circle red'
                            }
                        >
                            {item.vote_average.toFixed(1)}
                        </div>
                    </div>
                    <div className="card-content__date">
                        {item.release_date
                            ? format(new Date(item.release_date), 'MMMM dd, yyyy', {
                                  locale: enGB,
                              })
                            : null}
                    </div>
                    <div className="card-content__genres">
                        <Genre genres={genres} idsArray={item.genre_ids} />
                    </div>
                    <div className="card-content__annotation">{makeLessString(item.overview, item.title)}</div>
                    <RateStars sendRate={sendRate} id={item.id} rating={item.rating} />
                </div>
            </article>
        ))
}
export default CardList
CardList.propTypes = {
    array: PropTypes.array,
    sendRate: PropTypes.func.isRequired,
    genres: PropTypes.array,
    checkRate: PropTypes.func,
}
