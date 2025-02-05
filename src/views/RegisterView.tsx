import { Link } from "react-router";
import { useForm  } from "react-hook-form"
import FormError from '../components/FormError'
import type {RegisterForm} from '../interfaces/index'
import api from "../lib/axios";
import { toast } from "sonner";

export default function App() {
  
  const initialValues:RegisterForm = {
    name: '',
    email: '',
    handle: '',
    password: '',
    password_confirmation: ''
  }

  const {register, watch, handleSubmit, formState:{errors}, reset } = useForm({defaultValues:initialValues});

  const password = watch("password")

  const onSubmit = async (formData:RegisterForm) => {
    //console.log(data)
    try {
      const {data} = await api.post(`/api/auth/register`, formData);

      console.log(data)
      reset();
      toast.success(data.msg)//endpoint response

    } catch (error:any) {
      toast.error(error.response.data.msg);
    }
  }

  
  return (
    <>
      <h1 className="text-4xl font-bold text-white">Sign in</h1>

      <form 
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white px-5 py-20 rounded-lg space-y-10 mt-10"
      >
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="name" className="text-2xl text-slate-500">
            Nombre
          </label>
          <input
            id="name"
            type="text"
            placeholder="Tu Nombre"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("name", {
              required: 'name is required',
              minLength: 2
            })}
          />

          {errors.name?.message && <FormError  error={String(errors.name?.message)} />}
        </div>

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
          <label htmlFor="handle" className="text-2xl text-slate-500">
            Handle
          </label>
          <input
            id="handle"
            type="text"
            placeholder="Nombre de usuario: sin espacios"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("handle", {
              required: 'handle is required',
            })}
          />

          {errors.handle?.message && <FormError  error={String(errors.handle?.message)} />}
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

        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="password_confirmation" className="text-2xl text-slate-500">
            Repetir Password
          </label>
          <input
            id="password_confirmation"
            type="password"
            placeholder="Repetir Password"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("password_confirmation", {
              required: 'password confirmation is required',
              validate: (value) => value === password || 'Passwords are not the same'
            })}
          />

          {errors.password_confirmation?.message && <FormError  error={String(errors.password_confirmation?.message)} />} 
        </div>

        <input
          type="submit"
          className="bg-cyan-500 hover:bg-cyan-600 transition p-3 text-lg w-full uppercase text-slate-700 rounded-lg font-bold cursor-pointer"
          value="Crear Cuenta"
        />
      </form>


      <nav className="mt-10">
          <Link 
            className="text-center text-white block text-lg" 
            to="/auth/login">Already have an account? Login here
          </Link>
      </nav>

    </>
  );
}