import { ethers } from "ethers";
import { gameAbi } from "./abis/gameAbi";
import { tokenAbi } from "./abis/tokenAbi";
import type { GameSession, TokenBalance, TradcastClientConfig } from "./types";

export class TradcastClient {
  private provider: ethers.JsonRpcProvider;
  private gameContract: ethers.Contract;
  private tokenContract: ethers.Contract;

  public gameContractAddress: string;
  public tokenContractAddress: string;

  constructor(config: TradcastClientConfig) {
    const rpcUrl = config.rpcUrl || "https://forno.celo.org";

    this.provider = new ethers.JsonRpcProvider(rpcUrl);
    this.gameContractAddress = config.gameContractAddress;
    this.tokenContractAddress = config.tokenContractAddress;

    this.gameContract = new ethers.Contract(this.gameContractAddress, gameAbi, this.provider);
    this.tokenContract = new ethers.Contract(this.tokenContractAddress, tokenAbi, this.provider);
  }

  async getPaused(): Promise<boolean> {
    return await this.gameContract.paused();
  }

  async getGameSession(sessionId: bigint | number | string): Promise<GameSession> {
    const [player, isEnded, points] = await this.gameContract.gameSessions(sessionId);
    return {
      player,
      isEnded,
      points: points.toString(),
    };
  }

  async getTokenBalance(address: string): Promise<TokenBalance> {
    const [balance, decimals] = await Promise.all([
      this.tokenContract.balanceOf(address),
      this.tokenContract.decimals(),
    ]);

    return {
      balance: balance.toString(),
      decimals: Number(decimals),
    };
  }

  async getAllowance(owner: string, spender: string): Promise<string> {
    const allowance = await this.tokenContract.allowance(owner, spender);
    return allowance.toString();
  }
}

export { gameAbi as TRADCAST_GAME_ABI, tokenAbi as TRADCAST_TOKEN_ABI };
