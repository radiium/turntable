import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings-panel',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

    selectedLangage: String;
    langagesList = [
        {value: 'en', viewValue: 'English'},
        {value: 'fr', viewValue: 'Français'}
    ];

    selectedTheme: String;
    themesList = [
        'dark',
        'light'
    ];

    constructor() {
    }

    ngOnInit() {
    }
}
