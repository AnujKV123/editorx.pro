import { io } from "socket.io-client";
import { getHost } from "../config/global";

export const socket = io(getHost().HOST_URL);