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
const DepthManager_1 = require("./DepthManager");
const order_1 = require("./order");
const XAiInrMarket = new DepthManager_1.DepthManager("B-ETH_INR");
const usdtInrMarket = new DepthManager_1.DepthManager("B-USDT_INR");
const XAiUsdtMarket = new DepthManager_1.DepthManager("B-ETH_USDT");
setInterval(() => {
    console.log(XAiInrMarket.getRelevantDepth());
    console.log(usdtInrMarket.getRelevantDepth());
    console.log(XAiUsdtMarket.getRelevantDepth());
    // there are two sides you can sit on
    // sell SOL for INR, buy USDT from INR, buy SOL from INR
    // lets say u start with 1 SOL
    const canGetInr = XAiInrMarket.getRelevantDepth().lowestAsk - 0.001;
    const canGetUsdt = canGetInr / usdtInrMarket.getRelevantDepth().lowestAsk;
    const canGetXAi = canGetUsdt / XAiUsdtMarket.getRelevantDepth().lowestAsk;
    console.log(`You can convert ${1} SOL into ${canGetXAi} SOL`);
    // Buy SOL from INR, sell SOL for USDT, sell USDT for INR.
    const initialInr = XAiInrMarket.getRelevantDepth().highestBid + 0.001;
    const canGetUsdt2 = XAiUsdtMarket.getRelevantDepth().highestBid;
    const canGetInr2 = canGetUsdt2 * usdtInrMarket.getRelevantDepth().highestBid;
    console.log(`You can convert ${initialInr} INR into ${canGetInr2} INR`);
}, 500);
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const highestBids = XAiInrMarket.getRelevantDepth().highestBid;
        console.log(`placing order for highestBids + 0.01}`);
        yield (0, order_1.createOrder)("buy", "XAIINR", highestBids, 10, Math.random().toString());
        yield new Promise((r) => setTimeout(r, 10000));
        yield (0, order_1.cancelAll)("XAIINR");
        yield new Promise((r) => setTimeout(r, 1000));
        main();
    });
}
setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
    main();
}), 2000);
