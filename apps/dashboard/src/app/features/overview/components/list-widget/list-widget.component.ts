import { Component, computed, input } from '@angular/core';
import { CommonModule, I18nPluralPipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

export interface ListItem {
  label: string;
  value: number;
}

@Component({
  selector: 'app-list-widget',
  imports: [CommonModule, I18nPluralPipe, TranslatePipe],
  templateUrl: './list-widget.component.html',
  styleUrl: './list-widget.component.css',
})
export class ListWidgetComponent {
  title = input.required<string>();
  items = input.required<ListItem[]>();
  emptyMessage = input<string>('DASHBOARD.OVERVIEW.WIDGETS.NO_DATA');
  emptyIcon = input<string>('pi pi-inbox');
  pluralMap = input<Record<string, string>>({
    '=0': '0',
    '=1': '1',
    'other': '#'
  });

  totalValue = computed(() =>
    this.items().reduce((total, item) => total + item.value, 0)
  );
}
