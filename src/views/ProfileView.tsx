import { useForm  } from "react-hook-form"
import { useQuery } from "@tanstack/react-query";
import { getUser, updateUser } from "../api/LinkForgeApi";
import { toast } from "sonner";
import FormError from "../components/FormError";
import { ProfileFormData } from "../types";

export default function ProfileView() {

     const {data} = useQuery({
        queryFn: getUser,
        queryKey: ['user'],
        retry: 1,
        refetchOnWindowFocus: false
     })

    const {register, handleSubmit, formState:{errors}, reset } = useForm({
        defaultValues:{
            handle: data?.handle,
            description: data?.description
        }
    });

    const onSubmit = async (profileFormData:ProfileFormData) => {
        try {
            const response = await updateUser(profileFormData);

            reset({
                handle: '',
                description: ''
            });

            toast.success(response.msg); //endpoint response
            
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form 
            className="bg-white p-10 rounded-lg space-y-5"
            onSubmit={handleSubmit(onSubmit)}
        >
            <legend className="text-2xl text-slate-800 text-center">Edit profile</legend>
            <div className="grid grid-cols-1 gap-2">
                <label
                    htmlFor="handle"
                >Handle:</label>
                <input
                    type="text"
                    className="border-none bg-slate-100 rounded-lg p-2"
                    placeholder="handle o User name"
                    {...register('handle', {required: 'User handle is required'})}
                />
                {errors.handle && <FormError  error={String(errors.handle?.message)} />}
            </div>

            <div className="grid grid-cols-1 gap-2">
                <label
                    htmlFor="description"
                >Description:</label>
                <textarea
                    className="border-none bg-slate-100 rounded-lg p-2"
                    placeholder="Your description"
                    {...register('description')}
                />
            </div>

            <div className="grid grid-cols-1 gap-2">
                <label
                    htmlFor="handle"
                >Image:</label>
                <input
                    id="image"
                    type="file"
                    name="handle"
                    className="border-none bg-slate-100 rounded-lg p-2"
                    accept="image/*"
                    onChange={ () => {} }
                />
            </div>

            <input
                type="submit"
                className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
                value='Save changes'
            />
        </form>
    )
}