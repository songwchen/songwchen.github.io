
window.onload = function () {

}

let iphoneSpecJson = fetch('./iphoneSpec.json')
	.then(res => {return res.json()})
	.catch(error => {
		console.error('Error fetching JSON:', error);
	});
	console.log(iphoneSpecJson)