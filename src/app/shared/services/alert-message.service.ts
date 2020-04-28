import {
    EmbeddedViewRef,
    Injectable,
    ComponentFactoryResolver,
    ComponentRef,
    ApplicationRef,
    Injector
} from '@angular/core'

import {AlertMessageComponent} from './../../alert-message/alert-message.component';

@Injectable({
    providedIn: 'root'
})
export class AlertMessageService {

    componentRef: ComponentRef<AlertMessageComponent>;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private appRef: ApplicationRef,
        private injector: Injector
    ) {
    }

    /**
     * Show the alert component by attaching to body 
     * 
     * @param data 
     */
    show(data) {

        this.drop();
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertMessageComponent);
        this.componentRef = componentFactory.create(this.injector);

        this.appRef.attachView(this.componentRef.hostView);
        this.componentRef.instance.data = data;
        if (data.destroy !== false) {
            this.componentRef.instance.close.subscribe(
                (data) => this.drop()
            );
        }

        const domElem = (this.componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
        document.body.appendChild(domElem);
    }

    cancel(){
        this.drop();
    }

    /**
     * Drop a component if exists
     *
     * @return void
     */
    private drop() {
        if (this.componentRef) {
            this.appRef.detachView(this.componentRef.hostView);
            this.componentRef.destroy();
        }
    }
}