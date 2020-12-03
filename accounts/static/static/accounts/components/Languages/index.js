import React from 'react';
import languages from "./lang.js"
import ListSelect from "../../../../../static/remote_components/react_components/components/ListSelect";
import AccountService from "../AccountService";

/**
 * Receives a stock_holder id,
 * Tries to load all stock list from api,
 * adds a filter allows user to select a stock,
 * sends selected object to parent vial changeSupplier function
 */
export default class LanguageSelect extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            language_list: null,
            language: null
        };
    }

    componentDidMount() {
        AccountService.getLanguageChoices().then(d => {
            this.setState({
                language_list: d.languages
            })
        });
        AccountService.getLanguage().then(d => {
            var rObj = {};
            rObj = {id: d.language[0], code: d.language[0], language: d.language[1]};
            rObj["str"] = d.language[1];
            this.setState({
                language: rObj
            })
        })
    }

    static changeLanguage(object) {
        if (object && document.documentElement.lang !== object.code) {

            AccountService.setLanguage(object).then(d => {
                location.reload()
            })
        }

    }

    render() {
        if (!this.state.language_list || !this.state.language) return <div style={{display: 'inline-block'}}>N/A</div>;
        return (
                <div>
                    <ListSelect default={this.state.language} filter={false}
                                object_list={this.state.language_list.map(obj => {
                                    var rObj = {};
                                    rObj = {id: obj[0], code: obj[0], language: obj[1]};
                                    rObj["str"] = obj[1];
                                    rObj["sort"] = obj[1];

                                    return rObj;
                                })} handleSelect={LanguageSelect.changeLanguage}/>
                </div>
        )
    }
}
