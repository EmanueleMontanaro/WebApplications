const main = async() => { //Async because we want to use fetch
    const response = await fetch('http://localhost:3001/api/questions'); // Getting all questions, see APIs in qa=-server
    if(response.ok) { //If success
        const data = await response.text(); //Await resolution of the fetch (Promise)
        document.getElementById('results').innerText = data; //Show it in our app
        // To make it work we have to run the server and implement CORS on it
    }
}

main();