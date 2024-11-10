import React, { useState, useCallback } from 'react'
import {
    DialogContent,
    Dialog,
    DialogFooter,
    DialogHeader,
    DialogTitle,
  } from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import { Cross2Icon } from "@radix-ui/react-icons"
import ApiService from '../Services/Api.service'
import { useToast } from '../ui/use-toast'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const UpdateDocNamePopUp = ({documentId, newId, content, isOpen, closeDialog}) => {

    const[documentName, setDocumentName] = useState("")
    const[saveAsNew, setSaveAsNew] = useState("no")
    const { toast } = useToast()
    const accessToken = useSelector((state) => state.accessToken)
    const user = useSelector((state) => state.user)
    const navigate = useNavigate()

    const handleUpdateDocumentName = useCallback(async(e) => {
        e.preventDefault()
        closeDialog()
        try{
            if(saveAsNew==="yes"){
                const veifyUser = await ApiService.verigyUser({subscription_plan:user.subscription_plan, user_email:user.email}, accessToken);

                if(veifyUser.statusCode===200&& veifyUser.data===true){
                    const response = await ApiService.createDocument({id:newId, documentName:documentName, content: await content(), user_email:user.email}, accessToken);
                    if(response.statusCode===200 && response.data){
                        navigate(`/document/${newId}?name=${documentName}`)
                        toast({
                            title: "New document created successfully 😊!",
                        })
                    }
                    else{
                        toast({ title: "Some error occured, please try again 😌."})
                    }

                }
                else{
                    toast({ title: "Your free plan only allows 10 documents, please upgrade your plan 😊."})
                }
            }
            else{
                const response = await ApiService.updateDocumentName({id:documentId, documentName:documentName}, accessToken);
                if(response.statusCode===200){
                    navigate(`/document/${documentId}?name=${documentName}`)
                    toast({
                        title: "Document name updated successfully 😊!",
                    })
                }
            }
        }
        catch(error){
            toast({ title: "Some error occured, please try again 😌."})
        }

    }, [documentId, newId, content, saveAsNew, documentName, accessToken, user, navigate, toast, closeDialog])

  return (
    <Dialog open={isOpen}>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
            <DialogTitle> Save Document </DialogTitle>
            <div onClick={closeDialog} className=" cursor-pointer absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
                <Cross2Icon className="h-4 w-4" />
                <span className="sr-only">Close</span>
            </div>
            </DialogHeader>
            <form onSubmit={(e) => handleUpdateDocumentName(e)}>
                <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">Document Name</Label>
                    <Input
                    value={documentName}
                    onChange={(e) => setDocumentName(e.target.value)}
                    id="document_name"
                    className="col-span-3"
                    placeholder="document name"
                    required

                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300" htmlFor="document-select">As New Document</label>
                    <div className="relative w-[275px]">
                        <select id="document-select" 
                            className=" block appearance-none w-full bg-white dark:bg-background border dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 px-3 pr-8 rounded leading-tig focus:outline-none border-input bg-transparent text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                            onChange={(e) => setSaveAsNew(e.target.value)}
                            value={saveAsNew}
                        >
                            <option value="no"> No </option>
                            <option value="yes"> Yes </option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M7 10l5 5 5-5z"/></svg>
                        </div>
                    </div>
                </div>
                {/* <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                    As New
                    </Label>
                    <Select onChange={(e) => {setSaveAsNew(e.target.value)}} value={saveAsNew}>
                        <SelectTrigger className="w-[275px]">
                            <SelectValue placeholder="options" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="yes"> Yes </SelectItem>
                            <SelectItem value="no"> No </SelectItem>
                        </SelectContent>
                    </Select>
                </div> */}
                </div>
                <DialogFooter>
                <Button type="submit">Save changes</Button>
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>
  )
}

export default UpdateDocNamePopUp