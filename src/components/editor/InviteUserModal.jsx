
import Modal from "../common/Modal";
import React, {useEffect} from 'react'
import Dropdown from "../common/Dropdown";
import ApiService from "../../Services/Api.service";
import { useSelector } from "react-redux";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { X } from "lucide-react";

export const InviteUserModal = ({open, setOpen, docId}) => {

    const [options, setOptions] = React.useState([]);
    const [search, setSearch] = React.useState("");
    const token = useSelector((state) => state.accessToken);
    const user = useSelector((state) => state.user);
    const [tags, setTags] = React.useState([]);
    const handleOptionChange = (selectedOption) => {
        setTags((prevTags) => [...prevTags, selectedOption]);
        setOptions(options.filter((option) => option.value !== selectedOption.value));
    };

     const removeTag = (tagToRemove) => {
        setTags(tags.filter((tag) => tag !== tagToRemove))
    }

    const fetchUsers = async () => {
        try {
            const response = await ApiService.getUsers({email:search, documentId:docId, userId:user._id}, token);
            const finalOps = response.data.map((user) => ({
                value: user._id,
                label: user.email
            })).filter((option) => !tags.some((tag) => tag.value === option.value));
            setOptions(finalOps);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        if(!open) return
        const timer = setTimeout(() => {
            fetchUsers();
        }, 300)
        
        return () => clearTimeout(timer);
    }, [search]);

    const sendInvite = async () => {
        try {
            const userIds = tags.map((tag) => tag.value);
            const response = await ApiService.sendInvite({toUsers:userIds, documentId:docId, fromUserId:user._id}, token);
            if(response.statusCode === 200){
                setOpen()
                setTags([])
                setSearch("")
                setOptions([])
            }
        } catch (error) {
            console.error("Error sending invite:", error);

        }
        setOpen()
        setTags([])
        setSearch("")
        setOptions([])
    }

  return (
    <Modal title="Invite User" isOpen={open} onClose={setOpen}>
      <div >
        <Dropdown
          value={null}
          onChange={handleOptionChange}
          placeholder="Select User"
          options={options}
          onSearchChange={setSearch}
          enableSearch={true}
          label="Select User"
        />
        <div className="flex flex-wrap items-center space-x-2 mt-2">
            {/* <span>email:</span> */}
            {tags.map((tag) => (
              <Badge key={tag.value} variant="secondary" className="text-xs m-1">
                {tag.label}
                <Button variant="ghost" size="sm" className="ml-1 h-auto p-0 text-xs" onClick={() => removeTag(tag)}>
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
        </div>
        <div className='flex gap-3 float-end mt-8'>
            <Button variant="secondary" onClick={() => setOpen()}>Cancel</Button>
            <Button disabled={tags.length === 0} onClick={sendInvite} variant="default">Send Invite</Button>
        </div>
      </div>
    </Modal>
  );
}
