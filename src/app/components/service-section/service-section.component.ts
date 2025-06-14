import { Component, OnInit } from '@angular/core';
import { ServiceSectionService } from './service-section.service';
import { SectionService } from './section-service.interface';

@Component({
  selector: 'app-service-section',
  standalone: true,
  imports: [],
  templateUrl: './service-section.component.html',
  styleUrls: [
    '../../../assets/commons.scss',
    './service-section.component.scss',
  ],
})
export class ServiceSectionComponent implements OnInit {
  services: SectionService[] = [];
  constructor(private sectionService: ServiceSectionService) {

  }

  ngOnInit(): void {
    this.sectionService.getServices().subscribe(services => {
      this.services = services;
    })


  }


}
