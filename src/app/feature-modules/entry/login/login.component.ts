import {Component, OnInit, Renderer2, Inject, AfterViewInit, OnDestroy} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Login} from './../model/login.model';
import {Router} from '@angular/router';

import {AuthService} from '@shared/services/auth.service';
import {NodeService} from './../services/node.service';
import {LoginService} from './../services/login.service';
import {API} from "@config/url";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {

    loginForm: FormGroup;

    loader: boolean = false;

    submitted: boolean = false;

    nodes: any;

    isNodeListLoaded: boolean = false;

    loginData: Login;

    errorMessage: string;

    $authMessage;

    dismissTime;

    constructor(
        private renderer: Renderer2,
        @Inject(DOCUMENT) private document: Document,
        private fb: FormBuilder,
        private nodeService: NodeService,
        private service: LoginService,
        private authService: AuthService,
        private router: Router
    ) {
    }

    ngOnInit() {

        this.renderer.setStyle(this.document.body, "background", "#9a9a9a");

        this.createForm();

        this.$authMessage = this.authService.messageSource.subscribe(
            (data) => {
                this.errorMessage = data;
            }
        )

    }

    ngOnDestroy() : void {

        this.$authMessage.unsubscribe();
        this.errorMessage = "";
    }


    ngAfterViewInit() : void {
        this.getNodeList();
        this.remove();
    }

    /**
     * Remove a alert div
     *
     * @return void
     */
    remove() {

        if (this.errorMessage) {
            let fadeOutTime = 2000;
            this.dismissTime = setTimeout(() => {
                this.errorMessage = "";
            }, fadeOutTime);
        }

    }


    /**
     * Get a list of nodes
     *
     * @return void
     */
    getNodeList() {
        this.nodeService.get().subscribe(
            (data) => {
                this.nodes = data;
                this.isNodeListLoaded = true;
            },
            (error) => {
                console.log(error);
                this.errorMessage = error.result;

            }
        );
    }

    /**
     * Create a login form
     *
     * @return void
     */
    createForm() : void {
        this.loginForm = this.fb.group({
            username: ["", Validators.required],
            password: ["", Validators.required],
            node: ["", Validators.required]
        });
    }

    get field() {
        return this.loginForm.controls;
    }

    onSubmit() {
        this.errorMessage = "";
        this.submitted = true;
        this.loader = this.loginForm.valid;
        if (this.loader) {
            this.loginData = this.loginForm.value;
            this.service.login(this.loginData).subscribe(
                (data) => {
                    
                    this.loginForm.get("password").setValue("");
                    if (data['responceCode'] === 0) {
                        this.storeNodeDataInLocal(this.loginData.node);
                        this.router.navigate([API.dashboard]);
                    } else {
                        this.errorMessage = data['result'];
                    }
                },
                (error) => {
                    
                    this.errorMessage = error['error']['result'];
                    this.loader = this.submitted = false;
                    this.loginForm.get("password").setValue("");
                },
                () => {
                    this.loader = this.submitted = false;
                }
            );
        }
    }

    storeNodeDataInLocal(nodeId):void {
        localStorage.setItem(API.serverName, nodeId);
        localStorage.setItem(API.nodeServerName, this.getByNodeId(nodeId));

    }

    getByNodeId(id){
        let nodeName : string = '';
        for(let i=0 ; i< this.nodes.length; i++){
            if(this.nodes[i].id == id){
                nodeName = this.nodes[i].name ; 
                break ; 
            }
        }
        return nodeName ; 
    }

    nodeTrackBy(index, item){
        return index+"_"+item.id ; 
    }


}
