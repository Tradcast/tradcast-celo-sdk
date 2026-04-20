"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TRADCAST_TOKEN_ABI = exports.TRADCAST_GAME_ABI = exports.TradcastClient = void 0;
const ethers_1 = require("ethers");
const gameAbi_1 = require("./abis/gameAbi");
Object.defineProperty(exports, "TRADCAST_GAME_ABI", { enumerable: true, get: function () { return gameAbi_1.gameAbi; } });
const tokenAbi_1 = require("./abis/tokenAbi");
Object.defineProperty(exports, "TRADCAST_TOKEN_ABI", { enumerable: true, get: function () { return tokenAbi_1.tokenAbi; } });
class TradcastClient {
    constructor(config) {
        const rpcUrl = config.rpcUrl || "https://forno.celo.org";
        this.provider = new ethers_1.ethers.JsonRpcProvider(rpcUrl);
        this.gameContractAddress = config.gameContractAddress;
        this.tokenContractAddress = config.tokenContractAddress;
        this.gameContract = new ethers_1.ethers.Contract(this.gameContractAddress, gameAbi_1.gameAbi, this.provider);
        this.tokenContract = new ethers_1.ethers.Contract(this.tokenContractAddress, tokenAbi_1.tokenAbi, this.provider);
    }
    async getPaused() {
        return await this.gameContract.paused();
    }
    async getGameSession(sessionId) {
        const [player, isEnded, points] = await this.gameContract.gameSessions(sessionId);
        return {
            player,
            isEnded,
            points: points.toString(),
        };
    }
    async getTokenBalance(address) {
        const [balance, decimals] = await Promise.all([
            this.tokenContract.balanceOf(address),
            this.tokenContract.decimals(),
        ]);
        return {
            balance: balance.toString(),
            decimals: Number(decimals),
        };
    }
    async getAllowance(owner, spender) {
        const allowance = await this.tokenContract.allowance(owner, spender);
        return allowance.toString();
    }
}
exports.TradcastClient = TradcastClient;
