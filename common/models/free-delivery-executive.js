'use strict';

module.exports = function(FreeDeliveryExecutive) {
  FreeDeliveryExecutive.remoteMethod('addData', {
    http: { path: '/addData', verb: 'post' },
    accepts: [
      {
        arg: "body",
        type: "object",
        http: { source:'body' },
        required : true
      }
    ],
    returns: { arg: 'response', type: 'object', root: true}
  });

  FreeDeliveryExecutive.addData = function(body) {
    let data = body.data
    return FreeDeliveryExecutive.create(data)
  };

};
