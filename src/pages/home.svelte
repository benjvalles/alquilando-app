<Page name="home">
  <!-- Top Navbar -->
  <Navbar large sliding={false}>
    <NavLeft>
      <Link iconIos="f7:menu" iconAurora="f7:menu" iconMd="material:menu" panelOpen="left" />
    </NavLeft>
    <NavTitle sliding>{ $currentTeam }</NavTitle>
    <NavRight>
      <Link iconIos="f7:menu" iconAurora="f7:menu" iconMd="material:menu" panelOpen="right" />
    </NavRight>
    <NavTitleLarge>Alquilando</NavTitleLarge>
  </Navbar>
  <!-- Toolbar -->
  <Toolbar bottom>
    <Link>Left Link</Link>
    <Link>Right Link</Link>
  </Toolbar>

  <!-- FAB -->
  <Fab position="right-bottom" color="#0a8096">
    <Icon ios="f7:plus" aurora="f7:plus" md="material:add"></Icon>
    <Icon ios="f7:xmark" aurora="f7:xmark" md="material:close"></Icon>
    <FabButtons position="top">
      <FabButton label="{ $_('tenantScreen.nuevo') }" href="/new/t" fabClose="true"><Icon f7="person_badge_plus" /></FabButton>
      <FabButton label="Nuevo Movimiento" fabClose="true"><Icon f7="rectangle_stack_badge_plus" /></FabButton>
    </FabButtons>
  </Fab>
  <!-- Page content -->
  <BlockTitle>
    { $_('global.inquilinos') }
  </BlockTitle>
  
  {#if !$tenants}
  <Block class="text-align-center">
    <Preloader size={150} color="#0a8096"></Preloader>
  </Block>
  {:else if $tenants.length}
  <List>

    {#each $tenants as inquilino, i}
    <ListItem link="/user/{i}" title="{ inquilino.name }" after="Edit">

      <div slot="media">
        <Icon f7="person"/>
      </div>
      
      <div slot="header">
        {#if inquilino.rentedProperties.length}
        {#each inquilino.rentedProperties as {name}, i (inquilino.name +  i)}
          {#if i > 0} {", "}{/if}
          { name }
        {/each}
        {/if}
      </div>
      
    </ListItem>
    {/each}

  </List>
  {/if}

  <BlockTitle>
    { $_('global.ultimosMov') }
  </BlockTitle>

  {#if !$lastMov}
  <Block class="text-align-center">
    <Preloader size={150} color="#0a8096"></Preloader>
  </Block>
  {:else}
    {#if $lastMov.tenants}
      <BlockTitle>
        Ultinmos movimientos de tus inquilnos
      </BlockTitle>
      <List>
        {#each $lastMov.tenants as mov}
          <ListItem link="#" header="{ mov.tenant.name }" title="{ mov.description }" after="{ mov.date }" footer="{ mov.amount.formated }">
            <div slot="media">
              {#if mov.amount.type === 'spend'}
              <Icon f7="rectangle_stack_fill" class="text-color-red"/>
              {:else}
              <Icon f7="rectangle_stack" class="text-color-green"/>
              {/if}
            </div>
          </ListItem>
        {/each}
      </List>
    {/if}

    {#if $lastMov.my.length}
      <BlockTitle>
        Mis ultimos movimientos
      </BlockTitle>
      <List>
        {#each $lastMov.my as mov}
          <ListItem link="#" title="{ mov.description }" after="{ mov.date }" footer="{ mov.amount.formated }"></ListItem>
        {/each}
      </List>
    {/if}
  {/if}

  <Block strong>
    <p>This is an example of split view application layout, commonly used on tablets. The main approach of such kind of layout is that you can see different views at the same time.</p>

    <p>Each view may have different layout, different navbar type (dynamic, fixed or static) or without navbar.</p>

    <p>The fun thing is that you can easily control one view from another without any line of JavaScript just using "data-view" attribute on links.</p>
  </Block>

  <BlockTitle>Navigation</BlockTitle>
  <List>
    <ListItem link="/about/" title="About"/>
    <ListItem link="/form/" title="Form"/>
  </List>

  <BlockTitle>Modals</BlockTitle>
  <Block strong>
    <Row>
      <Col width="50">
        <Button fill raised popupOpen="#my-popup">Popup</Button>
      </Col>
      <Col width="50">
        <Button fill raised loginScreenOpen="#login-screen">Login Screen</Button>
      </Col>
    </Row>
  </Block>

  <BlockTitle>Panels</BlockTitle>
  <Block strong>
    <Row>
      <Col width="50">
        <Button fill raised panelOpen="left">Left Panel</Button>
      </Col>
      <Col width="50">
        <Button fill raised panelOpen="right">Right Panel</Button>
      </Col>
    </Row>
  </Block>

  <List>
    <ListItem
      title="Dynamic (Component) Route"
      link="/dynamic-route/blog/45/post/125/?foo=bar#about"
    />
    <ListItem
      title="Default Route (404)"
      link="/load-something-that-doesnt-exist/"
    />
    <ListItem
      title="Request Data & Load"
      link="/request-and-load/user/123456/"
    />
  </List>
</Page>
<script>
  import {
    f7,
    Page,
    Navbar,
    NavLeft,
    NavTitle,
    NavTitleLarge,
    NavRight,
    Link,
    Toolbar,
    Block,
    BlockTitle,
    List,
    ListItem,
    Row,
    Col,
    Button,
    f7ready,
    Preloader,
    Fab,
    FabButtons,
    FabButton,
    Icon
  } from 'framework7-svelte';
  import { onDestroy, onMount } from 'svelte';
  import { _ } from '../services/i18n';
  import user, {currentTeam, tenants} from '../store/user';
  import lastMov from '../store/mov';

  let unsubscribe;

  onMount(() => {
    f7ready(() => {
      window.tenants = tenants;
      window.lastMov = lastMov;
      unsubscribe = user.subscribe(val => {
        if (!val.token)
          return;
        /* f7.preloader.show();
        list()
          .then( data => {
            groupTitle = data.currentTeam.capitalize();
            inquilinos = data.data;
          })
          .catch(err => {
            if (err === "Unauthenticated." || (err.error && err.error == "401"))
            {
              f7.toast.create({
                cssClass: 'danger',
                text: $_('global.' + err.error),
                on: {
                  closed: toast => {
                    user.logout();
                    queueMicrotask(() => toast.destroy());
                  }
                }
              }).open();
            }
            console.info(err);
          })
          .finally(() => f7.preloader.hide()); */
      });
    });
  });
  onDestroy(() => unsubscribe());

</script>