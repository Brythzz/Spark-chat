import mongoose from 'mongoose';
const { Schema, model } = mongoose;

//////////////////////////////////////////////////
//  MONGO MODELS
//////////////////////////////////////////////////


const userSchema = Schema({
    email: String,
    username: String,
    password: String,
    color: String
});

export const User = model('users', userSchema);


const whitelistSchema = Schema({
    email: String
});

export const Whitelist = model('whitelist', whitelistSchema, 'whitelist');
