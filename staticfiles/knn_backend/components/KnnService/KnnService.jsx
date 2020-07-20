import React from 'react';
import jQuery from 'jquery';
import csrftoken from '../../../../../static/js/csrf.js'

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
const KNN_BACKEND_URL = '/knn_backend';

const HEADERS = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-CSRFToken': csrftoken
};

export default class KnnService extends React.Component {
    /**
     * Returns All Items in the database, filtered by the param dict
     * (such as {label:<some_id>})
     * @param filter_param_dict
     * @return {Promise<any | never>}
     */
    static getItems(filter_param_dict) {
        return fetch(`${KNN_BACKEND_URL}/items?${jQuery.param(filter_param_dict)}`, {
            method: 'GET',
            headers: HEADERS,

        }).then(d => d.json())
    }

    /**
     *
     * @param updated_field_dict
     * @param item_pk
     * @return {Promise<any | never>}
     */
    static updateItem(updated_field_dict, item_pk) {
        return fetch(`${KNN_BACKEND_URL}/items/${item_pk}`, {
            method: 'POST',
            credentials: 'include',
            mode: 'same-origin',
            headers: HEADERS,
            body: JSON.stringify(updated_field_dict)
        }).then(d => d.json())
    }


    /**
     * Returns All Items in the database, filtered by the param dict
     * (such as {label:<some_id>})
     * @param filter_param_dict
     * @return {Promise<any | never>}
     */
    static getItemsRelations(filter_param_dict) {
        return fetch(`${KNN_BACKEND_URL}/items/with_relations?${jQuery.param(filter_param_dict)}`, {
            method: 'GET',
            headers: HEADERS,

        }).then(d => d.json())
    }


    /**
     * Registers one or more items specified in a given list
     * for now the data should be in string format this can be changed later.
     * @param item_list list or single item in format {id:<id>,label:<id>,data:<string>}
     * @return {Promise<any | never>}
     */
    static registerItems(item_list) {
        console.log("registering");
        return fetch(`${KNN_BACKEND_URL}/items`, {
            method: 'POST',
            credentials: 'include',
            mode: 'same-origin',
            headers: HEADERS,
            body: JSON.stringify(stock)
        }).then(d => d.json())
    }

    /**
     * Registers one or more labels specified in a given list
     * for now the data should be in string format this can be changed later.
     * @param item_list list or single item in format {id:<id>,name:<string>}
     * @return {Promise<any | never>}
     */
    static registerLabels(item_list) {
        console.log("registering");
        return fetch(`${KNN_BACKEND_URL}/label`, {
            method: 'POST',
            credentials: 'include',
            mode: 'same-origin',
            headers: HEADERS,
            body: JSON.stringify(stock)
        }).then(d => d.json())
    }

    /**
     * Returns All Items in the database, filtered by the param dict
     * (such as {label:<some_id>})
     * @param filter_param_dict
     * @return {Promise<any | never>}
     */
    static getLabels(filter_param_dict) {
        return fetch(`${KNN_BACKEND_URL}/labels?${jQuery.param(filter_param_dict)}`, {
            method: 'GET',
            headers: HEADERS,

        }).then(d => d.json())
    }

    /**
     *
     * @param updated_field_dict
     * @param label_pk
     * @return {Promise<any | never>}
     */
    static updateLabel(updated_field_dict, label_pk) {
        return fetch(`${KNN_BACKEND_URL}/items/${label_pk}`, {
            method: 'POST',
            credentials: 'include',
            mode: 'same-origin',
            headers: HEADERS,
            body: JSON.stringify(updated_field_dict)
        }).then(d => d.json())
    }

}


