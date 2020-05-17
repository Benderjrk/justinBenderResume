import { Component, OnInit } from "@angular/core";

import * as profileLinks from "../assets/json/links.json";

@Component({
  selector: "app-contact",
  template: `
    <style>
        .social-media-links {
            color: #70deda;
        }
    </style>
    <div class="row">
        <div
            *ngFor="let link of onlineLinks | keyvalue"
            class=""
        >
        <a target="_blank" rel="noopener noreferrer" href="{{link.value.link}}">
            <i class="social-media-links fa fa-{{ link.key }} fa-2x ml-4 mr-4"></i>
        </a>
        
        </div>
    </div>
    
    
  `
})
export class AppContactComponent implements OnInit {
    public links: any = (profileLinks as any).default;
    public onlineLinks = {}

  constructor() {
    this.onlineLinks = this.links.Links.online;
  }

  ngOnInit() {}
}
