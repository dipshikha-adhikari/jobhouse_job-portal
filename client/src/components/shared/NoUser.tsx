import { Link } from 'react-router-dom'

const NoUser = () => {
  return (
    <div className='h-[80vh] relative grid place-items-center w-full '>
      <div className='relative  w-full max-w-xl mx-auto max-h-[400px] overflow-hidden '>
      <img src="https://cdn.dribbble.com/users/1791666/screenshots/3982316/___-1.png" alt="" className='  object-cover ' />
      <div className='absolute text-xl grid gap-sm bg-[rgba(0,0,0,0.5)] text-white p-sm rounded-md bottom-0'>
        <h2>You are not authenticated</h2>
        <Link to='/user/login' className='bg-white rounded-sm w-fit text-blue-dark hover:text-blue-dark  p-sm'>Back to login</Link>
      </div>
      </div>
    </div>
  )
}

export default NoUser