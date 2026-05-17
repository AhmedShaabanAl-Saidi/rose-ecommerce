import { Component, input } from '@angular/core';
import { CommonModule, I18nPluralPipe } from '@angular/common';

export interface CategoryItem {
  category: string;
  count: number;
}

@Component({
  selector: 'app-category-widget',
  standalone: true,
  imports: [CommonModule, I18nPluralPipe],
  templateUrl: './category-widget.component.html',
  styleUrl: './category-widget.component.css',
})
export class CategoryWidgetComponent {
  items = input.required<CategoryItem[]>();
  productPluralMap = {
    '=0': 'No Products',
    '=1': '1 Product',
    'other': '# Products'
  };
}
