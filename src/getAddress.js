function getAddress(){
    let item = localStorage.getItem(666);
    let itemObj = JSON.parse(item);
    return itemObj;
}
export default getAddress
