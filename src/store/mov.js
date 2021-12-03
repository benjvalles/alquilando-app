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

function createMovStore() {
  const mov = {};
  const { subscribe, set} = writable(null);

  function load(tenant, casa) {
    getJson(`/m/all/${tenant}/${casa}`)
      .then(res => {
        if (!mov[tenant])
          mov[tenant] = {};
        mov[tenant][casa] = res;
        set(mov);
      })
      .catch(() => {
        mov[tenant] = {};
      });
  }

  function read(tenant, casa) {
    if (!mov[tenant])
      mov[tenant] = {};

    return readable(mov[tenant][casa], _set => {
      getJson(`/m/all/${ tenant }/${ casa }`)
        .then(res => {
          mov[tenant][casa] = res;
          set(mov);
          _set(res);
        })
        .catch(() => {
          mov[tenant][casa] = null;
          _set({data: []});
        });

      return () => mov[tenant][casa] = null;
    });
  }

  return {
    load,
    read,
    subscribe
  };
}
const mov = createMovStore();

export { last as default, mov, createMovStore };