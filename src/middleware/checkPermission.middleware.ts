import { AuthAction } from "@/auth/AuthAction";
import { AuthSubject } from "@/auth/AuthSubject";
import Permissions from "@/auth/Permissions";
import { ErrorCode } from "@/enums/ErrorCode.enum";
import BaseException from "@/utils/exception/BaseException";
import { StatusCodes } from "http-status-codes";

function haveAccess(userRole: string, subject: string, action: string) {
    if (Permissions.hasOwnProperty(subject)) {
        if ((Permissions)[userRole].level < (Permissions)[subject].level) {
            return true;
        }
    }
    if (!Permissions[userRole].hasOwnProperty(subject)) {
        return false;
    }
    if ((Permissions)[userRole][subject].includes(action) 
    || (Permissions)[userRole][subject].includes('full-control')) {
        return true;
    }

    return false;
}

export const checkPermission = (action: AuthAction, subject: AuthSubject) => (req: any, res: any, next: any) => {
    try {                
        const userRole: string = req.user.role || 'Anonymous';
        if (haveAccess(userRole, subject, action)) {
            next();
        } else {
            throw new BaseException(
                ErrorCode.PERMISSION_01,
                "You don't have permission to access this resource",
                StatusCodes.FORBIDDEN
            );
        }

    } catch (error) {
        next(error)
    }
};
