import { AuthAction } from '@/auth/AuthAction';
import { AuthSubject } from '@/auth/AuthSubject';

/**
 ** Define Permissions
 ** level: if level of A is 0, and level of B is 1,
 ** that mean A can do anything (Create, Read, Update, Delete) with B
 */
const SHOP_OWNER: any = { level: 0 };
const CUSTOMER: any = { level: 1 };

//Grant permission

//SHOP_OWNER
SHOP_OWNER[AuthSubject.DOG] = [AuthAction.FULL_CONTROL];
SHOP_OWNER[AuthSubject.CUSTOMER] = [AuthAction.FULL_CONTROL];

//CUSTOMER
CUSTOMER[AuthSubject.DOG] = [AuthAction.READ];

const Permissions: any = { SHOP_OWNER, CUSTOMER };

export default Permissions;
