import React, { useState } from "react";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { FormResolvers } from "../../resolver/FormResolver";
import FormItemCmp from "../common/FormItem";
import { inputTypes } from "../common/CommonValues";
import { useNavigate } from "react-router-dom";
import ApiService from "../../Services/Api.service";
import { useToast } from "../../context/use-toast";
import { Loader2, ArrowLeft, Github, Eye, EyeOff } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../ui/card";

import { auth, googleProvider } from "../../config/firebase";
import {
  sendEmailVerification,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { userLogin } from "../../slices/userSlice";

const SignUp = () => {
  const navigate = useNavigate();
  const { signUpResolver } = FormResolvers();
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();

  const onSubmitFunc = async (data) => {
    const { email, password, username } = data;
    setLoader(true);
    toast({ title: "creating user, please wait... 😊." });
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, {
        displayName: username,
      });
      await sendEmailVerification(userCredential.user);
      if (userCredential.user) {
        setLoader(false);
        toast({
          title: "User registered successfully !",
          description: `Please check your email to verify your account 😊.`,
        });
        navigate("/login");
      }
    } catch (error) {
      setLoader(false);
      toast({
        title: "user already exist, please try with different email 😊.",
      });
      console.info(error);
    }
    setLoader(false);
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const token = user.accessToken;
      const { email, displayName, photoURL, stsTokenManager } = user;
      const data = {
        email,
        username: displayName,
        avatar: photoURL,
        provider: "google.com",
        role: "user",
      };
      const res = await ApiService.register(data, token);
      if (res.statusCode === 200 || res.statusCode === 201) {
        dispatch(
          userLogin({
            isAuthenticated: true,
            accessToken: token,
            refreshToken: stsTokenManager.refreshToken,
            user: res.data,
          })
        );
        toast({ title: "Logged in successfully 😊." });
        navigate(`/document`);
      }
    } catch (error) {
      toast({ title: "some error occured, please try again 😌." });
      console.info(error);
    }
  };

  return (
    <div className=" flex flex-col justify-center items-center w-full h-[100vh]">
      <Card className="w-[350px] ">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>
            Already have an account?{" "}
            <Button variant="link" onClick={() => navigate("/login")}>
              Sign In
            </Button>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...signUpResolver}>
            <form
              onSubmit={signUpResolver.handleSubmit(onSubmitFunc)}
              className="space-y-2"
            >
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
              {/* <FormItemCmp 
                            lable="Full Name" 
                            placeholder="fullname"
                            name="fullname" 
                            type="text" 
                            control={signUpResolver.control} 
                            fieldType={inputTypes.INPUTFIELD}
                        /> */}
              <div className="relative">
                <FormItemCmp
                  lable="Password"
                  placeholder="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  control={signUpResolver.control}
                  fieldType={inputTypes.INPUTFIELD}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-4 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {/* <FormItemCmp 
                            lable="Subscription Plans" 
                            name="subscription_plan" 
                            control={signUpResolver.control} 
                            fieldType={inputTypes.SELECTFIELD} 
                            placeholder="please select the subscription plan"
                            content = {selectContent}
                        /> */}
              <Button disabled={loader} type="submit" className="w-full">
                {loader ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please Wait
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <div className="flex flex-col items-center justify-center">
            <p>OR</p>
            <div className="space-y-3 mt-2">
              <Button
                variant="outline"
                onClick={handleGoogleSignIn}
                className="w-full"
              >
                {/* <FcGoogle className="mr-2" />  */}
                Sign in with Google
              </Button>
              <Button variant="outline" disabled className="w-full">
                <Github className="mr-2" width={20} height={20} />
                Sign in with GitHub
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
      <div className="mt-4">
        <Button
          variant="secondary"
          size="icon"
          className="size-8"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className=" h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default SignUp;
