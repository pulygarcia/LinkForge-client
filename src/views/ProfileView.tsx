import { useForm  } from "react-hook-form"
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { updateUser, uploadUserImage } from "../api/LinkForgeApi";
import { toast } from "sonner";
import FormError from "../components/FormError";
import { ProfileFormData, User } from "../types";

export default function ProfileView() {

    //  const {data} = useQuery({
    //     queryFn: getUser,
    //     queryKey: ['user'],
    //     retry: 1,
    //     refetchOnWindowFocus: false
    //  })

    const queryClient = useQueryClient();
    const data = queryClient.getQueryData<User>(['user']) ?? { 
        //handle undefined return
        name: '', 
        email: '', 
        handle: '', 
        id: '', 
        description: '' 
    };



    const {register, handleSubmit, formState:{errors}, reset } = useForm({
        defaultValues:{
            handle: data?.handle,
            description: data?.description
        }
    });


    const mutateUser = useMutation({
        mutationFn: updateUser,
        onError: (err) => {
            toast.error(err.message);
        },
        onSuccess: (data) => {
            reset({
                handle: '',
                description: ''
             });

            toast.success(data.msg); //endpoint response

            //refresh react query data that it has in 'user' key bcause is old and there is new data there
            queryClient.invalidateQueries({queryKey: ['user']});
        }
    })

    const UploadImageMutation = useMutation({
        mutationFn: uploadUserImage,
        onError: (err) => {
            console.log(err)
        },
        onSuccess: (data) => {
            console.log(data)
            //refresh
            queryClient.invalidateQueries({queryKey: ['user']});
        }
    })

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files){
            UploadImageMutation.mutate(e.target.files[0]);
        }
    }
    

    const onSubmit = (profileFormData: ProfileFormData) => {
        const user:User = queryClient.getQueryData(['user'])!
        //in case that description or handle change in addition to links, update with form values
        user.description = profileFormData.description
        user.handle = profileFormData.handle

        mutateUser.mutate(user);
    };
    

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
                    onChange={ handleChange}
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