import  { useEffect } from 'react'
import { MdOutlineWrongLocation } from 'react-icons/md'
import { Link } from 'react-router-dom'

const WrongRoute = () => {

  useEffect(() => {
    window.scrollTo(0,0)
      },[])

  return (
    <div className='min-h-[88vh] flex justify-center items-center'>
     <div className='grid gap-sm place-items-center'>
     <p className='text-2xl flex items-center gap-xs'>OOPS! Wrong route <MdOutlineWrongLocation className='text-orange-dark ' fontSize='40' /></p>
      <Link to='/' className='bg-blue-dark hover:text-white text-white rounded-sm px-sm p-xs'>Back Home</Link>
     </div>
    </div>
  )
}

export default WrongRoute