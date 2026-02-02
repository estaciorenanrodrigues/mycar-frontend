import { Component, Input } from "@angular/core";
import { AuthService } from "../../services/auth.service";


@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
    @Input() title: string = '';
    @Input() icon: string = '';

    constructor(private readonly authService: AuthService
    ) { }

    logout(): void {
        this.authService.logout();
    }
}