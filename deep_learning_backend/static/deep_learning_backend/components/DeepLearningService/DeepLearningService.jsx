import React from 'react';
import jQuery from 'jquery';
import csrftoken from '../../../../../static/remote_components/react_components/js/csrf.js'

const DEEP_LEARNING_BACKEND_URL = 'http://localhost:5000/api'; // TODO figure out exactly what this will be. Probably


export default class DeepLearningService extends React.Component {

    static getTrainingRuns() {
        return fetch(`${DEEP_LEARNING_BACKEND_URL}/training_runs`, {
            method: 'GET',
        }).then(d => d.json())
    }

    static getFullRunData(filter_param_dict) {
        return fetch(`${DEEP_LEARNING_BACKEND_URL}/full_run?${jQuery.param(filter_param_dict)}`, {
            method:'GET',
        }).then(d => d.json())
    }

        static getMinibatchData(filter_param_dict) {
        return fetch(`${DEEP_LEARNING_BACKEND_URL}/minibatch?${jQuery.param(filter_param_dict)}`, {
            method:'GET',
        }).then(d => d.json())
    }
}
