import {client} from '../db.js';

export const session = client.db('LUPAUTH').collection('session');

session.createIndex({sessionToken: 1});