import {Component} from '@angular/core';
import {MatIconButton} from '@angular/material/button';
import {MatIcon, MatIconRegistry} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {DomSanitizer} from '@angular/platform-browser';
import {RouterOutlet} from '@angular/router';
import {CurrencySelectorComponent} from "./components/currency-selector/currency-selector.component";
import {FooterComponent} from './components/footer/footer.component';
import {UserLocationService} from './services/user-location.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatIcon,
    MatIconButton,
    FooterComponent,
    CurrencySelectorComponent
  ],
  providers: [UserLocationService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'medusa-store';

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    // Register the custom SVG icon
    this.matIconRegistry.addSvgIcon(
      'umaverso-logo',
      this.domSanitizer.bypassSecurityTrustResourceUrl('/umaverso-logo.svg')
    );
  }
}
