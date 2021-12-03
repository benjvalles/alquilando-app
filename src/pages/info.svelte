<Page>
  <Navbar title={tenant.name} backLink="Back" />
  <BlockTitle>{`${$_("infoScreen.blockTitle")} ${tenant.name}`}</BlockTitle>
  <p class="sa">{$_("infoScreen.parrafo1")}</p>
  <Block strong>
    <Grid --grid-separator="':'">
      <Row>
        <Col>
          {$_("global.nombre")}
        </Col>
        <Col>
          {tenant.name}
        </Col>
      </Row>
      <Row>
        <Col>
          {$_("global.email")}
        </Col>
        <Col>
          {tenant.email}
        </Col>
      </Row>
      <Row>
        <Col>
          {$_("global.casas")}
        </Col>
        <Col>
          {listProperties(tenant.rentedProperties)}
        </Col>
      </Row>
      {#if tenant.rentedProperties}
        {#each tenant.rentedProperties as casa, i (i)}
          <Row>
            <Col>
              {casa.name}
            </Col>
            <Col>
              {casa.price.toFloat(2)}
            </Col>
          </Row>
        {/each}
      {:else}
        <Row>
          <Col>No tiene casas alquiladas</Col>
        </Row>
      {/if}
    </Grid>
  </Block>

  <Block>
    {#each tenant.rentedProperties as casa (casa.id)}
    <Mov tenant={tenant._id} casa={casa._id} title="Ultimos movimientos del inmueble {casa.name}"></Mov>
    {/each}
  </Block>

  <div class="row justify-content-end sa">
    <button
      class="col-33 medium-20 button button-fill disabled"
      on:click={sendInvitation}
      bind:this={sendBtn}
    >
      <Icon f7="person_crop_circle_badge_checkmark" class="margin-right" />
      {$_("global.enviar")}
    </button>
  </div>
  <Block strong>
    <p>
      {$_("tenantScreen.nuevo_parrafo2")}
      <span class="bold">{$currentTeam}</span>
    </p>
  </Block>
</Page>

<script>
  import {
    f7,
    Page,
    Navbar,
    Block,
    BlockTitle,
    Row,
    Col,
    Icon,
  } from "framework7-svelte";
  import Grid from "../components/grid.svelte";
  import Mov from '../components/mov.svelte';
  import { currentTeam, tenants } from "../store/user";
  import { mov } from "../store/mov";
  import { _ } from "../services/i18n";
  import { listProperties } from "./home.svelte";
  import { onMount } from "svelte";

  export let f7router, id;

  let email;
  let sendBtn;
  let tenant = {
    name: "View user",
    rentedProperties: []
  };



  onMount(() => {
    console.log("EL ID:", id);
    tenant = $tenants[id];
    console.info(tenant);
    window.mov = mov;
  });

  function onChange(input) {
    if (input.target.classList.contains("input-invalid"))
      sendBtn.classList.add("disabled");
    else sendBtn.classList.remove("disabled");
  }
  function sendInvitation() {
    f7.dialog.alert(
      "Aun no esta disponible esta opcion",
      "Alquilando.app",
      () => {
        f7router.back();
      }
    );
  }
</script>
