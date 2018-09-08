module.exports = function(app) {
    const Models = ['order_assignment','pending_order','free_delivery_executive'];
    Models.forEach(Model => {
      Model = app.models[Model]
      Model.remoteMethod('removeAll', {
        http: {
          path: '/removeAll',
          verb: 'post',
        },
        accepts: [],
        returns: {
          arg: 'response',
          type: 'object',
          root: true,
        },
      });
    
      Model.removeAll = function(cb) {
        Model.destroyAll(cb);
      };
  
    })
  
    
  };