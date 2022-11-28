import { AuthService } from './../../services/auth.service';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialService } from '../../classes/material.service';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.css']
})
export class SiteLayoutComponent implements AfterViewInit {

  @ViewChild("floating")
  floatingRef!: ElementRef; // pass reference of our target element

  links = [
    { url: '/overview', name: 'Overview' },
    { url: '/analytics', name: 'Analytics' },
    { url: '/history', name: 'History' },
    { url: '/order', name: 'Add order' },
    { url: '/categories', name: 'Categories' },
  ];

  constructor(private auth: AuthService, private router: Router) { }

  ngAfterViewInit(): void { // this method meant that component is ready for working after loading
    MaterialService.initializeFloatingButton(this.floatingRef)
  }

  logout(event: Event) {
    event.preventDefault();
    localStorage.clear(),
    this.auth.logout(),
    this.router.navigate(['/login'])
  }

}
