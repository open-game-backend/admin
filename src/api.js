import axios from 'axios'
import PubSub from 'pubsub-js'
import Topics from './topics'

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

    _handleSuccess(response, onSuccess) {
        PubSub.publish(Topics.LOADING, false);
        PubSub.publish(Topics.ERROR, '');

        onSuccess(response);
    }

    _handleError(error) {
        PubSub.publish(Topics.LOADING, false);
        
        if (error.response) {
            if (error.response.status === 403) {
                PubSub.publish(Topics.ERROR, "Session expired");
            } else {
                PubSub.publish(Topics.ERROR, error.response.data.errorMessage);
            }
        } else {
            PubSub.publish(Topics.ERROR, error.message);
        }
    }
}
