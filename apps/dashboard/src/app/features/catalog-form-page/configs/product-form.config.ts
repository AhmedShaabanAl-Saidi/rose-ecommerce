import { DashboardEntityFormField } from '../../../shared/components/dashboard-entity-form/dashboard-entity-form.config';

export function buildProductFields(
  categoryOptions: { label: string; value: string | number }[],
  occasionOptions: { label: string; value: string | number }[]
): DashboardEntityFormField[] {
  return [
    {
      key: 'title',
      type: 'text',
      labelKey: 'DASHBOARD.FORMS.PRODUCTS.TITLE',
      placeholderKey: 'DASHBOARD.FORMS.PRODUCTS.TITLE_PLACEHOLDER',
      containerClass: 'md:col-span-3',
    },
    {
      key: 'description',
      type: 'textarea',
      labelKey: 'DASHBOARD.FORMS.PRODUCTS.DESCRIPTION',
      placeholderKey: 'DASHBOARD.FORMS.PRODUCTS.DESCRIPTION_PLACEHOLDER',
      rows: 5,
      containerClass: 'md:col-span-3',
    },
    {
      key: 'price',
      type: 'number',
      labelKey: 'DASHBOARD.FORMS.PRODUCTS.PRICE',
      placeholderKey: 'DASHBOARD.FORMS.PRODUCTS.PRICE_PLACEHOLDER',
    },
    {
      key: 'discount',
      type: 'number',
      labelKey: 'DASHBOARD.FORMS.PRODUCTS.DISCOUNT',
      placeholderKey: 'DASHBOARD.FORMS.PRODUCTS.DISCOUNT_PLACEHOLDER',
    },
    {
      key: 'priceAfterDiscount',
      type: 'number',
      labelKey: 'DASHBOARD.FORMS.PRODUCTS.PRICE_AFTER_DISCOUNT',
      placeholderKey:
        'DASHBOARD.FORMS.PRODUCTS.PRICE_AFTER_DISCOUNT_PLACEHOLDER',
    },
    {
      key: 'quantity',
      type: 'number',
      labelKey: 'DASHBOARD.FORMS.PRODUCTS.QUANTITY',
      placeholderKey: 'DASHBOARD.FORMS.PRODUCTS.QUANTITY_PLACEHOLDER',
      containerClass: 'md:col-span-3',
    },
    {
      key: 'category',
      type: 'select',
      labelKey: 'DASHBOARD.FORMS.PRODUCTS.CATEGORY',
      placeholderKey: 'DASHBOARD.FORMS.PRODUCTS.CATEGORY_PLACEHOLDER',
      options: categoryOptions as any,
      containerClass: 'md:col-span-3',
    },
    {
      key: 'occasion',
      type: 'select',
      labelKey: 'DASHBOARD.FORMS.PRODUCTS.OCCASION',
      placeholderKey: 'DASHBOARD.FORMS.PRODUCTS.OCCASION_PLACEHOLDER',
      options: occasionOptions as any,
      containerClass: 'md:col-span-3',
    },
    {
      key: 'imgCover',
      type: 'file',
      labelKey: 'DASHBOARD.FORMS.PRODUCTS.COVER_IMAGE',
      hintKey: 'DASHBOARD.FORMS.PRODUCTS.COVER_IMAGE_HINT',
      accept: 'image/*',
      containerClass: 'md:col-span-3',
    },
    {
      key: 'images',
      type: 'file',
      labelKey: 'DASHBOARD.FORMS.PRODUCTS.GALLERY_IMAGES',
      hintKey: 'DASHBOARD.FORMS.PRODUCTS.GALLERY_IMAGES_HINT',
      accept: 'image/*',
      multiple: true,
      containerClass: 'md:col-span-3',
    },
  ];
}
