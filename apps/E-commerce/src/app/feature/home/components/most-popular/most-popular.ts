import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { Home } from '../../services/home';
import { HeaderTittle } from 'apps/E-commerce/src/app/shared/components/ui/header-tittle/header-tittle';
import { ProductCardComponent } from 'apps/E-commerce/src/app/shared/components/ui/product-card/product-card.component';
import { Product as ProductCardModel } from 'apps/E-commerce/src/app/shared/components/ui/product-card/interface/product';
import { pategoryOrOccasion } from '../../interfaces/home';
import { mapToProductCard } from './most-popular.config';

@Component({
  selector: 'app-most-popular',
  imports: [RouterLink, HeaderTittle, ProductCardComponent],
  templateUrl: './most-popular.html',
  styleUrl: './most-popular.css',
})
export class MostPopular {
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
    if (!id) return products;
    return products.filter((product) => product.occasion === id);
  });

  selectFilter(id: string | null): void {
    this.selectedId.set(id);
  }
}