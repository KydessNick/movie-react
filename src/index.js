import App from './components/app/app'
import React from 'react'
import ReactDom from 'react-dom'

ReactDom.render(<App />, document.getElementById('root'))

console.log('abobusFactor')

// const API_KEY = 'bee52013d4ed1a3a78e3f039c819f496';

// const URL = 'https://api.themoviedb.org/3/movie/76341?api_key=bee52013d4ed1a3a78e3f039c819f496'

// fetch(`https://api.themoviedb.org/3/movie/76341?api_key=${API_KEY}>`)
//     .then((res)=> res.json())
//     .then((body)=> console.log(body))

// const testFech = async function(url){
//    const res =  await fetch(url)

//    if(!res.ok){
//     throw new Error(`Could not fetch the ${url} , recieved ${res.status}`)
//    }

//    const body = await res.json()
//    return body
// }

// testFech(URL)
// .then((res)=> res.json())
// .then((body)=> console.log(body))
// .catch((err)=> console.log(err))

// import AppHeader from './components/app-header/app-header';
// import AppSearch from './components/app-search/app-search';
// import TodoList from './components/todo-list/todo-list';
// import ItemStatusFilter from './components/item-status/item-status-filter';
// import App from './components/app/'
