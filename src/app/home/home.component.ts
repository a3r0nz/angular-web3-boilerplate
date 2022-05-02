import { Component, NgZone, OnInit } from '@angular/core';
import { WalletService } from "../services/wallet.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  walletAddress:any;

  constructor(
    private walletService:WalletService,
    private _ngZone: NgZone
  ) { }

  async ngOnInit(){
    this.walletAddress = await this.walletService.walletAddress
    this.walletService.getWalletSubject().subscribe(async (walletAddress) => {
      this._ngZone.run(() => {
        this.walletAddress = walletAddress
      });
    });
  }

}
