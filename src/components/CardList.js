import React from 'react'
import { format } from 'date-fns'
import { enGB } from 'date-fns/locale'
import { Rate } from 'antd'
import Genre from './Genre'
import { noPosterImage } from '../poster'
function CardList({ array, sendRateUpdateItems, genres }) {
    function makeLessString(stringAnn, stringTitle) {
        let maxLetters
        if (stringTitle.length < 15) {
            maxLetters = 130
        } else if (stringTitle.length >= 15 && stringTitle.length < 35) {
            maxLetters = 90
        } else if (stringTitle.length >= 35) {
            maxLetters = 20
        }
        if (stringAnn.length > maxLetters) {
            let regexp = /[\s.,(?!)]/g
            regexp.lastIndex = maxLetters
            regexp.exec(stringAnn)
            return stringAnn.slice(0, regexp.lastIndex) + '...'
        }
        return stringAnn
    }
    return (
        array.length !== 0 &&
        array.map((item) => (
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
                    <Rate
                        count="10"
                        allowHalf="true"
                        onChange={(value) => {
                            sendRateUpdateItems(value, item.id)
                        }}
                        value={item.rating}
                    ></Rate>
                </div>
            </article>
        ))
    )
}
export default CardList
