const AWS = require( "aws-sdk");
const { v4: uuidv4 } = require("uuid");

const ddb = new AWS.DynamoDB({region:  "eu-west-1"});
const productsIds = new Array(4).fill(undefined).map(()=>uuidv4());
ddb.batchWriteItem({
      RequestItems: {
        Products: [
          {
            PutRequest: {
              Item: {
                id: { S: productsIds[0] },
                title: { S: "Ring Alarm Smoke and CO Listener" },
                description: {
                  S: "Ring Alarm Smoke and CO Listener alerts you on your smart phone when your existing smoke and carbon monoxide detectors sound their alarms.",
                },
                price: { N: '34.99' },
              },
            },
          },
          {
            PutRequest: {
              Item: {
                id: { S: productsIds[1] },
                title: { S: "Eve Door & Window - Apple HomeKit Smart Home" },
                description: {
                  S: "Eve Door & Window requires iPhone or iPad with the latest version of iOS/iPadOS. Check your door or window: See the current open/closed state at a glance Get activity notifications and automatically activate other HomeKit-enabled accessories courtesy of your home hub (HomePod mini, HomePod, or Apple TV). Time and duration statistics to make smarter choices",
                },
                price: { N: '39.95' },
              },
            },
          },
          {
            PutRequest: {
              Item: {
                id: { S: productsIds[2] },
                title: { S: "myQ Chamberlain Smart Garage Control" },
                description: {
                  S: "Wireless Garage Hub and Sensor with Wifi & Bluetooth - Smartphone Controlled, myQ-G0401-ES, White",
                },
                price: { N: '20.7' },
              },
            },
          },
          {
            PutRequest: {
              Item: {
                id: { S: productsIds[3] },
                title: { S: "Smart Lock, ULTRALOQ U-Bolt" },
                description: {
                  S: "5-in-1 Keyless Entry Door Lock with Smartphone, Bluetooth, Keypad, Auto Unlock, Smart Door Lock, Smart Deadbolt, Front Door Lock, ANSI Grade 1 Certified - Black",
                },
                price: { N: '39' },
              },
            },
          },
        ],
        Stocks: [
          {
            PutRequest: {
              Item: {
                product_id: { S: productsIds[0] },
                count: { N: '4' },
              },
            },
          },
          {
            PutRequest: {
              Item: {
                product_id: { S: productsIds[1] },
                count: { N: '10' },
              },
            },
          },
          {
            PutRequest: {
              Item: {
                product_id: { S: productsIds[2] },
                count: { N: '15' },
              },
            },
          },
          {
            PutRequest: {
              Item: {
                product_id: { S: productsIds[3] },
                count: { N: '24' },
              },
            },
          },
        ],
      },
    }, function (err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Success", data);
      }
    });