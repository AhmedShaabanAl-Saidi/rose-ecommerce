import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSpinnerComponent } from 'ngx-spinner';

@Component({
  imports: [RouterOutlet, NgxSpinnerComponent],
  selector: 'app-dashboard-entry',
  template: `
    <ngx-spinner
      bdColor="rgba(0, 0, 0, 0.8)"
      size="medium"
      color="#fff"
      type="triangle-skew-spin"
      [fullScreen]="true"
    >
      <p aria-live="polite" role="status" style="color: white">Loading...</p>
    </ngx-spinner>
    <router-outlet />
  `,
})
export class RemoteEntry {}
