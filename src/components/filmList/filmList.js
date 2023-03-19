import FilmListItem from '../filmListItem/filmListItem'
import Loader from '../loader'
import ErrorAlert from '../errorAlert/errorAlert'
import React, { Component } from 'react'

import './filmList.css'

export default class FilmList extends Component {
    //    elements = this.props.filmsData.map((item)=>{
    //     const {id, ...itemProps} = item;
    //     console.log(item)
    //     return (
    //         <li key={id} className="card-item">
    //             <FilmListItem itemProps={itemProps} loading={this.props.loading}/>
    //         </li>
    //     )
    //    })

    //    elements = this.props.filmsData.map((item)=>{
    //     const {id, ...itemProps} = item;
    //     console.log(item)
    //     return (
    //         <li key={id} className="card-item">
    //             <FilmListItem itemProps={itemProps} loading={this.props.loading}/>
    //         </li>
    //     )
    //    })

    //    elements = this.props.filmsData.length ? this.filmELementsCb(this.props.filmsData) : null

    //    filmELementsCb(arr){
    //     arr.map((item)=>{
    //         const {id, ...itemProps} = item
    //         return(
    //             <li key={id} className="card-item">
    //                 <FilmListItem itemProps={itemProps} loading={this.props.loading}/>
    //             </li>
    //         )
    //     })
    //    }

    //    elements = this.props.filmsData.map((item)=>{
    //     let res =[]
    //     const {id, ...itemProps} = item;
    //     console.log(item)
    //     res.push(
    //         <li key={id} className="card-item">
    //         <FilmListItem itemProps={itemProps} loading={this.props.loading}/>
    //     </li>
    //     )
    //     return (
    //         res
    //     )
    //    })

    // mappingData=() => {
    //     let res
    //     if( this.props.filmsData.length === 20){
    //        res = this.props.filmsData.map((item)=>{
    //                 const {id, ...itemProps} = item;
    //                 return (
    //                     <li key={id} className="card-item">
    //                         <FilmListItem itemProps={itemProps} loading={this.props.loading}/>
    //                     </li>
    //                 )
    //             })
    //     }
    //     console.log(res)
    //     return res
    // }

    // elements = this.props.filmsData.map((film)=>{
    //     const {id} = film;
    //     console.log(id)

    //     return (
    //         <FilmListItem
    //         key={film.id}
    //         filmData={film}
    //      />
    //     // <li key={id} className="card-item">
    //     //     <FilmListItem itemProps={itemProps} loading={this.props.loading}/>
    //     // </li>
    //     )
    // })

    render() {
        console.log(this.elements)
        console.log(this.props.filmsData)

        const {
            filmsData,
            loading,
            error,
            totalResults,
            guestSessionId,
            ratedMovies,
            inRated,
            updateMovieRating,
            allGenres,
        } = this.props

        const hasData = !(loading || error)

        return (
            // <div>
            //     <p>Abobus list</p>
            //     <FilmListItem />
            // </div>
            <ul className="movie-list">
                {error ? <ErrorAlert description="Something went wrong." /> : null}
                {loading ? <Loader /> : null}
                {hasData && !inRated ? (
                    <MoviesListView
                        films={filmsData}
                        guestSessionId={guestSessionId}
                        updateMovieRating={updateMovieRating}
                        allGenres={allGenres}
                    />
                ) : null}
                {inRated ? (
                    <MoviesListView movies={ratedMovies} guestSessionId={guestSessionId} allGenres={allGenres} />
                ) : null}
                {!loading && !totalResults ? <ErrorAlert description="Matching movies were not found." /> : null}
            </ul>
        )
    }
}

function MoviesListView({ films, guestSessionId, updateMovieRating }) {
    return (
        <>
            {films.map((film) => (
                <FilmListItem
                    key={film.id}
                    filmData={film}
                    guestSessionId={guestSessionId}
                    updateMovieRating={updateMovieRating}
                />
            ))}
        </>
    )
}
