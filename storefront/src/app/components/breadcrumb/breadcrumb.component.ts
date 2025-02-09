import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

interface BreadcrumbItem {
  id: string;
  name: string;
  path: string;
}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterLink],
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {
  @Input() set category(value: any) {
    if (value) {
      this.buildBreadcrumb(value);
    }
  }

  items = signal<BreadcrumbItem[]>([]);

  private buildBreadcrumb(category: any): void {
    const breadcrumb: BreadcrumbItem[] = [];
    let currentCategory = category;

    while (currentCategory) {
      breadcrumb.unshift({
        id: currentCategory.id,
        name: currentCategory.name,
        path: `/category/${currentCategory.handle}`
      });
      currentCategory = currentCategory.parent_category;
    }

    this.items.set(breadcrumb);
  }
} 