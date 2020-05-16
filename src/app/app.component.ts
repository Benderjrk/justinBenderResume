import { Component, OnInit, Inject, HostListener, ViewChild, ElementRef } from "@angular/core";
import { Title, Meta } from "@angular/platform-browser";

import { Runtime, Inspector } from "@observablehq/runtime";
import notebook from "../assets/js/sunBurst.js";

import * as profileLinks from "../assets/json/links.json";

import { DOCUMENT } from "@angular/common";

@Component({
  selector: "app-root",
  template: `
    <style>
      .the-welcome-section {
        height: 400px;
      }
      .the-skill-section {
        
      }
      .the-contact-section {
        height: 200px;
      }
      .about-justin {
        background-color: lightBlue;
      }
      .demo-cards {
        background-color:lightGray;
        opacity: 70;
      }
      .justin-image {
        background-color: blue;
        background: #333 url(../assets/pics/justinBed.png);
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center top;
        min-height: 300px;
      }
      .skills-about {
        min-height: 150px;
      }
      .skills-graphic {
      }
      .contact-section {
        background-color: gray;
      }
    </style>
    <div class="container-fluid">
      <app-nav></app-nav>
      <div class="row the-welcome-section">
        <div
          class="about-justin col-sm-6 col-sx-11 col-md-8"
          id="welcome-section"
        >
          <p>I am going to be writing something here</p>
        </div>
        <div class="justin-image col-sm-6 col-md-4"></div>
      </div>
      <div class="row the-skill-section">
        <div class="skills-graphic col-md-8 col-xl-5">
          <div #skillsChart>

          </div>
        </div>
        <div class="skills-about col-md-4 col-xl-7 card-deck" id="skill-section">
        <div class="demo-cards m-3 col-xs-12 col-sm-11" style="">
            <div class="card-body">
              <h5 class="card-title">{{links.Links.flow.name}}</h5>
              <p class="card-text">{{links.Links.flow.desc}}</p>
              <a href="{{links.Links.flow.link}}" class="card-link">Navigate To {{links.Links.flow.name}}</a>
            </div>
          </div>
          <div *ngFor="let demo of demoLinks | keyvalue" class="demo-cards m-3 col-sm-10 col-md-11 col-lg-11 col-xl-5" style="">
            <div class="card-body">
              <h5 class="card-title">{{ demo.key }}</h5>
              <p class="card-text">{{demo.value.desc}}</p>
              <a href="{{demo.value.link}}" class="card-link">Navigate To Page</a>
            </div>
          </div>
        </div>
      </div>
      <div class="row the-demo-section">
        <div class="demo-section" id="demo-section"></div>
      </div>
      <div class="spinning-shape"></div>
      <div class="row the-contact-section">
        <div class="contact-section" id="contact-section"></div>
      </div>
    </div>
  `,
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
    console.log(this.demoLinks);
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
  ngAfterViewInit() {
    const runtime = new Runtime();
    const main = runtime.module(notebook, name => {
      
        return new Inspector(this.skillsChart.nativeElement);
      
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
