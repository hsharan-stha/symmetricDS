import { Component, OnInit,Renderer2,Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
      private renderer : Renderer2 ,
      @Inject(DOCUMENT) private document: Document,
  ) { }

  ngOnInit() {
    this.renderer.setStyle(this.document.body,"background","#ffffff");
  }

}
