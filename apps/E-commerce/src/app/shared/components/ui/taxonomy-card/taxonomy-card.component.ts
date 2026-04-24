import { Component, computed, input } from '@angular/core';
import { Params, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { Image, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-taxonomy-card',
  imports: [RouterLink, TranslatePipe, LucideAngularModule],
  templateUrl: './taxonomy-card.component.html',
})
export class TaxonomyCardComponent {
  readonly title = input.required<string>();
  readonly imageUrl = input<string | undefined>();
  readonly queryParamName = input.required<string>();
  readonly queryParamValue = input.required<string>();
  readonly productsCount = input<number | undefined>();
  readonly productsCountKey = input.required<string>();
  readonly ImageIcon = Image;

  readonly queryParams = computed<Params>(() => ({
    [this.queryParamName()]: this.queryParamValue(),
  }));
}