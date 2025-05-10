const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');
const { isauthorized, isadmin } = require('../Verification/Authorization');



router.post('/members',isauthorized, isadmin, attendance=Controller.createMember);
router.get('/members',isauthorized, isadmin,ttendanceController.getAllMembers);
router.get('/members/:id',isauthorized, attendanceController.getMemberById);
router.put('/members/:id',isauthorized, isadmin, attendanceController.updateMember);
router.delete('/members/:id',isauthorized, isadmin, attendanceController.deleteMember);

router.post('/attendances',isauthorized, attendanceController.recordAttendance);
router.get('/attendances',isauthorized, isadmin , attendanceController.getAllAttendances);
router.get('/attendances/:id',isauthorized,isauthorized, attendanceController.getAttendanceById);
router.put('/attendances/:id',isauthorized, isadmin , attendanceController.updateAttendance);
router.delete('/attendances/:id',isauthorized, isadmin, attendanceController.deleteAttendance);

router.get('/committee/:committee',isauthorized, isadmin , attendanceController.getAttendanceByCommittee);
router.get('/date/:date',isauthorized, attendanceController.getAttendanceByDate);

router.post('/login', attendanceController.login);

module.exports = router;