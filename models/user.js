export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'Users',
  });

  User.associate = (models) => {
    User.hasMany(models.Task, {
      foreignKey: 'userId',
      as: 'tasks',
    });
  };

  return User;
};
