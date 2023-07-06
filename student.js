// students.js
import express from 'express';
import { createEntity,findEntity,findallEntity, readAll,updateMentorEntity, changeMentorEntity } from './Database/db-utils.js';
const studentRouter = express.Router();

//API call to Get all students
studentRouter.get('/students', async (req, res) => {
    res.send(await readAll('student'));
});

//API call to Create a new student
studentRouter.post('/createStudent', async (req, res) => {
    const {name} = req.body;
    const student = await findEntity('student',name);
    if(student === null || student === undefined){
        await createEntity('student',req.body);
        res.send({"msg":"Student created successfully"});
    }else{
        res.send({"msg":"Student already exists"});
    } 
});

//API call to assign Mentor for particular student
studentRouter.post('/assignMentor', async(req,res) => {
    const{studentName,mentor} = req.body;
    const studentObj = await findEntity('student',studentName);
    const mentorName = await findEntity('mentor',mentor);
    console.log("student : "+studentObj['name']);
    console.log("Mentor : "+studentObj['mentor']);
    if(studentObj['name'] === null || studentObj['name'] === undefined){
        res.send({"msg":"Student not available"});
    }else if(mentorName === null || mentorName === undefined || 
        mentor === null || mentor === undefined){
        res.send({"msg":"Mentor not available"})
    }else if(studentObj['mentor'] === null || studentObj['mentor'] === undefined){
        await updateMentorEntity('student',studentObj['id'],mentor);
        res.send({"msg":"Mentor assigned successfully"});
    }else{
        res.send({"msg":"Mentor already assigned"})
    }
});

//API call to change Mentor details for particular student
studentRouter.post('/changeMentor', async(req,res) => {
    const{studentName,mentor} = req.body;
    const studentObj = await findEntity('student',studentName);
    const mentorName = await findEntity('mentor',mentor);
    console.log("student : "+studentObj['name']);
    console.log("Mentor : "+studentObj['mentor']);
    if(studentObj['name'] === null || studentObj['name'] === undefined){
        res.send({"msg":"Student not available"});
    }else if(mentorName === null || mentorName === undefined ||
        mentor === null || mentor === undefined){
        res.send({"msg":"Mentor not available"})
    }else if(studentObj['mentor']['name'] === mentor){
        res.send({"msg":"Trying to update same mentor"});
    }else if(studentObj['mentor']['name'] === null || studentObj['mentor']['name'] === undefined){
        res.send({"msg":"Mentor details not shared"});
    }else{
        await changeMentorEntity('student',studentObj['id'],studentObj['mentor'],mentor);
        res.send({"msg":"Mentor changed successfully"});
    }
});

// API call to get student details assigned to particular Mentor
studentRouter.post('/assignToMentor', async(req,res) => {
    const{mentor} = req.body;
    const mentorName = await findEntity('mentor',mentor);
    console.log("Mentor : "+mentorName['name']);
    if(mentorName === null || mentorName === undefined || 
        mentor === null || mentor === undefined){
        res.send({"msg":"Mentor not available"})
    }else{
        res.send(await findallEntity('student',mentorName['name']));
    }
});

//API call to get previously Assigned Mentor for particular student
studentRouter.post('/previouslyAssignedMentor', async(req,res) => {
    const{studentName} = req.body;
    const studentObj = await findEntity('student',studentName);
    console.log("Mentor : "+studentObj['mentor']);
    if(studentObj === null || studentObj === undefined || 
        studentName === null || studentName === undefined){
        res.send({"msg":"Student not available"})
    }else{
        res.send(await studentObj['previousMentor']['name']);
    }
});

export default studentRouter;