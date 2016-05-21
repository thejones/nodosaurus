import config from 'config';
import mongoose from 'mongoose';
import timestamps from 'mongoose-timestamp';
import stripeCustomer from './stripe-customer';
import crypto from 'crypto';

const Schema = mongoose.Schema;

/**
* User Schema
*/
const UserSchema = new Schema({

  email: {
    type: String,
    trim: true,
    unique: true,
    default: ''
  },
  username: {
    type: String,
    trim: true
  },
  password: {
    type: String,
    default: ''
  },
  details: {
    firstName: {
      type: String,
      trim: true,
      default: ''
    },
    lastName: {
      type: String,
      trim: true,
      default: ''
    },
    location: {
      type: String,
      trim: true,
      default: ''
    },
    website: {
      type: String,
      trim: true,
      default: ''
    }
  },
  salt: {
    type: String
  },
  provider: {
    type: String
  },
  providerData: {},
  additionalProvidersData: {},
  roles: {
    type: [{
      type: String,
      enum: ['user', 'admin']
    }],
    default: ['user']
  },
  /* For reset password */
  resetPasswordToken: {
    type: String
  },
  resetPasswordExpires: {
    type: Date
  }
});

/**
* Hook a pre save method to hash the password
*/
UserSchema.pre('save', (next) => {
  if (this.password && this.password.length > 6) {
    this.salt = crypto.randomBytes(16).toString('base64');
    this.password = this.hashPassword(this.password);
  }

  next();
});

/**
* Create instance method for hashing a password
*/
UserSchema.methods.hashPassword = (password) => {
  if (this.salt && password) {
    return crypto.pbkdf2Sync(password,
      new Buffer(this.salt, 'base64'), 10000, 64).toString('base64');
  } else {
    return password;
  }
};

/**
* Create safe toJSON
*/

UserSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  delete user.salt;
  return user;
};

/**
* Create instance method for authenticating user
*/
UserSchema.methods.authenticate = (password) => {
  return this.password === this.hashPassword(password);
};

/**
* Add Stripe plugin to add to our User model.
*/
const stripeOptions = config.stripeOptions;

UserSchema.plugin(timestamps);
UserSchema.plugin(stripeCustomer, stripeOptions);

mongoose.model('User', UserSchema);
