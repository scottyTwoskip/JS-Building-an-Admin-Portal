// Your Code Here
//retrieve a list of books 
//display the list of books on the admin
function main(){
let response = await fetch('http://localhost:3001/listBooks', {
    method: "GET",
    headers: {
        'Content-Type' : 'application/json'
    },
    body: JSON.stringify({
        "id" : 3,
        "title": "The Annals of Arathrae",
    })
})
}
let updatedBook = await response.json()
console.log(updatedBook)

