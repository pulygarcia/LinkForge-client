import { Link } from "react-router";
import { useForm  } from "react-hook-form"
import FormError from '../components/FormError'
import axios from "axios"
import { toast } from "sonner";

export default function App() {
  const initialValues = {
    email: '',
    password: '',
  }

  const {register, handleSubmit, formState:{errors}, reset } = useForm({defaultValues:initialValues});

  const onSubmit = async (formData:any) => {
    //console.log(data)
    try {
      const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, formData);
      //console.log(data);
      reset();
      toast.success(data.msg); //endpoint response

    } catch (error) {
      console.log(error)
    }
  }


  return (
    <>
      <h1 className="text-4xl font-bold text-white">Login</h1>

      <form 
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white px-5 py-20 rounded-lg space-y-10 mt-10"
      >

        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="email" className="text-2xl text-slate-500">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("email", {
              required: 'email is required',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Inavlid e-mail",
              },
            })}
          />

          {errors.email?.message && <FormError  error={String(errors.email?.message)} />}
        </div>

        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="password" className="text-2xl text-slate-500">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password de Registro"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("password", {
              required: 'password is required',
              minLength: {
                value: 8,
                message: 'Password should have at least 8 characters'
              }
            })}
          />

          {errors.password?.message && <FormError  error={String(errors.password?.message)} />}
        </div>


        <input
          type="submit"
          className="bg-cyan-500 hover:bg-cyan-600 transition p-3 text-lg w-full uppercase text-slate-700 rounded-lg font-bold cursor-pointer"
          value="Sign in"
        />
      </form>


      <nav className="mt-10">
          <Link 
            className="text-center text-white block text-lg" 
            to="/auth/register">Don't have an account? Register here
          </Link>
      </nav>

    </>
  );
}