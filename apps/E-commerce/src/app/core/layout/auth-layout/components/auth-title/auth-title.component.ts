import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-auth-title',
    imports: [],
    templateUrl: './auth-title.component.html',
})
export class AuthTitleComponent {
    @Input() title!: string;
    @Input() description?: string;
}
