
import React, { useState } from 'react'
import { Button } from "../ui/button"
import { Form } from "../ui/form"
import { FormResolvers } from '../../resolver/FormResolver'
import FormItemCmp from '../common/FormItem'
import { inputTypes } from '../common/CommonValues'
import { useNavigate } from 'react-router-dom'
import ApiService from '../../Services/Api.service'
import { useToast } from '../../context/use-toast'
import { Loader2 } from 'lucide-react'
import 
{
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"


const ChangePassword = () => {
    const navigate = useNavigate()
    const {changePasswordResolver} = FormResolvers()
    const { toast } = useToast();
    const [loader, setLoader] = useState(false)

    const onSubmitFunc = async(data) => {
        setLoader(true)
        toast({ title: "changing password, please wait 😊." });
        try{
            const response = await ApiService.changePassword(data);
            if(response.statusCode === 200){
                toast({ title: "password changed successfully, please login 😊." });
                setLoader(false)
                navigate(`/login`);
            }
            setLoader(false)
        }
        catch(error){
            setLoader(false)
            toast({ title: "username and password does not match, please try again 😌." });
        }
    }
  return (
    <div className=' flex justify-center w-full mt-10 md:w-1/2 md:relative md:top-1/5 md:left-1/4'>
    <Card className="w-[350px] ">
        <CardHeader>
            <CardTitle>Change Password</CardTitle>
            <CardDescription>Don't have an account? <Button variant="link" onClick={() => navigate("/register")}>SignUp</Button></CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...changePasswordResolver}>
                <form onSubmit={changePasswordResolver.handleSubmit(onSubmitFunc)} className="space-y-8">
                    <FormItemCmp 
                        lable="User Name" 
                        placeholder="username" 
                        name="userName"
                        type="text" 
                        // description="" 
                        control={changePasswordResolver.control} 
                        fieldType={inputTypes.INPUTFIELD}
                    />
                    <FormItemCmp 
                        lable="Old Password" 
                        placeholder="old password"
                        name="oldPassword" 
                        type="password" 
                        control={changePasswordResolver.control} 
                        fieldType={inputTypes.INPUTFIELD}
                    />
                    <FormItemCmp 
                        lable="New Password" 
                        placeholder="new password"
                        name="newPassword" 
                        type="password" 
                        control={changePasswordResolver.control} 
                        fieldType={inputTypes.INPUTFIELD}
                    />
                    <Button type="submit" disabled={loader} className="w-full">
                        {loader?
                        <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Please Wait
                        </>
                        :
                        "Submit"}
                    </Button>
                </form>
            </Form>
        </CardContent>
    </Card>
    </div>
  )
}

export default ChangePassword
