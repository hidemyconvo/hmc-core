var mongoose    = require('mongoose'),
    Schema      = mongoose.Schema;

var UserSchema = new Schema({
  pubKey:       { type: String, default: '' },
  pubID:        { type: String, default: '' },
  accessToken:  { type: String, default: '' }
})

UserSchema.methods = {
}

mongoose.model('User', UserSchema);
