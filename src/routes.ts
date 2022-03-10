import {createAccountController} from "./controllers/user/create.account.controller";
import {getAccountController} from "./controllers/user/get.account.controller";
import {deleteAccountController} from "./controllers/user/delete.account.controller";

export const routes = [

    // Account routes
    { path: "/account/create",     method: "post",   action: createAccountController },
    { path: "/account/get",        method: "get",    action: getAccountController },
    { path: "/account/get/:id",    method: "get",    action: getAccountController },
    { path: "/account/delete/:id", method: "delete", action: deleteAccountController },

];