var express=require("express");
//const News=require('../models/news.js');
const Tasks1=require('../models/tasks.js')
var router=express.Router();

const path=require('path');

router.get('/',(req,res)=>{
    console.log("one")
    // res.json({
    //                     hello: 'world'
    //                 })
    const fileDir=path.join(
        __dirname,
        "../views/index.html");
        res.sendFile(fileDir)
    
})


router.get('/one/:id',(req,res)=>{
    console.log("one")
    // const fileDir=path.join(
    //     __dirname,
    //     "../views/index.html");
    //     res.sendFile(fileDir)
    Tasks1.find({"title":req.params.id}, (err, data) => {
      // console.log("param ",data)
       res.json({
                 data
          })
     })

    
})

router.get('/two',(req,res)=>{
    console.log("two")
    Tasks1.find({/*"title":req.params.id*/}, (err, data) => {
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
    console.log("request ",req.ips)
    //const ip=req.ip
    let ip = req.headers['x-forwarded-for']// || req.connection.remoteAddress;
    //ip = ip.toString().replace('::ffff:', '');

    let date=new Date();
    const body = {
        title: "sport3", // String is shorthand for {type: String}
        description: "drążek",
        body: ip,
        id:Math.random(),
        //vflags:"to work",
        deadline:"jutro",
        fl:"String",
        tags:['asd','fg'],
        //comments: [{ body: String, date: Date }],
       createdTime: date//{ type: Date, default: Date.now },
    };

    const newData = new Tasks1(body);
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
        console.log("Bład przy zapisie do bazy ",err)
        // const fileDir = path.join(__dirname, "../views/admin/newsForm.html");
        // res.sendFile(fileDir)
        return
      } else {
        res.redirect('/one');
        // const fileDir = path.join(__dirname, "../views/admin.html");
        // res.sendFile(fileDir)
      }
    })
  
    // const fileDir = path.join(__dirname, "../views/admin/newsForm.html");
    // res.sendFile(fileDir)
  
  })


module.exports=router;