var express = require("express");
//const News=require('../models/news.js');
const Tasks1 = require('../models/tasks.js')
var router = express.Router();

const path = require('path');

router.get('/', (req, res) => {
  console.log("one")
  // res.json({
  //                     hello: 'world'
  //                 })
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
  console.log("one ", req.ip)
  // const fileDir=path.join(
  //     __dirname,
  //     "../views/index.html");
  //     res.sendFile(fileDir)
  Tasks1.find({ "title": req.params.id, "id": req.params.nr }, (err, data) => {
    // console.log("param ",data)
    res.json({
      data
    })
  })


})

router.get('/all/:nr', (req, res) => {
  //console.log("all ip ",req.ip)
  // let ClientIP=req.params.nr
  // ClientIP.split("").reverse().join("")
  // //ClientIP.replaceAll("SO",".")
  // console.log("all2 ",ClientIP.replaceAll("SO","."))
  Tasks1.find({ "id": req.params.nr }, (err, data) => {
    // console.log("param ",data)
    res.json({
      data
    })
  })
  // const fileDir=path.join(
  //     __dirname,
  //     "../views/index.html");
  //     res.sendFile(fileDir)

})

router.post('/add', (req, res) => {
  console.log("request body ", req.body)
  //const ip=req.ip
  let ip = req.headers['x-forwarded-for']// || req.connection.remoteAddress;
  //ip = ip.toString().replace('::ffff:', '');

  let date = new Date();
  // const body = {
  //   title: "rehjhjgame", // String is shorthand for {type: String}
  //   description: "drążek",
  //   body: ip,
  //   id: Math.random(),
  //   //vflags:"to work",
  //   deadline: "jutro",
  //   fl: "String",
  //   tags: ['asd', 'fg'],
  //   //comments: [{ body: String, date: Date }],
  //   createdTime: date//{ type: Date, default: Date.now },
  // };

  const newData = new Tasks1(req.body);
  const errors = newData.validateSync();

  // if ((errors.errors.title !== undefined) || (errors.errors.description !== undefined)) {
  //   if (errors.errors.title !== undefined) {
  //     console.log("title")
  //   }
  //   if (errors.errors.description !== undefined) {
  //     console.log("description")
  //     return
  //   }
  //   return
  // }
  newData.save((err) => {
    if (err) {
      console.log("Bład przy zapisie do bazy ", err)
      // const fileDir = path.join(__dirname, "../views/admin/newsForm.html");
      // res.sendFile(fileDir)
      res.json({
        err
      })
      return
    } else {
      res.json({
        task: "ok"
      })
      //res.redirect('/one');
      // const fileDir = path.join(__dirname, "../views/admin.html");
      // res.sendFile(fileDir)
    }
  })

  // const fileDir = path.join(__dirname, "../views/admin/newsForm.html");
  // res.sendFile(fileDir)

})


router.patch('/update/:id', (req, res) => {
  console.log("update body ", req.body)

  //const ip=req.ip
  let ip = req.headers['x-forwarded-for']// || req.connection.remoteAddress;
  //ip = ip.toString().replace('::ffff:', '');
  Tasks1.findOneAndUpdate({ "title": req.params.id, "id": req.body.id },
    //{"title":"zmiana"},
    {
      title: req.body.title, // String is shorthand for {type: String}
      description: req.body.description,
      body: req.body.body,
      id: req.body.id,
      vflags1: req.body.title,
      deadline: req.body.deadline,
      fl: req.body.fl,
      tags: req.body.tags,
      //comments: [{ body: String, date: Date }],
      //createdTime: { type: Date, default: Date.now },
    },
    { upsert: true },
    (err, data) => {
      // console.log("param ",data)
      res.json({
        data
      })
    })

})

router.get('/delete/:id/:nr', (req, res) => {
  console.log("delete request body ", req.params.id)
  // res.json({
  //         task: "remove"
  //      })
  //const ip=req.ip
  // let ip = req.headers['x-forwarded-for']// || req.connection.remoteAddress;
  //ip = ip.toString().replace('::ffff:', '');
  Tasks1.findOneAndDelete({ "title": req.params.id, "id": req.params.nr },
    //{"title":"zmiana"},
    // {

    // },

    (err, data) => {
      // console.log("param ",data)
      res.json({
        task: "remove"
      })
    })

})


module.exports = router;