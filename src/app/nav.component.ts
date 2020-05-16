import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-nav",
  template: `
    <nav class="navbar navbar-light bg-light">
      <a class="navbar-brand d-none d-sm-block" href="#">
        <img
          src="/docs/4.0/assets/brand/bootstrap-solid.svg"
          width="30"
          height="30"
          class="d-inline-block align-top"
          alt=""
        />
        Justin Bender
      </a>
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" href="#">Features</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Pricing</a>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" href="#">Disabled</a>
        </li>
      </ul>
    </nav>
  `,
  styles: [".navbar-brand{ }"],
})
export class AppNavComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
