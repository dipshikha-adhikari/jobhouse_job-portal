import { useEffect, useState } from "react"

export const useIntersectionObserver = (ref: React.RefObject<HTMLDivElement>) => {
    const [isIntersecting, setIsIntersecting] = useState(false)

    useEffect(() => {
        if (!ref.current) return;
      
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setIsIntersecting(true)
            } else {
                setIsIntersecting(false)
            }
        })

        observer.observe(ref.current)

        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, [ref])


    return { isIntersecting }
}