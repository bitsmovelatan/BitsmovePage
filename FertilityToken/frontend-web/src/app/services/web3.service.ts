import { Injectable } from '@angular/core';
import { BrowserProvider, Contract, formatEther, parseEther } from 'ethers';
import { environment } from '../../environments/environment';

declare global {
  interface Window {
    ethereum?: any;
  }
}

@Injectable({
  providedIn: 'root'
})
export class Web3Service {
  private provider: BrowserProvider | null = null;
  private contract: Contract | null = null;

  // Simplified ABI for the contract
  private contractABI = [
    "function claimTokens() external",
    "function balanceOf(address account) view returns (uint256)",
    "function hasClaimedTokens(address account) view returns (bool)",
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function decimals() view returns (uint8)"
  ];

  constructor() {}

  async connectWallet(): Promise<string> {
    if (!window.ethereum) {
      throw new Error('MetaMask or compatible wallet not found');
    }

    try {
      this.provider = new BrowserProvider(window.ethereum);
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      // Check if on correct network (Polygon Mumbai)
      const network = await this.provider.getNetwork();
      if (network.chainId !== BigInt(environment.polygonChainId)) {
        await this.switchNetwork();
      }

      return accounts[0];
    } catch (error: any) {
      throw new Error(`Failed to connect wallet: ${error.message}`);
    }
  }

  async switchNetwork() {
    if (!window.ethereum) {
      throw new Error('Wallet not found');
    }

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${environment.polygonChainId.toString(16)}` }],
      });
    } catch (switchError: any) {
      // If network doesn't exist, add it
      if (switchError.code === 4902) {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: `0x${environment.polygonChainId.toString(16)}`,
            chainName: 'Polygon Mumbai Testnet',
            nativeCurrency: {
              name: 'MATIC',
              symbol: 'MATIC',
              decimals: 18
            },
            rpcUrls: [environment.polygonRpcUrl],
            blockExplorerUrls: ['https://mumbai.polygonscan.com/']
          }]
        });
      } else {
        throw switchError;
      }
    }
  }

  async getBalance(address: string): Promise<string> {
    if (!this.provider) {
      this.provider = new BrowserProvider(window.ethereum);
    }

    this.contract = new Contract(
      environment.contractAddress,
      this.contractABI,
      this.provider
    );

    const balance = await this.contract['balanceOf'](address);
    return formatEther(balance);
  }

  async hasClaimed(address: string): Promise<boolean> {
    if (!this.provider) {
      this.provider = new BrowserProvider(window.ethereum);
    }

    this.contract = new Contract(
      environment.contractAddress,
      this.contractABI,
      this.provider
    );

    return await this.contract['hasClaimedTokens'](address);
  }

  async claimTokens(): Promise<string> {
    if (!this.provider) {
      throw new Error('Provider not initialized');
    }

    const signer = await this.provider.getSigner();
    this.contract = new Contract(
      environment.contractAddress,
      this.contractABI,
      signer
    );

    const tx = await this.contract['claimTokens']();
    await tx.wait();
    
    return tx.hash;
  }

  isWalletAvailable(): boolean {
    return typeof window.ethereum !== 'undefined';
  }
}

