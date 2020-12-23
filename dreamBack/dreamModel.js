const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let dream = new Schema({
  title: String,
  body: String,
  date: Date,
  tags: ["horror", "love", "peace", "death", "happy", "sad"]
});

let dreamDiary = new Schema({
    owner: String,
    dreams: [dream]
});


dreamDiary = mongoose.model('dreamDiary', dreamDiary);
dream = mongoose.model('dream', dream);
module.exports = {dreamDiary, dream};

//each dream diary is recognized uniquely by the name of its owner.
//each dream is recognized uniquely by the dream title
