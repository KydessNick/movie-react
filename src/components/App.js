import { React, useState, useEffect } from 'react'
import { Spin, Alert, Tabs } from 'antd'
import { debounce } from 'lodash'
import { Offline, Online } from 'react-detect-offline'

import checkGuestSession from '../checkGuestSession'

import CardList from './CardList'
import PaginationMovies from './Pagination'
import SearchInput from './SearchInput'
function App() {
    const [error, setError] = useState(null)
    const [nameMovies, setNameMovies] = useState('')
    const [items, setItems] = useState([])
    const [isSearch, setIsSearch] = useState(false)
    const [page, setPage] = useState(1)
    const [pageQtty, setPageQtty] = useState(0)
    const debounceRequest = debounce(fetchRequest, 1000)
    const keyAPI = '684674613e0eee942828e526ee2bcaff'
    const [guestId, setGuestId] = useState('')
    const [ratedMovies, setRatedMovies] = useState([])
    const [tab, setTab] = useState('1')

    function sendFetchForRate(rate, movieId) {
        fetch(`https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=${keyAPI}&guest_session_id=${guestId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({ value: rate }),
        })
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

    function fetchRequest() {
        fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${keyAPI}&page=${page}&include_adult=false&query=${nameMovies}`,
            {}
        )
            .then((res) => res.json())
            .then(
                (res) => {
                    setItems(res.results), setIsSearch(false), setPageQtty(res.total_pages)
                },
                (error) => {
                    setIsSearch(false)
                    setError(error)
                }
            )
    }

    useEffect(() => {
        checkGuestSession(setGuestId, keyAPI)

        if (nameMovies) {
            setIsSearch(true)
            debounceRequest()
        }
        return debounceRequest.cancel
    }, [nameMovies, page, tab, ratedMovies])

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
            <Online>
                <Tabs
                    defaultActiveKey="1"
                    centered
                    onChange={(key) => {
                        if (key === '2') {
                            getRatedMovies()
                        }
                        setTab(key)
                    }}
                    destroyInactiveTabPane="true"
                    items={[
                        {
                            label: 'Search',
                            key: '1',
                            children: (
                                <div className="search">
                                    <SearchInput nameMovies={nameMovies} setNameMovies={setNameMovies} />
                                    {showError}
                                    {showSearch}
                                    <section className="all-cards">
                                        <CardList array={items} sendFetchForRate={sendFetchForRate} />
                                        {items.length !== 0 && (
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
                                        <CardList array={ratedMovies} sendFetchForRate={sendFetchForRate} />
                                    </section>
                                </div>
                            ),
                        },
                    ]}
                ></Tabs>
            </Online>
            <Offline>
                <Alert message="Error" description="No internet connection" type="error" showIcon />
            </Offline>
        </div>
    )
}
export default App
