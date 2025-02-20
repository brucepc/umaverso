import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CategoryMenuComponent } from '../../components/category-menu/category-menu.component';


@Component({
  selector: 'app-main-menu-viewport',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    CategoryMenuComponent
  ],
  templateUrl: './main-menu-viewport.component.html',
  styleUrls: ['./main-menu-viewport.component.scss']
})
export class MainMenuViewportComponent {
  @Input() title: string = 'Umaverso';
} 