import React, { useState } from 'react'
import { Button } from "../ui/button"
import { Form } from "../ui/form"
import { FormResolvers } from '../resolver/FormResolver'
import FormItemCmp from '../common/FormItem'
import { inputTypes } from '../common/CommonValues'
import { plans } from '../common/CommonValues'
import { useNavigate } from 'react-router-dom'
import ApiService from '../Services/Api.service'
import { useToast } from '../ui/use-toast'
import { Loader2 } from 'lucide-react'
import 
{
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"


const SignUp = () => {
    const navigate = useNavigate()
    const {signUpResolver} = FormResolvers()
    const { toast } = useToast()
    const [loader, setLoader] = useState(false)
    // const { watch, register,setValue, formState: { errors}} = signUpResolver

    

    const onSubmitFunc = async(data) => {
        setLoader(true)
        toast({ title: "creating user, please wait... 😊." });
        try{
            const dataset = await ApiService.register(data);
            const timeout = setTimeout(() => {
                toast({ title: "The server is currently handling a high volume of requests. Please wait a moment 😊." });
            }, 2000);
            const mydata = dataset.data;
            if(dataset.success){
                clearTimeout(timeout);
                setLoader(false)
                toast({
                    title: "User registered successfully !",
                    description: `${mydata.username} created successfully. Please login to continue 😊.`,
                })
                navigate("/login");
            }
            
        }
        catch(error){
            setLoader(false)
            toast({ title: "user already exist, please try with different username and email 😊." });
        }
        setLoader(false)
    }

    const selectContent = [{lable:"Free", value: plans.FREE}, 
                        //    {lable:"Premium", value: plans.PREMIUM},
                        //    {lable:"enterprise", value: plans.ENTERPRISE}
                        ]

  return (
    <div className=' flex justify-center w-full mt-10 md:w-1/2 md:relative md:top-1/5 md:left-1/4'>
        <Card className="w-[350px] ">
            <CardHeader>
                <CardTitle>Sign Up</CardTitle>
                <CardDescription>Already have an account? <Button variant="link" onClick={() => navigate("/login")}>Login</Button></CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...signUpResolver}>
                    <form onSubmit={signUpResolver.handleSubmit(onSubmitFunc)} className="space-y-8">
                        <FormItemCmp 
                            lable="User Name" 
                            placeholder="username" 
                            name="username"
                            type="text" 
                            // description="" 
                            control={signUpResolver.control} 
                            fieldType={inputTypes.INPUTFIELD}
                        />
                        <FormItemCmp 
                            lable="Email" 
                            placeholder="email"
                            name="email" 
                            type="email" 
                            control={signUpResolver.control} 
                            fieldType={inputTypes.INPUTFIELD}

                        />
                        <FormItemCmp 
                            lable="Full Name" 
                            placeholder="fullname"
                            name="fullname" 
                            type="text" 
                            control={signUpResolver.control} 
                            fieldType={inputTypes.INPUTFIELD}
                        />
                        <FormItemCmp 
                            lable="Password" 
                            placeholder="password"
                            name="password" 
                            type="password" 
                            control={signUpResolver.control} 
                            fieldType={inputTypes.INPUTFIELD}
                        />
                        <FormItemCmp 
                            lable="Subscription Plans" 
                            name="subscription_plan" 
                            control={signUpResolver.control} 
                            fieldType={inputTypes.SELECTFIELD} 
                            placeholder="please select the subscription plan"
                            content = {selectContent}
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
        </Card>
    </div>
  )
}

export default SignUp