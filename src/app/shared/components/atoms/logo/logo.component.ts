import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
})
export class LogoComponent implements OnInit {
  @Input() type: 'light' | 'dark' | 'gray' = 'light';

  constructor() {}

  ngOnInit(): void {}
}
