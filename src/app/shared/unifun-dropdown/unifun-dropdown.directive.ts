import {
    Directive,
    ElementRef,
    ContentChildren,
    QueryList,
    Input,
    Output,
    EventEmitter,
    Inject,
    forwardRef,
    ContentChild,
    NgZone,
    Renderer2,
    OnInit,
    OnDestroy,
    ChangeDetectorRef
} from '@angular/core';

import {DOCUMENT} from '@angular/common';
import {Key} from './key';
import {fromEvent, race, Subject, Subscription} from 'rxjs';
import {filter, takeUntil} from 'rxjs/operators';

@Directive({
    selector: '[ufDropdownItem]',
    host: {
        "role": "option",
        "aria-selected": "false",
        'class': 'dropdown-item',
        '[class.disabled]': 'disabled',
        '[attr.aria-disabled]': 'disabled',
        '[attr.tabindex]': 'tabindex'
    }
})
export class UfDropdownItem {

    private _disabled: boolean;

    @Input()
    set disabled(value: boolean) {
        this._disabled = value;
    }

    get disabled(): boolean {
        return this._disabled;
    }

    get tabindex() {
        if (this._disabled)
            return '-1';
    }

    constructor(public elementRef: ElementRef<HTMLElement>) {
    }
}

@Directive({
    selector: '[ufDropdownMenu]',
    host: {
        "tabindex": "-1",
        "role": "listbox",
        "class": "dropdown-menu"
    }
})

export class UnifunDropdownMenuDirective {

    @ContentChildren(UfDropdownItem) menuItems: QueryList<UfDropdownItem>;

    @Input() position: string = "left";

    constructor(private el: ElementRef, private render: Renderer2) {
    }

    isOpen: boolean = false;

    isEventFrom($event) {
        return this.el.nativeElement.contains($event.target);
    }

    enterPressed() {
        let selectedIndex = -1;
        this.menuItems.forEach(function (item, index) {
            if (item.elementRef.nativeElement.classList.contains('selected')) {
                selectedIndex = index
            }
        });

        return selectedIndex;

    }

    homePressed() {
        console.log(this.menuItems);
        let selectedIndex = -1;
        if (this.menuItems) {
            let length = this.menuItems.length;
            let that = this;
            this.menuItems.forEach(function (item, index) {
                if (item.elementRef.nativeElement.classList.contains('selected')) {
                    selectedIndex = index + 1;

                    if (selectedIndex > length - 1) {
                        selectedIndex = 0;
                    }

                    that.render.setAttribute(item.elementRef.nativeElement, "aria-selected", "false");
                    that.render.removeClass(item.elementRef.nativeElement, "selected");
                }
            });

            this.render.addClass(this.menuItems.first.elementRef.nativeElement, "selected");
            this.menuItems.first.elementRef.nativeElement.scrollIntoView();
            this.render.setAttribute(this.menuItems.first.elementRef.nativeElement, "aria-selected", "true");

        }

    }

    endPressed() {
        let selectedIndex = -1;
        if (this.menuItems) {
            let length = this.menuItems.length;
            let that = this;
            this.menuItems.forEach(function (item, index) {
                if (item.elementRef.nativeElement.classList.contains('selected')) {
                    selectedIndex = index + 1;

                    if (selectedIndex > length - 1) {
                        selectedIndex = 0;
                    }

                    that.render.setAttribute(item.elementRef.nativeElement, "aria-selected", "false");
                    that.render.removeClass(item.elementRef.nativeElement, "selected");
                }
            });

            this.render.addClass(this.menuItems.last.elementRef.nativeElement, "selected");
            this.menuItems.last.elementRef.nativeElement.scrollIntoView();
            this.render.setAttribute(this.menuItems.last.elementRef.nativeElement, "aria-selected", "true");
        }
    }

    keyDownPressed() {
        let selectedIndex = -1;
        if (this.menuItems) {
            let length = this.menuItems.length;
            let that = this;
            this.menuItems.forEach(function (item, index) {
                if (item.elementRef.nativeElement.classList.contains('selected')) {
                    selectedIndex = index + 1;

                    if (selectedIndex > length - 1) {
                        selectedIndex = 0;
                    }

                    that.render.setAttribute(item.elementRef.nativeElement, "aria-selected", "false");
                    that.render.removeClass(item.elementRef.nativeElement, "selected");
                }
            });

            this.menuItems.forEach(function (item, index) {
                if (index == selectedIndex) {
                    that.render.addClass(item.elementRef.nativeElement, "selected");
                    item.elementRef.nativeElement.scrollIntoView();
                    that.render.setAttribute(item.elementRef.nativeElement, "aria-selected", "true");
                }

            });


            return selectedIndex;

        }
    }

    keyUpPressed() {
        let selectedIndex = -1;
        if (this.menuItems) {
            let length = this.menuItems.length;
            let that = this;
            this.menuItems.forEach(function (item, index) {
                if (item.elementRef.nativeElement.classList.contains('selected')) {
                    selectedIndex = index - 1;

                    if (selectedIndex < 0) {
                        selectedIndex = length - 1;
                    }
                    that.render.removeClass(item.elementRef.nativeElement, "selected");

                }
            });

            this.menuItems.forEach(function (item, index) {
                if (index == selectedIndex) {
                    that.render.addClass(item.elementRef.nativeElement, "selected");
                    item.elementRef.nativeElement.scrollIntoView();
                }

            });

        }
    }

}

