const mongoose = require('mongoose');

const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url, { useNewUrlParser: true });

connect.then((db) => {
  console.log('Connected correctly to server');

  Dishes.create({
    name: 'Rice',
    description: 'test',
  })
    .then((dish) => {
      console.log(dish);
      return Dishes.findByIdAndUpdate(
        dish._id,
        {
          $set: { description: 'Update Test' },
        },
        { new: true }
      ).exec();
    })
    .then((dish) => {
      console.log(dish);
      dish.comments.push({
        rating: 5,
        comment: "I'm getting a sinking felling!",
        author: 'GiangDuc',
      });
      return dish.save();
    })
    .then((dish) => {
      console.log(dish);
      return Dishes.deleteMany({});
    })
    .then(() => mongoose.connection.close())
    .catch((err) => console.log(err));
});
