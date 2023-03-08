import { React, useState, useEffect } from 'react'
import { Spin, Alert, Tabs } from 'antd'
import { debounce } from 'lodash'
import checkGuestSessionLS from '../assets/checkGuestSessionLS'
import saveGuestSessionLS from '../assets/saveGuestSessionLS'
import CardList from './CardList'
import PaginationMovies from './PaginationMovies'
import SearchInput from './SearchInput'
import {
    getRatedMoviesAPI,
    sendRateAPI,
    getGenresIdAPI,
    searchMoviesAPI,
    createGuestSessionAPI,
} from '../movieAPIservices/servicesFunctions'

function App() {
    const [isOnline, setIsOnline] = useState(true)
    const [error, setError] = useState(null)
    const [nameMovies, setNameMovies] = useState('')
    const [movie, setMovie] = useState([])
    const [isSearch, setIsSearch] = useState(false)
    const [page, setPage] = useState(1)
    const [pageQtty, setPageQtty] = useState(0)
    const debounceSearchMovies = debounce(searchMovies, 1000)
    const [ratedMovies, setRatedMovies] = useState([])
    const [genres, setGenres] = useState([])
    const [guestId, setGuestId] = useState('')

    function sendRate(rate, movieId) {
        let obj = { rating: rate }
        sendRateAPI(rate, movieId, guestId).then(
            () => {
                setMovie([
                    ...movie.map((item) => {
                        if (item.id === movieId) {
                            return Object.assign(item, obj)
                        }
                        return item
                    }),
                ])
                getRatedMovies()
            },
            (error) => {
                setIsSearch(false)
                setError(error)
            }
        )
    }
    function getRatedMovies() {
        getRatedMoviesAPI(guestId).then(
            (res) => {
                setIsSearch(false)
                setRatedMovies(res.results)
            },
            (error) => {
                setIsSearch(false)
                setError(error)
            }
        )
    }
    function getGenresId() {
        getGenresIdAPI().then((res) => setGenres(res.genres))
    }
    function searchMovies() {
        searchMoviesAPI(page, nameMovies, guestId).then(
            (res) => {
                setPageQtty(res.total_pages), setMovie(res.results), setIsSearch(false), setError(null)
            },
            (error) => {
                setIsSearch(false)
                setError(error)
            }
        )
    }
    async function checkGuestSession() {
        let id = await checkGuestSessionLS()
        if (id === 'notID') {
            id = await createGuestSessionAPI()
            saveGuestSessionLS(id)
        }
        setGuestId(id)
    }
    useEffect(() => {
        if (navigator.onLine) {
            setIsOnline(true)
            checkGuestSession()
            if (genres.length === 0) {
                getGenresId()
            } else if (nameMovies && nameMovies.length !== 0 && genres.length !== 0 && guestId !== undefined) {
                setIsSearch(true)
                debounceSearchMovies()
            }
        } else {
            setIsOnline(false)
        }
        return debounceSearchMovies.cancel
    }, [nameMovies, page])

    const showError = error ? (
        <Alert message="Error" description="Server error. Try later" type="error" showIcon />
    ) : null

    const showSearch = isSearch ? (
        <div className="spin">
            {' '}
            <Spin />
        </div>
    ) : null
    return (
        <div className="wrapper">
            <Tabs
                destroyInactiveTabPane="true"
                defaultActiveKey="tabSearchMovies"
                centered
                onChange={(key) => {
                    if (key === 'tabRatedMovies') {
                        getRatedMovies()
                    }
                }}
                items={[
                    {
                        label: 'Search',
                        key: 'tabSearchMovies',
                        children: (
                            <div className="search">
                                <SearchInput nameMovies={nameMovies} setNameMovies={setNameMovies} />
                                {showError}
                                {showSearch}
                                {!isOnline && (
                                    <Alert message="Error" description="No internet connection" type="error" showIcon />
                                )}
                                <section className="all-cards">
                                    <CardList
                                        array={movie}
                                        sendRate={sendRate}
                                        genres={genres}
                                        ratedMovies={ratedMovies}
                                    />
                                    {movie.length !== 0 && pageQtty !== 0 && (
                                        <PaginationMovies page={page} setPage={setPage} pageQtty={pageQtty} />
                                    )}
                                </section>
                            </div>
                        ),
                    },
                    {
                        label: 'Rated',
                        key: 'tabRatedMovies',
                        children: (
                            <div className="rated">
                                {showError}
                                {showSearch}
                                <section className="all-cards">
                                    <CardList
                                        array={ratedMovies}
                                        sendRate={sendRate}
                                        genres={genres}
                                        ratedMovies={ratedMovies}
                                    />
                                </section>
                            </div>
                        ),
                    },
                ]}
            ></Tabs>
        </div>
    )
}
export default App
