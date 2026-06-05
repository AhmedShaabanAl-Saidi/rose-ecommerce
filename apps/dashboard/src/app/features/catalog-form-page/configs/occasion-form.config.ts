import { DashboardEntityFormField } from '../../../shared/components/dashboard-entity-form/dashboard-entity-form.config';

export function buildOccasionFields(): DashboardEntityFormField[] {
  return [
    {
      key: 'name',
      type: 'text',
      labelKey: 'DASHBOARD.FORMS.OCCASIONS.NAME',
      placeholderKey: 'DASHBOARD.FORMS.OCCASIONS.NAME_PLACEHOLDER',
      containerClass: 'md:col-span-2',
    },
    {
      key: 'image',
      type: 'file',
      labelKey: 'DASHBOARD.FORMS.OCCASIONS.IMAGE',
      hintKey: 'DASHBOARD.FORMS.OCCASIONS.IMAGE_HINT',
      accept: 'image/*',
      containerClass: 'md:col-span-1',
    },
  ];
}
