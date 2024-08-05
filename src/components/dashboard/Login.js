
import React from 'react'
import { Button } from "../ui/button"
import { Form } from "../ui/form"
import { FormResolvers } from '../resolver/FormResolver'
import FormItemCmp from '../common/FormItem'
import { inputTypes } from '../common/CommonValues'
import { useNavigate } from 'react-router-dom'
import ApiService from '../Services/Api.service'
import { useDispatch } from 'react-redux'
import { userLogin } from '../User/userSlice'
import 
{
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"


const Login = () => {
    const navigate = useNavigate()
    const {logInResolver} = FormResolvers()
    const dispatch = useDispatch();

    const onSubmitFunc = async(data) => {
        try{
            const dataset = await ApiService.login(data);
            const mydata = dataset.data;
            if(mydata.accessToken){
                dispatch(userLogin({isAuthenticated: true, 
                    accessToken: mydata.accessToken, 
                    refreshToken: mydata.refreshToken, 
                    user: mydata.user}));
                    
                navigate(`/document`);
            }
        }
        catch(error){
            throw error
        }
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
                    <Button type="submit" className="w-full">Submit</Button>
                </form>
            </Form>
        </CardContent>
    </Card>
    </div>
  )
}

export default Login
