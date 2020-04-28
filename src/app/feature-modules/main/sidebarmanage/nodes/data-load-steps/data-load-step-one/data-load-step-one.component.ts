import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {Constant} from "@sidebarmanage/nodes/data/constant-value.enum";
import {NodesService} from "@sidebarmanage/nodes/services/nodes.service";
import {DataLoadStepOneColumnsList} from "@sidebarmanage/nodes/cols.table";
import {NodeIdentityService} from "@sidebarmanage/nodes/services/nodes-identity.service";

@Component({
    selector: 'app-data-load-step-one',
    templateUrl: './data-load-step-one.component.html',
    styleUrls: ['./data-load-step-one.component.css']
})
export class DataLoadStepOneComponent implements OnInit {
    @Input() visibleStep1: boolean;
    @Input() groupName: string;
    nodesData = [];
    sort_order: string = Constant.SORT_ORDER;
    sort_by: string = Constant.SORT_BY;
    meta;
    page: number = 1;
    selectedNodeId;
    columnsList;
    table_loader: boolean;
    disabledRadio: boolean = true;
    target_node: string;
    source_node: string;
    checkedRadio: number;
    isMoreDataExists: boolean = true;

    constructor(public nodesService: NodesService,
                private el: ElementRef,
                private nodeIdentityService: NodeIdentityService
    ) {
    }

    ngOnInit() {
        this.setMeta();
        this.getNodes(this.meta);
        this.columnsList = DataLoadStepOneColumnsList;
    }

    getNodes(meta): void {
        if (this.isMoreDataExists) {
            this.table_loader = true;
            let list: any[];
            this.nodesService.get(meta).subscribe(
                data => {
                    list = data;
                },
                error1 => {
                },
                () => {
                    if (list.length > 0) {
                        for (let i = 0; i < list.length; i++) {
                            this.nodesData.push(list[i]);
                        }
                    }
                    if (list.length < 20) {
                        this.isMoreDataExists = false;
                    }
                    this.table_loader = false;
                }
            );
        }
    }

    setMeta(): void {
        this.meta = {
            sort_by: this.sort_by,
            sort_order: this.sort_order,
            page: this.page
        };
    }

    action(e) {
        this.checkedRadio = e;
        if (this.checkedRadio === 1) {
            this.setTargetNodeId();
            this.nodeIdentityService.get().subscribe(data => {
                this.source_node = data[0].node_id;
            });
        } else {
            this.setSourceNodeID();
            this.nodeIdentityService.get().subscribe(data => {
                this.target_node = data[0].node_id;
            });
        }
    }

    getNodesForDataloadStepOne(meta): void {
        this.table_loader = true;
        let list: any;
        this.nodesService.get(meta).subscribe(
            data => {
                this.nodesData = data;
                this.table_loader = false;
            }
        );
    }

    rowClick($id) {
        this.selectedNodeId = $id;
        this.disabledRadio = false;
        this.setTargetNodeId();
        this.setSourceNodeID();

    }


    sortEvent($event) {
        this.isMoreDataExists = true;
        this.sort_order = $event.sort_order;
        this.sort_by = $event.sort_by;
        let meta = {
            sort_by: this.sort_by,
            sort_order: this.sort_order,
            page: this.page
        };
        this.getNodesForDataloadStepOne(meta);
    }

    pageNumber($event) {
        this.page = $event;
        if (!this.isMoreDataExists) {
            this.page = 1;
        }

        let meta = {
            sort_by: this.sort_by,
            sort_order: this.sort_order,
            page: this.page
        };
        this.getNodes(meta);
    }

    setTargetNodeId(): void {
        if (this.checkedRadio === 1)
            this.target_node = this.selectedNodeId;
    }

    setSourceNodeID(): void {
        if (this.checkedRadio === 0)
            this.source_node = this.selectedNodeId;
    }


}
