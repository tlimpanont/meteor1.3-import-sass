import 'reflect-metadata';
import 'zone.js/dist/zone';
import 'rxjs/Rx';
import {Component, AfterViewInit} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {HTTP_PROVIDERS} from "angular2/http";
import {ThemeSwitcher} from './theme-switcher';
import {FORM_PROVIDERS} from "angular2/common";



@Component({
    selector: 'app',
    templateUrl: '/client/app.html',
    directives: [ThemeSwitcher]
})
class App implements AfterViewInit {

    ngAfterViewInit() {

    }
}

bootstrap(App, [HTTP_PROVIDERS, FORM_PROVIDERS]);
