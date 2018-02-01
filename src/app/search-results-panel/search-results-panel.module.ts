import { NgModule } from '@angular/core';
import { SharedModule } from 'shared/shared.module';
import { SearchResultsComponent } from './search-results/search-results.component';

@NgModule({
    imports: [
        SharedModule
    ],
    exports: [
        SearchResultsComponent
    ],
    declarations: [
        SearchResultsComponent
    ]
})
export class SearchResultsPanelModule { }
