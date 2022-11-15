import { Model, DataTypes } from 'sequelize';
import db from '.';
import Account from './account';

class Transaction extends Model {
  id!: number;
  debitedAccountId!: number;
  creditedAccountId!: number;
  value!: number;
  createdAt!: Date;
}

Transaction.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  debitedAccountId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Account,
      key: 'id',
    },
  },
  creditedAccountId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Account,
      key: 'id',
    },
  },
  value: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'Transactions',
  timestamps: false,
});

export default Transaction;
