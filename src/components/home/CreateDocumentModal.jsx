import React, { useState } from 'react'
import Modal from "../common/Modal";
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import ApiService from '../../Services/Api.service';
import { useToast } from '../../context/use-toast';
import { useSelector } from 'react-redux';

export const CreateDocumentModal = ({open, setOpen, fetchDocuments}) => {
    const [documentName, setDocumentsName] = useState("");
    const [documentType, setDocumentType] = useState("");
    const { toast } = useToast();
    const token = useSelector((state) => state.accessToken);
    const user = useSelector((state) => state.user);

    const handleCreateDocument = async(e) => {
        e.preventDefault();
        
        if(!documentName.trim() || !documentType.trim()){
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                describe: "Please fill the document name and document type",
            })
            return;;
        }

        try {
            const payload = {
                name: documentName,
                type: documentType,
                owner: user.email

            }
            
            const response = await ApiService.createDocument(payload, token);
            if(response.statusCode===201 && response.data){
                toast({
                    variant: "success",
                    title: "Document created successfully 😊!",
                })
                setOpen(false);
                setDocumentsName("");
                setDocumentType("");
                fetchDocuments();
            }
            else{
                toast({
                    variant: "destructive",
                    title: "Some error occured, please try again 😌."
                })
            }
            setOpen(false);
            setDocumentsName("");
            setDocumentType("");
            fetchDocuments();
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                describe: error.message,
            })
        }
    }

  return (
    <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Create Document"
        closeOnEsc
        closeOnOutsideClick
    >
        <form onSubmit={handleCreateDocument}>
            <div className='flex flex-col justify-center gap-3 items-center'>
                <div className="grid w-full max-w-sm items-center gap-3">
                    <Label htmlFor="Name">Name</Label>
                    <Input value={documentName} onChange={(e) => setDocumentsName(e.target.value)}  name="Name" required id="Name" type="text" placeholder="Enter document name" />
                </div>
                <div className="grid w-full max-w-sm items-center gap-3">
                    <Label htmlFor="documentType">Document Type</Label>
                    <Select name='documentType' id="documentType" value={documentType} onValueChange={(e) => setDocumentType(e)}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select document type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                            <SelectItem value="text">Text</SelectItem>
                            {/* <SelectItem value="canvas">Canvas</SelectItem> */}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className='flex gap-3 float-end mt-8'>
                <Button variant="secondary" onClick={() => setOpen()}>Cancel</Button>
                <Button disabled={!documentName.trim() || !documentType.trim()} type="submit" variant="default">Create</Button>
            </div>
        </form>
    </Modal>
  )
}
