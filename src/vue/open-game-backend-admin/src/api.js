import axios from 'axios'
import PubSub from 'pubsub-js'

export default class API {
    constructor() {
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

    isLoggedIn() {
        return this._axios.defaults.headers.common['Authorization'];
    }

    get(url, onSuccess) {
        PubSub.publish('loading', true);

        this._axios.get(url)
            .then(response => {
                this._handleSuccess(response, onSuccess);
            })
            .catch(error => {
                this._handleError(error);
            });
    }

    post(url, data, onSuccess) {
        PubSub.publish('loading', true);

        this._axios.post(url, data)
            .then(response => {
                this._handleSuccess(response, onSuccess);
            })
            .catch(error => {
                this._handleError(error);
            });
    }

    _handleSuccess(response, onSuccess) {
        PubSub.publish('loading', false);
        PubSub.publish('error', '');

        onSuccess(response);
    }

    _handleError(error) {
        PubSub.publish('loading', false);
        
        if (error.response) {
            PubSub.publish('error', error.response.data.errorMessage);
        } else {
            PubSub.publish('error', error.message);
        }
    }
}
