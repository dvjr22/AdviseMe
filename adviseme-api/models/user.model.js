var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')
var passportLocalMongoose = require('passport-local-mongoose');


//TODO: VALIDATION

var UserSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    school: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
    },

    //Student
    advisor: Schema.ObjectId,
    currentClasses: [{class_id: Schema.ObjectId }],
    suggestedClasses: [{class_id: Schema.ObjectId }],
    student_Meta: Schema.ObjectId,

    //Adviser/Teacher
    underlings: [ {student_id: Schema.ObjectId}],

    //Other data
    appointments: [{ appointment: Schema.ObjectId}],
    created: Date,
    updated: { type: Date, default: Date.now}
})

UserSchema.plugin(passportLocalMongoose);
UserSchema.plugin(mongoosePaginate)

const User = mongoose.model('User', UserSchema)

module.exports = User;
