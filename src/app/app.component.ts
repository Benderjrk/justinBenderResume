import { Component, OnInit, Inject, HostListener, ViewChild, ElementRef } from "@angular/core";
import { Title, Meta } from "@angular/platform-browser";

import { Runtime, Inspector } from "@observablehq/runtime";
import notebook from "../assets/js/sunBurst.js";
import notebookFirst from "../assets/js/rotating.js";

import * as profileLinks from "../assets/json/links.json";

import { DOCUMENT } from "@angular/common";

@Component({
  selector: "app-root",
  templateUrl: "./app.html",
  styleUrls: ["./app.css"]
})
export class AppComponent implements OnInit {
  public links: any = (profileLinks as any).default;
  public cardsInView = false;
  public onlineLinks = {}
  public demoLinks = {}

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private title: Title,
    private meta: Meta
  ) {}

  // @HostListener('window:scroll', [])
  //   onScroll(): void {
  //     this.areCardsInView();
  // }

  ngOnInit() {
    this.demoLinks = this.links.Links.demos;
    this.onlineLinks = this.links.online;
    // SEO metadata
    this.title.setTitle("Justin Bender Resume");
    this.meta.addTag({
      name: "description",
      content:
        "Justin Bender would like to present himself to the world of opportunity.",
    });

    // facebook metadata
    this.meta.addTag({
      name: "og:url",
      content: "https://www.benderjustin.com",
    });
    this.meta.addTag({ name: "og:title", content: "Justin Bender's page" });
    this.meta.addTag({
      name: "og:description",
      content:
        "Justin Bender would like to present himself to the world of opportunity.",
    });
    this.meta.addTag({
      name: "og:image",
      content: "https://www.benderjustin.com/assets/justinb.jpg",
    });

    // Twitter metadata
    this.meta.addTag({ name: "twitter:card", content: "summary" });
    this.meta.addTag({
      name: "twitter:site",
      content: "https://www.benderjustin.com",
    });
    this.meta.addTag({
      name: "twitter:title",
      content: "Justin Bender's page",
    });
    this.meta.addTag({
      name: "twitter:description",
      content:
        "Justin Bender would like to present himself to the world of opportunity.",
    });
    this.meta.addTag({
      name: "twitter:text:description",
      content:
        "Justin Bender would like to present himself to the world of opportunity.",
    });
    this.meta.addTag({
      name: "twitter:image",
      content: "https://www.benderjustin.com/assets/justinb.jpg",
    });
  }

  @ViewChild('skillsChart') skillsChart: ElementRef;
  @ViewChild('rotatingShape') rotatingShape: ElementRef;
  
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
  
  // areCardsInView() {
  //   const homeCards = this.document.querySelector('.top-products');
  //   const cardBounding = homeCards.getBoundingClientRect();
  //   if (
  //     cardBounding.top >= 0 &&
  //     cardBounding.left >= 0 &&
  //     cardBounding.right <= (this.window.innerWidth || this.document.documentElement.clientWidth) &&
  //     cardBounding.bottom <= (this.window.innerHeight || this.document.documentElement.clientHeight)
  //   ) {
  //     this.cardsInView = true;
  //   }
  // }

  public goToPageTop(event) {
    event.stopPropagation();
    window.scrollTo(0, 0);
  }
}
