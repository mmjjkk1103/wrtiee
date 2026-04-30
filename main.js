class MovieCard extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        const wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'movie-card');

        const title = document.createElement('h3');
        title.textContent = this.getAttribute('title');

        const poster = document.createElement('img');
        poster.src = this.getAttribute('poster');
        poster.alt = `Poster for ${this.getAttribute('title')}`;

        const rating = document.createElement('p');
        rating.textContent = `Rating: ${this.getAttribute('rating')}`;

        const style = document.createElement('style');
        style.textContent = `
            .movie-card {
                background-color: var(--card-background);
                border-radius: 10px;
                box-shadow: 0 10px 20px var(--shadow-color);
                overflow: hidden;
                transition: transform 0.2s;
            }
            .movie-card:hover {
                transform: translateY(-5px);
            }
            img {
                width: 100%;
                height: auto;
            }
            h3, p {
                padding: 0 1rem;
            }
        `;

        shadow.appendChild(style);
        shadow.appendChild(wrapper);
        wrapper.appendChild(poster);
        wrapper.appendChild(title);
        wrapper.appendChild(rating);
    }
}

customElements.define('movie-card', MovieCard);

const movies = [
    { title: 'Inception', poster: 'https://m.media-amazon.com/images/I/81p+xe8cbnL._AC_UF894,1000_QL80_.jpg', rating: '8.8' },
    { title: 'The Dark Knight', poster: 'https://m.media-amazon.com/images/I/81PGnTNnQLL.jpg', rating: '9.0' },
    { title: 'Interstellar', poster: 'https://m.media-amazon.com/images/I/A1JVqNMI7UL._AC_UF894,1000_QL80_.jpg', rating: '8.6' },
    { title: 'The Matrix', poster: 'https://m.media-amazon.com/images/I/51EG732BV3L.jpg', rating: '8.7' },
];

const container = document.getElementById('movie-container');

movies.forEach(movie => {
    const movieCard = document.createElement('movie-card');
    movieCard.setAttribute('title', movie.title);
    movieCard.setAttribute('poster', movie.poster);
    movieCard.setAttribute('rating', movie.rating);
    container.appendChild(movieCard);
});
