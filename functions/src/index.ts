"use strict";
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import  {environment} from './environment';
import * as express from 'express';
import * as cors from 'cors';
import axios from 'axios';
const paypal = require('paypal-rest-sdk');
// [START additionalimports]
// Moments library to format dates.
import * as  moment from'moment';

//const axios = require('axios');

const corsHandler = cors({origin: true});

const app = express();

app.use(corsHandler);
// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

// Before final deployment make sure that these headers are OPTIMIZED: for production
/*********************************
 Before final deployment make sure that these headers are OPTIMIZED: for production
*********************************/
app.use((req, res, next)=> {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST,PATCH, PUT, DELETE, OPTIONS");
  next();
});

admin.initializeApp();
const db = admin.firestore();

/********************************
*                               *
*    EXPRESS APP Routes section *
*      with cors                *
*********************************/

// handle the routes here using the express app

app.post('/api/sendmessage', async (req, res) =>{

    const accountSID = environment.twilio.id;
    const authToken = environment.twilio.token;
    const myNumber = environment.twilio.number;

    const client = require('twilio')(accountSID, authToken);
    // implement the type var complete or received, one for success transaction
    // another when the recipient get the money
    console.log('data from the client before SMS send: ', req.body);

    try {
      const resultObs = await sendUserSMS(client, req.body, myNumber);
      const result = await resultObs;
      const sucessMessage = {
        time:new Date().toISOString(),
        feedback: 'successfully sent the SMS!',
        content:JSON.stringify(result)
      };
      res.status(200).json(sucessMessage);
    }
    catch(error) {
      const errorMessage = {
            time:new Date().toISOString(),
            feedback: 'Error when sending the SMS!',
            content:error
          }
      res.status(500).json(errorMessage);
    };
  });
/**
 * Expected in the body the amount
 * Set up the payment information object
 * Initialize the payment and redirect the user to the PayPal payment page
 */
app.post('/api/payment', async (req, res) =>{

    paypal.configure({
        'mode': 'sandbox', //sandbox or live
        'client_id': environment.paypal.id,
        'client_secret': environment.paypal.secret
      });
    // implement the type var complete or received, one for success transaction
    // another when the recipient get the money
    // 1.Set up a payment information object, Build PayPal payment request
    const price = req.body.price;
    const uid = req.body.uid;

      const payReq = JSON.stringify({
        intent: 'sale',
        payer: {
          payment_method: 'paypal'
        },
        redirect_urls: {
          return_url: `${req.get('origin')}/process/payment`,
          cancel_url: `${req.get('origin')}/process/cancel`
        },
        transactions: [{
          amount: {
            total: price,
            currency: 'USD'
          },
          // This is the payment transaction description. Maximum length: 127
          description: uid, // req.body.id
          // reference_id string .Optional. The merchant-provided ID for the purchase unit. Maximum length: 256.
          // reference_id: req.body.uid,
          custom: uid,
          // soft_descriptor: req.body.uid
          // "invoice_number": req.body.uid,A
        }]
      });

      console.log("the redirect urls are: ", payReq);

      // 2.Initialize the payment and redirect the user.
    paypal.payment.create(payReq, (error:any, payment:any) => {
      //const links:Object = {};
      if (error) {
        console.error(error);
        res.status(500).end();
      } else {
        // Capture HATEOAS links
        console.log("payment object is: ", payment);
      /*  payment.links.forEach((linkObj) => {
          links[linkObj.rel] = {
            href: linkObj.href,
            method: linkObj.method
          };
        });
        // If redirect url present, redirect user
        if ( Object.prototype.hasOwnProperty.call(links, 'approval_url')) {
          // REDIRECT USER TO links['approval_url'].href
          console.info(links.approval_url.href);
          // res.json({"approval_url":links.approval_url.href});
          res.redirect(302, links.approval_url.href);
        } else {
          console.error('no redirect URI present');
          res.status(500).end();
        }*/
        let flag = false;
        let flagged_url = '';
        for (let index = 0; index < payment.links.length; index++) {
          const element = payment.links[index];
           if (element.rel === 'approval_url') {
            // REDIRECT USER TO links['approval_url'].href
            console.log("href founf: ", element.href);
            flag = true;
            flagged_url = element.href;
          }

        }
        if(flag){

           res.status(200).json({"approval_url":flagged_url});
          //res.redirect(302, flagged_url);
          //res.status(200).send(flagged_url);
        }  else {
          console.error('no redirect URI present');
          console.log("no url found!");
          res.status(500).end();
        }

      }
    });

});

