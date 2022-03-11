import {createAccountController} from "./controllers/user/create.account.controller";
import {getAccountController} from "./controllers/user/get.account.controller";
import {createPathController} from "./controllers/path/create.path.controller";
import {getPathController} from "./controllers/path/get.path.controller";
import {deleteAccountController} from "./controllers/user/delete.account.controller";
import {deletePathController} from "./controllers/path/delete.path.controller";
import {getAccountMailController} from "./controllers/user/get.account.mail.controller";
import {createGiftController} from "./controllers/gift/create.gift.controller";
import {purchaseGiftIdController} from "./controllers/gift/purchase.gift.id.controller";
import {getGiftController} from "./controllers/gift/get.gift.controller";
import {purchaseGiftNameController} from "./controllers/gift/purchase.gift.name.controller";
import {deleteGiftController} from "./controllers/gift/delete.gift.controller";

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

    // Gift routes
    { path: "/gift/create",        method: "post",   action: createGiftController },
    { path: "/gift/get",           method: "get",    action: getGiftController },
    { path: "/gift/get/:id",       method: "get",    action: getGiftController },
    { path: "/gift/purchase",      method: "put",    action: purchaseGiftIdController },
    { path: "/gift/purchase/name", method: "put",    action: purchaseGiftNameController },
    { path: "/gift/delete/:id",    method: "delete", action: deleteGiftController },

];