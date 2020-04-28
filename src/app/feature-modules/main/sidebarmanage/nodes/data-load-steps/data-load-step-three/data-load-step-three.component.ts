import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {StepTwoConstantValue} from "@sidebarmanage/nodes/data/step-two-constant-value.enum";
import {StepTwoNotifyService} from "@sidebarmanage/nodes/services/step-two-notify.service";

@Component({
    selector: 'app-data-load-step-three',
    templateUrl: './data-load-step-three.component.html',
    styleUrls: ['./data-load-step-three.component.css']
})
export class DataLoadStepThreeComponent implements OnInit, OnChanges {

    @Input() visibleStep3: boolean;
    @Input() nodesTemplateData;
    tableNumber;
    tableBeforeAction;
    BottomRadio;

    constructor(private stepTwoNotifyService: StepTwoNotifyService) {
    }

    ngOnInit() {
    }


    ngOnChanges(changes: SimpleChanges): void {
        if (changes['nodesTemplateData'])
            if (!changes['nodesTemplateData'].firstChange) {
                let data = changes['nodesTemplateData'].currentValue;
                this.finalizeData(data);
            }
    }

    finalizeData(data): void {
        // alert(JSON.stringify(data));
        this.stepTwoNotifyService.getTotalTablesNotification.subscribe(data => {
            this.tableNumber = data;
        });
        if (data.trigger_id === "ALL" && data.router_id === "ALL") {
            if (data.channel_id != null) {
                this.tableNumber = StepTwoConstantValue.CHECK_TOP_THREE;
            } else {
                this.tableNumber = StepTwoConstantValue.CHECK_TOP_ONE;
            }
        }

        this.stepTwoNotifyService.getBottomNotification.subscribe(data => {
            this.BottomRadio = data;
        });
        switch (this.BottomRadio) {
            case 5:
                this.tableBeforeAction = StepTwoConstantValue.CHECK_BOTTOM_FIVE;
                break;
            case 6:
                this.tableBeforeAction = StepTwoConstantValue.CHECK_BOTTOM_SIX;
                break;
            case 7:
                this.tableBeforeAction = StepTwoConstantValue.CHECK_BOTTOM_SEVEN;
                break;
            case 8:
                this.tableBeforeAction = StepTwoConstantValue.CHECK_BOTTOM_EIGHT;
                break;
            default:
                this.tableBeforeAction = StepTwoConstantValue.CHECK_BOTTOM_FOUR;
                break;
        }
    }

}
