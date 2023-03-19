import React, { Component } from 'react'
import { Online, Offline } from 'react-detect-offline'

// import {Button} from 'antd';

import 'antd/dist/antd'

import ErrorAlert from '../errorAlert/errorAlert'
import MovieSearchService from '../../service/movieSearch-service'
import { ContextProvider } from '../../context/context'
import FilmList from '../filmList'

// import ErrorAlert from '../error-alert';
import Header from '../header'
import Footer from '../footer'

import { debounce } from 'lodash'
import { Tabs } from 'antd'

import './app.css'

export default class App extends Component {
    state = {
        query: '',
        guestSessionId: '',
        filmsData: [],
        ratedMovies: [],
        allGenres: [],
        inRated: false,
        totalResults: 0,
        currentPage: 1,
        loading: true,
        error: false,
    }

    movieService = new MovieSearchService()

    componentDidMount() {
        this.movieService.getPopularMovies().then(this.updateState).catch(this.catchError)
        this.movieService.getAllGenres().then(this.updateGenres).catch(this.catchError)
        this.movieService.getPopularMovies().then(this.updateState).catch(this.catchError)
    }

    componentDidUpdate(prevProps, prevState) {
        const { query, currentPage } = this.state
        if (prevState.query !== query || prevState.currentPage !== currentPage) {
            // this.clearList();
            this.movieService.getSearchedMovies(query, currentPage).then(this.updateState).catch(this.catchError)
        }
    }

    updateState = (res) => {
        this.setState({
            filmsData: res.results,
            totalResults: res.total_results,
            loading: false,
        })
    }

    updateSession = (res) => {
        this.setState({
            guestSessionId: res.guest_session_id,
            loading: false,
        })
    }

    updateGenres = (res) => {
        this.setState({
            allGenres: res.genres,
        })
    }

    catchError = () => {
        this.setState({
            loading: false,
            error: true,
        })
    }

  
   
    delayedQueryInput = debounce((e) => {
        this.setState({
            searchTerm: e.target.value,
        })
    }, 1000)

    updateMovieRating = (movieId, ratingValue) => {
        this.setState(({ filmsData }) => {
            const idx = filmsData.findIndex((el) => el.id === movieId)

            const oldItem = filmsData[idx]
            const newItem = { ...oldItem, rating: ratingValue }

            return {
                movies: [...filmsData.slice(0, idx), newItem, ...filmsData.slice(idx + 1)],
            }
        })
    }

    updateRatedMovies = () => {
        const { guestSessionId } = this.state
        this.movieService
            .getRatedMovies(guestSessionId)
            .then((filmsArray) => {
                this.setState({
                    ratedMovies: filmsArray.results,
                })
            })
            .catch(this.catchError)
    }

    onTabsChange = () => {
        const { inRated } = this.state
        this.updateRatedMovies()
        this.setState({ inRated: !inRated })
    }

    onPaginationChange = (page) => {
        this.setState({
            currentPage: page,
        })
    }

    render() {
      
        const {
            filmsData,
            ratedMovies,
            guestSessionId,
            inRated,
            error,
            totalResults,
            loading,
            currentPage,
            allGenres,
        } = this.state

       

        const content = (
            <>
                {!inRated ? <Header onSearchChange={this.delayedQueryInput} /> : null}
                <FilmList
                    filmsData={filmsData}
                    ratedMovies={ratedMovies}
                    guestSessionId={guestSessionId}
                    inRated={inRated}
                    totalResults={totalResults}
                    loading={loading}
                    error={error}
                    updateMovieRating={this.updateMovieRating}
                />
                <Footer
                    totalResults={totalResults}
                    inRated={inRated}
                    currentPage={currentPage}
                    onPaginationChange={this.onPaginationChange}
                />
            </>
        )

        return (
            <div className="container">
                <ContextProvider value={allGenres}>
                    <Offline>
                        <ErrorAlert description="It seems u are Offline. Check your internet connection" />
                    </Offline>
                    <Online>
                        <Tabs
                            centered
                            defaultActiveKey="1"
                            onChange={this.onTabsChange}
                            items={[
                                {
                                    label: 'Search',
                                    key: '1',
                                    children: content,
                                },
                                {
                                    label: 'Rated',
                                    key: '2',
                                    children: content,
                                },
                            ]}
                        />
                    </Online>
                </ContextProvider>
            </div>
        )
    }
}
