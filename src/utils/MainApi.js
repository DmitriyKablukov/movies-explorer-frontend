class Api {
  constructor({ address, headers, credentials }) {
    this._address = address;
    this._headers = headers;
    this._credentials = credentials;
  }

  async _handleResponse(res) {
    const result = await res.json();
    return res.ok ? result : Promise.reject(result.message);
  }

  _request(url, { method, headers, body }) {
    return fetch(`${this._address}${url}`, {
      method,
      headers,
      body,
    }).then(this._handleResponse);
  }

  register({ name, password, email }) {
    return this._request('/signup', {
      method: 'POST',
      headers: this._headers,
      credentials: this._credentials,
      body: JSON.stringify({ name, password, email }),
    });
  }

  login({ password, email }) {
    return this._request('/signin', {
      method: 'POST',
      headers: this._headers,
      credentials: this._credentials,
      body: JSON.stringify({ password, email }),
    }).then((res) => {
      localStorage.setItem('token', res.token);
    });
  }

  checkToken(jwt) {
    return this._request('/users/me', {
      method: 'GET',
      headers: { ...this._headers, Authorization: `Bearer ${jwt}` },
      credentials: this._credentials,
    });
  }

  getUserInfo(jwt) {
    return this._request('/users/me', {
      method: 'GET',
      headers: { ...this._headers, Authorization: `Bearer ${jwt}` },
      credentials: this._credentials,
    });
  }

  sendUserInfo({ name, email }, jwt) {
    return this._request('/users/me', {
      method: 'PATCH',
      headers: { ...this._headers, Authorization: `Bearer ${jwt}` },
      credentials: this._credentials,
      body: JSON.stringify({ name, email }),
    });
  }

  getSavedMovies(jwt) {
    return this._request('/movies', {
      method: 'GET',
      credentials: this._credentials,
      headers: {
        ...this._headers,
        Authorization: `Bearer ${jwt}`,
      },
    }).then((res) => res.movies);
  }

  postSavedMovie(movie, jwt) {
    return this._request('/movies', {
      method: 'POST',
      credentials: this._credentials,
      headers: {
        ...this._headers,
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        country: movie.country,
        description: movie.description,
        director: movie.director,
        duration: movie.duration,
        movieId: movie.id,
        image: 'https://api.nomoreparties.co' + movie.image.url,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
        trailerLink: movie.trailerLink,
        thumbnail: 'https://api.nomoreparties.co' + movie.image.formats.thumbnail.url,
        year: movie.year,
      }),
    });
  }

  deleteSavedMovie(movieId, jwt) {
    return this._request(`/movies/${movieId}`, {
      method: 'DELETE',
      credentials: this._credentials,
      headers: {
        ...this._headers,
        Authorization: `Bearer ${jwt}`,
      },
    });
  }
}

const api = new Api({
  address: 'https://api.movies-exp.nomoredomainsmonster.ru',
  // address: 'http://localhost:3000',
  credentials: 'include',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export { api };
