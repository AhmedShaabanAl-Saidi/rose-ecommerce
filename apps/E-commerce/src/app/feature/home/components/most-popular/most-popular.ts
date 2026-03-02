import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { Home } from '../../services/home';
import { HeaderTittle } from 'apps/E-commerce/src/app/shared/components/ui/header-tittle/header-tittle';
import { ProductCardComponent } from 'apps/E-commerce/src/app/shared/components/ui/product-card/product-card.component';
import { Product as ProductCardModel } from 'apps/E-commerce/src/app/shared/components/ui/product-card/interface/product';
import { pategoryOrOccasion } from '../../interfaces/home';
import { mapToProductCard } from './most-popular.config';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LucideAngularModule, ArrowLeft, ArrowRight } from 'lucide-angular';

@Component({
  selector: 'app-most-popular',
  imports: [RouterLink, HeaderTittle, ProductCardComponent, TranslateModule, LucideAngularModule],
  templateUrl: './most-popular.html',
  styleUrl: './most-popular.css',
})
export class MostPopular {
  translate = inject(TranslateService);
  readonly arrowLeft = ArrowLeft;
  readonly arrowRight = ArrowRight;

  private readonly homeService = inject(Home);

  private readonly homeData = toSignal(this.homeService.getHomeData());

  private readonly occasionIdsWithProducts = computed<Set<string>>(() => {
    const ids = (this.homeData()?.products ?? []).map((p) => p.occasion);
    return new Set(ids);
  });

  readonly occasions = computed<pategoryOrOccasion[]>(() =>
    (this.homeData()?.occasions ?? []).filter((occasion) =>
      this.occasionIdsWithProducts().has(occasion._id)
    )
  );

  private readonly allProducts = computed<ProductCardModel[]>(() =>
    (this.homeData()?.products ?? []).map(mapToProductCard)
  );

  readonly selectedId = signal<string | null>(null);

  readonly filteredProducts = computed<ProductCardModel[]>(() => {
    const id = this.selectedId();
    const products = this.allProducts();
    if (!id) return products.slice(0, 16);
    return products.filter((product) => product.occasion === id).slice(0, 16);
  });

  selectFilter(id: string | null): void {
    this.selectedId.set(id);
  }
}