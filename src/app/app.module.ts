import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavbarComponent } from './navbar/navbar.component';
import { MovieComponent } from './movie/movie.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { AboutComponent } from './about/about.component';

import { MovieService } from './services/movie.service';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        MovieComponent,
        MovieDetailComponent,
        AboutComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        InfiniteScrollModule
    ],
    providers: [
        MovieService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
