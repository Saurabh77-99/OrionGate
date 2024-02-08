"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepthManager = void 0;
class DepthManager {
    constructor(market) {
        this.market = market;
        this.bids = {};
        this.asks = {};
        setInterval(() => {
            this.pollMarket();
        }, 3000);
    }
    pollMarket() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(`https://public.coindcx.com/market_data/orderbook?pair=${this.market}`);
            const depth = yield res.json();
            this.bids = depth.bids;
            this.asks = depth.asks;
        });
    }
    getRelevantDepth() {
        let highestBid = -100;
        let lowestAsk = 10000000;
        Object.keys(this.bids).map(x => {
            if (parseFloat(x) > highestBid) {
                highestBid = parseFloat(x);
            }
        });
        Object.keys(this.asks).map(x => {
            if (parseFloat(x) < lowestAsk) {
                lowestAsk = parseFloat(x);
            }
        });
        return {
            highestBid,
            lowestAsk
        };
    }
}
exports.DepthManager = DepthManager;
