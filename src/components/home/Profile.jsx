import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import UserInfo from "../User/UserInfo";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { User, MailPlus } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import ApiService from "../../Services/Api.service";
import { Badge } from "../ui/badge";
import InvitationItem from "../User/InvitationItem";
import { io } from "socket.io-client";
import { getHost } from "../../config/global";
import Editorx from "../common/images/text-editor.png";
import { Link } from "react-router-dom";
import { ThemeToggle } from "../ui/theme-toggle";
import { socket } from "../../socket/webSocket";

const Profile = () => {
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.accessToken);
  const [showUser, setShowUser] = useState(false);
  const [invites, setInvites] = useState([]);

  const fetchInvites = async () => {
    try {
      const response = await ApiService.getInvites({ Id: user._id }, token);
      if (response.statusCode !== 200) return;
      setInvites(response.data);
    } catch (error) {
      console.info(error);
    }
  };

  useEffect(() => {
    fetchInvites();
  }, []);

  useEffect(() => {
    if (!socket || !user?._id) return;
    socket.emit("join", user._id);
  }, [socket, user._id]);

  useEffect(() => {
    if (socket === null) return;
    socket.on("invitation:received", ({ from, documentId }) => {
      fetchInvites();
    });

    return () => {
      socket.off("invitation:received");
    };
  }, [socket]);

  const toggleUser = () => setShowUser(!showUser);
  return (
    <header className="overflow-y-hidden scrollbar-hide py-4 px-6 fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
      {isAuthenticated && (
        <UserInfo showUser={showUser} toggleUser={toggleUser} />
      )}
      {isAuthenticated && (
        <div className="flex justify-between w-full">
          <div className="ml-8">
            <Link
              className="text-2xl flex flex-row justify-center items-center"
              to="/home"
            >
              <img className="h-10" src={Editorx} alt="logo" />
              <span className="ml-1">editorX</span>
            </Link>
          </div>
          <div className="flex flex-row gap-8">
            <div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button className="relative">
                    <MailPlus className="mr-2 h-4 w-4" />
                    My Invites
                    {invites.length > 0 && (
                      <Badge
                        className="absolute -top-1 -right-1 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums text-xs"
                        variant="destructive"
                      >
                        {invites.length}
                      </Badge>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <div className="w-80 max-h-96 m-1 overflow-y-auto rounded-md shadow-lg">
                    {invites.length === 0 ? (
                      <div className="p-4 text-center text-sm text-muted-foreground">
                        No invitations
                      </div>
                    ) : (
                      invites.map((inv) => (
                        <InvitationItem
                          key={inv._id}
                          invitation={inv}
                          setInvites={setInvites}
                        />
                      ))
                    )}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <ThemeToggle />
            </div>
            <div className="">
              <Avatar
                onClick={toggleUser}
                className="hover:text-gray-200 cursor-pointer border-2 p-1 border-blue-500"
              >
                <AvatarImage src={user.avatarr} alt="@shadcn" />
                <AvatarFallback>
                  {user.fullname ? user.fullname.charAt(0) : <User />}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Profile;
