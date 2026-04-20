import { gameAbi } from "./abis/gameAbi";
import { tokenAbi } from "./abis/tokenAbi";
import type { GameSession, TokenBalance, TradcastClientConfig } from "./types";
export declare class TradcastClient {
    private provider;
    private gameContract;
    private tokenContract;
    gameContractAddress: string;
    tokenContractAddress: string;
    constructor(config: TradcastClientConfig);
    getPaused(): Promise<boolean>;
    getGameSession(sessionId: bigint | number | string): Promise<GameSession>;
    getTokenBalance(address: string): Promise<TokenBalance>;
    getAllowance(owner: string, spender: string): Promise<string>;
}
export { gameAbi as TRADCAST_GAME_ABI, tokenAbi as TRADCAST_TOKEN_ABI };
