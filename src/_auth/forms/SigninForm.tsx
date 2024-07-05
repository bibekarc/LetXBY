import * as z from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "@/components/shared/Loader";
import { useSignInAccount } from "@/lib/react-query/queriesAndMutations";
import { SigninValidation } from "@/lib/validation";
import { useUserContext } from "@/context/AuthContext";
import { account } from "@/lib/appwrite/config";

const SigninForm = () => {
  const navigate = useNavigate();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
  const { mutateAsync: signInAccount, isPending: isSigningInUser } =
    useSignInAccount();
  const [errorMessage, setErrorMessage] = useState("");

  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSignin = async (user: z.infer<typeof SigninValidation>) => {
    try {
      setErrorMessage(""); // Clear previous error messages

      const session = await signInAccount(user);

      if (!session) {
        setErrorMessage("Login failed. Please check your credentials.");
        return;
      }

      const isLoggedIn = await checkAuthUser();

      if (isLoggedIn) {
        form.reset();
        navigate("/");
      } else {
        setErrorMessage("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during onSubmit:", error);
      setErrorMessage("Make sure your Email or Password is Correct.");
    }
  };

  const googleAuth = (e) => {
    e.preventDefault();

    account.createOAuth2Session(
      "google",
      "https://letxby.vercel.app",
      "https://letxby.vercel.app/sign-in"
    );
  };

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/images/logo1.png" className="w-32" alt="logo" />

        <h2 className="h3-bold md:h2-bold pt-2 pb-5 sm:pt-2">Welcome back!</h2>
        <p className="text-light-2 small-medium md:base-regular mt-2">
          To use LetXBY, Please enter your details
        </p>

        <form
          onSubmit={form.handleSubmit(handleSignin)}
          className="flex flex-col gap-1 w-full mt-4 mb-4"
        >
          {errorMessage && (
            <p className="flex flex-center text-sm mb-4 text-red">
              {errorMessage}
            </p>
          )}

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Email</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="shad-button_primary">
            {isSigningInUser || isUserLoading ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ) : (
              "Sign In"
            )}
          </Button>
          <p className="flex justify-center">OR</p>

          <Button
            className="google-button_primary  "
            onClick={(e) => googleAuth(e)}
          >
            Google
          </Button>

          <p className="text-small-regular text-light-2 text-center mt-2 ">
            Don't have an account?
            <Link
              to="/sign-up"
              className="text-primary-500 text-small-semibold ml-1"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SigninForm;
