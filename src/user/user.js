import {client} from '../db.js';

export const user = client.db('LUPAUTH').collection("user");