import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-pdf-certs",
  template: `
    <style>
        
    </style>
    <div class="row">
        <div
            *ngFor="let pdf of pdfsForDisplay"
            class="col-md-4"
        >
        <iframe src="assets/pdf/{{pdf}}" width="100%" height="100%" frameborder="0" | safe>
        </iframe>
        </div>
    </div>
    
    
  `
})
export class CertificatesComponent implements OnInit {
    public pdfsForDisplay = [
        'd3js-course.pdf',
        'javascript-algor-course.pdf',
        'nodejs-course.pdf',
        'php-security-certificate.pdf',
        'nodejs-security-course.pdf',
        'M101JS - Course Completion Confirmation',
        'bootstrap4.pdf',
        'Angular2+QuickCourse.pdf'
    ]

  constructor() {
  }

  ngOnInit() {}
}
