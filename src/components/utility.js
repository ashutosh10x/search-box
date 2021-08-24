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
