import { Component, OnInit, ViewEncapsulation, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConnectFirebase } from './services/firebaseConnection.service';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LocalStorageService } from './services/local-storage.service';
import { LoaderComponent } from './components/loader/loader.component';
import {
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
} from '@angular/router';
import { LoaderService } from './components/loader/loader.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, LoaderComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: '../assets/commons.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  title = 'iis-project';
  private readonly _initService = inject(ConnectFirebase);
  private readonly _initLocalStService = inject(LocalStorageService);

  constructor(private router: Router, private loaderService: LoaderService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.loaderService.show();
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.loaderService.hide();
      }
    });
  }

  ngOnInit(): void {
    this._initService.getServices().subscribe();
    this.checkAuthentication();
  }

  checkAuthentication() {
    return this._initLocalStService.getItem('profile');
  }
}
