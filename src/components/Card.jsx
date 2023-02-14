import { React, useState, useEffect } from 'react'
import { noPosterImage } from '../poster.js'
import { format} from 'date-fns'
import { Spin } from 'antd';
import {enGB} from 'date-fns/locale';
function Card (){
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState([])


    function fetchRequest() {
        fetch(
            'https://api.themoviedb.org/3/search/movie?api_key=684674613e0eee942828e526ee2bcaff&page=1&include_adult=false&query=return',
            {}
        )
            .then((res) => res.json())
            .then(
                (result) => {
                    setIsLoaded(true)
                    setItems(result['results'])
                },
                (error) => {
                    setIsLoaded(true)
                    setError(error)
                }
            )
    }
    function makeLessString(stringAnn, stringTitle){
        let maxLetters;
        if(stringTitle.length< 20){
            maxLetters = 200-3;
        }else if(stringTitle.length>=20 && stringTitle.length<40){
            maxLetters = 130-3;
        }
        else if(stringTitle.length>=40){
            maxLetters = 60-3;
        }
        if(stringAnn.length > maxLetters){
            let regexp = /[\s.,(?!)]/g; 
            regexp.lastIndex = maxLetters; 
           regexp.exec(stringAnn);
            return stringAnn.slice(0, regexp.lastIndex) + "..." 
        }
  return stringAnn
        }
    // function fetchRequestImages() {
    //     fetch('https://api.themoviedb.org/3/configuration?api_key=684674613e0eee942828e526ee2bcaff', {})
    //         .then((res) => res.json())
    //         .then(
    //             (result) => {
    //                 let obj = result.images
                    
    //                    setAddress('http://image.tmdb.org/t/p/original/') 
                    
                    
    //             },
    //             (error) => {
    //                 setIsLoaded(true)
    //                 setError(error)
    //             }
    //         )
    // }
    useEffect(() => {
        // Promise.all([fetchRequest(), fetchRequestImages()])
        fetchRequest()
        
    }, [])
    if (error) {
        return <div>Ошибка: {'Сервер недоступен или не включен VPN'}</div>
    } else if (!isLoaded) {
        return (<div className="spin">
        <Spin />
      </div>)
    } else {
        
        return (
            
               <div className='wrapper'>
                    {items.map((item) => (
                        <article
                            key={item.id}
                            
                            className="card"

                        >
                            <div className="card-image">
                                <img
                                    width= "183px"
                                    src={item.poster_path === null?  noPosterImage :
                                        'http://image.tmdb.org/t/p/original/' + item.poster_path}
                                    alt="постер к фильму"
                                ></img>
                            </div>
                            <div className="card-content">
                            <h2 className="card-content__h2">{item.title}</h2>
                            <div className="card-content__date">{item.release_date? format(new Date(item.release_date), 'MMMM dd, yyyy', { locale: enGB }) : null}</div>
                                <div className="card-content__genre">Жанр</div>
                                <div className="card-content__annotation">{makeLessString(item.overview, item.title)
                                }</div>
                            </div>
                        </article>
                    ))}
                
                </div>
        )
    }
}
export default Card