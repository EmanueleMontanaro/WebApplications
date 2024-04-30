function Movie(id,title,userid = 1,favorites=false,rating = 0,date = null){
    this.id = id;
    this.title = title;
    this.userid = userid;
    this.favorites = favorites;
    this.date = date;
    if(dayjs(date).isValid()) this.date = dayjs(date).format('YYYY-MM-DD');
    this.rating = rating;

    this.toString = () => {
        console.log(`Id: ${this.id}, Title: ${this.title}, Favorite: ${this.favorites}, Watch date: ${this.date}, Score: ${this.rating}`);
    }
}

function FilmLibrary(){
    this.films = [];

    this.init = () => {
        this.films = [
            new Movie(1,'Pulp Fiction',1,true,5,"2024-03-10"),
            new Movie(2,'21 Grams',1,true,4,"2024-03-17"),
            new Movie(3,'Star Wars',1,false),
            new Movie(4,'Matrix',1,false),
            new Movie(5,'Attack on titan',1,true,4,"2024-03-21")
        ]
    }

    this.getMovies = () => {
        return [...this.films];
    }
    
    this.getFavorites = () => {
        console.log("print favorites");
        return [...this.films].filter(movie => movie.favorites == 1);
    }

    this.getMaxRated = () => {
        return [...this.films].filter(movie => movie.rating == 5);
    }

    this.getLastMonth = () => {
        return [...this.films].filter(movie => dayjs(movie.date).isAfter(dayjs().subtract(30,'d')) && dayjs(movie.date).isValid());
    }

    this.getUnseen = () => {
        return [...this.films].filter(movie => !dayjs(movie.date).isValid());
    }

    this.delete = (id) => {
        console.log(id);
        this.films = [...this.films].filter(film => film.id !== id);
        return [...this.films];
    }
}

function fillTable(movies,library) {
    const movieTable = document.getElementById("movie-table");
    movieTable.innerHTML = "";
    for(const movie of movies) {
        const trMovie = createMovieRow(movie,library);
        movieTable.prepend(trMovie);
    }
}

function createMovieRow(movie,library) {
    const tr = document.createElement('tr');
    tr.setAttribute('id', `movie-${movie.id}`);
    console.log(tr);

    const tdTitle = document.createElement('td');
    tdTitle.innerHTML = `<p class="my-3">${movie.title}</p>`;
    tr.appendChild(tdTitle);

    const tdFavorites = document.createElement('td');
    const divFavorites = document.createElement('div');
    divFavorites.classList.add('form-check','my-3');
    let isChecked
    if(movie.favorites == 1) {
        isChecked = " checked";
    } else {
        isChecked = "";
    }
    divFavorites.innerHTML = `
        <label class="form-check-label" for="flexCheckChecked">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked"${isChecked}>
            Favorite
        </label>
        `;
    tdFavorites.appendChild(divFavorites);
    tr.appendChild(tdFavorites);

    const tdDate = document.createElement('td');
    if(dayjs(movie.date).isValid())
        tdDate.innerHTML = `<p class="my-3">${dayjs(movie.date).format("MMMM DD, YYYY")}</p>`;
    else 
        tdDate.innerHTML = `<p class="my-3"></p>`;
    tr.appendChild(tdDate);

    const tdRating = document.createElement('td');
    const divRating = document.createElement('div');
    divRating.setAttribute('id','full-stars-example');
    divRating.classList.add('my-1');
    const divRatingGroup = document.createElement('div');
    divRatingGroup.classList.add('rating-group');
    divRatingGroup.innerHTML = getRatingHTML(movie.rating,movie.id);
    divRating.appendChild(divRatingGroup);
    tdRating.appendChild(divRating);
    tr.appendChild(tdRating);

    const tdActions = document.createElement('td');
    const buttonDiv = document.createElement('div');
    buttonDiv.classList.add('btn-group','my-2');
    const buttonEdit = document.createElement('button');
    buttonEdit.classList.add('btn', 'btn-outline-secondary');
    buttonEdit.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"></path>
                            </svg>
                            <span class="visually-hidden">Edit</span>`;
    buttonDiv.appendChild(buttonEdit);
    const buttonDelete = document.createElement('button');
    buttonDelete.setAttribute('id',`delete-${movie.id}`);
    buttonDelete.classList.add('btn', 'btn-outline-secondary');
    buttonDelete.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                            </svg>
                            <span class="visually-hidden">Delete</span>`;
    
    buttonDelete.addEventListener('click', event => {
        library.delete(movie.id);
        tr.remove();
        })
    buttonDiv.appendChild(buttonDelete);
    tdActions.appendChild(buttonDiv);
    tr.appendChild(tdActions);

    return tr;
}

