import {createAccountController} from "./controllers/user/create.account.controller";
import {getAccountController} from "./controllers/user/get.account.controller";
import {createPathController} from "./controllers/path/create.path.controller";
import {getPathController} from "./controllers/path/get.path.controller";
import {deleteAccountController} from "./controllers/user/delete.account.controller";
import {deletePathController} from "./controllers/path/delete.path.controller";
import {getAccountMailController} from "./controllers/user/get.account.mail.controller";

export const routes = [

    // Account routes
    { path: "/account/create",         method: "post",   action: createAccountController },
    { path: "/account/get",            method: "get",    action: getAccountController },
    { path: "/account/get/:id",        method: "get",    action: getAccountController },
    { path: "/account/get/mail/:mail", method: "get",    action: getAccountMailController },
    { path: "/account/delete/:id",     method: "delete", action: deleteAccountController },

    // Path routes
    { path: "/path/create",     method: "post",   action: createPathController },
    { path: "/path/get",        method: "get",    action: getPathController },
    { path: "/path/get/:id",    method: "get",    action: getPathController },
    { path: "/path/delete/:id", method: "delete", action: deletePathController },

];