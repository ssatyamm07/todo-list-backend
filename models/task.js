export default (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    dueDate: {
      type: DataTypes.DATE,
    },
  }, {
    tableName: 'Tasks',
  });

  Task.associate = (models) => {
    Task.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
  };

  return Task;
};