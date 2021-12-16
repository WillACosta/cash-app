import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  @HostBinding('class') className = ['dark-theme-material'];

  constructor(private overlay: OverlayContainer) {}

  ngOnInit(): void {
    this.overlay.getContainerElement().classList.add('dark-theme-material');
    document.body.classList.add('dark-theme');
  }
}
