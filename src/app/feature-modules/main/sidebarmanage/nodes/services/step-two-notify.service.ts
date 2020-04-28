import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable()
export class StepTwoNotifyService {

    private Notification = new BehaviorSubject([]);
    private BottomNotification = new BehaviorSubject([]);
    private TotalTablesNotification = new BehaviorSubject([]);

    getNotification = this.Notification.asObservable();
    getBottomNotification = this.BottomNotification.asObservable();
    getTotalTablesNotification = this.TotalTablesNotification.asObservable();

    constructor() {
    }

    setNotification(data) {
        this.Notification.next(data);
    }

    setBottomNotification(data) {
        this.BottomNotification.next(data);
    }

    setTotalTablesNotification(data) {
        this.TotalTablesNotification.next(data);

    }
}
