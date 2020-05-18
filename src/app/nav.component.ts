import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-nav",
  template: `
    <style>
      nav{
        border-bottom: 4px solid #70deda;
      }
      .btn{
        color: #70deda;
        font-family: aquire-thin;
      }
      .btn:hover{
        color: purple;
        border-top: 1px solid #70deda;
        border-left: 1px solid #70deda;
        border-right: 1px solid #70deda;
      }
      .nameLogo{
        color: #70deda;
        font-family: aquire;
        font-size: 40px;
        position: relative;
        margin-left: auto
      }
      #in-in-name {
        color: #672991;
      }
    </style>
    <div class="nameLogo col-sm-8 col-md-5 ml-auto">Just<span id="in-in-name">in</span> Bender</div>
    <app-contact class="row col-sm-5 col-md-4 col-lg-3 ml-auto"></app-contact>
    <nav class="row d-none d-sm-block">
      
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
          <a pageScroll href="#resume-section" class="btn">Download Resumé</a>
        </div>
      </div>
    </nav>
  `
})
export class AppNavComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
