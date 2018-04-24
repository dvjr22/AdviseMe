import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {

  isAbout = false;

  profiles = [
    {
      'name': 'Tyler Hall',
      'linkedin': 'https://www.linkedin.com/in/tbhall',
      'role': 'Team Captain',
    },
    {
      'name': 'Lawton Mizell',
      'linkedin': 'https://www.linkedin.com/in/lawton-mizell-a70b3493/',
      'role': 'Backend Developer',
    },
    {
      'name': 'Diego Valdes',
      'linkedin': 'https://www.linkedin.com/in/diego-valdes',
      'role': 'Database Architect',
    },
    {
      'name': 'Ethan Harmon',
      'linkedin': 'https://www.linkedin.com/in/ethan-harmon-1b809a129',
      'role': 'Frontend Developer',
    },
    {
      'name': 'Tyler Moon',
      'linkedin': 'https://www.linkedin.com/in/tyler-moon-21036393',
      'role': 'DevOps Engineer',
    },
  ];

  constructor(private router: Router) { }

  ngOnInit() {
    if (this.router.url === '/about') {
      this.isAbout = true;
    }
  }

  login(event) {
    this.router.navigate(['/auth/login']);
  }

}
