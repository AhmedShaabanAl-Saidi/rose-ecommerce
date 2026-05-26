import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthState } from '@elevate/auth-domain';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-unauthorized',
  imports: [RouterLink, TranslateModule, LucideAngularModule],
  templateUrl: './unauthorized.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnauthorizedComponent {
  private readonly authState = inject(AuthState);
  readonly user = this.authState.currentUser;
}
