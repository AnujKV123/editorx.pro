import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import ApiService from "../../Services/Api.service";
import { useSelector } from "react-redux";
import { useToast } from "../../context/use-toast";

const InvitationItem = ({ invitation, setInvites }) => {
  const { document, fromUser, status, createdAt } = invitation;
  const token = useSelector((state) => state.accessToken);
  const { toast } = useToast();

  const handleInviteFunc = async(status)=>{
    try {
      const response = await ApiService.handleInvite({id:invitation._id, status}, token);
      if(response.statusCode === 200){
        setInvites((prevInvites) => prevInvites.filter((invite) => invite._id !== invitation._id));
        if(status === "accepted"){
          toast({
            title: "accepted successfully !!",
            description: "You have been added as a collaborator to the document.",
          })
        }
        else{
          toast({
            title: "declined successfully !!",
            description: "your invitation has been declined.",
          })
        }
      }
    } catch (error) {
      console.log(error)
      toast({
        variant: "destructive",
        title: "some error occured, please try again !!",
      })
    }
  }

  return (
    <div className="flex items-start gap-3 px-4 py-3 hover:bg-muted transition rounded-md cursor-pointer">
      {/* User Avatar */}
      <img
        src={fromUser.avatar}
        alt={fromUser.username}
        className="h-10 w-10 rounded-full object-cover"
      />

      {/* Content */}
      <div className="flex flex-col flex-1">
        <div className="text-sm font-medium text-primary">{fromUser.username}</div>
        <div className="text-sm text-muted-foreground">
          invited you to collaborate on <span className="font-semibold"><Badge variant="outline">{document.title}</Badge></span>
        </div>
        <div className="text-xs text-muted-foreground">
          Status: <span className="capitalize">{status}</span> •{" "}
          {new Date(createdAt).toLocaleDateString()}
        </div>
        <div className="flex gap-2 mt-2">
            <Button onClick={() => handleInviteFunc("accepted")} size="sm">Accept</Button>
            <Button onClick={() => handleInviteFunc("rejected")} variant="destructive" size="sm">Decline</Button>
        </div>
      </div>
    </div>
  );
};

export default InvitationItem;
