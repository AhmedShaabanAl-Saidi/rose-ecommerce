import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface CategoryItem {
  category: string;
  count: number;
}

@Component({
  selector: 'app-category-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-widget.component.html',
  styleUrl: './category-widget.component.css',
})
export class CategoryWidgetComponent {
  items = input.required<CategoryItem[]>();
}
