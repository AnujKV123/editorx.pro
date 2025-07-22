import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetFooter
  } from "../ui/sheet"
  import { Button } from "../ui/button"
  import React, { useRef, useState } from 'react'
  import { useNavigate } from "react-router-dom"
  import { Cross2Icon } from "@radix-ui/react-icons"
  import ApiService from "../../Services/Api.service"
  import defaltAvatar from '../common/images/userImg.png'
  import { useDispatch, useSelector } from "react-redux"
  import { userLogout, updateAvatar } from "../../slices/userSlice"
  import { useToast } from "../../context/use-toast"
  import { Loader2 } from "lucide-react"
  import { signOut } from "firebase/auth"
  import { auth } from "../../config/firebase"


  export const handleLogOut = async(accessToken) => {
    const res = await ApiService.logout({ accessToken:accessToken })
    if(res.success){
        return true
    }
    return false
  }
  
  const UserInfo = ({showUser, toggleUser}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const token = useSelector((state) => state.accessToken);
    const user = useSelector((state) => state.user);
    const fileInputRef = useRef(null);
    const { toast } = useToast()
    const [loaderLogout, setLoaderLogout] = useState(false)
    const [loaderAvatar, setLoaderAvatar] = useState(false)


    const LogOut = async() => {
        setLoaderLogout(true)
        try{
        //    const res = await handleLogOut(token)
           await signOut(auth)
           setLoaderLogout(false)
           dispatch(userLogout())
           navigate("/login")
           setLoaderLogout(false)
        }
        catch(error){
            setLoaderLogout(false)
            throw error
        }
    }

    const handleUpdateAvatarClick = () => {
        // Trigger click event on the hidden file input
        fileInputRef.current.click();
    };

    const handleFileChange = async(event) => {
        // Get the selected file
        event.preventDefault()
        const file = event.target.files[0];
        setLoaderAvatar(true)
        try{
            if(file){
                const formData = new FormData();
                formData.append("avatar", file);toast({
                    title: "updating avatar, please wait 😊."
                })
                const response = await ApiService.updateUserAvatar(formData, token);
                if(response.statusCode===200 && response.data){
                    dispatch(updateAvatar({user:response.data}))
                    setLoaderAvatar(false)
                    toast({
                        title: "Avatar updated successfully 😊!",
                    })
                }
                else{
                    toast({
                        title: "Some error occured, please try again 😌."
                    })
                    setLoaderAvatar(false)
                }
            }
            else{
                toast({
                    title: "Some error occured, please try again 😌."
                })
                setLoaderAvatar(false)
            }
            setLoaderAvatar(false)
        }
        catch(error){
            toast({
                title: "Some error occured, please try again 😌."
            })
            setLoaderAvatar(false)
        }
    };
    return (
    <Sheet open={showUser}>
        <SheetContent className="w-80">
            <SheetHeader>
                <div onClick={toggleUser} className="cursor-pointer absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
                    <Cross2Icon className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                </div>
                <SheetDescription>
                    <div className="flex flex-col justify-center items-center w-full mb-5">
                        <div className="userProfilePic text-center w-32">
                            <img className="rounded-full w-28 h-28 p-2 mb-2 border-2 border-blue-500" src={user.avatar===""?defaltAvatar:user.avatar} alt="" />
                            <Button variant="outline" className="w-full" disabled={loaderAvatar} onClick={handleUpdateAvatarClick}>
                                {loaderAvatar?
                                <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please Wait
                                </>
                                :
                                "Update Avatar"}
                            </Button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                                accept="image/*"
                            />
                        </div>
                        <div className="userDetails text-center mt-5">
                            <h1 className="text-3xl font-bold">{user.username}</h1>
                            <p className="text-lg">{user.fullname}</p>
                            <p className="text-lg">{user.email}</p>
                        </div>
                    </div>
                </SheetDescription>
            </SheetHeader>
            <SheetFooter>
                <Button variant="destructive" disabled={loaderLogout} className="w-full" onClick={() => LogOut()}>
                    {loaderLogout?
                    <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please Wait
                    </>
                    :
                    "Log Out"}
                </Button>
            </SheetFooter>
        </SheetContent>
    </Sheet>
    )
  }
  
  export default UserInfo