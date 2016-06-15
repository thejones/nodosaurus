import config from 'config';
import mongoose from 'mongoose';
import timestamps from 'mongoose-timestamp';


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
PostSchema.plugin(timestamps);

mongoose.model('Post', PostSchema);
