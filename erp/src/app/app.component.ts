import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  isSidenavOpen = true;

  ngOnInit() {
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isSidenavOpen = window.innerWidth > 768;
  }

  closeSidenav() {
    if (window.innerWidth <= 768) {
      this.isSidenavOpen = false;
    }
  }
}
