import toast from "react-hot-toast"
import { privateRequest } from "../../../lib/axios"

export const applyJob = (jobId:string | undefined, employerid:string | undefined, setIsLoading:(props:any) => void, navigate:any) => {
console.log(jobId, employerid)
try{
    setIsLoading(true)
toast.promise(privateRequest.post('/api/v1/jobs/apply', {job_id: jobId,employer_id : employerid}),{
    loading:'Loading',
    error:(er) => {
        console.log(er)
        setIsLoading(false)
        return 'Failed'
    },
    success:()=> {
        setIsLoading(false)
navigate('/jobseeker/overview')
        return 'Success'
    }
})
}catch(err){

}
}