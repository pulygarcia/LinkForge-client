import FormError from './FormError'
import { useMutation } from '@tanstack/react-query';
import {useForm} from 'react-hook-form'
import slugify from 'react-slugify';
import { searchByHandle } from '../api/LinkForgeApi';
import { Link } from 'react-router-dom';

export default function SearchForm() {
    const {register, handleSubmit, watch, formState:{errors}} = useForm({
        defaultValues:{
            handle: ''
        }
    });

    const mutation = useMutation({
        mutationFn: searchByHandle
    })

    const handle = watch('handle');

    const handleSearch = () => {
        //slug the handle
        const slug = slugify(handle)
        //console.log(slug)
        mutation.mutate(slug); //api call
        console.log(mutation)
    }

    return(
        <form
            onSubmit={handleSubmit(handleSearch)}
            className="space-y-5">
            <div className="relative flex items-center  bg-gray-200  px-2">
                <label
                htmlFor="handle"
                >linkforge.com/</label>
                <input
                type="text"
                id="handle"
                className="border-none bg-transparent p-2 focus:ring-0 flex-1"
                placeholder="elonmusk, zuck, jeffbezos"
                {...register("handle", {
                    required: "Username is required",
                })}
                />

            </div>
            {errors.handle && (
                <FormError error={String(errors.handle.message)} />
            )}

            <div className="mt-10">
                {mutation.isPending && <p className='text-center text-blue-600'>Loading...</p>}
                {mutation.error && <p className='text-center text-red-600'>{mutation.error.message}</p>}
                {mutation.data && <p className='text-center text-green-600'>
                    {mutation.data} - go to <Link to={'/auth/register'} state={{handle: slugify(handle)}} className='text-blue-500 underline'>Register</Link></p>
                }
            </div>

            <input
                type="submit"
                className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
                value='Get my Linkforge'
            />
            </form>
    )
}