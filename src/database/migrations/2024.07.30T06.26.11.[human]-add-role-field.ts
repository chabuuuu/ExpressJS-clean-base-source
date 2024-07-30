import { DataTypes } from 'sequelize';
import type { Migration } from '../umzug';
import { RolesEnum } from '@/enums/Roles.enum';

export const up: Migration = async ({ context: sequelize }) => {
	await sequelize.getQueryInterface().addColumn('humans', 'role', {
        type: DataTypes.ENUM(RolesEnum.CUSTOMER, RolesEnum.SHOP_OWNER),
        allowNull: false,
        defaultValue: RolesEnum.CUSTOMER
    })
};

export const down: Migration = async ({ context: sequelize }) => {
	await sequelize.getQueryInterface().removeColumn('humans', 'role');
};