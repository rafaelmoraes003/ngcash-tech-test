import { Sequelize } from 'sequelize';
import * as config from '../config/connection';

export default new Sequelize(config);
