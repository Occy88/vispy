class SearchTable {
    /**
     * Creates a generic table out of a list of html elements they should contain a text property, to be filtered,
     * Contains a search bar which filters by the text of each element
     * Uses .includes for the check
     * Returns the
     */
    constructor(elements, root_css, filter_css) {
        this.filter_input = document.createElement("input");
        this.root_css = root_css;
        this.filter_css = filter_css;
        this.elements = elements;
        this.table_root = document.createElement("div");
        this.filter = document.createElement("input");

    }

    create_table() {
        /**
         * The table is constructed here
         */
        this.table_root.className = this.root_css;
        this.filter.className = this.filter_css;
        this.filter.onkeyup = this.filter_action();
        this.table_root.appendChild(this.filter);
        for (var i in this.elements) {
            this.table_root.appendChild(this.elements[i])
        }

    }

    filter_action() {
        for (var i in this.elements) {
            if (not(this.elements[i].innerText.includes(this.filter.innerText))) {
                this.elements[i].display = "None"
            } else {
                this.elements[i].display = "Block"
            }
        }

    }

    // filter_action() {
    //     return function () {
    //         for (var i in this.elements) {
    //             if (not(this.elements[i].innerText.includes(this.filter.innerText))) {
    //                 this.elements[i].display = "None"
    //             } else {
    //                 this.elements[i].display = "Block"
    //             }
    //         }
    //
    //     }
    // }
}