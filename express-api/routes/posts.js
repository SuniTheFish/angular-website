const express = require('express');
const router = express.Router();
const debug = require('debug')('express-api:server');
const mongodb = require('mongodb');
const { username, password } = require('../credentials');

/**
 * test if collection has id
 * @param {mongodb.Collection} collection
 * @param {string} id
 */
async function collectionHasId(collection, id) {
  return Boolean(await collection.find(mongodb.ObjectID(id)).limit(1).count(true));
}

/**
 * test if keys are in object
 * @param {{[key: string]: unknown}} obj the object
 * @param {string[]} keys the keys
 */
function objectHasKeys(obj, keys) {
  return !keys.some((key) => !Object.prototype.hasOwnProperty.call(obj, key));
}

/**
 * filter object to only certain keys
 * @param {{[key: string]: unknown}} obj the object to filter
 * @param {string[]} keys the keys
 */
function filterObjectByKeys(obj, keys) {
  return Object.keys(obj)
    .filter((key) => keys.includes(key))
    .reduce((fObj, key) => {
      return {
        ...fObj,
        [key]: obj[key]
      }
    }, {});
}

async function main() {
  const connectionString = `mongodb+srv://${username}:${password}@website-7lidb.mongodb.net/<dbname>?retryWrites=true&w=majority`;
  const allowedBodyKeys = ['title', 'content'];

  const client = await mongodb.connect(connectionString, { useUnifiedTopology: true }).catch(debug);
  debug('connected to db');

  /** @type {mongodb.Db} */
  const db = client.db('website');
  const postsCollection = db.collection('posts');

  router.get('/', async (req, res) => {
    const arr = await postsCollection.find().toArray().catch(debug);
    res.send(arr);
  });

  router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
      if (!(await collectionHasId(postsCollection, id))) {
        res.json((await postPromise.toArray())[0]);
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
      debug(err);
      res.sendStatus(400);
    }
  });

  router.post('/', async (req, res) => {
    const { body } = req;
    if (!objectHasKeys(body, allowedBodyKeys)) {
      res.sendStatus(204);
      return;
    }
    try {
      const result = await postsCollection.insertOne(
        filterObjectByKeys(body, allowedBodyKeys)
      );
      res.status(201);
      res.send(`${req.baseUrl}/${result.insertedId}`);
    } catch (err) {
      debug(err);
      res.sendStatus(400);
    }
  });

  router.put('/:id', async (req, res) => {
    const id = req.params.id;
    if (!(await collectionHasId(postsCollection, id))) {
      res.sendStatus(404);
      return;
    }
    const { body } = req;
    if (!objectHasKeys(body, allowedBodyKeys)) {
      res.sendStatus(204);
      return;
    }
    try {
      await postsCollection.replaceOne(
        { _id: mongodb.ObjectID(id) },
        filterObjectByKeys(body, allowedBodyKeys)
      );
      res.sendStatus(200);
    } catch (err) {
      debug(err);
      res.sendStatus(400);
    }
  });

  router.patch('/:id', async (req, res) => {
    const id = req.params.id;
    if (!(await collectionHasId(postsCollection, id))) {
      res.status(404);
      res.json(getError('id does not exist'));
    }
    const { body } = req;
    const updateObj = filterObjectByKeys(body, allowedBodyKeys);
    await postsCollection.update({ _id: mongodb.ObjectID(id) }, { $set: updateObj});
    res.sendStatus(200);
  });

  router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    if (!(await collectionHasId(postsCollection, id))) {
      res.sendStatus(404);
      return;
    }
    try {
      await postsCollection.deleteOne({ _id: mongodb.ObjectID(id) });
      res.sendStatus(200);
    } catch (err) {
      debug(err);
      res.sendStatus(400);
    }
  });
}

main();

module.exports = router;
