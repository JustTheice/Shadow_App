export default {
	read(KEY){
		return JSON.parse(window.localStorage.getItem(KEY) || '[]');
	},
	save(KEY,newV){
		window.localStorage.setItem(KEY,JSON.stringify(newV));
	}
}