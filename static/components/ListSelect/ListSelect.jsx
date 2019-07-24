import React from 'react';
import './style.scss'
import languages from "./lang.js"

let lang = languages[document.documentElement.lang];

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
        this.reverse = props.reverse;
        let temp_list = [...props.object_list];
        temp_list = this.sortList(temp_list);
        if (props.default) {
            temp_list = this.setDefault(props.default, temp_list)
        }

        if (this.reverse) {
            temp_list.reverse()
        }

        this.state = {
            object_list: props.object_list,
            temp_list: temp_list,
        };
        this.options = React.createRef();
        this.filterList = this.filterList.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        //    set the first value if there is one...
        //  sort object list into alphabetical and then if there is a default, find it in the list via id and set it as the first item...

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
        this.state.temp_list[0] ? this.props.handleSelect(this.state.temp_list[0]) : this.props.handleSelect(null)

    }

    /**
     * Parent updates with new list of objects
     * @param props : object_list
     */
    componentWillReceiveProps(props) {
        //pre process the props (make sure they go through sorting and adding default (as in the constructor)
        let data = props.object_list;


        if ("object_list" in props && !ListSelect.test_array_equal(data, this.state.object_list)) {
            let temp_list = this.sortList([...data]);
            if (this.reverse) {
                temp_list.reverse();
            }
            this.setState({
                object_list: data,
                temp_list: temp_list,
            });
            temp_list[0] ? this.props.handleSelect(temp_list[0]) : this.props.handleSelect(null);
        }
    }

    /**
     * If there is a default set it
     */
    setDefault(object, list) {
        //  find and remove it from the current list
        list.unshift(object);
        let id_pop = 0;
        for (var i = 1; i < list.length; i += 1) {
            if (list[i].id === object.id) {
                id_pop = i
            }
        }
        list.splice(id_pop, 1);
        return list;

        //    set it as the first element in the list
    }

    /**
     * Function to sort alphabetically an array of objects by some specific key.
     *
     * @param {String} property Key of the object to sort.
     */


    static dynamicSort(property) {
        var sortOrder = 1;

        if (property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }

        return function (a, b) {
            if (sortOrder == -1) {
                return b[property].localeCompare(a[property]);
            } else {
                return a[property].localeCompare(b[property]);
            }
        }
    }

    /**
     * sort the list into alphabetical by the str attribute
     */
    sortList(list) {
        list.sort(ListSelect.dynamicSort("str"));
        return list;
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
        all_data = this.sortList(all_data);
        if (this.reverse) {
            all_data.reverse();
        }

        this.setState({temp_list: all_data});
        all_data[0] ? this.props.handleSelect(all_data[0]) : this.props.handleSelect(null);
        this.options.current.value =0;

    }


    handleSelect(event) {
        this.props.handleSelect(this.state.temp_list[event.target.value]);
    }

    /**
     * Render the list with an on click to send the id to the parent,
     * and the filter event.
     * @return {*}
     */
    render() {

        if (!this.state.temp_list) return <div style={{display: 'inline-block'}}>N/A</div>;
        let select =
            <select ref={this.options} onChange={(event) => this.handleSelect(event)}>
                {
                    this.state.temp_list.map((item, index) => <option value={index}
                                                                      key={item.id}> {item.str}</option>)
                }
            </select>;

        let filter = <input className={"input"} type="text" placeholder={lang.filter}
                            onChange={this.filterList}/>;
        if (this.props.filter === undefined || this.props.filter === true) {
            return (
                <div style={{display: "inline-block"}}>
                    {filter}
                    {select}
                </div>
            )
        } else {
            return (
                <div style={{display: "inline-block"}}>
                    {select}
                </div>
            )
        }
    }
}

export default ListSelect