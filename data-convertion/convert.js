import * as dfd from 'danfojs-node';
import { MongoClient } from 'mongodb';

let surveyArray = [];
let configArray = [];
let testArray = [];
let rawArray = [];

const url = 'mongodb://47.242.70.161:27017/';
MongoClient.connect(url, (err, db) => {
  if(err) throw err;
  const dbo = db.db('web4aged');
  let collection = dbo.collection('records');
  collection.find().toArray((err, docs) => {
    rawArray = docs;
    rawArray.forEach(r => {
      r.survey['_id'] = r._id;
      r.config['_id'] = r._id;
      r.test['_id'] = r._id;
      surveyArray.push(r.survey);
      configArray.push(r.config);
      testArray.push(r.test);
    })
    const surveyDf = new dfd.DataFrame(surveyArray);
    const configDf = new dfd.DataFrame(configArray);
    const testDf = new dfd.DataFrame(testArray);
    const rawDf = new dfd.DataFrame(rawArray);
    surveyDf.print();
    dfd.toCSV(surveyDf, {filePath: 'survey.csv'});
    dfd.toCSV(configDf, {filePath: 'config.csv'});
    dfd.toCSV(testDf, {filePath: 'test.csv'});
    dfd.toCSV(rawDf, {filePath: 'raw.csv'});
    db.close();
  });
})




