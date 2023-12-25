export const debounceFn = (fn: Function, delay: number) => {
    let timer:any = null
    let ctx = this
    return function (...args: any) {
        if (timer) clearTimeout(timer)
       timer = setTimeout(() => {
        fn.apply(ctx, args)
       },delay)
    }
}