// 3.Complete the payment. Use the payer and payment IDs provided in the query string following the redirect.
app.post('/api/payment/execute', async (req, res) => {
  const paymentId = req.body.paymentId;
//  const payerId = req.body.payerID;
  const payerId = {
  payer_id: req.body.payerID
};
payerId.payer_id=req.body.payerID;
  console.log("payment execute data from client: ", req.body);
  const r = await paypal.payment.execute(paymentId, payerId, (error:any, payment:any) => {
    if (error) {
      console.error(error);
      res.status(200).json({"error_url":`${req.get('origin')}/process/process/error`});
      //res.redirect(`${req.get('origin')}/process/payment/error`); // replace with your url page error
    } else {
      if (payment.state === 'approved') {
        console.info('payment completed successfully, description: ', payment.transactions[0].description);
        // console.info('req.custom: : ', payment.transactions[0].custom);
        // set paid status to True in RealTime Database
        const date = Date.now();
        const description = payment.transactions[0].description;
      /*  const ref = admin.database().ref('users/' + uid + '/');
        ref.push({
          'paid': true,
          // 'description': description,
          'date': date
        })*/
        res.status(200).json({"success_url":`${req.get('origin')}/process/process/success`,

                              "description": payment});
        console.log("time success: ", date);

        // replace with your url, page success

      } else {
        console.warn('payment.state: not approved ?');
        // replace debug url
        //res.redirect(`https://console.firebase.google.com/project/${process.env.GCLOUD_PROJECT}/functions/logs?search=&severity=DEBUG`);
      }
    }
    console.info('promise: ', payment);
  });

});
/********************************
*                               *
*    Firebase Functions section *
*      HTTP ON REQUEST          *
*********************************/


//Ping function to ensure that the firebase functions is still working

exports.pingFunctionWithCorsAllowed = functions.https.onRequest((request, response) => {
  corsHandler(request, response, async () => {
    const ipReturned = await getUserLocation();
    response.send(`Ping from Firebase (with CORS handling)! ${new Date().toISOString()} Ip address: ${ipReturned}`);
  });
});

// Send the date and time from server

exports.localDate = functions.https.onCall((data, context) => {
  // Reading date format from URL query parameter.
  // [START readQueryParam]
  let format = data.format;
  // [END readQueryParam]
  // Reading date format from request body query parameter
  if (!format) {
    // [START readBodyParam]
    format = 'YYYY-MM-DD';
    // [END readBodyParam]
  }
  // [START sendResponse]
  const formattedDate = moment().format(format);
  console.log('Sending Formatted date:', formattedDate);

  return formattedDate;
  // [END sendResponse]
});

// All the application API after init are handled here
exports.localAPI = functions.https.onRequest(app);

/*****************************
*                            *
*    Local Functions section *
*                            *
*****************************/
// Send SMS function

async function sendUserSMS(client:any, data:any, myNumber:any){

  /**
  * Preparing the sms before send with data fron client
  */
  const recMessage = data.message;
  const recNumber = data.phoneNumber;

  /**
  * Sedning the sms
  */

  try {  const resultObs = await client.messages.create({
                                           body: recMessage,
                                           from: myNumber,
                                           to: recNumber
                                         });
        const result = await resultObs;
    console.log("message sent successfully to ", recNumber, recMessage, result);
    return `message from, ${myNumber}, ${result}`;
    }
    catch(error) {
      console.log("twilio error message: ", error);
      return `error message from twilio, ${error}`;
    }

}

// get user location function
async function getUserLocation() {

  // Get the IP Location of the user
  let ip_api_key = environment.ipFy.apiKey;
  let ip_api_url = 'https://geo.ipify.org/api/v1?';

  try {
    let userIP = await axios.get(ip_api_url,
                {
                  params: {
                      apiKey: ip_api_key
                  }
                });
      console.log("get ip result from server: ", userIP);
      return userIP;
    }
    catch(error){
      console.log("get ip error from server: ", error);
      return error;
    }

  // this.apiService.apiPostUserIP(userIP);

  // Get the country details of the user
//  let co_api_url = 'https://restcountries.eu/rest/v2/alpha?codes=';
//  let userCountryCode = await this.apiService.apiGetUserCountryCode().country;
  // request both the destination country which always CD for now and send country.
//  let co_url = co_api_url + userCountryCode +';cd';

  // need to add a try and catch to get error for error handling
//  let countries = await this.http.get (co_url).toPromise();

//  this.apiService.apiPostCountries(countries);

  // Get the currencies details of the user
//  let cu_api_url = 'https://api.exchangeratesapi.io/latest?base=';
//  let sendCountryCode = await countries[0].currencies[0].code;
  // request both the destination country which always CD for now and send country.
//  let cu_url = cu_api_url + sendCountryCode ;

//  let exchangeRate = await this.http.get (cu_url).toPromise();

//  this.apiService.apiPostExchangeRate(exchangeRate);

//  return countries;
}
