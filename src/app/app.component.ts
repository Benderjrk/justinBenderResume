import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

import * as justinSkills from '../assets/json/justin-skills.json';
import * as profileLinks from '../assets/json/links.json';


import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  template: `
  <app-nav></app-nav>
  <div>Hellp</div>

  `,
  styles: []
})
export class AppComponent implements OnInit {

  public skills: any = (justinSkills as any).default;
  public links: any = (profileLinks as any).default;
  public cardsInView = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private title: Title,
    private meta: Meta
  ) { }

  // @HostListener('window:scroll', [])
  //   onScroll(): void {
  //     this.areCardsInView();
  // }

  ngOnInit() {
    console.log(this.skills)
    // SEO metadata
    this.title.setTitle('Justin Bender Resume');
    this.meta.addTag({name: 'description', content: 'Justin Bender would like to present himself to the world of opportunity.'});

    // facebook metadata
    this.meta.addTag({name: 'og:url', content: 'https://www.benderjustin.com'});
    this.meta.addTag({name: 'og:title', content: 'Justin Bender\'s page'});
    this.meta.addTag({name: 'og:description', content: 'Justin Bender would like to present himself to the world of opportunity.'});
    this.meta.addTag({name: 'og:image', content: 'https://www.benderjustin.com/assets/justinb.jpg'});

    // Twitter metadata
    this.meta.addTag({name: 'twitter:card', content: 'summary'});
    this.meta.addTag({name: 'twitter:site', content: 'https://www.benderjustin.com'});
    this.meta.addTag({name: 'twitter:title', content: 'Justin Bender\'s page'});
    this.meta.addTag({name: 'twitter:description', content: 'Justin Bender would like to present himself to the world of opportunity.'});
    this.meta.addTag({name: 'twitter:text:description', content: 'Justin Bender would like to present himself to the world of opportunity.'});
    this.meta.addTag({name: 'twitter:image', content: 'https://www.benderjustin.com/assets/justinb.jpg'});
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
