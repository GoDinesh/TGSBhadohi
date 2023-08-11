import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/internal/operators/filter';
import { map } from 'rxjs/internal/operators/map';
import { BreadcrumbService } from 'xng-breadcrumb';
import { routeType } from './constants/common/routeType';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'App';
  constructor(
    private router: Router,
    private titleService: Title,
    //Don't remove
    private breadcrumbService: BreadcrumbService
  ){
    this.navigate()
  }

  ngOnInit(){
    this.showTitle();
  }

  async navigate(){
    await this.router.events.subscribe(routerEvent => {
        if (routerEvent instanceof NavigationStart) {
            if (routerEvent.url == "/") {
                this.router.navigate([routeType.NAVMENU])
            }
        }
    });
}


  showTitle() {
    //Code To add title on browser tab   
    this.router.events.pipe(
            filter(
                (event) => event instanceof NavigationEnd),
            map(() => {
                let route: ActivatedRoute = this.router.routerState.root;
                let routeTitle = '';
                while (route!.firstChild) {
                    route = route.firstChild;
                }
                if (route.snapshot.data['title']) {
                    routeTitle = route!.snapshot.data['title'];
                }
                return routeTitle;
            })
        )
        .subscribe((title: string) => {
            if (title) {
                        this.titleService.setTitle(`${this.title} - ${title}`);
            }
        });
    //End Code To add title on browser tab  
}
}
