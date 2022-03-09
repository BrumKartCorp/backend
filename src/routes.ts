import {getUser} from "./controllers/user/getUser";

export const routes = [
    { path: "/user/get", method: "get", action: getUser },
    { path: "/user/get/:id", method: "get", action: getUser },
];