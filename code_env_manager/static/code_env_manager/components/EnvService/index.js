import React from 'react';
import jQuery from 'jquery';
import csrftoken from '../../../../../static/remote_components/react_components/js/csrf.js'

/**
 * Supplier service,
 * Get the suppliers for the user given parameters.
 * @param props
 * @return {*}
 * @constructor
 */


/**
 * Manages Environment
 */
const URL = '/code_env_manager/';

const HEADERS = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-CSRFToken': csrftoken
};
const ws_scheme = window.location.protocol == "https:" ? "wss" : "ws";
const chat_socket = new ReconnectingWebSocket(ws_scheme + '://' + window.location.host + "/chat" + window.location.pathname);

export default class EnvService extends React.Component {
    /**
     * Returns All Items in the database, filtered by the param dict
     * (such as {label:<some_id>})
     * @param filter_param_dict
     * @return {Promise<any | never>}
     */
    static createEnv(filter_param_dict) {
        // console.log("GETTING FILE: ", filter_param_dict)
        return fetch(`${URL}file_manager?${jQuery.param(filter_param_dict)}`, {
            method: 'GET',
            headers: HEADERS,

        }).then(d => d.json())
    }
    static getDirectoryTree(filter_param_dict) {
        // console.log("GETTING FILE: ", filter_param_dict)
        return fetch(`${URL}file_manager?${jQuery.param(filter_param_dict)}`, {
            method: 'GET',
            headers: HEADERS,

        }).then(d => d.json())

    }

    /**
     *
     * @param data
     * @return {Promise<any | never>}
     */
    static updateFile(data) {
        let d = JSON.stringify(data)
        // console.log("SENDING D : ", d)
        return fetch(`${URL}file_manager`, {
            method: 'POST',
            credentials: 'include',
            mode: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            body: d
        }).then(d => d.json())
    }
}