@Directive({
    selector: '[ufDropdownToggle]',
    host: {
        'class': 'dropdown-toggle',
        '[attr.aria-expanded]': 'dropdown.isOpen()',
        'aria-haspopup': 'true',
        '(click)': 'toggleOpen()'
    }
})

export class UnifunDropdownToggleDirective {

    constructor(
        @Inject(forwardRef(() => UnifunDropdownDirective)) private dropdown,
        private el: ElementRef
    ) {
    }

    toggleOpen() {
        this.dropdown.toggle();
    }

    isEventFrom($event) {
        return this.el.nativeElement.contains($event.target);
    }

    allPosition(){
        
    }
}


@Directive({
    selector: '[ufDropdown]',
    host: {
        '[class.show]' : 'isOpen()'
    }
})

export class UnifunDropdownDirective implements OnInit, OnDestroy {

    /**
     * Determine whether or not the dropwdonw menu is open
     *
     * @type {boolean}
     */
    @Input('open') _open: boolean = false;

    @Input() closeOnClickOnList: string = "true";
 

    private _closed$ = new Subject<null>();

    @Output() selectedIndex = new EventEmitter();

    @ContentChild(UnifunDropdownToggleDirective) private _toggle: UnifunDropdownToggleDirective;

    @ContentChild(UnifunDropdownMenuDirective) private _menu: UnifunDropdownMenuDirective;

    constructor(
        private el: ElementRef,
        private _ngZone: NgZone,
        private render: Renderer2,
        @Inject(DOCUMENT) private  _document: any,
        private _changeDetector: ChangeDetectorRef,
    ) {
    }

    ngOnInit() {

        if (this._open) {
            this._setCloseHandlers();
        }
    }

    ngOnDestroy() {
        this._closed$.next();
    }


    /**
     * Return a open boolean value
     *
     * @returns {boolean}
     */
    isOpen(): boolean {
        return this._open;
    }

    open(): void {
        if (!this._open) {
            if (!this.el.nativeElement.firstChild.hasOwnProperty('aria-expanded')) {
                this.render.setProperty(this.el.nativeElement.firstChild, 'aria-expanded', true);
            }

            this._open = true;
            this._setPosition();
            this._setCloseHandlers();
        }
    }

    _setPosition(){

    }




    /**
     * Close if a dropdown menu is open
     */
    close(): void {
        if (this._open) {

            if (this.el.nativeElement.firstChild.hasOwnProperty('aria-expanded')) {
                this.render.removeAttribute(this.el.nativeElement.firstChild, 'aria-expanded');
            }

            this._open = false;
            this._closed$.next();
        }
    }

    private _shouldCloseFromClick(event: MouseEvent) {


        if (event.button !== 2 && !this._isEventFromToggle(event)) {
            
            if (this.closeOnClickOnList == "false" && this._isEventFromMenu(event)) {
                return false;
            }
            return true;
        }

        return false;
    }

    private _shouldCloseFromWheel(event: WheelEvent) {

        return !this._isEventFromMenu(event);
    }

    private _shouldCloseFromScroll(event: UIEvent) {
        return !this._isEventFromMenu(event);
    }

    private _shouldCloseFromKeyUp(event: KeyboardEvent) {
        if (event.which === Key.Escape) {
            return true;
        } else if (event.which === Key.ArrowDown) {
            this.selectedIndex.emit(this._menu.keyDownPressed());
        } else if (event.which === Key.ArrowUp) {
            this._menu.keyUpPressed();
        } else if (event.which === Key.Home) {
            this._menu.homePressed();
        } else if (event.which === Key.End) {
            this._menu.endPressed();
        } else if (event.which == Key.Enter) {
            this.selectedIndex.emit(this._menu.enterPressed());
            this.close();
        }
    }


    _setCloseHandlers() {

        this._ngZone.runOutsideAngular(() => {

            const keyUp$ = fromEvent<KeyboardEvent>(this._document, 'keyup')
                .pipe(takeUntil(this._closed$), filter(event => this._shouldCloseFromKeyUp(event)));

            const clicks$ = fromEvent<MouseEvent>(this._document, 'click')
                .pipe(takeUntil(this._closed$), filter(event => this._shouldCloseFromClick(event)));

            const scroll$ = fromEvent<UIEvent>(window, 'scroll')
                .pipe(takeUntil(this._closed$), filter(event => this._shouldCloseFromScroll(event)));

            const dscroll$ = fromEvent<UIEvent>(document, 'scroll', {capture: true})
                .pipe(takeUntil(this._closed$), filter(event => this._shouldCloseFromScroll(event)));

            race<Event>([keyUp$, clicks$, scroll$, dscroll$]).subscribe(() => this._ngZone.run(() => {
                this.close();
                this._changeDetector.markForCheck();
            }));


        });
    }


    /**
     * Toggle a dropdown menu
     */
    toggle(): void {

        if (this.isOpen()) {
            this.close();
        } else {
            this.open();
        }

    }


    closeOpen(event): void {

        if (this._open && !this.el.nativeElement.contains(event.target)) {
            this._open = false;
        }
    }

    /**
     * Check if event is from dropdown menu or not
     *
     * @param $event
     * @return boolean
     */
    private _isEventFromMenu($event): boolean {
        return this._menu ? this._menu.isEventFrom($event) : false;
    }

    /**
     * Check if event is from toggle button or no t
     *
     * @param $event
     * @return boolean
     */
    private _isEventFromToggle($event): boolean {
        return this._toggle ? this._toggle.isEventFrom($event) : false;
    }
}
