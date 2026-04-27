import { Button } from "../components/Button"
import FormHead from "../components/FormHead"
import Input from "../components/Input"
import FormNavigator from "../components/FormNavigator"
import z from "zod"
import { useForm, type SubmitErrorHandler, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import toast from "react-hot-toast"
import { useRegisterUser } from "../lib/query/authe"
import { useAppContext } from "../context/AppContext"



const registerSchema = z.object({
  username: z.string()
    .min(4, 'Username must be at least 4 characters')
    .regex(/^[a-zA-Z]+$/, 'Username must be only letters'),
  email: z.email('Invalid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Must contain at least one number') // رقم
    .regex(/[@$!%*?&#]/, 'Must contain at least one special character (@$!%*?&#)')
    .regex(/^[a-zA-Z0-9@$!%*?&#]*$/, 'Emojis and special characters other than (@$!%*?&#) are not allowed')
})

export type RegisterFormData = z.infer<typeof registerSchema>

const Register = () => {
  // useContext
  const { login } = useAppContext()


  // tanstack mutation register user
  const { mutate: registerUser, isPending } = useRegisterUser()

  // useForm Hook
  const { register, handleSubmit } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    }
  })


  const onError: SubmitErrorHandler<RegisterFormData> = (errors) => {
    const firstError = Object.values(errors)[0];
    if (firstError) {
      toast.error(firstError.message!);
    }
  };

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    registerUser(data, {
      onSuccess: (res) => {
        login(res.user)
        toast.success("Account created successfully!")
      },
      onError: (err) => toast.error(err.message)
    })
  }


  return (
    <div className=" w-full h-137.5 flex flex-col items-center">
      <div className="border border-brand-border p-8.25 bg-white rounded-xl w-112.5">
        <FormHead
          title="Create account"
          description="Start managing your inventory in seconds."
        />
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <div className="flex flex-col gap-5">
            <Input {...register('username')} labelText="Username" isRequired type="text" placeholder="e.g. johndoe" />
            <Input {...register('email')} labelText="Email" isRequired type="email" placeholder="you@company.com" />
            <Input {...register('password')} labelText="Password" isRequired type="password" placeholder="*******" />
            {/* submit button */}
            <Button disabled={isPending} type="submit" bStyles={`justify-center ${isPending ? 'opacity-80 cursor-progress' : ''}`}>
              {isPending ? 'Loading...' : 'Register'}
            </Button>
          </div>
        </form>
      </div>
      <FormNavigator linkTitel="Log In" PDescription="Already have an account?"
        path="/login" />
    </div>
  )
}

export default Register