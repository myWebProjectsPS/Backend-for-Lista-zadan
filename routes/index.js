var express = require("express");
const Tasks1 = require('../models/tasks.js')
var router = express.Router();

const path = require('path');

router.get('/', (req, res) => {

  const fileDir = path.join(
    __dirname,
    "../views/index.html");
  res.sendFile(fileDir)

})

router.get('/ip', (req, res) => {
  console.log(req.ip, req.ips);
  res.json({
    'ip': req.ip,
    'ips': req.ips
  })

})


router.get('/one/:id/:nr', (req, res) => {
  Tasks1.find({ "title": req.params.id, "id": req.params.nr }, (err, data) => {
    res.json({
      data
    })
  })

})

router.get('/all/:nr', (req, res) => {
  Tasks1.find({ "id": req.params.nr }, (err, data) => {
    res.json({
      data
    })
  })

})

router.post('/add', (req, res) => {
  let ip = req.headers['x-forwarded-for']// || req.connection.remoteAddress;

  let date = new Date();

  const newData = new Tasks1(req.body);
  const errors = newData.validateSync();
  newData.save((err) => {
    if (err) {
      res.json({
        null: null
      })
      return
    } else {
      res.json({
        task: "ok"
      })
    }
  })
})


router.patch('/update/:id', (req, res) => {
  let ip = req.headers['x-forwarded-for']// || req.connection.remoteAddress;
  Tasks1.findOneAndUpdate({ "title": req.params.id, "id": req.body.id },
    {
      title: req.body.title,
      description: req.body.description,
      body: req.body.body,
      id: req.body.id,
      vflags1: req.body.title,
      deadline: req.body.deadline,
      fl: req.body.fl,
      tags: req.body.tags,
    },
    { upsert: true },
    (err, data) => {
      res.json({
        data
      })
    })

})

router.get('/delete/:id/:nr', (req, res) => {
  console.log("delete request body ", req.params.id)
  Tasks1.findOneAndDelete({ "title": req.params.id, "id": req.params.nr },
    (err, data) => {
      res.json({
        task: "remove"
      })
    })

})


module.exports = router;