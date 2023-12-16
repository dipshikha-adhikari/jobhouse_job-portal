import { Link } from 'react-router-dom'

const NoUser = () => {
  return (
    <div className='h-screen relative grid place-items-center w-full '>
      <div className='relative  w-full max-w-xl mx-auto max-h-[400px] overflow-hidden '>
      <img src="https://cdn.dribbble.com/users/1791666/screenshots/3982316/___-1.png" alt="" className='  object-cover ' />
      <div className='absolute text-xl grid gap-sm bg-[rgba(0,0,0,0.5)] text-white p-sm rounded-md bottom-0'>
        <h2>You are not authenticated</h2>
        <Link to='/user/login' className='bg-blue-light hover:text-black-light text-black-dark p-sm'>Back to login</Link>
      </div>
      </div>
    </div>
  )
}

export default NoUser