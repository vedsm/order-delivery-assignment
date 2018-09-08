var assert = require('assert');
var path = require('path');
var should = require('chai').should();
var supertest = require('supertest');
var api = supertest('http://localhost:3000');

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1,2,3].indexOf(4), -1);
    });
  });
});

describe('Database connection', function() {
  it('Checks if server is running and able to connect to database', function(done) {
    api.get('/api/order_assignments')
      .expect(200, done)
  });
});

let deleteAllData = function(){
  describe('Cleans all models data for a fresh start', function() {
    // describe('Deletes dock data', function() {
      it('Delete data in order_assignments', function(done) {
        api.post('/api/order_assignments/removeAll')
          .expect(200)
          .end(function(err, res){
            if(!err){
              console.log("No of order_assignments deleted->", res.body)
              done()
            }
            else{
              done(err)
            }
          })
      });
    // })
    it('Delete data in pending_orders', function(done) {
      api.post('/api/pending_orders/removeAll')
        .expect(200)
        .end(function(err, res){
          if(!err){
            console.log("No of pending_orders deleted->", res.body)
            done()
          }
          else{
            done(err)
          }
        })
    });
    it('Delete data in free_delivery_executives', function(done) {
      api.post('/api/free_delivery_executives/removeAll')
        .expect(200)
        .end(function(err, res){
          if(!err){
            console.log("No of free_delivery_executives deleted->", res.body)
            done()
          }
          else{
            done(err)
          }
        })
    });
  })
}

describe('Uploads test data of small size', function() {
  deleteAllData()
  
  describe('Uploads free_delivery_executives data', function() {
    it('uploads csv file to /api/free_delivery_executives/addData', function(done) {
      api.post('/api/free_delivery_executives/addData')
      .send({
        "data":[
          {
          "id": "de123",
          "lat": 1,
          "long":1,
          "last_delivery_time":"2018-09-08T09:10:09.518Z"
          },
          {
            "id": "de456",
            "lat": 1.5,
            "long":1.5,
            "last_delivery_time":"2018-09-08T09:10:09.518Z"
            }
        ]
      })
      .expect(200)
      .end(function(err, res){
        // res.should.have.status(200)
        // expect(res.body.ok).to.equal(true);
        if(!err){
          console.log("response of adding free_delivery_executives", res.body)
          done()
        }
        else{
          done(err)
        }
      })
    });
  })

  describe('Uploads pending_orders data', function() {
    it('uploads csv file to /api/pending_orders/addData', function(done) {
      api.post('/api/pending_orders/addData')
      .send({
        "data":[
          {
          "id": "po123",
          "lat": 2,
          "long":2,
          "ordered_time":"2018-09-08T09:10:09.518Z"
          },
          {
            "id": "po456",
            "lat": 1.7,
            "long":1.7,
            "ordered_time":"2018-09-08T09:10:09.518Z"
          }
        ]
      })
      .expect(200)
      .end(function(err, res){
        // res.should.have.status(200)
        // expect(res.body.ok).to.equal(true);
        if(!err){
          // console.log("No of pending_orders created", res.body.length);
          console.log("Res of adding pending_orders", res.body)
          done();
        }
        else{
          done(err)
        }
      })
    });
  })
});