const db = require('../config/database');
const Member = require('./member')(db, db.Sequelize.DataTypes);
const Attendance = require('./attendance')(db, db.Sequelize.DataTypes);

Member.hasMany(Attendance, { foreignKey: 'memberId', as: 'attendances' });
Attendance.belongsTo(Member, { foreignKey: 'memberId', as: 'member' });

module.exports = {
  db,
  Member,
  Attendance
};