import React from 'react';
import jQuery from 'jquery';
import csrftoken from '../../../../../static/remote_components/react_components/js/csrf.js'
/**
 * Company Service,
 * Manage company objects through api.
 * @param props
 * @return {*}t
 * @constructor
 */

/**
 *  Manages the product manager api.
 */
const FEATURE_ANALYSIS_API_URL = '/general_backend';

class DataAnalysisService extends React.Component {
    /**
     *
     * @param node
     * @return {Promise<Response>}
     */
    static getShapley(node) {
        return fetch(`${FEATURE_ANALYSIS_API_URL}/shapley?${jQuery.param(node)}`, {
            method: 'GET',
        }).then(d => {
            return d.json();
        })
    }

    /**
     *
     * @param node
     * @return {Promise<Response>}
     */
    static getNodes() {
        return fetch(`${FEATURE_ANALYSIS_API_URL}/get_eval_nodes`, {
            method: 'GET',
        }).then(d => {
            return d.json();
        })
    }

    /**
     *
     * @param node
     * @return {Promise<Response>}
     */
    static getResults() {
        return fetch(`${FEATURE_ANALYSIS_API_URL}/results`, {
            method: 'GET',
        }).then(d => {
            return d.json();
        })
    }

    /**
     *
     * @return {Promise<Response>}
     */
    static getPermutationFeatureImportance() {
        return fetch(`${FEATURE_ANALYSIS_API_URL}/permutation_feature_importance`, {
            method: 'GET',
        }).then(d => {
            return d.json();
        })
    }

    /**
     *
     * @param feature
     * @return {Promise<Response>}
     */
    static getDirectionalFeatureContribution(feature) {
        return fetch(`${FEATURE_ANALYSIS_API_URL}/directional_freature_contribution?${jQuery.param({"feature": feature})}`, {
            method: 'GET',
        }).then(d => {
            return d.json();
        })
    }
}

export default DataAnalysisService