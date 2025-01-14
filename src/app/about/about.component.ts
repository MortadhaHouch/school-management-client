import { ThemeService } from './../services/theme.service';
import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.6s', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class AboutComponent implements OnInit {
  teamMembers: { name: string; role: string; image: string }[] = [];
  isDark: boolean = false;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.isDark = this.themeService.checkIsDark();

    // Simulate data fetching
    setTimeout(() => {
      this.teamMembers = [
        { name: 'Alex Johnson', role: 'Founder & CEO', image: '/assets/images/img-1.webp' },
        { name: 'Sarah Williams', role: 'Chief Technology Officer', image: '/assets/images/img-2.webp' },
        { name: 'Michael Lee', role: 'Head of Content', image: '/assets/images/img-3.jpg' }
      ];
    }, 1000);
  }
}
