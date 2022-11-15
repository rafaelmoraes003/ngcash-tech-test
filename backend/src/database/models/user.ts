import { Model, DataTypes } from 'sequelize';
import db from '.';
import Account from './account';

class User extends Model {
  public id!: number;
  public username!: string;
  public password!: string;
  public accountId!: number;
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  accountId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Account,
      key: 'id',
    },
  },
}, {
  sequelize: db,
  modelName: 'Users',
  timestamps: false,
});

export default User;
