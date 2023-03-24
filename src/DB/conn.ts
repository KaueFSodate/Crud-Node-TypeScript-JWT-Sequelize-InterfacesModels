import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('olx', 'root', 'bnd43qhq', {
  host: 'localhost',
  dialect: 'mysql'
});

export default sequelize