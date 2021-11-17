<App { ...f7params } >

  <!-- Left panel with cover effect when hidden -->
  <Panel left cover themeDark visibleBreakpoint={960}>
    <View>
      <Page>
        <Navbar title="Left Panel"/>
        <BlockTitle>Left View Navigation</BlockTitle>
        <List>
          <ListItem link="/left-page-1/" title="Left Page 1"/>
          <ListItem link="/left-page-2/" title="Left Page 2"/>
        </List>
        <BlockTitle>Control Main View</BlockTitle>
        <List>
          <ListItem link="/about/" view=".view-main" panelClose title="About"/>
          <ListItem link="/form/" view=".view-main" panelClose title="Form"/>
          <ListItem link="#" view=".view-main" back panelClose title="Back in history"/>
        </List>
      </Page>
    </View>
  </Panel>


  <!-- Right panel with reveal effect-->
  <Panel right reveal themeDark>
    <View>
      <Page>
        <Navbar title="Right Panel"/>
        <Block>Right panel content goes here</Block>
      </Page>
    </View>
  </Panel>


  <!-- Your main view, should have "view-main" class -->
  <View main class="safe-areas" url="/" />


  <!-- Popup -->
  <Popup id="my-popup">
    <View>
      <Page>
        <Navbar title="Popup">
          <NavRight>
            <Link popupClose>Close</Link>
          </NavRight>
        </Navbar>
        <Block>
          <p>Popup content goes here.</p>
        </Block>
      </Page>
    </View>
  </Popup>

  <LoginScreen id="login-screen">
    <View>
      <Page loginScreen>
        <LoginScreenTitle>Login</LoginScreenTitle>
        <List form>
          <ListInput
            type="text"
            name="username"
            placeholder={$_('loginScreen.tu_email')}
            bind:value={email}
          />
          <ListInput
            type="password"
            name="password"
            placeholder={ $_('loginScreen.tu_password') }
            bind:value={password}
          />
        </List>
        <List>
          <ListButton title={ $_('loginScreen.login') } onClick={() => login()} />
        </List>
        <BlockFooter>
          { @html $_('loginScreen.condition') }
        </BlockFooter>
      </Page>
    </View>
  </LoginScreen>
</App>


<script>
  import { onMount } from 'svelte';
  import { getDevice }  from 'framework7/lite-bundle';
  import {
    f7,
    f7ready,
    App,
    Panel,
    Views,
    View,
    Popup,
    Page,
    Navbar,
    Toolbar,
    NavRight,
    Link,
    Block,
    BlockTitle,
    LoginScreen,
    LoginScreenTitle,
    List,
    ListItem,
    ListInput,
    ListButton,
    BlockFooter
  } from 'framework7-svelte';

  import capacitorApp from '../js/capacitor-app';
  import routes from '../js/routes';
  import store from '../js/store';
  import user from '../store/user';
  import { _, setup } from '../services/i18n';

  const device = getDevice();
  // Framework7 Parameters
  let f7params = {
    name: 'Alquilando', // App name
    theme: 'auto', // Automatic theme detection


    id: 'com.benja.alquilando', // App bundle ID
    // App store
    store: store,
    // App routes
    routes: routes,

    // Input settings
    input: {
      scrollIntoViewOnFocus: device.capacitor,
      scrollIntoViewCentered: device.capacitor,
    },
    // Capacitor Statusbar settings
    statusbar: {
      iosOverlaysWebView: true,
      androidOverlaysWebView: false,
    },
    toast: {
			closeTimeout: 3500,
			position: "bottom",
			horizontalPosition: "center",
			on: {
				closed: toast => {
					queueMicrotask(() => toast.destroy());
					//toast.$el.remove();
				}
			}
		},
		notification: {
			title: 'Alquilando',
			closeTimeout: 3500,
			closeOnCLick: true,
			on: {
				closed: noti => {
					queueMicrotask(() => noti.destroy())
				}
			}
		},
		dialog: {
			title: 'Alquilando',
			buttonOk: 'Ok',
			buttonCancel: 'Cancelar',
			preloaderTitle: 'Cargando...',
			progressTitle: 'Un momento...'
		}
  };
  // Login screen data
  let email = '';
  let password = '';

  setup();

  function login() {
    f7.preloader.show();
    user.login({
      email,
      password
    }).then(r => {
      f7.loginScreen.close();
    }).catch(err => {
      console.info(err);
      f7.toast.create({
        cssClass: 'danger',
        text: $_('loginScreen.' + err.error)
      }).open();
    }).finally(() => f7.preloader.hide());
    /* f7.dialog.alert('Username: ' + email + '<br>Password: ' + password, () => {
    }); */
  }

  onMount(() => {
    f7ready(() => {

      // Init capacitor APIs (see capacitor-app.js)
      if (f7.device.capacitor) {
        capacitorApp.init(f7);
      }
      // Call F7 APIs here
      window.f7 = f7;
      window.user = user;
      window._ = _;
      user.subscribe(val => {
        console.info("SUBSCRITO", val);
        if (!val.token) {
          password = '';
          queueMicrotask(() => f7.loginScreen.open("#login-screen"));
        }
        else {
          email = val.email;
          password = val.password;
        }
      });
    });
  });
</script>