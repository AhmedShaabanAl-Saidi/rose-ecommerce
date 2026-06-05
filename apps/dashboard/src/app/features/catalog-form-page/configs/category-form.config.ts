import { DashboardEntityFormField } from '../../../shared/components/dashboard-entity-form/dashboard-entity-form.config';

export function buildCategoryFields(): DashboardEntityFormField[] {
  return [
    {
      key: 'name',
      type: 'text',
      labelKey: 'DASHBOARD.FORMS.CATEGORIES.NAME',
      placeholderKey: 'DASHBOARD.FORMS.CATEGORIES.NAME_PLACEHOLDER',
      containerClass: 'md:col-span-2',
    },
    {
      key: 'image',
      type: 'file',
      labelKey: 'DASHBOARD.FORMS.CATEGORIES.IMAGE',
      hintKey: 'DASHBOARD.FORMS.CATEGORIES.IMAGE_HINT',
      accept: 'image/*',
      containerClass: 'md:col-span-1',
    },
  ];
}
