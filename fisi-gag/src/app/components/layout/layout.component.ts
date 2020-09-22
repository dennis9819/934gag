import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  visible = true;
  constructor(private router: Router) {
    router.events.subscribe((val) => {
        if (val instanceof NavigationEnd){
          this.visible = !val.url.startsWith('/auth');
        }
    });
  }

  ngOnInit(): void {
  }

}
