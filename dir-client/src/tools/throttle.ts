//@ts-ignore
export function throttle(func, delay) {
    //@ts-ignore
    let timeoutId;
    //@ts-ignore
    let lastArgs;
    //@ts-ignore
    return function throttled(...args) {
      lastArgs = args;
    //@ts-ignore
      if (!timeoutId) {
        timeoutId = setTimeout(() => {
            //@ts-ignore
          func(...lastArgs);
          timeoutId = null;
        }, delay);
      }
    };
  }