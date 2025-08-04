export async function up(queryInterface, Sequelize) {
  await queryInterface.changeColumn('Users', 'email', {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true, // Add unique constraint
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.changeColumn('Users', 'email', {
    type: Sequelize.STRING,
    allowNull: false,
    unique: false, // Remove unique constraint
  });
}
