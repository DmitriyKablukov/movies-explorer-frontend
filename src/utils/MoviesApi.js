class MoviesApi {
  constructor({ address, headers, credentials }) {
    this._address = address;
    this._headers = headers;
    this._credentials = credentials;
  }

  async _handleResponse(res) {
    const result = await res.json();
    return res.ok ? result : Promise.reject(result.message);
  }

  _handleRequest(url, { method, headers, body }) {
    return fetch(`${this._address}${url}`, {
      method,
      headers,
      body,
    }).then(this._handleResponse);
  }

  getMovies() {
    return this._handleRequest('/beatfilm-movies', {
      method: 'GET',
      headers: this._headers,
      credentials: this._credentials,
    }).then((res) => {
      const movieList = JSON.stringify(res);
      localStorage.setItem('movieList', movieList);
      return res;
    });
  }
}

const moviesApi = new MoviesApi({
  address: 'https://api.nomoreparties.co',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  credentials: 'include',
});

export { moviesApi };
