import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useAutoAnimate } from '@formkit/auto-animate/react'

const schema = z.object({
  phone_number: z
    .string()
    .min(8, 'Phone Number must contain at least 8 digits')
    .max(20, 'Phone Number must contain at most 30 digits')
    .regex(/^\d+$/)

    .optional(),

  password: z
    .string()
    .min(7, 'Password must contain at least 7 character(s)')
    .max(30, 'Password must contain at most 30 character(s)'),
})

export type FormData = z.infer<typeof schema>

const LoginForm = () => {
  const [errorRef] = useAutoAnimate()

  const {
    register,
    handleSubmit,

    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const submitData = async (data: FormData) => {
    console.log(data)
  }

  return (
    <form
      onSubmit={handleSubmit(submitData)}
      className={`flex flex-col gap-y-5`}
    >
      <div ref={errorRef} className='flex flex-col gap-y-3'>
        <input
          autoComplete='off'
          type='text'
          {...register('phone_number')}
          placeholder='Phone number'
          className={` w-96 rounded-lg border  border-[#BECDCC] pb-4   pl-4 pt-3 outline-none placeholder:text-lg placeholder:font-normal placeholder:text-[##BECDCC] ${
            errors.phone_number ? 'border-2 border-red-500' : ''
          }`}
        />
        {errors.phone_number && (
          <span className='text-red-400'> {errors.phone_number.message}</span>
        )}
      </div>

      <div ref={errorRef} className='flex flex-col gap-y-2'>
        <input
          type='password'
          {...register('password')}
          placeholder='Password'
          className={`w-96 rounded-lg border  border-[#BECDCC] pb-4   pl-4 pt-3 outline-none placeholder:text-lg placeholder:font-normal placeholder:text-[##BECDCC] ${
            errors.password ? 'border-2 border-red-500' : ''
          }`}
        />
        {errors.password && (
          <span className='text-red-400'> {errors.password.message}</span>
        )}
      </div>

      <button
        type='submit'
        disabled={isSubmitting}
        className='  rounded-full bg-[#69C920] bg-opacity-75 px-8 py-3 text-lg font-bold text-white shadow-md outline-none disabled:cursor-no-drop'
      >
        {isSubmitting ? (
          <div role='status' className='flex items-center gap-x-2'>
            <span className='animate-pulse w-full text-center'>
              Logging In ...
            </span>
          </div>
        ) : (
          ' Log In'
        )}
      </button>
    </form>
  )
}

export default LoginForm
