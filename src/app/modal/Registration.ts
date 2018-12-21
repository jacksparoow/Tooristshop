import { Role } from "./Role";
import { Project } from "./project";

export class Registration {
    username: string;
    phonenumber: string;
    passwordhash: string;
    confirmpassword: string;
    companyid: number;
    accessfailedcount: number;
    email: string;
    firstname: string;
    lastname: string;
    roleid: string;
    role: Role;
    project: Project;
    createddatetime: string;
    assignedusers: string;
    twofactorenabled: boolean;
    securitystamp: string;
    phonenumberconfirmed: string;
    lockoutenddateutc: string;
    lockoutenabled: string;
    userid: string;
    emailconfirmed: boolean;
    projectid: number;
    token: string;

    }
    /*
   {
        "userName": "9123334053",
        "password": "123",
        "confirmPassword": "true",
        "companyId": 1,
        "accessFailedCount": 1,
        "email": "vedagya19@gmail.com",
        "emailConfirmed": false,
        "id": "81F1EFE7-1BCD-4B52-9740-4FC179F388DE",
        "lockoutEnabled": false,
        "lockoutEndDateUtc": null,
        "phoneNumber": "9971234053",
        "phoneNumberConfirmed": false,
        "securityStamp": "",
        "twoFactorEnabled": false,
        "assignedUsers": null,
        "firstName": "Vedagya",
        "lastName": "Bhardwaj",
        "createdDateTime": "2018-07-13T05:40:52.097",
        "role": {
            "roleID": "5",
            "name": "Admin"
        },
     
        "roleId": null,
        "projectId": 0
    }

    */