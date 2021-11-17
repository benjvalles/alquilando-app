import { readable, writable, derived } from 'svelte/store';
import '../js/biblio.js';

const ACCESS_KEY = import.meta.env.VITE_ACCESS_KEY,
      SERVER = import.meta.env.VITE_API_SERVER,
      User = createUserStore(),
      headers = {
        'Content-Type': 'application/json',
        'access_key': ACCESS_KEY,
        'Accept': 'application/json'
      };

let logged = false;

User.subscribe(user => {
  logged = !!user.token;
  if (user.token)
    headers['Authorization'] = 'Bearer ' + user.token;
  else
    delete headers['Authorization'];
});

function createUserStore()
{
  const _user = JSON.parse(localStorage.getItem('user')) || {token: null};
  const {subscribe, set} = writable(_user);
  
  function save(user)
  {
    set(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  function login(user)
  {
    return new Promise((resolve, reject) => {
      if (user && user.email && user.password && SERVER && ACCESS_KEY)
      {
        // Ejemplo implementando el metodo POST:
        fetch(SERVER + '/login', {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json',
            'access_key': ACCESS_KEY
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify(user) // body data type must match "Content-Type" header
        })
        .then(response => response.json())
        .then(json => {
          if (json.error)
            reject(json);
          else
          {
            save(json.filter(['name', 'email' ,'token', 'currentTeam'])); 
            resolve(json);
          }
        })
        .catch(err => {
          console.error(err);
          reject(err);
        });
      }
      else
        reject({error: 422, message: 'not user, SERVER or ACCESS_KEY'});
    });
  }

  function logout()
  {
    save({token: null});
  }

  return {
    subscribe,
    login,
    logout
    //set: update
  };
}

const tenants = derived(User, ($User, set) => {
  if (!$User || !$User.token) 
    set(null);
  else {
    console.log("\nAQUI\n");
    list()
      .then( res => {
        set(res.data);
      })
      .catch(err => {
        if (err.error && err.error == "401")
        {
          set(null);
          $User.logout();
        }
        console.error(err);
      });
  }
}, null);

const currentTeam = derived(User, $User => $User.currentTeam.capitalize(), "Alquilando");

async function putJson(endpoint, data)
{
  const res = await fetch(SERVER + endpoint, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers,
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return res.json();
}

async function getJson(endpoint)
{
  const res = await fetch(SERVER + endpoint, {
    headers,
  });
  if (res.status >= 400)
    throw({error: res.status, message: res.message});
  return await res.json()
}

async function list()
{
  if (!logged)
    throw({error: 401, message: 'Not login'});

  return await getJson('/list');
}

export { User as default, putJson, getJson, tenants, currentTeam };
