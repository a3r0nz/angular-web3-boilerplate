import {Component, NgZone, OnInit} from '@angular/core';
import {WalletService} from "../../services/wallet.service";

@Component({
  selector: 'app-connect-wallet-button',
  templateUrl: './connect-wallet-button.component.html',
  styleUrls: ['./connect-wallet-button.component.scss']
})
export class ConnectWalletButtonComponent implements OnInit {

  walletAddress:any;

  constructor(
    private walletService:WalletService,
    private _ngZone: NgZone
  ) { }

  async ngOnInit() {
    this.walletService.getWalletSubject().subscribe(async (walletAddress) => {
      this._ngZone.run(() => {
        this.walletAddress = walletAddress
      });
    });
  }

  async connectWallet(){
    this.walletAddress = await this.walletService.connectWallet()
  }

  async disconnectWallet(){
    await this.walletService.disconnectWallet()
  }

  getShrinkWalletAddress(){
    return this.walletAddress.replace(this.walletAddress.substring(4, (this.walletAddress ? this.walletAddress.length : 42) - 4 ), "...")
  }

}
