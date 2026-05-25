import { Component, input } from '@angular/core';
import { CommonModule, I18nPluralPipe } from '@angular/common';

export interface ListItem {
  label: string;
  value: number;
}

@Component({
  selector: 'app-list-widget',
  standalone: true,
  imports: [CommonModule, I18nPluralPipe],
  templateUrl: './list-widget.component.html',
  styleUrl: './list-widget.component.css',
})
export class ListWidgetComponent {
  title = input.required<string>();
  items = input.required<ListItem[]>();
  emptyMessage = input<string>('No data');
  emptyIcon = input<string>('pi pi-inbox');
  pluralMap = input<Record<string, string>>({
    '=0': '0',
    '=1': '1',
    'other': '#'
  });
}
