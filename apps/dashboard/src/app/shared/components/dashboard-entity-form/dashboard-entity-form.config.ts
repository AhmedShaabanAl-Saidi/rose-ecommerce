import { FormGroup } from '@angular/forms';

export type DashboardEntityFieldType =
  | 'text'
  | 'textarea'
  | 'number'
  | 'select'
  | 'file';

export interface DashboardEntityFormOption {
  label: string;
  value: string | number;
}

export interface DashboardEntityFormField {
  key: string;
  type: DashboardEntityFieldType;
  labelKey: string;
  placeholderKey?: string;
  hintKey?: string;
  containerClass?: string;
  rows?: number;
  options?: DashboardEntityFormOption[];
  accept?: string;
  multiple?: boolean;
}

export interface DashboardEntityFormConfig {
  fields: DashboardEntityFormField[];
  gridClass?: string;
  form: FormGroup;
  submitLabelKey: string;
  backLabelKey: string;
  backRoute: string[];
  isSubmitting?: boolean;
}
