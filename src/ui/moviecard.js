import { buildElement } from './element';
import moviedb from '../data/moviedb';
import t from '../common/types';


/**
 * MovieCard defines a card that displays movie data.
 */
export default class MovieCard {
    /**
     * 
     * @param {Object} movieData
     * @param {number} movieData.id
     * @param {string} movieData.poster_path
     * @param {string} movieData.title
     * @param {string[]} movieData.genres
     * @param {number} movieData.vote_average
     * @param {string} movieData.overview
     * @param {number} movieData.year
     */
    constructor(movieData) {
        this._movieID = movieData.id;

        this._root = buildElement('div', [
            'movie-card-container',
            'blur-focus-in'
        ]);

        this._headerNode = buildElement('div', 'movie-card-header', this._root);

        this._yearNode = buildElement('div', 'movie-card-year', this._headerNode, {
            textContent: movieData.year + ''
        });

        this._titleNode = buildElement('h1', 'movie-card-title', this._headerNode, {
            textContent: movieData.title
        });

        this._vote_averageNode = buildElement('div', 'movie-card-vote-average', this._headerNode, {
            textContent: movieData.vote_average + ''
        });

        this._contentWrapperNode = buildElement('div', 'movie-card-content-wrapper', this._root);

        if (movieData.poster_path) {
            this._posterNode = buildElement('img', 'movie-card-poster', this._contentWrapperNode);

            if (movieData.poster_path.charAt(0) != '/') {
                movieData.poster_path = `/${movieData.poster_path}`;
            }

            fetch(`https://image.tmdb.org/t/p/w200${movieData.poster_path}`)
            .then((response) => response.blob())
            .then((blob) => {
                this._posterImg = URL.createObjectURL(blob);
                this._posterNode.setAttribute('src', this._posterImg);
                this._posterNode.addEventListener('load', () => {
                    URL.revokeObjectURL(this._posterImg);
                });
            });
        }

        if (movieData.overview) {
            this._overviewNode = buildElement('p', 'movie-card-overview', this._contentWrapperNode, {
                textContent: movieData.overview
            });
        }

        this._expandedWrapper = buildElement('div', [
            'movie-card-expanded-wrapper',
            'invisible'
        ], this._contentWrapperNode);

        this._reviewsWrapperNode = buildElement('div', 'movie-card-expanded-reviews', this._expandedWrapper);
        this._similarWrapperNode = buildElement('div', 'movie-card-expanded-similar', this._expandedWrapper);

        if (movieData.genres && movieData.genres.length) {
            this._genreWrapperNode = buildElement('div', 'movie-card-genre-wrapper', this._root);

            this._genreNodes = [];

            for (const genre of movieData.genres) {
                this._genreNodes.push(buildElement('span', 'movie-card-genre', this._genreWrapperNode, {
                    textContent: genre
                }));
            }
        }

        this._isExpanded = false;
        this._onClick = this._onClick.bind(this);
        this._root.addEventListener('click', this._onClick);
    }

    /**
     * 
     * @param {Element} parent 
     */
    insertOnParent(parent) {
        if (t.isFunc(parent.insertAdjacentElement)) {
            parent.insertAdjacentElement('afterbegin', this._root);
        } else {
            console.warn('MovieCard:insertOnParent: parent argument expected to be DOM element');
        }
    }

    /**
     * 
     * @param {Element} parent 
     */
    appendOnParent(parent) {
        if (t.isFunc(parent.insertAdjacentElement)) {
            parent.insertAdjacentElement('beforeend', this._root);
        } else {
            console.warn('MovieCard:appendOnParent: parent argument expected to be DOM element');
        }
    }

    async _expandCard() {                
        this._expandedWrapper.classList.remove('invisible');
        this._isExpanded = true;

        if (!this._videoNode) {
            const videoData = await moviedb.getResource(`/movie/${this._movieID}/videos`);

            if (videoData.results && videoData.results.length > 0 && videoData.results[0].key) {
                this._videoNode = buildElement('iframe', 'movie-card-expanded-video', this._expandedWrapper, {
                    attr: {
                        src: `https://www.youtube.com/embed/${videoData.results[0].key}`,
                        frameborder: 0,
                        allowfullscreen: true
                    }
                });
            }
        }

        if (!this._similarListNode) {
            const similarData = await moviedb.getResource(`/movie/${this._movieID}/similar`);

            if (similarData.total_results > 0) {
                this._similarHeaderNode = buildElement('h3', 'movie-card-expanded-similar-header', this._similarWrapperNode, {
                    textContent: 'Similar movies:'
                });

                this._similarListNode = buildElement('ul', 'movie-card-expanded-similar-list', this._similarWrapperNode);

                for (const movieData of similarData.results) {
                    let year = '';

                    if (movieData.release_date) {
                        year = ` (${(new Date(movieData.release_date)).getFullYear()})`;
                    }

                    buildElement('li', 'movie-card-expanded-similar-list-item', this._similarListNode, {
                        textContent: `${movieData.title}${year}`
                    });
                }
            }
        }
        
        if (!this._reviewsListNode) {
            const reviewData = await moviedb.getResource(`/movie/${this._movieID}/reviews`);

            if (reviewData.total_results > 0) {
                this._reviewsHeaderNode = buildElement('h3', 'movie-card-expanded-reviews-header', this._reviewsWrapperNode, {
                    textContent: 'Reviews:'
                });

                this._reviewsListNode = buildElement('ul', 'movie-card-expanded-reviews-list', this._reviewsWrapperNode);

                for (const review of reviewData.results) {
                    let listItem = buildElement('li', 'movie-card-expanded-reviews-list-item', this._reviewsListNode);

                    buildElement('h4', 'movie-card-expanded-reviews-list-item-header', listItem, {
                        textContent: review.author
                    });

                    buildElement('p', 'movie-card-expanded-reviews-list-item-content', listItem, {
                        textContent: review.content
                    });
                }
            }
        }

        //https://caniuse.com/#feat=scrollintoview
        this._root.scrollIntoView({
            behavior: 'smooth'
        });
    }

    async _minifyCard() {
        this._expandedWrapper.classList.add('invisible');
        this._isExpanded = false;

        //hacky but works for now
        const p = this._root.parentNode;
        p.scrollTop--;
        p.scrollTop++;
    }

    _onClick() {
        if (!this._isExpanded) {
            this._expandCard();
        } else {
            this._minifyCard();
        }
    }
}
