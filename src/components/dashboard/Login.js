
import React, { useState } from 'react'
import { Button } from "../ui/button"
import { Form } from "../ui/form"
import { FormResolvers } from '../resolver/FormResolver'
import FormItemCmp from '../common/FormItem'
import { inputTypes } from '../common/CommonValues'
import { useNavigate } from 'react-router-dom'
import ApiService from '../Services/Api.service'
import { useDispatch } from 'react-redux'
import { userLogin } from '../User/userSlice'
import { useToast } from '../ui/use-toast'
import { Loader2 } from 'lucide-react'
import 
{
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "../ui/card"


const Login = () => {
    const navigate = useNavigate()
    const {logInResolver} = FormResolvers()
    const dispatch = useDispatch();
    const { toast } = useToast();
    const [loader, setLoader] = useState(false)

    const onSubmitFunc = async(data) => {
        setLoader(true)
        toast({ title: "Logging in, please wait 😊." });
        try{
            const timeout = setTimeout(() => {
                toast({ title: "The server is currently handling a high volume of requests. Please wait a moment 😊." });
            }, 4000);
            const dataset = await ApiService.login(data);
            const mydata = dataset.data;
            if(mydata.accessToken){
                clearTimeout(timeout);
                dispatch(userLogin({isAuthenticated: true, 
                    accessToken: mydata.accessToken, 
                    refreshToken: mydata.refreshToken, 
                    user: mydata.user}));
                    setLoader(false)
                    toast({ title: "Logged in successfully 😊." });
                navigate(`/document`);
            }
            setLoader(false)
        }
        catch(error){
            setLoader(false)
            toast({ title: "username and password does not match, please try again 😌." });
        }
        setLoader(false)
    }
  return (
    <div className=' flex justify-center w-full mt-10 md:w-1/2 md:relative md:top-1/5 md:left-1/4'>
    <Card className="w-[350px] ">
        <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Don't have an account? <Button variant="link" onClick={() => navigate("/register")}>SignUp</Button></CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...logInResolver}>
                <form onSubmit={logInResolver.handleSubmit(onSubmitFunc)} className="space-y-8">
                    <FormItemCmp 
                        lable="User Name" 
                        placeholder="username" 
                        name="username"
                        type="text" 
                        // description="" 
                        control={logInResolver.control} 
                        fieldType={inputTypes.INPUTFIELD}
                    />
                    <FormItemCmp 
                        lable="Password" 
                        placeholder="password"
                        name="password" 
                        type="password" 
                        control={logInResolver.control} 
                        fieldType={inputTypes.INPUTFIELD}
                    />
                    <Button disabled={loader} type="submit" className="w-full">
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
        <CardFooter>
        <Button variant="link" onClick={() => navigate("/change-password")}>Change Password</Button>
        </CardFooter>
    </Card>
    </div>
  )
}

export default Login
