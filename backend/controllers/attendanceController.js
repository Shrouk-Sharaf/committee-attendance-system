const { Member, Attendance } = require('../models/index');
module.exports = {
  createMember: async (req, res) => {
    try {
      const member = await Member.create(req.body);
      res.status(201).json(member);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getAllMembers: async (req, res) => {
    try {
      const members = await Member.findAll({
        include: [{ model: Attendance, as: 'attendances' }]
      });
      res.json(members);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getMemberById: async (req, res) => {
    try {
      const member = await Member.findByPk(req.params.id, {
        include: [{ model: Attendance, as: 'attendances' }]
      });
      if (!member) {
        return res.status(404).json({ error: 'Member not found' });
      }
      res.json(member);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateMember: async (req, res) => {
    try {
      const [updated] = await Member.update(req.body, {
        where: { id: req.params.id }
      });
      if (updated) {
        const updatedMember = await Member.findByPk(req.params.id);
        return res.json(updatedMember);
      }
      throw new Error('Member not found');
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deleteMember: async (req, res) => {
    try {
      const deleted = await Member.destroy({
        where: { id: req.params.id }
      });
      if (deleted) return res.json({ message: 'Member deleted' });
      throw new Error('Member not found');
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  recordAttendance: async (req, res) => {
    try {
      const member = await Member.findByPk(req.body.memberId);
      if (!member) return res.status(404).json({ error: 'Member not found' });
      const attendance = await Attendance.create(req.body);
      res.status(201).json(attendance);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getAllAttendances: async (req, res) => {
    try {
      const attendances = await Attendance.findAll({
        include: [{ model: Member, as: 'member' }]
      });
      res.json(attendances);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  
  getAttendanceById: async (req, res) => {
    try {
      const attendance = await Attendance.findByPk(req.params.id, {
        include: [{ model: Member, as: 'member' }]
      });
      if (!attendance) {
        return res.status(404).json({ error: 'Attendance record not found' });
      }
      res.json(attendance);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateAttendance: async (req, res) => {
    try {
      const [updated] = await Attendance.update(req.body, {
        where: { id: req.params.id }
      });
      if (updated) {
        const updatedAttendance = await Attendance.findByPk(req.params.id);
        return res.json(updatedAttendance);
      }
      throw new Error('Attendance record not found');
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deleteAttendance: async (req, res) => {
    try {
      const deleted = await Attendance.destroy({
        where: { id: req.params.id }
      });
      if (deleted) return res.json({ message: 'Attendance record deleted' });
      throw new Error('Attendance record not found');
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getAttendanceByCommittee: async (req, res) => {
    try {
      const members = await Member.findAll({
        where: { committee: req.params.committee },
        include: [{ model: Attendance, as: 'attendances' }]
      });
      res.json(members);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAttendanceByDate: async (req, res) => {
    try {
      const attendances = await Attendance.findAll({
        where: { date: req.params.date },
        include: [{ model: Member, as: 'member' }]
      });
      res.json(attendances);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};