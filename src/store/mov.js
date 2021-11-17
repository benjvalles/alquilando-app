import { readable, writable, derived } from 'svelte/store';
import User, { getJson } from './user';
import '../js/biblio.js';

const last = derived(User, ($User, set) =>{
	if (!$User || !$User.token) {
		set(null);
		return;
	}

	getJson("/m/list")
		.then(res => {
			set(res);
		})
		.catch(err => {
			set(null);
			console.error(err);
		});

}, null);

export { last as default };