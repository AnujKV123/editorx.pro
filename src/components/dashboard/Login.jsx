import React, { useState } from "react";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { FormResolvers } from "../../resolver/FormResolver";
import FormItemCmp from "../common/FormItem";
import { inputTypes } from "../common/CommonValues";
import { useNavigate } from "react-router-dom";
import ApiService from "../../Services/Api.service";
import { useDispatch } from "react-redux";
import { userLogin } from "../../slices/userSlice";
import { useToast } from "../../context/use-toast";
import { Loader2, ArrowLeft, Github } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../ui/card";

import {
  signInWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, googleProvider } from "../../config/firebase";

const Login = () => {
  const navigate = useNavigate();
  const { logInResolver } = FormResolvers();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [loader, setLoader] = useState(false);

  const onSubmitFunc = async (data) => {
    const { email, password } = data;
    setLoader(true);
    toast({ title: "Logging in, please wait 😊." });
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      if (!user.emailVerified) {
        await sendEmailVerification(user);
        toast({
          title: "Email not verified. A new verification link was sent.",
        });
        await signOut(auth);
        setLoader(false);
      } else {
        if (user.emailVerified) {
          const token = user.accessToken;
          const refreshToken = user.stsTokenManager.refreshToken;
          const { email, displayName, photoURL } = user;
          const data = {
            email,
            username: displayName,
            avatar: photoURL,
            provider: "password",
            role: "user",
          };
          const res = await ApiService.register(data, token);
          if (res.statusCode === 200 || res.statusCode === 201) {
            dispatch(
              userLogin({
                isAuthenticated: true,
                accessToken: token,
                refreshToken: refreshToken,
                user: res.data,
              })
            );
            setLoader(false);
            toast({ title: "Logged in successfully 😊." });
            navigate(`/document`);
          }
        } else {
          await signOut(auth);
          setLoader(false);
        }
      }
      setLoader(false);
    } catch (error) {
      console.info(error);
      setLoader(false);
      toast({
        title: "username and password does not match, please try again 😌.",
      });
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
          <CardTitle>Sign In</CardTitle>
          <CardDescription>
            Don't have an account?{" "}
            <Button variant="link" onClick={() => navigate("/register")}>
              Sign Up
            </Button>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...logInResolver}>
            <form
              onSubmit={logInResolver.handleSubmit(onSubmitFunc)}
              className="space-y-2"
            >
              <FormItemCmp
                lable="Email"
                placeholder="email"
                name="email"
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
          {/* <Button variant="link" onClick={() => navigate("/change-password")}>Change Password</Button> */}
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

export default Login;
