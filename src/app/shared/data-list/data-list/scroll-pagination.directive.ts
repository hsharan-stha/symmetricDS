import {Directive, ElementRef, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
    selector: '[appScrollPagination]',
})
export class ScrollPaginationDirective {
    @Output() scrollPage = new EventEmitter();
    pageNumber: number = 1;

    constructor(private el: ElementRef) {
    }

    @HostListener('scroll', ['$event']) onScrollEvent($event) {
        let eventTarget = (<HTMLInputElement>$event.target);
        let isInBottom = (eventTarget.scrollHeight - eventTarget.scrollTop) === eventTarget.clientHeight;

        if (isInBottom === true) {
            this.scrollPage.emit([isInBottom, eventTarget.scrollTop]);
        }
    }
}