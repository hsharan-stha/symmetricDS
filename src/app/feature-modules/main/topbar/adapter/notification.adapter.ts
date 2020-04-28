import {Adapter} from "@core/adapter";
import {TopbarNotification} from "../model/notification.model";

export class TopbarNotificationAdapter implements Adapter<TopbarNotification> {
    adapt(item: any): TopbarNotification {
        return new TopbarNotification(
            item.location,
            item.message
        )
    }
}