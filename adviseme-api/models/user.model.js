var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

//TODO: VALIDATION

var UserSchema = new mongoose.Schema({
    _id: Schema.ObjectId,
    FName: String,
    LName: String,
    Email: String,
    School: String,
    Role: String,

    //Student
    Advisor: Schema.ObjectId,
    CurrentClasses: [{class_id: Schema.ObjectId }],
    SuggestedClasses: [{class_id: Schema.ObjectId }],
    Student_Meta: Schema.ObjectId,
    //Adviser/Teacher
    Underlings: [ {student_id: Schema.ObjectId}],

    Appointments: [{ appointment: Schema.ObjectId}],
    Created: Date,
    Updated: { type: Date, default: Date.now}
})

UserSchema.plugin(mongoosePaginate)
const User = mongoose.model('User', UserSchema)

module.exports = User;
