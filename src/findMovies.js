function findMovies(){
    let arrayMovies = [];

    for(let i=0; i<6; i++){
        let item = localStorage.getItem(i);
        // let itemStr = JSON.stringify(item);
        let itemObj = JSON.parse(item)
        arrayMovies.push(itemObj);
    }
    return arrayMovies;
}
export default findMovies;