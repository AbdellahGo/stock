import { Button } from "../components/Button"
import FormHead from "../components/FormHead"
import Input from "../components/Input"
import FormNavigator from "../components/FormNavigator"
import z from "zod"
import { useForm, type SubmitErrorHandler, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import toast from "react-hot-toast"
import { useLogInUser } from "../lib/query/authe"
import { useAppContext } from "../context/AppContext"


const logInSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Must contain at least one number')
    .regex(/[@$!%*?&#]/, 'Must contain at least one special character (@$!%*?&#)')
    .regex(/^[a-zA-Z0-9@$!%*?&#]*$/, 'Emojis and special characters other than (@$!%*?&#) are not allowed')
})

export type logInFormData = z.infer<typeof logInSchema>

const Register = () => {
  // useContext
  const { login } = useAppContext()


  // tanstack mutation login user
  const { mutate: logInUser, isPending } = useLogInUser()

  // useForm Hook
  const { register, handleSubmit } = useForm<logInFormData>({
    resolver: zodResolver(logInSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })


  const onError: SubmitErrorHandler<logInFormData> = (errors) => {
    const firstError = Object.values(errors)[0];
    if (firstError) {
      toast.error(firstError.message!);
    }
  };

  const onSubmit: SubmitHandler<logInFormData> = (data) => {
    logInUser(data, {
      onSuccess: (res) => {
        login(res.user)
        toast.success('Welcome back!')
      },
      onError: (err) => toast.error(err.message)
    })
  }



  return (
    <div className="w-full h-137.5 flex flex-col items-center">
      <div className="border border-brand-border p-8.25 bg-white rounded-xl w-112.5">
        <FormHead
          title="Welcome back"
          description="Log in to access your products."
        />
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <div className="flex flex-col gap-5">
            <Input {...register('email')} labelText="Email" isRequired type="email" placeholder="you@company.com" />
            <Input {...register('password')} labelText="Password" isRequired type="password" placeholder="*******" />
            {/* submit button */}
            <Button disabled={isPending} type="submit"
              bStyles={`justify-center ${isPending ? 'opacity-80 cursor-progress' : ''}`}>
              {isPending ? 'Loading...' : 'Log In'}
            </Button>
          </div>
        </form>
      </div>
      <FormNavigator linkTitel="Register" PDescription="Don't have an account?"
        path="/register" />
    </div>
  )
}

export default Register