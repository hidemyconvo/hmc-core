var mongoose    = require('mongoose'),
    Schema      = mongoose.Schema;

var MessageSchema = new Schema({
    id:         {type: Schema.Types.ObjectId, required: true},
    authorUid:  {type: Schema.Types.ObjectId, required: true},
    body:       {type: String, default: ''},
    ctime:  {type: Date, default: Date.now},
    threadId:   {type: String, default: ''}
});

MessageSchema.methods = {

}

mongoose.model('Message', MessageSchema);
