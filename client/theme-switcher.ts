import {Component, ElementRef, Input, OnInit, ViewChild} from 'angular2/core';
import {Http} from "angular2/http";
import * as _ from "underscore";

import {FORM_PROVIDERS, FORM_DIRECTIVES, CORE_DIRECTIVES, Control} from "angular2/common";

class Theme { css:string; }

@Component({
    selector: 'theme-switcher',
    providers: [FORM_PROVIDERS],
    directives: [FORM_DIRECTIVES, CORE_DIRECTIVES],
    template: `
        <select class="form-control" (change)="onChange()" [(ngFormControl)]="themeControl" [(ngModel)]="selectedTheme">
            <option *ngFor="#theme of themes" [ngValue]="theme">{{theme.name}}</option>
        </select>
        <div #appTheme></div>
    `,
})
export class ThemeSwitcher implements OnInit {
    @ViewChild('appTheme') appTheme;
    @Input('theme-api') themeApi:string;
    themes:Array<Object>;
    selectedTheme:Theme;
    themeControl: Control = new Control('');

    constructor(private _http:Http) {

    }
    ngOnInit() {

        this.themeApi = (this.themeApi) ? this.themeApi : 'https://bootstrap-theuy-theme.herokuapp.com';

        this._http.get(this.themeApi)
            .subscribe(
                data =>  {
                    this.themes = data.json().themes;
                    this.selectedTheme = _.first(this.themes);
                    this.addStylesheetLink(this.selectedTheme.css);
                }
            )
    }
    onChange() {
        this.addStylesheetLink(this.themeControl.value.css);
    }
    addStylesheetLink(hrefLink) {
        this.appTheme.nativeElement.innerHTML = `<link rel="stylesheet" href=${hrefLink}></link>`;
    }
}
