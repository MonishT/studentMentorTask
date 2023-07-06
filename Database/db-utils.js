import { ObjectId } from 'mongodb';
import DbClient from './db-client.js'
const DB_NAME = 'school';

// GET All entity name
const readAll = async (entityName) => {
  return await DbClient.db(DB_NAME).collection(entityName).find(
    {},
    {
      projection: {
        _id: 0
      }
    }).toArray();
};

// GET One Entity --> READ One
const findEntity = async (entityName, entityId) => {
  return await DbClient.db(DB_NAME).collection(entityName).findOne(
    {name: entityId },
    {
      projection: {
        _id: 0
      }
    }
);
}

// GET One Entity --> READ One
const findallEntity = async (entityName, entityId) => {
  return await DbClient.db(DB_NAME).collection(entityName).find(
    {mentor: entityId },
    {
      projection: {
        _id: 0
      }
    }).toArray();
}

// create --> CREATE
const createEntity = async (entityName, entityObj) => {
  return await DbClient.db(DB_NAME).collection(entityName).insertOne(
    { ...entityObj, id: new ObjectId().toString() }
  );
}

// update one entity --> PUT
const updateMentorEntity = async (entityName, entityId, entityObj) => {
  return await DbClient.db(DB_NAME).collection(entityName).updateOne(
    { 'id': entityId },
    { '$set': {
          "mentor":entityObj
      } 
    }
  );
}

// update one entity --> PUT
const changeMentorEntity = async (entityName, entityId, entityObj,updatedEntityObj) => {
  return await DbClient.db(DB_NAME).collection(entityName).updateOne(
    { 'id': entityId },
    { '$set': {
          "mentor":updatedEntityObj,
          "previousMentor":entityObj
      } 
    }
  );
}

export {
  readAll,
  createEntity,
  updateMentorEntity,
  changeMentorEntity,
  findEntity,
  findallEntity
}

