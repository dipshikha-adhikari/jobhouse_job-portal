export const debounceFn = <T extends unknown[]>(
  fn: (...args: T) => void,
  delay: number,
) => {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return function (this: unknown, ...args: T) {
    const context = this as unknown;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
};
