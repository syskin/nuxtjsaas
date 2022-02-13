import { Router, Request, Response } from 'express'
import helmet from 'helmet';

import { applicationDefault, initializeApp } from 'firebase-admin/app';

import { errorHandler } from './middleware/errorHandler'
import userRouter from "./routes/users";
import stripeRouter from "./routes/stripe";
import { apps, firestore } from 'firebase-admin';
import bodyParser from 'body-parser';
// https://firebase.google.com/docs/admin/setup
// Initialize Firebase

if (!apps.length) initializeApp({
  credential: applicationDefault(),
  databaseURL: process.env.FIREBASE_DBURL || ''
});

export const db = firestore();

declare global {
  namespace Express {
    interface Request {
      rawBody: any
    }
    interface Response {
      client: any
    }
  }
}

const express = require('express')
const app = express()
app.use(
  bodyParser.json({
    verify: (req: Request, res: Response, buf) => {
      const url = req.originalUrl;
      if (url.startsWith('/api/stripe/webhook')) {
        req.rawBody = buf.toString();
      }
    }
  })
);
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

const router: Router = express.Router();
router.use('/users', userRouter(router));
router.use('/stripe', stripeRouter(router));
app.use(`/`, router);

// Middleware
app.use(errorHandler);

export default {
  path: '/api',
  handler: app
}