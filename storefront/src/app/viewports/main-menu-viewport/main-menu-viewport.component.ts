import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {CategoryMenuComponent} from '../../components/category-menu/category-menu.component';
import {RouterLink} from '@angular/router';
import {MatInput} from '@angular/material/input';
import {FormsModule} from '@angular/forms';


@Component({
  selector: 'app-main-menu-viewport',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    CategoryMenuComponent,
    RouterLink,
    MatInput,
    FormsModule
  ],
  templateUrl: './main-menu-viewport.component.html',
  styleUrls: ['./main-menu-viewport.component.scss']
})
export class MainMenuViewportComponent {
  searchToken?: string;
}
