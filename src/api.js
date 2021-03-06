import axios from 'axios'
import PubSub from 'pubsub-js'
import Topics from './topics'

export default class API {
    constructor(config) {
        this._axios = axios.create({
            baseURL: config.baseUrl
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
        PubSub.publish(Topics.LOADING, true);

        this._axios.get(url)
            .then(response => {
                this._handleSuccess(response, onSuccess);
            })
            .catch(error => {
                this._handleError(error);
            });
    }

    post(url, data, onSuccess) {
        PubSub.publish(Topics.LOADING, true);

        this._axios.post(url, data)
            .then(response => {
                this._handleSuccess(response, onSuccess);
            })
            .catch(error => {
                this._handleError(error);
            });
    }

    put(url, data, onSuccess) {
        PubSub.publish(Topics.LOADING, true);

        this._axios.put(url, data)
            .then(response => {
                this._handleSuccess(response, onSuccess);
            })
            .catch(error => {
                this._handleError(error);
            });
    }

    delete(url, onSuccess) {
        PubSub.publish(Topics.LOADING, true);

        this._axios.delete(url)
            .then(response => {
                this._handleSuccess(response, onSuccess);
            })
            .catch(error => {
                this._handleError(error);
            });
    }

    _handleSuccess(response, onSuccess) {
        PubSub.publish(Topics.LOADING, false);
        PubSub.publish(Topics.ERROR, '');

        onSuccess(response);
    }

    _handleError(error) {
        PubSub.publish(Topics.LOADING, false);
        
        if (error.response) {
            if (error.response.status === 403) {
                PubSub.publish(Topics.SESSION_EXPIRED);
            } else {
                PubSub.publish(Topics.ERROR, error.response.data.errorMessage);
            }
        } else {
            PubSub.publish(Topics.ERROR, error.message);
        }
    }
}
