const express = require('express');   //obtained by npm install express
const mongoose = require('mongoose'); // an ODM
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const dreamDiaryRoutes = express.Router();
const dreamDiary = require('./dreamModel');
const dream = require('./dreamModel');
var MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
console.log(process.env.PORT);
const PORT = process.env.PORT || 8000;
const CONNECTION = process.env.DATABASE;

//DB connection
app.use(cors());
app.use(bodyParser.json());
mongoose.connect(CONNECTION, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
    }).then(() => {
        console.log('DB connected');
    }).catch((err) => {
        console.log(`Error connecting to the database:\n ${err}`)
    });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})


//get all diaries
dreamDiaryRoutes.route('/diaries').get(function(req, res){
  dreamDiary.dreamDiary.find(function(err, dreams){
    if(err){
      console.log(err);
    } else{
      console.log(dreams.owner);
      res.json(dreams.owner);
    }
  })
})
//get all dreams
dreamDiaryRoutes.route('/').get(function(req, res) {
    console.log(dreamDiary);
    dreamDiary.dreamDiary.find(function(err, dreams) {
        if (err) {
            console.log(err);
        } else {
            console.log(dreams);
            res.json(dreams);
        }
    });
});

//get dreams by myOwner
dreamDiaryRoutes.route('/:owner').get(function(req, res) {
    console.log(dreamDiary);
    myOwner = req.params.owner;
    dreamDiary.dreamDiary.find({owner: myOwner},function(err, dreams) {
        if (err) {
            console.log(err);
        } else {
            console.log(dreams);
            res.json(dreams);
        }
    });
});
//get dream by title
dreamDiaryRoutes.route('/title').post(function(req, res) {
    let title = req.body.title;
    let owner = req.body.owner;
    dreamDiary.dreamDiary.find({}, function(err, dream){
      let a = dream[0].dreams.find(element => element.title = title);
      res.json(a)
      });
});

//create a dream diary
dreamDiaryRoutes.route('/mkdiary').post(function(req,res){
  dream = new dreamDiary.dreamDiary(req.body);
  dream.save()
      .then(res => {
        res.status(200).json({'dream': 'dream diary created'})
      })
      .catch(err => {
        res.status(200).json({'dream': 'Error creating diary'})
      });
    });

//add a dream
dreamDiaryRoutes.route('/add').post(function(req, res) {
    //if the owner already has a diary
    myOwner = req.body.owner;
    dreamDiary.dreamDiary.find({owner: myOwner}, function(err, resp1){
        if(err) console.log(err);
        if(resp1.length == 0){  // if there is no owner already in the db
          let dream = new dreamDiary.dreamDiary(req.body);
          dream.save()
              .then(res =>{
                res.status(200).json({'dream': 'dream added succesfully'});
              })
              .catch(err=> {
                res.status(400).json({'dream':'adding new dream failed'});
              });
        }else{
          // if owner exists
          dreamDiary.dreamDiary.findOneAndUpdate(
            {owner : req.body.owner}, { $push: { dreams : req.body.dream} },
            function(err, resp){
              console.log(resp);
              if (err){console.log(err)}else{
              res.send("succesfully added the new dream");
            }
            })
        }
    })
});

//delete a dream
dreamDiaryRoutes.route('/delete/dream').delete(function(req, res){
  //if(err) console.log(err);
  // req.body shall have the name of the diary and title of the dream to delete.
  // this function will delete the dream if title and owner are both provided.
  // if only the deram diary's owner name is sent.. the entire dream diary would be deleted.
  if(!req.body.title &&req.body.owner) {
      dreamDiary.dreamDiary.findOneAndDelete({owner: req.body.owner}, function(err, resp){
        if (err){console.log(err);}
        res.send("succesfully removed dream");
      })
  }
  if(req.body.title && req.body.owner){
    dreamDiary.dreamDiary.updateOne({owner:req.body.owner}, {$pull: {dreams : {title:req.body.title}}}, function(err, resp){
      if(err) console.log(err);
      res.send("succesfully removed dream");
    });
}
});

// delete the entire dream diary belonging to a dream owner
dreamDiaryRoutes.route('/delete/dreamDiary').delete(function(req, res){
  if(req.body.owner) {
      dreamDiary.dreamDiary.findOneAndDelete({owner: req.body.owner}, function(err, resp){
        if (err){console.log(err);}
        res.send("succesfully removed dream diary");
      })
  }
});

//update a dream
// the response should have a dreamtitle,dreamBody and owner
dreamDiaryRoutes.route('/update').post(function(req, res) {
    if(req.body.dreamBody){
      dreamDiary.dreamDiary.updateOne({owner:req.body.owner, "dreams.title": req.body.title}, {$set: {"dreams.$.body" :req.body.dreamBody}}, function(err, resp){
        if(err) console.log(err);
        res.send("succesfully updated dream");
    });
  }
});

app.use('/dreams', dreamDiaryRoutes);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
