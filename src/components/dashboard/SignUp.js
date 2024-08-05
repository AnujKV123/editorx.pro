import React from 'react'
import { Button } from "../ui/button"
import { Form } from "../ui/form"
import { FormResolvers } from '../resolver/FormResolver'
import FormItemCmp from '../common/FormItem'
import { inputTypes } from '../common/CommonValues'
import { plans } from '../common/CommonValues'
import { useNavigate } from 'react-router-dom'
import ApiService from '../Services/Api.service'
import { useToast } from '../ui/use-toast'
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
    // const { watch, register,setValue, formState: { errors}} = signUpResolver

    

    const onSubmitFunc = async(data) => {
        try{
            const dataset = await ApiService.register(data);
            const mydata = dataset.data;
            if(dataset.success){
                // toast({
                //     title: "User registered successfully !",
                //     description: `${mydata.username} has been created successfully. Please login to continue.`,
                // })
                navigate("/login");
            }
            
        }
        catch(error){
            toast({
                title: "Error occured !",
                description: error,
            })
        }
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
                        <Button type="submit" className="w-full">Submit</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    </div>
  )
}

export default SignUp