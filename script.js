const form = document.querySelector('#searchForm');
const container = document.querySelector('.container');

form.addEventListener('submit', async function (e) {
    deleteShows();
    e.preventDefault();
    const searchTerm = this.elements.query.value;
    const config = { params: { q: searchTerm } }
    const res = await axios.get(`https://api.tvmaze.com/search/shows`, config);
    getShows(res.data);
    this.elements.query.value = '';
})




const getShows = (shows) => {
    let found = false;
    for (let result of shows) {
        if (result.show.image && result.show.name) {
            found = true;
            // Create show container and appending to container
            const showDiv = document.createElement('div');
            showDiv.classList.add('showDiv');
            container.append(showDiv);

            // Add show image and appending to showDiv
            const img = document.createElement('IMG');
            img.src = result.show.image.medium;
            showDiv.append(img);

            // Add movie info container and appending to showDiv
            const movie = document.createElement('div');
            movie.classList.add('movie');
            showDiv.append(movie);

            // Add movie title and appending to movie info container
            const movieTitle = document.createElement('SPAN');
            movieTitle.classList.add('movie-title');
            movieTitle.textContent = result.show.name;
            movie.append(movieTitle);

            // Add movie rating with star icon
            const movieRating = document.createElement('SPAN');
            movieRating.classList.add('movie-rating');
            const starIcon = document.createElement('I');
            starIcon.classList.add('fa-solid','fa-star');
            movieRating.appendChild(starIcon);
            const ratingValue = document.createTextNode(result.show.rating.average ?? 'N/A');
            movieRating.appendChild(ratingValue);
            movie.append(movieRating);
        }
    }
    if(!found) {
        console.log('No movies found');
        const div = document.createElement('div');
        const notFound = document.createElement('h2');
        notFound.textContent = 'No Shows Found :(';
        container.append(div);
        div.append(notFound);
    }
}



const deleteShows = () => {
    container.innerHTML = '';
}