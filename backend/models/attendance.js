module.exports = (sequelize, DataTypes) => {
    const Attendance = sequelize.define('Attendance', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      status: {
        type: DataTypes.ENUM('present', 'absent', 'excused'),
        allowNull: false
      },
      notes: {
        type: DataTypes.TEXT
      }
    });
  
    Attendance.associate = (models) => {
      Attendance.belongsTo(models.Member, {
        foreignKey: 'memberId',
        as: 'member'
      });
    };
  
    return Attendance;
  };