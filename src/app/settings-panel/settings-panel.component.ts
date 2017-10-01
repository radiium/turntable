import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings-panel',
  templateUrl: './settings-panel.component.html',
  styleUrls: ['./settings-panel.component.css']
})
export class SettingsPanelComponent implements OnInit {

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
