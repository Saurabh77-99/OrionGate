"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelAll = exports.cancelOrder = exports.createOrder = void 0;
const request = require('request');
const crypto = require('crypto');
const baseurl = "https://api.coindcx.com";
const config_1 = require("./config");
// import { Response } from 'request';
const createOrder = (side, market, price, quantity, clientOrderId) => {
    return new Promise((resolve) => {
        const body = {
            side,
            "order_type": "limit_order",
            market,
            "price_per_unit": price,
            "total_quantity": quantity,
            "timestamp": Math.floor(Date.now()),
            "client_order_id": clientOrderId
        };
        const payload = Buffer.from(JSON.stringify(body)).toString();
        const signature = crypto.createHmac('sha256', config_1.secret).update(payload).digest('hex');
        const options = {
            url: baseurl + "/exchange/v1/orders/create",
            headers: {
                'X-AUTH-APIKEY': config_1.key,
                'X-AUTH-SIGNATURE': signature
            },
            json: true,
            body: body
        };
        request.post(options, function (error, response, body) {
            if (error) {
                console.log("error while cancelling orders");
            }
            else {
                console.log(body);
            }
            resolve();
        });
    });
};
exports.createOrder = createOrder;
const cancelOrder = () => {
};
exports.cancelOrder = cancelOrder;
const cancelAll = (market) => {
    return new Promise((resolve) => {
        const body = {
            market,
            timestamp: Math.floor(Date.now())
        };
        const payload = Buffer.from(JSON.stringify(body)).toString();
        const signature = crypto.createHmac('sha256', config_1.secret).update(payload).digest('hex');
        const options = {
            url: baseurl + "/exchange/v1/orders/cancel_all",
            headers: {
                'X-AUTH-APIKEY': config_1.key,
                'X-AUTH-SIGNATURE': signature
            },
            json: true,
            body: body
        };
        request.post(options, function (error, response, body) {
            if (error) {
                console.log("error while cancelling orders");
            }
            else {
                console.log("canceleled all orders");
                console.log(body);
            }
            resolve();
        });
    });
};
exports.cancelAll = cancelAll;
