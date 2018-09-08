'use strict';
const app = require('../../server/server');

const AreaUtils = require('../lib/AreaUtils');
const CustomerUtils = require('../lib/CustomerUtils');
const CostUtils = require('../lib/CostUtils')

module.exports = function(PendingOrder) {
  PendingOrder.remoteMethod('addData', {
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

  PendingOrder.addData = function(body) {
    let data = body.data;
    return PendingOrder.create(data)
      .then(poInstances => {
        return PendingOrder.assignToFreeDeliveryExecutives(poInstances)
      })
      .catch(err => {
        return Promise.reject(err);
      })
  };

  PendingOrder.assignToFreeDeliveryExecutives = function(poInstances){
    let pos, des;
    let assignedOrders, assignedDes;
    poInstances = poInstances.map(po => {
      po = po.toObject()
      let weightOfArea = AreaUtils.getWeightsOfArea(po.lat, po.long);
      let weightOfCustomer = CustomerUtils.getWeightOfCustomer(po.id);
      po = Object.assign({weightOfArea}, po)
      po = Object.assign({weightOfCustomer}, po)
      return po
    })
    // return PendingOrder.getCostOfAssignmentTable()
    pos = poInstances;
    let Free_delivery_executive = app.models.free_delivery_executive;
    return Free_delivery_executive.find({})
      .then(deInstances => {
        deInstances = deInstances.map(de => {
          de = de.toObject()
          return de
        })
        des = deInstances;
        return deInstances;
      })
      .then(res => {
        return CostUtils.findOptimalAssignment(des, pos)
      })
      .then(res => {
        let [pos_assignment=[], des_assignment=[]] = res;
        assignedOrders = pos_assignment;
        assignedDes = des_assignment;
        let Order_assignment = app.models.order_assignment;
        let p = []
        for(let i=0;i<assignedOrders.length;i++){
          p.push(Order_assignment.create({
            order_id: assignedOrders[i],
            delivery_executive_id: assignedDes[i]
          }))
        }
        // return {assignedOrders, assignedDes}
        return Promise.all(p)
      })
      .then(res => {
        //TODO: delete assignedOrders, assignedDes
        let p = [];
        for(let i=0;i<assignedOrders.length;i++){
          p.push(PendingOrder.destroyById(assignedOrders[i]))
          p.push(Free_delivery_executive.destroyById(assignedDes[i]))
        }
        return Promise.all(p);
      })
      .catch(err => {
        return Promise.reject(err);
      })
  }

};
