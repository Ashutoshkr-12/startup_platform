'use client'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"


export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

    const [email, setEmail] = useState< string >('');
    const [password, setPassword] = useState('');
    const router = useRouter();
  
  
  const handleLoginUser = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      const res = await fetch("/api/auth/login", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify({ email, password}),
   });

   const data = await res.json();
 // console.log('data after login user:',data)
    if(res.ok && data.success){
      localStorage.setItem("token",data.token)
     toast('Login successed')
     router.push('/')
    }else{
      toast.error(data.error || data.message);
    }
   } catch (error) {
    console.log('error from frontend',error);
   }
  }


  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="bg-zinc-800 text-white">
        <CardHeader>
          <CardTitle className="text-xl">PLease login to continue</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLoginUser}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  
                </div>
                <Input id="password"  onChange={(e) => setPassword(e.target.value)} type="password" required />
              </Field>
              <Field>
                <Button type="submit">Login</Button>
                
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <Link href="/register">Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
