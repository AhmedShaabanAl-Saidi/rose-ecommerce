import { CommonModule } from '@angular/common';
import {
  Component,
  DestroyRef,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { TranslatePipe } from '@ngx-translate/core';
import {
  CategoriesService,
  OccasionsService,
  ProductsService,
} from '@elevate/core-data-access';
import { SelectOption } from '@elevate/reusable-input';
import { DashboardEntityFormComponent } from '../../shared/components/dashboard-entity-form/dashboard-entity-form.component';
import {
  DashboardEntityFormConfig,
  DashboardEntityFormField,
} from '../../shared/components/dashboard-entity-form/dashboard-entity-form.config';
import { buildProductFields } from './configs/product-form.config';
import { buildCategoryFields } from './configs/category-form.config';
import { buildOccasionFields } from './configs/occasion-form.config';

type CatalogEntityType = 'categories' | 'occasions' | 'products';
type FormMode = 'add' | 'edit';

@Component({
  selector: 'app-catalog-form-page',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslatePipe,
    DashboardEntityFormComponent,
  ],
  templateUrl: './catalog-form-page.component.html',
})
export class CatalogFormPageComponent {
  private readonly fb = inject(FormBuilder);
  private readonly categoriesService = inject(CategoriesService);
  private readonly occasionsService = inject(OccasionsService);
  private readonly productsService = inject(ProductsService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  readonly entityType = input.required<CatalogEntityType>();
  readonly mode = input.required<FormMode>();
  readonly id = input<string | undefined>();

  readonly categoryOptions = signal<SelectOption[]>([]);
  readonly occasionOptions = signal<SelectOption[]>([]);
  readonly isSubmitting = signal(false);
  readonly form = signal<FormGroup>(this.fb.group({}));
  readonly entityName = signal('');
  readonly entityNameSuffix = computed(() => {
    const name = this.entityName();
    return this.mode() === 'edit' && name ? `: ${name}` : '';
  });

  readonly pageSectionKey = signal('');
  readonly pageTitleKey = signal('');
  readonly pageDescriptionKey = signal('');
  readonly formConfig = computed<DashboardEntityFormConfig>(() => {
    const entityType = this.entityType();
    const mode = this.mode();

    return {
      gridClass: 'grid gap-4 md:grid-cols-3',
      fields: this.buildFields(entityType),
      form: this.form(),
      submitLabelKey:
        mode === 'add'
          ? this.submitAddKey(entityType)
          : this.submitEditKey(entityType),
      backLabelKey: this.backLabelKey(entityType),
      backRoute: this.backRoute(entityType),
      isSubmitting: this.isSubmitting(),
    };
  });

  constructor() {
    effect(() => {
      const entityType = this.entityType();
      const mode = this.mode();

      const newForm = this.buildForm(entityType);
      this.form.set(newForm);
      this.entityName.set('');

      this.pageSectionKey.set(this.sectionKey(entityType));
      this.pageTitleKey.set(this.titleKey(entityType, mode));
      this.pageDescriptionKey.set(this.descriptionKey(entityType, mode));

      if (entityType === 'products') {
        this.loadProductOptions();
        if (mode === 'edit' && this.id()) {
          this.loadProduct(this.id() as string);
        }
      } else if (entityType === 'categories') {
        this.loadCategory(mode, this.id());
      } else {
        this.loadOccasion(mode, this.id());
      }
    });

    effect(() => {
      const form = this.form();
      const sub = form.valueChanges.subscribe((val) => {
        const name = this.entityType() === 'products' ? val.title : val.name;
        this.entityName.set(name || '');
      });
      return () => sub.unsubscribe();
    });
  }

  onSubmit(): void {
    this.form().markAllAsTouched();

    if (this.form().invalid) {
      return;
    }

    this.isSubmitting.set(true);
    const payload = this.form().getRawValue();
    const entity = this.entityType();
    const mode = this.mode();

    if (entity === 'products') {
      if (mode === 'add') {
        this.productsService
          .createProduct(payload)
          .pipe(finalize(() => this.isSubmitting.set(false)))
          .subscribe(() => this.router.navigate(this.backRoute(entity)));
        return;
      }

      if (this.id()) {
        this.productsService
          .updateProduct(this.id() as string, payload)
          .pipe(finalize(() => this.isSubmitting.set(false)))
          .subscribe(() => this.router.navigate(this.backRoute(entity)));
        return;
      }
    }

    if (entity === 'categories') {
      if (mode === 'add') {
        this.categoriesService
          .createCategory(payload)
          .pipe(finalize(() => this.isSubmitting.set(false)))
          .subscribe(() => this.router.navigate(this.backRoute(entity)));
        return;
      }

      if (this.id()) {
        this.categoriesService
          .updateCategory(this.id() as string, payload)
          .pipe(finalize(() => this.isSubmitting.set(false)))
          .subscribe(() => this.router.navigate(this.backRoute(entity)));
        return;
      }
    }

    if (entity === 'occasions') {
      if (mode === 'add') {
        this.occasionsService
          .createOccasion(payload)
          .pipe(finalize(() => this.isSubmitting.set(false)))
          .subscribe(() => this.router.navigate(this.backRoute(entity)));
        return;
      }

      if (this.id()) {
        this.occasionsService
          .updateOccasion(this.id() as string, payload)
          .pipe(finalize(() => this.isSubmitting.set(false)))
          .subscribe(() => this.router.navigate(this.backRoute(entity)));
        return;
      }
    }

    // fallback: clear submitting flag
    this.isSubmitting.set(false);
  }

  private buildForm(entityType: CatalogEntityType): FormGroup {
    if (entityType === 'products') {
      const form = this.fb.group({
        title: ['', [Validators.required, Validators.minLength(2)]],
        description: ['', [Validators.required, Validators.minLength(10)]],
        price: [0, [Validators.required, Validators.min(0)]],
        discount: [0, [Validators.required, Validators.min(0)]],
        priceAfterDiscount: [{ value: 0, disabled: true }],
        quantity: [0, [Validators.required, Validators.min(0)]],
        category: ['', Validators.required],
        occasion: ['', Validators.required],
        imgCover: [null, Validators.required],
        images: [[], Validators.required],
      });

      this.syncPriceAfterDiscount(form);

      return form;
    }

    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      image: [null, Validators.required],
    });
  }

  private loadProductOptions(): void {
    this.categoriesService
      .getAllCategories()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((categories) => {
        this.categoryOptions.set(
          categories.map((category) => ({
            label: category.name,
            value: category._id,
          }))
        );
      });

    this.occasionsService
      .getAllOccasions()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((occasions) => {
        this.occasionOptions.set(
          occasions.map((occasion) => ({
            label: occasion.name,
            value: occasion._id,
          }))
        );
      });
  }

  private loadProduct(id: string): void {
    this.productsService
      .getProductById(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(({ product }) => {
        this.form().patchValue({
          title: product.title,
          description: product.description,
          price: product.price,
          discount: product.discount ?? 0,
          priceAfterDiscount:
            product.priceAfterDiscount ??
            Math.max(product.price - (product.discount ?? 0), 0),
          quantity: product.quantity,
          category: product.category,
          occasion: product.occasion,
          imgCover: product.imgCover,
          images: product.images,
        });
      });
  }

  private loadCategory(mode: FormMode, id?: string): void {
    this.categoriesService
      .getAllCategories()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((categories) => {
        if (mode === 'edit' && id) {
          const current = categories.find((category) => category._id === id);
          if (current) {
            this.form().patchValue({
              name: current.name,
              image: current.image,
            });
          }
        }
      });
  }

  private loadOccasion(mode: FormMode, id?: string): void {
    this.occasionsService
      .getAllOccasions()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((occasions) => {
        if (mode === 'edit' && id) {
          const current = occasions.find((occasion) => occasion._id === id);
          if (current) {
            this.form().patchValue({
              name: current.name,
              image: current.image,
            });
          }
        }
      });
  }

  private syncPriceAfterDiscount(form: FormGroup): void {
    const priceControl = form.get('price');
    const discountControl = form.get('discount');
    const priceAfterDiscountControl = form.get('priceAfterDiscount');

    if (!priceControl || !discountControl || !priceAfterDiscountControl) {
      return;
    }

    const updatePriceAfterDiscount = () => {
      const price = Number(priceControl.value ?? 0);
      const discount = Number(discountControl.value ?? 0);
      const nextPrice = Math.max(price - discount, 0);

      priceAfterDiscountControl.setValue(nextPrice, { emitEvent: false });
    };

    updatePriceAfterDiscount();

    priceControl.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(updatePriceAfterDiscount);
    discountControl.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(updatePriceAfterDiscount);
  }

  private buildFields(
    entityType: CatalogEntityType
  ): DashboardEntityFormField[] {
    if (entityType === 'products') {
      return buildProductFields(this.categoryOptions(), this.occasionOptions());
    }

    return entityType === 'categories'
      ? buildCategoryFields()
      : buildOccasionFields();
  }

  private submitAddKey(entityType: CatalogEntityType): string {
    if (entityType === 'products') return 'DASHBOARD.FORMS.ADD_PRODUCT';
    if (entityType === 'categories') return 'DASHBOARD.FORMS.ADD_CATEGORY';

    return 'DASHBOARD.FORMS.ADD_OCCASION';
  }

  private submitEditKey(entityType: CatalogEntityType): string {
    if (entityType === 'products') return 'DASHBOARD.FORMS.UPDATE_PRODUCT';
    if (entityType === 'categories') return 'DASHBOARD.FORMS.UPDATE_CATEGORY';

    return 'DASHBOARD.FORMS.UPDATE_OCCASION';
  }

  private backLabelKey(entityType: CatalogEntityType): string {
    if (entityType === 'products') return 'DASHBOARD.FORMS.BACK_TO_PRODUCTS';
    if (entityType === 'categories')
      return 'DASHBOARD.FORMS.BACK_TO_CATEGORIES';

    return 'DASHBOARD.FORMS.BACK_TO_OCCASIONS';
  }

  private backRoute(entityType: CatalogEntityType): string[] {
    if (entityType === 'products') return ['/dashboard/products'];
    if (entityType === 'categories') return ['/dashboard/categories'];

    return ['/dashboard/occasions'];
  }

  private titleKey(entityType: CatalogEntityType, mode: FormMode): string {
    const suffix = mode === 'add' ? 'ADD_TITLE' : 'EDIT_TITLE';

    return `DASHBOARD.FORMS.${this.entityKey(entityType)}.${suffix}`;
  }

  private descriptionKey(
    entityType: CatalogEntityType,
    mode: FormMode
  ): string {
    const suffix = mode === 'add' ? 'ADD_DESCRIPTION' : 'EDIT_DESCRIPTION';

    return `DASHBOARD.FORMS.${this.entityKey(entityType)}.${suffix}`;
  }

  private sectionKey(entityType: CatalogEntityType): string {
    return `DASHBOARD.FORMS.${this.entityKey(entityType)}.SECTION`;
  }

  private entityKey(entityType: CatalogEntityType): string {
    if (entityType === 'products') return 'PRODUCTS';
    if (entityType === 'categories') return 'CATEGORIES';

    return 'OCCASIONS';
  }
}
