export interface TradcastClientConfig {
    gameContractAddress: string;
    tokenContractAddress: string;
    rpcUrl?: string;
}
export interface GameSession {
    player: string;
    isEnded: boolean;
    points: string;
}
export interface TokenBalance {
    balance: string;
    decimals: number;
}
