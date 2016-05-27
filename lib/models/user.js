import config from 'config';
import mongoose from 'mongoose';
import timestamps from 'mongoose-timestamp';
import stripeCustomer from './stripe-customer';


const Schema = mongoose.Schema;
const UserSchema = new Schema({

  group: {
    type: String,
    default: 'user',
    enum: [ 'admin', 'user' ],
    lowercase: true,
    trim: true
  },
  user_id: {
    type: String,
    unique: true,
    index: true,
    required: true
  }
});

/**
* Add Stripe plugin to add to our User model.
*/
const stripeOptions = config.stripeOptions;

UserSchema.plugin(timestamps);
UserSchema.plugin(stripeCustomer, stripeOptions);

mongoose.model('User', UserSchema);
