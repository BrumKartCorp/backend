import {createAccountController} from "./controllers/user/create.account.controller";
import {getAccountController} from "./controllers/user/get.account.controller";
import {createPathController} from "./controllers/path/create.path.controller";
import {getPathController} from "./controllers/path/get.path.controller";

export const routes = [

    // Account routes
    { path: "/account/create",     method: "post",   action: createAccountController },
    { path: "/account/get",        method: "get",    action: getAccountController },
    { path: "/account/get/:id",    method: "get",    action: getAccountController },
    { path: "/account/delete/:id", method: "delete", action: deleteAccountController },

    // Path routes
    { path: "/path/create",     method: "post", action: createPathController },
    { path: "/path/get",        method: "get", action: getPathController },
    { path: "/path/get/:id",    method: "get", action: getPathController }


];