function getRatingHTML(rating,id) {
    let result;
    switch(rating){
        case 0:
            result = `
                            <input class=\"rating__input rating__input--none\" name=\"rating${id}\" id=\"rating-none-${id}\" value=\"0\" type=\"radio\" checked>
                            <label aria-label=\"No rating\" class=\"rating__label\" for=\"rating-none-${id}\"><i class=\"rating__icon rating__icon--none fa fa-ban\"></i></label>
                            <label aria-label=\"1 star\" class=\"rating__label\" for=\"rating-1-${id}\"><i class=\"rating__icon rating__icon--star fa fa-star\"></i></label>
                            <input class=\"rating__input\" name=\"rating${id}\" id=\"rating-1-${id}\" value=\"1\" type=\"radio\">
                            <label aria-label=\"2 stars\" class=\"rating__label\" for=\"rating-2-${id}\"><i class=\"rating__icon rating__icon--star fa fa-star\"></i></label>
                            <input class=\"rating__input\" name=\"rating${id}\" id=\"rating-2-${id}\" value=\"2\" type=\"radio\">
                            <label aria-label=\"3 stars\" class=\"rating__label\" for=\"rating-3-${id}\"><i class=\"rating__icon rating__icon--star fa fa-star\"></i></label>
                            <input class=\"rating__input\" name=\"rating${id}\" id=\"rating-3-${id}\" value=\"3\" type=\"radio\">
                            <label aria-label=\"4 stars\" class=\"rating__label\" for=\"rating-4-${id}\"><i class=\"rating__icon rating__icon--star fa fa-star\"></i></label>
                            <input class=\"rating__input\" name=\"rating${id}\" id=\"rating-4-${id}" value=\"4\" type=\"radio\">
                            <label aria-label=\"5 stars\" class=\"rating__label\" for=\"rating-5-${id}\"><i class=\"rating__icon rating__icon--star fa fa-star\"></i></label>
                            <input class=\"rating__input\" name=\"rating${id}\" id=\"rating-5-${id}" value=\"5\" type=\"radio\">
                        `;
            break;
        case 1:
            result = `
                            <input class=\"rating__input rating__input--none\" name=\"rating${id}\" id=\"rating-none-${id}\" value=\"0\" type=\"radio\">
                            <label aria-label=\"No rating\" class=\"rating__label\" for=\"rating-none-${id}\"><i class=\"rating__icon rating__icon--none fa fa-ban\"></i></label>
                            <label aria-label=\"1 star\" class=\"rating__label\" for=\"rating-1-${id}\"><i class=\"rating__icon rating__icon--star fa fa-star\"></i></label>
                            <input class=\"rating__input\" name=\"rating${id}\" id=\"rating-1-${id}\" value=\"1\" type=\"radio\" checked>
                            <label aria-label=\"2 stars\" class=\"rating__label\" for=\"rating-2-${id}\"><i class=\"rating__icon rating__icon--star fa fa-star\"></i></label>
                            <input class=\"rating__input\" name=\"rating${id}\" id=\"rating-2-${id}\" value=\"2\" type=\"radio\">
                            <label aria-label=\"3 stars\" class=\"rating__label\" for=\"rating-3-${id}\"><i class=\"rating__icon rating__icon--star fa fa-star\"></i></label>
                            <input class=\"rating__input\" name=\"rating${id}\" id=\"rating-3-${id}\" value=\"3\" type=\"radio\">
                            <label aria-label=\"4 stars\" class=\"rating__label\" for=\"rating-4-${id}\"><i class=\"rating__icon rating__icon--star fa fa-star\"></i></label>
                            <input class=\"rating__input\" name=\"rating${id}\" id=\"rating-4-${id}" value=\"4\" type=\"radio\">
                            <label aria-label=\"5 stars\" class=\"rating__label\" for=\"rating-5-${id}\"><i class=\"rating__icon rating__icon--star fa fa-star\"></i></label>
                            <input class=\"rating__input\" name=\"rating${id}\" id=\"rating-5-${id}" value=\"5\" type=\"radio\">
                        `;
            break;
        case 2:
            result = `
                            <input class=\"rating__input rating__input--none\" name=\"rating${id}\" id=\"rating-none-${id}\" value=\"0\" type=\"radio\">
                            <label aria-label=\"No rating\" class=\"rating__label\" for=\"rating-none-${id}\"><i class=\"rating__icon rating__icon--none fa fa-ban\"></i></label>
                            <label aria-label=\"1 star\" class=\"rating__label\" for=\"rating-1-${id}\"><i class=\"rating__icon rating__icon--star fa fa-star\"></i></label>
                            <input class=\"rating__input\" name=\"rating${id}\" id=\"rating-1-${id}\" value=\"1\" type=\"radio\">
                            <label aria-label=\"2 stars\" class=\"rating__label\" for=\"rating-2-${id}\"><i class=\"rating__icon rating__icon--star fa fa-star\"></i></label>
                            <input class=\"rating__input\" name=\"rating${id}\" id=\"rating-2-${id}\" value=\"2\" type=\"radio\" checked>
                            <label aria-label=\"3 stars\" class=\"rating__label\" for=\"rating-3-${id}\"><i class=\"rating__icon rating__icon--star fa fa-star\"></i></label>
                            <input class=\"rating__input\" name=\"rating${id}\" id=\"rating-3-${id}\" value=\"3\" type=\"radio\">
                            <label aria-label=\"4 stars\" class=\"rating__label\" for=\"rating-4-${id}\"><i class=\"rating__icon rating__icon--star fa fa-star\"></i></label>
                            <input class=\"rating__input\" name=\"rating${id}\" id=\"rating-4-${id}" value=\"4\" type=\"radio\">
                            <label aria-label=\"5 stars\" class=\"rating__label\" for=\"rating-5-${id}\"><i class=\"rating__icon rating__icon--star fa fa-star\"></i></label>
                            <input class=\"rating__input\" name=\"rating${id}\" id=\"rating-5-${id}" value=\"5\" type=\"radio\">
                        `;
            break;
        case 3:
            result = `
                            <input class=\"rating__input rating__input--none\" name=\"rating${id}\" id=\"rating-none-${id}\" value=\"0\" type=\"radio\">
                            <label aria-label=\"No rating\" class=\"rating__label\" for=\"rating-none-${id}\"><i class=\"rating__icon rating__icon--none fa fa-ban\"></i></label>
                            <label aria-label=\"1 star\" class=\"rating__label\" for=\"rating-1-${id}\"><i class=\"rating__icon rating__icon--star fa fa-star\"></i></label>
                            <input class=\"rating__input\" name=\"rating${id}\" id=\"rating-1-${id}\" value=\"1\" type=\"radio\">
                            <label aria-label=\"2 stars\" class=\"rating__label\" for=\"rating-2-${id}\"><i class=\"rating__icon rating__icon--star fa fa-star\"></i></label>
                            <input class=\"rating__input\" name=\"rating${id}\" id=\"rating-2-${id}\" value=\"2\" type=\"radio\">
                            <label aria-label=\"3 stars\" class=\"rating__label\" for=\"rating-3-${id}\"><i class=\"rating__icon rating__icon--star fa fa-star\"></i></label>
                            <input class=\"rating__input\" name=\"rating${id}\" id=\"rating-3-${id}\" value=\"3\" type=\"radio\" checked>
                            <label aria-label=\"4 stars\" class=\"rating__label\" for=\"rating-4-${id}\"><i class=\"rating__icon rating__icon--star fa fa-star\"></i></label>
                            <input class=\"rating__input\" name=\"rating${id}\" id=\"rating-4-${id}" value=\"4\" type=\"radio\">
                            <label aria-label=\"5 stars\" class=\"rating__label\" for=\"rating-5-${id}\"><i class=\"rating__icon rating__icon--star fa fa-star\"></i></label>
                            <input class=\"rating__input\" name=\"rating${id}\" id=\"rating-5-${id}" value=\"5\" type=\"radio\">
                        `;
            break;
        case 4:
            result = `
                            <input class=\"rating__input rating__input--none\" name=\"rating${id}\" id=\"rating-none-${id}\" value=\"0\" type=\"radio\">
                            <label aria-label=\"No rating\" class=\"rating__label\" for=\"rating-none-${id}\"><i class=\"rating__icon rating__icon--none fa fa-ban\"></i></label>
                            <label aria-label=\"1 star\" class=\"rating__label\" for=\"rating-1-${id}\"><i class=\"rating__icon rating__icon--star fa fa-star\"></i></label>
                            <input class=\"rating__input\" name=\"rating${id}\" id=\"rating-1-${id}\" value=\"1\" type=\"radio\">
                            <label aria-label=\"2 stars\" class=\"rating__label\" for=\"rating-2-${id}\"><i class=\"rating__icon rating__icon--star fa fa-star\"></i></label>
                            <input class=\"rating__input\" name=\"rating${id}\" id=\"rating-2-${id}\" value=\"2\" type=\"radio\">
                            <label aria-label=\"3 stars\" class=\"rating__label\" for=\"rating-3-${id}\"><i class=\"rating__icon rating__icon--star fa fa-star\"></i></label>
                            <input class=\"rating__input\" name=\"rating${id}\" id=\"rating-3-${id}\" value=\"3\" type=\"radio\">
                            <label aria-label=\"4 stars\" class=\"rating__label\" for=\"rating-4-${id}\"><i class=\"rating__icon rating__icon--star fa fa-star\"></i></label>
                            <input class=\"rating__input\" name=\"rating${id}\" id=\"rating-4-${id}" value=\"4\" type=\"radio\" checked>
                            <label aria-label=\"5 stars\" class=\"rating__label\" for=\"rating-5-${id}\"><i class=\"rating__icon rating__icon--star fa fa-star\"></i></label>
                            <input class=\"rating__input\" name=\"rating${id}\" id=\"rating-5-${id}" value=\"5\" type=\"radio\">
                        `;
            break;
        case 5:
            result = `
                            <input class=\"rating__input rating__input--none\" name=\"rating${id}\" id=\"rating-none-${id}\" value=\"0\" type=\"radio\">
                            <label aria-label=\"No rating\" class=\"rating__label\" for=\"rating-none-${id}\"><i class=\"rating__icon rating__icon--none fa fa-ban\"></i></label>
                            <label aria-label=\"1 star\" class=\"rating__label\" for=\"rating-1-${id}\"><i class=\"rating__icon rating__icon--star fa fa-star\"></i></label>
                            <input class=\"rating__input\" name=\"rating${id}\" id=\"rating-1-${id}\" value=\"1\" type=\"radio\">
                            <label aria-label=\"2 stars\" class=\"rating__label\" for=\"rating-2-${id}\"><i class=\"rating__icon rating__icon--star fa fa-star\"></i></label>
                            <input class=\"rating__input\" name=\"rating${id}\" id=\"rating-2-${id}\" value=\"2\" type=\"radio\">
                            <label aria-label=\"3 stars\" class=\"rating__label\" for=\"rating-3-${id}\"><i class=\"rating__icon rating__icon--star fa fa-star\"></i></label>
                            <input class=\"rating__input\" name=\"rating${id}\" id=\"rating-3-${id}\" value=\"3\" type=\"radio\">
                            <label aria-label=\"4 stars\" class=\"rating__label\" for=\"rating-4-${id}\"><i class=\"rating__icon rating__icon--star fa fa-star\"></i></label>
                            <input class=\"rating__input\" name=\"rating${id}\" id=\"rating-4-${id}" value=\"4\" type=\"radio\">
                            <label aria-label=\"5 stars\" class=\"rating__label\" for=\"rating-5-${id}\"><i class=\"rating__icon rating__icon--star fa fa-star\"></i></label>
                            <input class=\"rating__input\" name=\"rating${id}\" id=\"rating-5-${id}" value=\"5\" type=\"radio\" checked>
                        `;
            break;
    }
    return result;
}

function addAllListener(library) {
    const receiver = document.getElementById('all-receiver');
    receiver.addEventListener('click', event => {
        fillTable(library.getMovies(),library);
    });
}

function addFavoritesListener(library) {
    const receiver = document.getElementById('favorites-receiver');
    receiver.addEventListener('click', event => {
        fillTable(library.getFavorites(),library);
    });
}

function addBestRatedListener(library) {
    const receiver = document.getElementById('rated-receiver');
    receiver.addEventListener('click', event => {
        fillTable(library.getMaxRated(),library);
    });
}

function addUnseenListener(library) {
    const receiver = document.getElementById('unseen-receiver');
    receiver.addEventListener('click', event => {
        fillTable(library.getUnseen(),library);
    });
}

function addLastMonthListener(library) {
    const receiver = document.getElementById('lastmonth-receiver');
    receiver.addEventListener('click', event => {
        fillTable(library.getLastMonth(),library);
    });
}

function main() {
    console.log("Started");
    const library = new FilmLibrary();
    library.init();
    const movies = library.getMovies();
    fillTable(movies, library);
    addAllListener(library);
    addFavoritesListener(library);
    addBestRatedListener(library);
    addUnseenListener(library);
    addLastMonthListener(library);
}

main();