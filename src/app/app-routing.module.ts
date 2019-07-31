import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MovieComponent } from './movie/movie.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
    { path: '', component: MovieComponent },
    { path: 'movie', component: MovieComponent },
    { path: 'about', component: AboutComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
