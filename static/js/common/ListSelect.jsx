import React from 'react';
import en from './lang_en.js'

const lang = en;

/**
 *  takes a list of objects which have an str field and an id
 *  displays the str of each object,
 *  on selection returns the object
 * list it will return The id of the object.
 */
class ListSelect extends React.Component {
    /**
     * Props should set the variables for the list ( objects should be a string and an id)
     * Props should send api_url (url to get objects from)
     * @param props : object_list, handleSelect (function)
     */
    constructor(props) {
        super(props);
        this.state = {
            object_list: this.props.object_list,
            temp_list: this.props.object_list,
        };
        this.filterList = this.filterList.bind(this);
        this.handleSelect=this.handleSelect.bind(this)
        //    set the first value if there is one...

    }

    /**
     * Check the length, compare each item's id (we expect and id and an str), return true
     * @param arr1
     * @param arr2
     */
    static test_array_equal(arr1, arr2) {
        if (arr1.length !== arr2.length)
            return false;
        for (var i = arr1.length; i--;) {
            if (arr1[i].id !== arr2[i].id)
                return false;
        }

        return true;
    }

    componentDidMount() {
        //select the first item if there is one.
        this.state.object_list[0] ? this.props.handleSelect(this.state.object_list[0]) : this.props.handleSelect(null)

    }

    /**
     * Parent updates with new list of objects
     * @param props : object_list
     */
    componentWillReceiveProps(props) {

        if ("object_list" in props && !ListSelect.test_array_equal(props.object_list, this.state.object_list)) {
            this.setState({
                object_list: props.object_list,
                temp_list: props.object_list
            });
            props.object_list[0] ? this.props.handleSelect(props.object_list[0]) : this.props.handleSelect(null)

        }
    }

    /**
     * Filter the object list from the filter input
     * send the first item in the list as the selected item.
     * if there is nothing send null
     * @param event
     */
    filterList(event) {
        let all_data = this.state.object_list.filter(function (item) {
            return item.str.toLowerCase().search(
                event.target.value.toLowerCase()) !== -1;
        });
        this.setState({temp_list: all_data});
        all_data[0] ? this.props.handleSelect(all_data[0]) : this.props.handleSelect(null);
    }
    handleSelect(event){
        this.props.handleSelect(this.state.temp_list[event.target.value]);
    }

    /**
     * Render the list with an on click to send the id to the parent,
     * and the filter event.
     * @return {*}
     */
    render() {

        if (!this.state.temp_list) return <p>Loading ...</p>;
        return (
            <div className={"list_select_container"}>
                <input className={"list_select_input"} type="text" placeholder={lang.filter}
                       onChange={this.filterList}/>
                <select onChange={(event) => this.handleSelect(event)} className={"list_select_select"}>
                    {
                        this.state.temp_list.map((item,index) => <option  value={index} key={item.id}> {item.str}</option>)
                    }
                </select>

            </div>
        )
    }

}

export default ListSelect