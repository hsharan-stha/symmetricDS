import {Component, Input, OnInit} from '@angular/core';
import {ChannelService} from "@sidebarconfigure/channels/services/channel.service";
import {StepTwoConstantValue} from "@sidebarmanage/nodes/data/step-two-constant-value.enum";
import {StepTwoNotifyService} from "@sidebarmanage/nodes/services/step-two-notify.service";

@Component({
    selector: 'app-data-load-step-two',
    templateUrl: './data-load-step-two.component.html',
    styleUrls: ['./data-load-step-two.component.css']
})
export class DataLoadStepTwoComponent implements OnInit {

    @Input() visibleStep2: boolean;
    @Input() selectedChannelID: string;
    showDrop: boolean = false;
    showTextBox: boolean = false;
    @Input() groupName: string;
    trigger: string;
    router: string;
    createTable: string;
    deleteFirst: string;
    beforeCustomSQL: string;
    allTableForChannel;
    checkedRadioTop: number;
    checkedRadioBottom: number;
    stepTwoConstantValue;
    inputType: string = "text";

    constructor(private channelService: ChannelService,
                private stepTwoNotifyService: StepTwoNotifyService
    ) {
    }

    ngOnInit() {
        this.setBottomRadioNotification(0);
        this.setTopRadioNotification(0);
        this.initializeConstantValue();
    }

    initializeConstantValue(): void {
        this.stepTwoConstantValue = {
            check_top_one: StepTwoConstantValue.CHECK_TOP_ONE,
            check_top_two: StepTwoConstantValue.CHECK_TOP_TWO,
            check_top_three: StepTwoConstantValue.CHECK_TOP_THREE,
            check_bottom_four: StepTwoConstantValue.CHECK_BOTTOM_FOUR,
            check_bottom_five: StepTwoConstantValue.CHECK_BOTTOM_FIVE,
            check_bottom_six: StepTwoConstantValue.CHECK_BOTTOM_SIX,
            check_bottom_seven: StepTwoConstantValue.CHECK_BOTTOM_SEVEN,
            check_bottom_eight: StepTwoConstantValue.CHECK_BOTTOM_EIGHT,
        }
    }

    actionTop(evt) {
        this.checkedRadioTop = evt;
        this.setTopRadioNotification(this.checkedRadioTop);
        this.trigger = (evt === 1 || evt === 3) ? 'ALL' : '';
        this.router = (evt === 1 || evt === 3) ? 'ALL' : '';
        this.showDrop = (evt === 3);
        (evt === 3) ? this.getChannelIdColumn() : '';
    }

    actionBottom(evt) {
        this.checkedRadioBottom = evt;
        this.setBottomRadioNotification(this.checkedRadioBottom);
        this.createTable = (evt === 5) ? "1" : "0";
        this.deleteFirst = (evt === 6 || evt === 7) ? "1" : "0";
        this.beforeCustomSQL = (evt === 7) ? "truncate table %s" : null;
        this.showTextBox = (evt === 8 || evt === 7);
        this.inputType = (evt === 8) ? "text" : "hidden";
    }

    getChannelIdColumn(): void {
        this.channelService.getByChannelId().subscribe(
            data => {
                this.allTableForChannel = data;
            }
        );
    }

    setTopRadioNotification(value): void {
        this.stepTwoNotifyService.setNotification(value);
    }

    setBottomRadioNotification(value): void {
        this.stepTwoNotifyService.setBottomNotification(value);
    }
}
