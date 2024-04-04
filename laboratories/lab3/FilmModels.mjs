import dayjs from 'dayjs';

function Movie(id,title,userid = 1,favorites=false,rating = 0,date = null){
    this.id = id;
    this.title = title;
    this.userid = userid;
    this.favorites = favorites;
    this.date = dayjs(date).format('YYYY-MM-DD');
    this.rating = rating;
}

export { Movie };