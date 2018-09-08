'use strict';

let AreaUtils = require('./AreaUtils');
const CURR_DATE = new Date('2018-09-08T09:10:19.518Z');
exports.findOptimalAssignment = function(des, pos){
  let costTable = getAllCosts(des, pos)
  console.log("costTable->", costTable)
  let indicesOfDesAndPos = findMaxCostAssignments(costTable);
  console.log("indicesOfDesAndPos->", indicesOfDesAndPos[1], indicesOfDesAndPos[2]);
  let idOfAssignedPos = getIdFromIndex(pos, indicesOfDesAndPos[1])
  let idOfAssignedDes = getIdFromIndex(des, indicesOfDesAndPos[2])
  console.log("idOfAssignedDes, idOfAssignedPos", idOfAssignedDes, idOfAssignedPos)
  //TODO: get the ids from indicesOfDesAndPos and resturn those
  return [idOfAssignedPos, idOfAssignedDes];
}

let getAllCosts = function(des, pos){
  console.log("Calculating cost table of ", des, pos);
  let costTable = [];
  for(let i=0;i<des.length;i++){
    costTable.push([])
    for(let j=0;j<pos.length;j++){
      costTable[i].push(getDEToOrderCost(des[i], pos[j]))
    }
  }
  return costTable
}

let getDEToOrderCost = function(de, po){
  let cost=0;
  let firstMileLength = AreaUtils.distBetween(de.lat, de.long, po.lat, po.long);
  console.log("firstMileLength->", firstMileLength);
  cost += po.weightOfArea[0]*(1/firstMileLength)

  let currDate   = CURR_DATE ? new Date(CURR_DATE) : new Date();
  
  let deDate = new Date(de.last_delivery_time);
  let deWaitingTime = (currDate.getTime() - deDate.getTime()) / 1000; //This is in seconds
  cost += po.weightOfArea[1]*(deWaitingTime)
  console.log("deWaitingTime->", deWaitingTime)
  
  let poDate = new Date(po.ordered_time);
  let orderDelayTime = (currDate.getTime() - poDate.getTime()) / 1000; //This is in seconds
  cost += po.weightOfArea[2]*(orderDelayTime)
  console.log("orderDelayTime->", orderDelayTime)

  cost = cost*po.weightOfCustomer;
  console.log("final cost->", cost)
  return cost;
}



let findMaxCostAssignments = function(costTable, sumTillNow=0, orderAssignment=[], deAssignment=[], deNumber = 0){
  console.log("findMaxCostAssignments called with",costTable, sumTillNow, orderAssignment, deAssignment, deNumber)
  
  // console.log(typeof orderAssignment);
  // console.log("orderAssignment.slice().push(i)",typeof orderAssignment.slice().push(0))
  // console.log("orderAssignment->", orderAssignment)
  
  // return findMaxCostAssignments
  // return [["hellow","from"], ["other", "side"]]
  if(deNumber>=costTable.length)
    return [sumTillNow, orderAssignment, deAssignment];
  let max = [0, [], []]
  let v;

  if(costTable.length - deNumber > costTable[deNumber].length - orderAssignment.length){
    v = findMaxCostAssignments(costTable, sumTillNow, orderAssignment, deAssignment, deNumber+1);
    if(v[0]>=max[0])
      max = v
  }

  for(let i=0;i<costTable[deNumber].length;i++){
    if(orderAssignment.indexOf(i) == -1){
      let tempOA = orderAssignment.slice();
      tempOA.push(i);
      let tempDEA = deAssignment.slice()
      tempDEA.push(deNumber)
      // console.log("tempOA, tempDEA->",tempOA, tempDEA)
      v = findMaxCostAssignments(costTable, sumTillNow+costTable[deNumber][i], 
        tempOA, tempDEA, deNumber+1);
      if(v[0]>=max[0])
        max = v
    }
  }
  console.log("Response of findMaxCostAssignments->", max)
  return max;
}


let getIdFromIndex = function(arr, arrayOfIndex){
  let idArray = arrayOfIndex.map(i => {
    return arr[i].id
  })
  return idArray;
}