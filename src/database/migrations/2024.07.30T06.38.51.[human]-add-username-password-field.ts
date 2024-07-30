import { DataTypes } from 'sequelize';
import type { Migration } from '../umzug';

export const up: Migration = async ({ context: sequelize }) => {
	await sequelize.getQueryInterface().addColumn('humans', 'username', {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    })
    await sequelize.getQueryInterface().addColumn('humans', 'password', {
        type: DataTypes.STRING(70),
        allowNull: false,
    })
};

export const down: Migration = async ({ context: sequelize }) => {
	await sequelize.getQueryInterface().removeColumn('humans', 'username');
    await sequelize.getQueryInterface().removeColumn('humans', 'password');
};