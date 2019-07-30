import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'movie-detail',
    templateUrl: './movie-detail.component.html',
    styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent {
    @Input() movie;
    @Output() onClose = new EventEmitter<any>();
    
    constructor() {}

    closeMovie() {
        this.onClose.emit('close movie');
    }
}