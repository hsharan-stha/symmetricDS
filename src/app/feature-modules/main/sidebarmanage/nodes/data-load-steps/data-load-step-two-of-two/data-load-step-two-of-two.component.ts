import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {SourceTablesNameService} from "@sidebarconfigure/tabletriggers/services/source-tables-name.service";
import {AlertMessageService} from "@shared/services/alert-message.service";
import {stepTwoofTwoColumnList} from "@sidebarmanage/nodes/cols.table";
import {StepTwoNotifyService} from "@sidebarmanage/nodes/services/step-two-notify.service";

@Component({
    selector: 'app-data-load-step-two-of-two',
    templateUrl: './data-load-step-two-of-two.component.html',
    styleUrls: ['./data-load-step-two-of-two.component.css']
})
export class DataLoadStepTwoOfTwoComponent implements OnInit, OnChanges {

    @Input() visibleStep2of2: boolean;
    @Input() groupName: string;
    @Input() nodesTemplateData;
    columnsList;
    table_loader: boolean;
    SourceTableNameData;
    meta;
    page: number = 1;
    sort_order: string = "asc";
    sort_by: string = "source_catalog_name";
    source_node_id;
    target_node_id;
    forTwoOfTwo: boolean = true;
    filterField;
    triggerlist: string = "";
    routerlist: string = "";
    totalTables: number;

    constructor(
        private sourceTableNameService: SourceTablesNameService,
        private alertService: AlertMessageService,
        private stepTwoNotifyService: StepTwoNotifyService
    ) {
    }

    ngOnInit() {
        this.columnsList = stepTwoofTwoColumnList;
        this.filterField = ['source_table_name'];
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['nodesTemplateData'])
            if (!changes['nodesTemplateData'].firstChange) {
                let data = changes['nodesTemplateData'].currentValue;
                this.source_node_id = data.source_node_id;
                this.target_node_id = data.target_node_id;

                /*
                 not allowed to load getSourceTableName
                  before
                  only after needed
                  */
                if (changes['nodesTemplateData'].currentValue && changes['nodesTemplateData'].previousValue) {
                    if (typeof changes['nodesTemplateData'].previousValue === 'object') {
                        if (typeof changes['nodesTemplateData'].previousValue['target_node_id'] === 'string') {
                            if (this.nodesTemplateData.trigger_id === "") {
                                this.setMeta();
                                this.getSourceTableNames(this.meta);
                            }

                        }
                    }
                }

            }
    }

    getSourceTableNames(meta): void {
        this.table_loader = true;
        this.sourceTableNameService.get(meta).subscribe(
            data => {
                this.SourceTableNameData = data;
                this.table_loader = false;
            },
            error => {
                this.failure(error['error']['result']);

            }
        );
    }

    setMeta(): void {
        this.meta = {
            sort_by: this.sort_by,
            sort_order: this.sort_order,
            page: this.page,
            source_node_id: this.source_node_id,
            target_node_id: this.target_node_id
        };
    }

    sortEvent($event) {
        this.sort_order = $event.sort_order;
        this.sort_by = $event.sort_by;
        let meta = {
            sort_by: this.sort_by,
            sort_order: this.sort_order,
            page: this.page
        };
        this.getSourceTableNames(meta);
    }

    pageNumber($event) {
        this.page = $event;
        let meta = {
            sort_by: this.sort_by,
            sort_order: this.sort_order,
            page: $event
        };
        this.getSourceTableNames(meta);
    }

    totalSelectedTables($event) {
        this.totalTables = $event.length;
        this.stepTwoNotifyService.setTotalTablesNotification(this.totalTables);
        let allRouter = "";
        let allTrigger = "";
        $event.forEach(function (element, val) {
            element = element.toString().split(":");
            allRouter = allRouter + "," + element[1];
            allTrigger = allTrigger + "," + element[2];
        });
        this.routerlist = allRouter;
        this.triggerlist = allTrigger;

    }

    failure(message): void {
        this.alertService.show({
            message: message,
            alertType: "danger"
        });
    }

}
