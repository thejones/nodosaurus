import config from 'config';
import mongoose from 'mongoose';
import timestamps from 'mongoose-timestamp';
import stripeCustomer from './stripe-customer';


const Schema = mongoose.Schema;
const PostSchema = new Schema({

  name: {
    type: String,
    required: true
  },
  content: {
    type: String
  },
  created_by: {
    type: String,
    index: true,
    required: true
  }
});

mongoose.model('Post', PostSchema);
