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
 *  Manages the product manager api.
 */
const URL = '/code_env_manager/';

const HEADERS = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-CSRFToken': csrftoken
};

export default class FileService extends React.Component {
    /**
     * Returns All Items in the database, filtered by the param dict
     * (such as {label:<some_id>})
     * @param filter_param_dict
     * @return {Promise<any | never>}
     */
    static getFile(filter_param_dict) {
        return fetch(`${URL}file_manager?${jQuery.param(filter_param_dict)}`, {
            method: 'GET',
            headers: HEADERS,

        }).then(d => d.json())
    }

    /**
     *
     * @param updated_field_dict
     * @return {Promise<any | never>}
     */
    static updateFile(updated_field_dict,) {
        return fetch(`${URL}file_manager${item_pk}`, {
            method: 'POST',
            credentials: 'include',
            mode: 'same-origin',
            headers: HEADERS,
            body: JSON.stringify(updated_field_dict)
        }).then(d => d.json())
    }
}


