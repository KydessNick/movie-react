import { React, useState, useEffect } from 'react'
import { Spin, Alert, Tabs } from 'antd'
import { debounce } from 'lodash'
import checkGuestSession from '../checkGuestSession'
import CardList from './CardList'
import PaginationMovies from './Pagination'
import SearchInput from './SearchInput'

function App() {
    const [isOnline, setIsOnline] = useState(true)
    const [error, setError] = useState(null)
    const [nameMovies, setNameMovies] = useState('')
    const [movie, setMovie] = useState([])
    const [isSearch, setIsSearch] = useState(false)
    const [page, setPage] = useState(1)
    const [pageQtty, setPageQtty] = useState(0)
    const debounceRequest = debounce(fetchRequest, 1000)
    const keyAPI = '684674613e0eee942828e526ee2bcaff'
    const [guestId, setGuestId] = useState('')
    const [ratedMovies, setRatedMovies] = useState([])
    const [genres, setGenres] = useState([])
    function checkInternet() {
        fetch('https://www.google.com/', {
            mode: 'no-cors',
        })
            .then(() => setIsOnline(true))
            .catch(() => setIsOnline(false))
    }
    function sendRateUpdateItems(rate, movieId) {
        fetch(`https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=${keyAPI}&guest_session_id=${guestId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({ value: rate }),
        }).then(
            () => {
                let obj = { rating: rate }
                setMovie([
                    ...movie.map((item) => {
                        if (item.id === movieId) {
                            return Object.assign(item, obj)
                        }
                        return item
                    }),
                ])
            },
            (error) => {
                setError(error)
            }
        )
    }

    function getRatedMovies() {
        fetch(`https://api.themoviedb.org/3/guest_session/${guestId}/rated/movies?api_key=${keyAPI}`)
            .then((res) => res.json())
            .then(
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
        fetch(`
        https://api.themoviedb.org/3/genre/movie/list?api_key=${keyAPI}&language=en-US`)
            .then((res) => res.json())
            .then(
                (res) => {
                    setGenres(res.genres)
                },
                (error) => {
                    setIsSearch(false)
                    setError(error)
                }
            )
    }
    function fetchRequest() {
        fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${keyAPI}&page=${page}&include_adult=false&query=${nameMovies}&guest_session_id=${guestId}`,
            {}
        )
            .then((res) => res.json())
            .then(
                (res) => {
                    setMovie(res.results), setIsSearch(false), setPageQtty(res.total_pages), setError(null)
                },
                (error) => {
                    setIsSearch(false)
                    setError(error)
                }
            )
    }

    useEffect(() => {
        checkInternet()
        checkGuestSession(setGuestId, keyAPI)
        if (genres.length === 0) {
            getGenresId()
        } else if (nameMovies && nameMovies.length !== 0 && genres.length !== 0) {
            setIsSearch(true)
            debounceRequest()
        }
        return debounceRequest.cancel
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
                defaultActiveKey="1"
                centered
                onChange={(key) => {
                    if (key === '2') {
                        getRatedMovies()
                    }
                }}
                items={[
                    {
                        label: 'Search',
                        key: '1',
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
                                        sendRateUpdateItems={sendRateUpdateItems}
                                        genres={genres}
                                        ratedMovies={ratedMovies}
                                    />
                                    {movie.length !== 0 && (
                                        <PaginationMovies page={page} setPage={setPage} pageQtty={pageQtty} />
                                    )}
                                </section>
                            </div>
                        ),
                    },
                    {
                        label: 'Rated',
                        key: '2',
                        children: (
                            <div className="rated">
                                {showError}
                                {showSearch}
                                <section className="all-cards">
                                    <CardList
                                        array={ratedMovies}
                                        sendRateUpdateItems={sendRateUpdateItems}
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
