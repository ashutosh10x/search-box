export function customDebounce (fn, d) {
	let timeout;
	return function () {
		const context = this
    	const args = arguments;
		console.log(args, 'debouce')
		clearTimeout(timeout);
		timeout = setTimeout(() => {
      		timeout = null;
			fn.apply(context, args);
    	}, d);
	};
};
