import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-nav",
  template: `
    <nav class="row">
      <div class="col-sm-3 m-auto d-none d-sm-block">Justin Bender</div>
      <div class="row col-sm-8">
        <div class="m-auto">
          <a href="#welcome-section">Welcome</a>
        </div>
        <div class="m-auto">
          <a href="#skill-section">Skills</a>
        </div>
        <div class="m-auto">
          <a href="#contact-section">Get In Touch</a>
        </div>
      </div>
    </nav>
  `,
  styles: [
      "nav{ background-color: teal; height: 50px;}"
    ],
})
export class AppNavComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
