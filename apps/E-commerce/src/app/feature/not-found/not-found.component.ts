import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthState } from '@elevate/auth-domain';
import { ButtonComponent, NotFoundComponent as SharedNotFoundComponent } from '@elevate/reusable-ui';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink, ButtonComponent, TranslateModule, LucideAngularModule, SharedNotFoundComponent],
  templateUrl: './not-found.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent {
  private readonly authState = inject(AuthState);
  readonly user = this.authState.currentUser;
}
