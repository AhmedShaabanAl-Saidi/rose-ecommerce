import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-auth-footer',
    imports: [RouterLink],
    templateUrl: './auth-footer.component.html',
})
export class AuthFooterComponent {
    @Input() text!: string;
    @Input() linkText!: string;
    @Input() linkRoute!: string;
}
