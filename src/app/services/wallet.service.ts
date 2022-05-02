import { Injectable } from '@angular/core';
import { ethers } from "ethers";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  public provider:any;
  public walletAddress:any;
  public walletSubject = new Subject<any>();

  constructor() {
    this.initProvider()
    this.initWallet()
  }

  async initProvider(){
    this.provider = new ethers.providers.Web3Provider(window.ethereum)
    window.ethereum.on('accountsChanged', async (accounts: string[]) => {
      this.initWallet()
    })
  }

  async initWallet(){
    let connectStatus = await localStorage.getItem("connectStatus")
    if(connectStatus === '1'){
      await this.connectWallet()
    }
  }

  getWalletSubject():Observable<any>{
    return this.walletSubject.asObservable()
  }

  async connectWallet(){
    try{
      if(!this.provider) {
        await this.initProvider()
      }
      const _accounts = await this.provider.send("eth_requestAccounts", []);
      this.walletAddress = _accounts[0];
      await localStorage.setItem("connectStatus",'1')
      this.walletSubject.next(this.walletAddress)
      return this.walletAddress
    }catch(error){
      console.log(`error on get connectWallet`, error);
    }
  }

  async disconnectWallet(){
    await localStorage.setItem("connectStatus",'0')
    this.walletSubject.next(null)
    this.walletAddress = null
  }

}
