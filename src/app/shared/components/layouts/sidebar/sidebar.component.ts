import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  menuItems = [
    {
      name: 'Dashboard',
      showName: 'Painel',
      routeName: 'dashboard',
    },
    {
      name: 'Transactions',
      showName: 'Transações',
      routeName: 'transactions',
    },
    {
      name: 'Settings',
      showName: 'Configurações',
      routeName: 'settings',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
