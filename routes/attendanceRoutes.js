const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');

router.post('/members', attendanceController.createMember);
router.get('/members', attendanceController.getAllMembers);
router.get('/members/:id', attendanceController.getMemberById);
router.put('/members/:id', attendanceController.updateMember);
router.delete('/members/:id', attendanceController.deleteMember);

router.post('/attendances', attendanceController.recordAttendance);
router.get('/attendances', attendanceController.getAllAttendances);
router.get('/attendances/:id', attendanceController.getAttendanceById);
router.put('/attendances/:id', attendanceController.updateAttendance);
router.delete('/attendances/:id', attendanceController.deleteAttendance);

router.get('/committee/:committee', attendanceController.getAttendanceByCommittee);
router.get('/date/:date', attendanceController.getAttendanceByDate);

module.exports = router;