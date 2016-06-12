var mongoose = require('mongoose');
var bcrypt = require('bcrypt-node');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    name: String,
    bio: String,
    password: {
        required: true,
        type: String,
        select: false
    },
    Role: {
        type: String,
        required: true
    },
    imageURL: String
});

userSchema.plugin(uniqueValidator);

userSchema.pre('save',function(next){
  var user = this;
  if(user.password){
    bcrypt.hash(this.password,null,null,function(err,password){
      if(err) {
        return;
      }
      user.password = password;
      next();
    });
  }
});



userSchema.methods.comparePassword = function(password) {
    var user = this;

    return bcrypt.compareSync(password, user.password);
};


module.exports = mongoose.model('user', userSchema);
