/**
 * This serves the a page of three tables
 * users : request from company_manager
 * groups : request from company_manager
 * factories: request from company_manager
 * which represent the permissions that the users have.
 * by clicking on any entity, the permission is granted to said entity
 * only one user can be selected at the same time, when selected his permissions are shown.
 * (green = not granted, red = granted)
 */
// Load the all possible user data for selected factory, server knows what it is, specify the factory
var factory_id = 0;
var user_data = [];
var user_table = SearchTable(user_table, root_css, filter_css);


class PermissionManagementContainer {
    /**
     * Each user has their groups and factories which signify their permissions
     * The request user's objects are the ones that are displayed
     * When a user is selected, his/her groups and factories are set to selected, the rest not.
     */
    constructor() {
        this.selected_factory = "0";
        this.selected_user = "0";
        this.group_list = [];
        this.user_list = [];
        this.factory_list = [];

    }

    set_selected_factory(id) {
        this.selected_factory = id
    }

    set_group_list(json_response) {
        /**
         * Handle responce for group list request
         */
        this.group_list = this.groups_to_html(json_to_objects(json_response))
    }

    set_user_list(json_response) {
        this.user_list = this.users_to_html(json_to_objects(json_response))
    }

    set_factory_list(json_response) {
        this.factory_list = this.factories_to_html(json_to_objects(json_response))
    }

    static set_selected(element, boolean) {
        element.selected = boolean;
        element.style.backgroundColor = element.selected ? "green" : "red";

    }

    users_to_html(objects, text) {
        /**
         * This takes instances of the objects converts them to list of rows
         * by default not selected, assumes all objects have an id.
         */
        for (var i in objects) {
            var element = document.createElement("div");
            element.selected = false;
            element.value = objects[i].id;
            element.text = text;
            this.set_attributes(element);
        }
    }

    factories_to_html(objects, text) {
        /**
         * This takes instances of the factories converts them to list of rows
         * by default not selected, assumes all objects have an id.
         */
        for (var i in objects) {
            var element = document.createElement("div");
            element.selected = false;
            element.value = objects[i].id;
            element.text = objects[i].name;
            this.set_attributes(element);
        }
    }

    groups_to_html(objects, text) {
        /**
         * This takes instances of the objects converts them to list of rows
         * by default not selected, assumes all objects have an id.
         */
        for (var i in objects) {
            var element = document.createElement("div");
            element.selected = false;
            element.value = objects[i].id;
            element.text = text;
            this.set_attributes(element);
        }
    }

    set_as_active(json_response) {
        /**
         * converts json response to the relevant objects, then sets them as active
         */
        var objects = json_to_objects(json_response);

        for (var i in objects) {
            if (objects[i] instanceof Group) {
                var element = document.getElementById(this.group_id_prefix() + objects[i].id);
                if (element) {
                    this.set_selected(element, true)
                }
            } else if (objects[i] instanceof Factory) {
                element = document.getElementById(this.user_id_prefix() + objects[i].id);
                if (element) {
                    this.set_selected(element, true)
                }
            }
        }
    }


    static set_user_selected(instance, user_element) {
        /**
         * upon user selection, get and load the user permission relations (group and factory)
         * into the set attributes function.
         */
        // get and set the list of relevant objects as active
        get_user(instance.set_as_active, this.selected_factory, {"id": user_element.value});


    }

    set_attributes(element) {
        /**
         * specify css class for the item in any of the tables
         * specify the on click function
         * if click on user, then need to load the groups and factories associated with said user
         * if click on factory or group, then simply switch the state from selected to not selected and update server.
         */
        if (element instanceof Group || element instanceof Factory) {
            element.onclick = function switch_selected(element) {
                return function () {
                    PermissionManagementContainer.update_permissions(element, !element.selected)
                }
            };
        } else if (element instanceof User) {
            element.onclick = function switch_selected(element) {
                return function () {
                    PermissionManagementContainer.set_user_selected(this, element)
                }
            }
        }
        element.className = "permission_management_container_element"
    }
}