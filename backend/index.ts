import express, { Request, Response } from "express";
import { DepthManager } from "./DepthManager";
import { cancelAll, createOrder } from "./order";

const app = express();

const XAiInrMarket = new DepthManager("B-JUP_INR");
const usdtInrMarket = new DepthManager("B-USDT_INR");
const XAiUsdtMarket = new DepthManager("B-BTC_USDT");

// Route to fetch market data
app.get("/api/market-data", async (req: Request, res: Response) => {
    setInterval(() => {
    console.log(XAiInrMarket.getRelevantDepth());
    console.log(usdtInrMarket.getRelevantDepth());
    console.log(XAiUsdtMarket.getRelevantDepth());
    
    // Your conversion and calculation logic goes here
    const canGetInr = XAiInrMarket.getRelevantDepth().lowestAsk - 0.001;
    const canGetUsdt = canGetInr / usdtInrMarket.getRelevantDepth().lowestAsk;
    const canGetXAi = canGetUsdt / XAiUsdtMarket.getRelevantDepth().lowestAsk;
    console.log(`You can convert ${1} SOL into ${canGetXAi} SOL`);

    const initialInr = XAiInrMarket.getRelevantDepth().highestBid + 0.001;
    const canGetUsdt2 = XAiUsdtMarket.getRelevantDepth().highestBid;
    const canGetInr2 = canGetUsdt2 * usdtInrMarket.getRelevantDepth().highestBid;
    console.log(`You can convert ${initialInr} INR into ${canGetInr2} INR`);
}, 10000);
    try {
        const marketData = {
            xaiInrDepth: XAiInrMarket.getRelevantDepth(),
            usdtInrDepth: usdtInrMarket.getRelevantDepth(),
            xaiUsdtDepth: XAiUsdtMarket.getRelevantDepth()
        };
        res.json(marketData);
    } catch (error) {
        console.error("Error fetching market data:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Route to trigger the main function
// app.get("/trigger-main", async (req: Request, res: Response) => {
//     try {
//         await main();
//         res.send("Main function triggered successfully.");
//     } catch (error) {
//         console.error("Error triggering main function:", error);
//         res.status(500).send("Internal Server Error");
//     }
// });

// Main function
async function main() {
    const highestBids = XAiInrMarket.getRelevantDepth().highestBid;
    console.log(`Placing order for ${highestBids + 0.001}`);
    await createOrder("buy", "JUPINR",(highestBids+0.001), 1, Math.random().toString());
    await new Promise((resolve) => setTimeout(resolve, 10000));
    await cancelAll("JUPINR");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    main();
}

setTimeout(async () => {
    main();
}, 3000);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
