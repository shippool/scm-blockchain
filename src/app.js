import { SERVER_ATTR, RENDER_SOURCE } from './configurations';
import { add_html, append_html, prepend_html, remove_element, renderPreLoader, numberWithCommas, convertNewLine } from './essentials/library/library';
import { localDatabase } from './essentials/localDatabase/localDatabase';
//import { Auth } from './essentials/authentication/authentication';
import { Router } from './essentials/router/router';
import { Instantiate } from './essentials/appinstantiate/appinstantiate';
import './scss/app.scss';

import { Login } from './components/login/login'

//Sub Pages
let app_functions = {
    "Login": {
        "construct": Login
    }
    /*"Invoicing": {
        "Recent Invoices": {
            "construct": RecentInvoicesPage
        },
        "Create Invoice": {
            "construct": CreateInvoicePage
        },
        "Archived Invoices": null
    }*/
};

let localDB = new localDatabase();
//let router = new Router(app_functions);
let app_instance = new Instantiate();

let dashboardPage = class { //wrapper for the app itself, that would supposedly also jumpstart the app

    constructor() {

        //external elements

        //internal elements
        this.trigger_elements = {};

        this.set_default();

        this.render();
        this.triggers();
    }

    triggers() {
    }

    set_default() {
    }

    render() {
        let _html = '';

        _html = `
            <a href="#" data-target="main-side-navi" class="sidenav-trigger"><i class="material-icons">menu</i></a>
            <div id="content-display" style="padding-left:300px">
            </div>
        `;

        add_html({
            element: RENDER_SOURCE,
            value: _html
        });

        this.render_navigation();
        
        app_instance.instantiate(app_functions);

    }

    render_navigation() {
        let _side_menu_items = '';
        let _navi_menu_items = '';

        Object.entries(app_functions).forEach((elem, key) => {
            let _key = elem[0];
            let _value = elem[1];

            let _path = (() => {
                let i = '';
                let _arr = _key.split(' ');
                _arr.forEach((elem_2, key_2) => {
                    i += elem_2.toLowerCase() + (key_2 + 1 < _arr.length ? '-' : '');
                });
                return i;
            })();

            _side_menu_items += `
                <li class="router-link menu-items${(key == 0 ? ' active' : '')}" encoded-path="${key}">
                    <a href="/${_path}" class="waves-effect">${_key}</a>
                </li>`;

            _navi_menu_items += `
                <li class="router-link menu-items${(key == 0 ? ' active' : '')}" encoded-path="${key}">
                    <a href="/${_path}">${_key}</a>
                </li>`;
        });

        append_html({
            element: '#side-menu-items',
            value: _side_menu_items
        });

        prepend_html({
            element: '#navi-menu-items',
            value: _navi_menu_items
        });
    }

    //methods

    //triggers

    //controllers

}

//INIT App
app_instance.runApp(dashboardPage);