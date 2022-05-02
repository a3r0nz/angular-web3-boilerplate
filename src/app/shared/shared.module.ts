import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { ConnectWalletButtonComponent } from './connect-wallet-button/connect-wallet-button.component';
import { RouterModule } from "@angular/router";



@NgModule({
  declarations: [
    NavbarComponent,
    ConnectWalletButtonComponent
  ],
  exports: [
    NavbarComponent,
    ConnectWalletButtonComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule { }
