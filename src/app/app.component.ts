import { Component, AfterViewInit, OnInit, Inject, HostListener, ViewChild, ElementRef } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

import { Runtime, Inspector } from "@observablehq/runtime";
import notebook from "../assets/js/sunBurst.js";
import notebookFirst from "../assets/js/rotating.js";

import * as profileLinks from "../assets/json/links.json";

import { DOCUMENT } from "@angular/common";

@Component({
  selector: "app-root",
  templateUrl: "./app.html",
  animations: [
    trigger('onScrollIntoView', [
      state('false', style({opacity: 0, transform: 'translateY(-100px)'})),
      state('true', style({ opacity: 1, transform: 'none' })),
      transition('false => true', animate(700))
    ])
  ],
  styleUrls: ["./app.css"]
})
export class AppComponent implements OnInit, AfterViewInit {
  public links: any = (profileLinks as any).default;
  public cardsInView = false;
  public onlineLinks = {}
  public demoLinks = {}
  public updateForServiceWorker = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private swUpdate: SwUpdate
  ) {}

  @HostListener('window:scroll', [])
    onScroll(): void {
      this.areCardsInView();
  }

  @ViewChild('skillsChart') skillsChart: ElementRef;
  @ViewChild('rotatingShape') rotatingShape: ElementRef;

  ngOnInit() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        this.updateForServiceWorker = true;
      });
  }
    this.demoLinks = this.links.Links.demos;
  }

  
  
  ngAfterViewInit() {
    const runtimeFirst = new Runtime();
    const mainFirst = runtimeFirst.module(notebook, name => {
        return new Inspector(this.skillsChart.nativeElement);
    });
    const runtime = new Runtime();
    const main = runtime.module(notebookFirst, name => {
        return new Inspector(this.rotatingShape.nativeElement);
    });
  }
  
  areCardsInView() {
    const homeCards = this.document.querySelector('#demo-section');
    const cardBounding = homeCards.getBoundingClientRect();
    if (
      cardBounding.top <= 180
    ) {
      this.cardsInView = true;
    }
  }

  public goToPageTop(event) {
    event.stopPropagation();
    window.scrollTo(0, 0);
  }

  updateSW() {
    this.updateForServiceWorker = false;
    this.document.location.reload();
  }

}
