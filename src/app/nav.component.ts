import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-nav",
  template: `
    <div class="col-sm-3 ml-auto nameLogo">Justin Bender</div>
    <nav class="row  d-none d-sm-block">
      
      <div class="row col-sm-8">
        <div class="m-auto">
          <a pageScroll href="#welcome-section" class="btn">Welcome</a>
        </div>
        <div class="m-auto">
          <a pageScroll href="#skill-section" class="btn">Skills</a>
        </div>
        <div class="m-auto">
          <a pageScroll href="#demo-section" class="btn">Hosted Demos</a>
        </div>
        <div class="m-auto">
          <a pageScroll href="#contact-section" class="btn">Get In Touch</a>
        </div>
      </div>
    </nav>
  `,
  styles: [
      "nav{ border-bottom: 4px solid #70deda;}",
      ".btn{ color: #70deda;}",
      ".nameLogo{ color: #70deda;}"
    ],
})
export class AppNavComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
