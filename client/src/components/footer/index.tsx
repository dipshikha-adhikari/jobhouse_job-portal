import { Layout } from '../../App'

const Footer = () => {
  return (
    <div className=' relative py-sm min-h-[200px]  text-white  bg-blue-dark'>
      <Layout>
      <div className=' py-md grid gap-10 md:flex'> 
        <div className='flex-1'>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi eveniet delectus aspernatur facilis!</p>
        </div>
       <div  className='flex-[0.5]'>
        <h2 className='font-semibold '>FOR JOBSEEKER</h2>
        </div> 
       <div  className='flex-[0.5]'>
        <h2 className='font-semibold'>FOR eMPLOYER</h2>
        </div> 
       <div  className='flex-[0.5]'>
        <h2 className='font-semibold'>CONTACT US</h2>
        </div> 
    </div>
      </Layout>
    </div>
  )
}

export default Footer