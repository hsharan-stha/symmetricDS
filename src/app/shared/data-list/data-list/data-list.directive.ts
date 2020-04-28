import {
    ContentChildren,
    Directive,
    ElementRef,
    EventEmitter, forwardRef,
    HostListener, Inject, Output,
    QueryList,
    Renderer2
} from '@angular/core';
import {TableHeaderComponent} from "@shared/data-list/data-list/table-header/table-header.component";

@Directive({
    selector: '[appDataList]',
})
export class DataListDirective {
    @Output() currentSortOrder = new EventEmitter();

    @ContentChildren(TableHeaderComponent, {descendants: true}) tableHeader: QueryList<TableHeaderComponent>;

    constructor(
        private el: ElementRef,
        private render: Renderer2,
        @Inject(forwardRef(() => DataTableDirective)) private datatable
    ) {
    }

    @HostListener('click') sortOrder() {
        let that = this;
        let elementAttributes = this.el.nativeElement.attributes;
        let attributeList = this.requiredAttributes(elementAttributes);
        this.datatable.removeAllClasses();
        let needToSet = (attributeList.sort_order == "desc") ? "asc" : "desc";
        this.render.setAttribute(this.el.nativeElement, "aria-sort-order", needToSet);
        if (needToSet == "desc") {
            this.tableHeader.forEach(function (item, index) {
                that.removeClassFromDescAddToAsc(item);
            });
        } else {
            this.tableHeader.forEach(function (item, index) {
                that.removeClassFromAscAddToDesc(item);
            });
        }
        attributeList.sort_order = needToSet;
        this.currentSortOrder.emit(attributeList);
    }


    requiredAttributes(attributes) {
        let status: {
            sort_order: string,
            sort_by: string
        } = {
            sort_order: "",
            sort_by: ""
        };
        for (let i = 0; i < attributes.length; i++) {
            if (attributes[i].name == "aria-sort-order") {
                status.sort_order = attributes[i].value;
                break;
            } else if (attributes[i].name == "aria-name") {
                status.sort_by = attributes[i].value;
            }
        }

        return status;
    }

    removeClassFromAscAddToDesc(item) {
        this.render.removeClass(item.asc.nativeElement, "visbility-hidden");
        this.render.addClass(item.desc.nativeElement, "visbility-hidden");
    }

    removeClassFromDescAddToAsc(item) {
        this.render.addClass(item.asc.nativeElement, "visbility-hidden");
        this.render.removeClass(item.desc.nativeElement, "visbility-hidden");
    }

    removeClassFromBothOrder(item) {
        this.render.removeClass(item.asc.nativeElement, "visbility-hidden");
        this.render.removeClass(item.desc.nativeElement, "visbility-hidden");
    }

    removeVisisbilityHiddenClass() {
        let that = this;
        this.tableHeader.forEach(function (item, index) {
            that.removeClassFromBothOrder(item);
        });

    }

}

@Directive({
    selector: '[appDataListTable]',
})
export class DataTableDirective {

    @ContentChildren(DataListDirective) sortOrder: QueryList<DataListDirective>;

    constructor(private el: ElementRef, private render: Renderer2) {
    }

    removeAllClasses() {

        this.sortOrder.forEach(function (item, index) {
            item.removeVisisbilityHiddenClass()
        })
    }


}
