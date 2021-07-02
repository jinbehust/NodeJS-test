const mongoose = require('mongoose');

const { Schema } = mongoose;

const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
  firstname: {
    type: String,
    default: '',
  },
  lastname: {
    type: String,
    default: '',
  },
  facebookId: String,
  admin: {
    type: Boolean,
    default: false,
  },
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('user', UserSchema);
