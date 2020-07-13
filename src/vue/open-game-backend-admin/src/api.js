import axios from 'axios'

export default class API {
    constructor(store) {
        this._store = store;
        this._axios = axios.create({
            baseURL: 'http://localhost:9000'
        });
    }

    setJWT(token) {
        this._axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    }

    removeJWT() {
        delete this._axios.defaults.headers.common['Authorization'];
    }

    get(url, onSuccess) {
        this._axios.get(url)
            .then(response => {
                this._handleSuccess(response, onSuccess);
            })
            .catch(error => {
                this._handleError(error);
            });
    }

    post(url, data, onSuccess) {
        this._axios.post(url, data)
            .then(response => {
                this._handleSuccess(response, onSuccess);
            })
            .catch(error => {
                this._handleError(error);
            });
    }

    _handleSuccess(response, onSuccess) {
        this._store.commit('setError', '');
        onSuccess(response);
    }

    _handleError(error) {
        if (error.response) {
            this._store.commit('setError', error.response.data.errorMessage);
        } else {
            this._store.commit('setError', error.message);
        }
    }
}
