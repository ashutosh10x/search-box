export function customDebounce (fn, d) {
	let timeout;
	return function (args) {
		const context = this
		console.log(args, 'debouce')
		clearTimeout(timeout);
		timeout = setTimeout(() => {
      		timeout = null;
			fn.apply(context, [...args]);
    	}, d);
	};
};

// to cache the top 10 new query
export function memoizer (fn) {
    let cache = {}
	let counter = 0
    return function (n){
        if (cache[n] !== undefined) {
          return cache[n].result
        } else {
          let result = fn(n)
		  if (cache[n].counter > 10) {
			delete cache[n]
		  }
          cache[n] = {result, counter}
          return result
        }
    }
}
