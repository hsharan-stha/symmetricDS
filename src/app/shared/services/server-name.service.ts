import {Injectable} from '@angular/core';
import {API} from "@config/url";


@Injectable()
export class ServerNameService {

    private nodeID;
    private role;

    constructor() {
    }

    getServer(): string {
        return this.nodeID;
    }

    getRole(): String {
        return this.role;
    }

    setServer(): void {
        this.nodeID = localStorage.getItem(API.serverName) === null ? 1 : localStorage.getItem(API.serverName);
    }


    setRole(): void {
        this.role = atob(localStorage.getItem(API.roleName));
    }
}
