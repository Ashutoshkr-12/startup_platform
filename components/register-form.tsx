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
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"


export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();


const handleRegisterUser = async(e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  try {
    const res = await fetch("/api/auth/register", {
   method: "POST",
   headers: {
     "Content-Type": "application/json",
   },
   body: JSON.stringify({
     name,
     email,
     password,
   }),
 });

 const data = await res.json();

  if(res.ok && data.success ){
   toast('Account created')
   router.push('/login')
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
          <CardTitle className="text-xl">Create account</CardTitle>
          <CardDescription>
            Enter your email below to create account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegisterUser}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Email</FieldLabel>
                <Input
                onChange={(e) => setName(e.target.value)}
                  id="name"
                  type="text"
                  placeholder="john"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                 onChange={(e) => setEmail(e.target.value)}
                  id="email"
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
                <Button type="submit" >Create account</Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <Link href="/login">Sign in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
