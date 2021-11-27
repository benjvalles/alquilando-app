<Page onPageAfterIn={onPageAfterIn}>
  <Navbar title="{ tenant.name }" backLink="Back" />
  <BlockTitle>{ $_('tenantScreen.nuevo_blockTitle') }</BlockTitle>
  <p class="sa">{ $_('tenantScreen.nuevo_parrafo1') }</p>
  <Block strong>
    <List noHairlinesMd>
      <ListInput
        label="{ $_('global.email') }"
        floatingLabel
        type="email"
        placeholder="{ $_('global.email') }"
        value={ email }
        validate
        clearButton
        autofocus
        onInput={onChange}
      >
        <Icon f7="person_badge_plus" slot="media"/>
      </ListInput>
    </List>
  </Block>
  <div class="row justify-content-end sa">
    <button class="col-33 medium-20 button button-fill disabled" on:click={sendInvitation} bind:this="{sendBtn}">
      <Icon f7="person_crop_circle_badge_checkmark" class="margin-right"/>
      { $_('global.enviar') }
    </button>
  </div>
  <Block strong>
    <p>{ $_('tenantScreen.nuevo_parrafo2') } <span class="bold">{ $currentTeam }</span></p>
  </Block>
</Page>

<style>
  .sa {
    margin-left: calc(var(--f7-block-padding-horizontal) + var(--f7-safe-area-left));
    margin-right: calc(var(--f7-block-padding-horizontal) + var(--f7-safe-area-right));
  }

  span.bold {
    font-weight: 500;
  }
</style>
<script>
  import { f7, Page, Navbar, Block, BlockTitle, List, ListInput, Icon } from 'framework7-svelte';
  import { currentTeam, tenants } from '../store/user';
  import { _ } from '../services/i18n';

  export let  f7router,
              id;
  let email;
  let sendBtn;
  let tenant = {
    name: 'View user'
  };

  function onPageAfterIn()
  {
    console.log("EL ID:", id);
    tenant =$tenants[id];
    console.info(tenant);
  }

  function onChange(input)
  {
    if (input.target.classList.contains("input-invalid"))
      sendBtn.classList.add("disabled");
    else
      sendBtn.classList.remove("disabled");
  }
  function sendInvitation()
  {
    f7.dialog.alert("Aun no esta disponible esta opcion", "Alquilando.app", () => {
      f7router.back();
    });
  }
</script>
