'use strict';

var paybox = require('paybox');
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  var transactionData = {
    offer   : 'system', // always 'system'
    isTest  : true,   // Optional
    key     : '0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF'+
              '0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF'+
              '0123456789ABCDEF0123456789ABCDEF',
    PBX_    : {
      SITE       : '1999888',
      RANG       : '32',
      IDENTIFIANT: '107904482',
      TOTAL      : 1000,
      DEVISE     : '978', // currency in ISO 4217
      // Do not include colons (":") in the payment id (PBX_CMD).
      // If you do, the node-paybox module will not succeed in verifying
      // the signature of the message. It seems to have something to do
      // with the : not properly being URL encoded.
      CMD        : 'TEST Paybox',
      PORTEUR    : 'test@paybox.com',
      // Make sure that 'sign:K' (if used) is the last parameter,
      // otherwise the signature validation might fail!
      RETOUR     : 'Mt:M;Ref:R;Auto:A;Erreur:E',
      HASH       : 'SHA512',
      TIME       : '2014-12-01T00:00:00+01:00',
    }
  };

  paybox.createTransaction(transactionData, function(err, transaction) {
    var html = '<form method="' + transaction.method + '" ' +
               'action="' + transaction.url + '">' +
               transaction.body +
               '<button type="submit" class="btn_confirm">Test payment</button>' +
               '</form>';
    res.status(200).send(html);
  });
});

app.listen(3333, function () {
  console.log('Visit http://localhost:3333/ to see a paybox form.');
});
