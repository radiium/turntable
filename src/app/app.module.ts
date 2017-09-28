import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

// Modules
import { CoreModule } from './_core/core.module';
import { SharedModule } from './_shared/shared.module';

// Components
// Root component
import { AppComponent } from './app.component';
// Mix panel
import { MixPanelComponent } from './mix-panel/mix-panel.component';
// Playlist panel
import { PlaylistPanelComponent } from './playlist-panel/playlist-panel.component';
// Settings panel
import { SettingsPanelComponent } from './settings-panel/settings-panel.component';
// Login component
import { LoginComponent } from './login/login.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        JsonpModule,
        CoreModule,
        SharedModule
    ],
    declarations: [
        // Root component
        AppComponent,
        // Mix panel
        MixPanelComponent,
        // Playlist panel
        PlaylistPanelComponent,
        // Settings panel
        SettingsPanelComponent,
        // Login
        LoginComponent,
    ],
    exports: [],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
