import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { TokenService } from './service/token.service';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];
    user: any;
    roles: any;
    showHome: boolean = true;
    DP: any;

    constructor(public layoutService: LayoutService, private tokenService: TokenService, private http: HttpClient) {
        this.user = this.tokenService.gettoken();
        // console.log(this.user);
    }

    ngOnInit() {
        this.http.get('http://localhost:8000/api/showR', { withCredentials: true }).subscribe(res => {
            this.roles = res;
            console.log(this.roles);
        });

        this.http.get('http://localhost:8000/api/showDP', { withCredentials: true }).subscribe(res => {
            this.DP = res;
            console.log(this.DP);
            this.buildMenu();
        });
    }

    buildMenu() {
        let roleSpecificMenuItems = [];

        if (this.user.department_id === 1) {
            roleSpecificMenuItems = [{ label: 'Web', icon: 'pi pi-fw pi-folder', routerLink: ['/doc/rh'] }];
        } else if (this.user.department_id === 2) {
            roleSpecificMenuItems = [{ label: 'Mobile', icon: 'pi pi-fw  pi-folder', routerLink: ['/doc/clients'] }];
        } else if (this.user.department_id === 3) {
            roleSpecificMenuItems = [{ label: 'AI', icon: 'pi pi-fw  pi-folder', routerLink: ['/doc/fournisseur'] }];
        } else if (this.user.department_id === 4) {
            roleSpecificMenuItems = [{ label: 'BI', icon: 'pi pi-fw  pi-folder', routerLink: ['/doc/technique'] }];
        } else if (this.user.department_id === 5) {
            roleSpecificMenuItems = [{ label: 'Desgin', icon: 'pi pi-fw  pi-folder', routerLink: ['/doc/formation'] }];
        } else if (this.user.department_id === null) {
            roleSpecificMenuItems = [
                { label: 'Web', icon: 'pi pi-fw pi-folder', routerLink: ['/doc/rh'] },
                { label: 'Mobile', icon: 'pi pi-fw pi-folder', routerLink: ['/doc/clients'] },
                { label: 'AI', icon: 'pi pi-fw pi-folder', routerLink: ['/doc/fournisseur'] },
                { label: 'BI', icon: 'pi pi-fw pi-folder', routerLink: ['/doc/technique'] },
                { label: 'Design', icon: 'pi pi-fw pi-folder', routerLink: ['/doc/formation'] }
            ];
        }

        const commonItems = [
           // { label: 'Category', icon: 'pi pi-fw pi-circle-off', routerLink: ['/uikit/listecategory'] },
           // { label: 'Calendar', icon: '', routerLink: ['/uikit/calendar'] },
           // { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/uikit/charts'] },
           //{ label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['/uikit/table'] }
        ];

        const roleDependentItems = this.user.role_id === 5 ? [
            { label: 'Utilisateurs', icon: 'pi pi-fw pi-users', routerLink: ['/uikit/users'] },
            { label: 'Départements', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/listedepartment'] },
            { label: 'Rôle', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/listerole'] },
            { label: 'Documents', icon: 'pi pi-fw pi-folder', routerLink: ['/uikit/listedocuments'] },
            { label: 'permissions', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/permissions'] }
        ] : [];

        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Tableau de Bord', icon: 'pi pi-fw pi-home', routerLink: ['/dashbord'] }
                ]
            },
            {
                label: '',
                items: [
                    ...roleDependentItems,
                    {
                        label: 'doc',
                        icon: 'pi pi-fw pi-folder-open',
                        items: roleSpecificMenuItems
                    },
                    ...commonItems
                ]
            }
        ];
    }
}
