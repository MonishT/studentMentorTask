import express from 'express';
import { createEntity, readAll} from './Database/db-utils.js';

const mentorRouter = express.Router();

//API call to Get all mentors
mentorRouter.get('/mentors', async (req, res) => {
    res.send(await readAll('mentor'));
});

//API call to Create a new mentor
mentorRouter.post('/createMentor', async (req, res) => {
    console.log("Request : "+req.body);
    await createEntity('mentor',req.body);
    res.send({'msg':'Mentor created successfully'});
});

export default mentorRouter;