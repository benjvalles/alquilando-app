{#if alwaisShow}
  <BlockTitle>{title}</BlockTitle>

  {#if !movs}
    <Block class="text-align-center">
      <Preloader size={150} color="#0a8096" />
    </Block>
  {:else}
    <List mediumInset>
      {#each movs as mov}
        <ListItem
          link="#"
          header={mov.tenant.name}
          title={mov.description}
          after={mov.date}
          footer={mov.amount.formated}
        >
          <div slot="media">
            {#if mov.amount.type === "spend"}
              <Icon f7="rectangle_stack_fill" class="text-color-red" />
            {:else}
              <Icon f7="rectangle_stack" class="text-color-green" />
            {/if}
          </div>
        </ListItem>
      {:else}
        <p class="sa">No hay movimientos</p>
      {/each}
      {#if balance}
        <ListItem title="Saldo">
          <div slot="after" class="balance text-color-{balance < 0? 'red' : 'green'}">
            {balance}
          </div>
          <div slot="media">
            <Icon
              f7="{balance < 0? 'exclamationmark_circle_fill' : 'checkmark_alt_circle'}"
              class="text-color-{balance < 0? 'red' : 'green'}"
            />
          </div>
        </ListItem>
      {/if}
    </List>
  {/if}
{/if}

<style>
  .sa {
    color: #444;
    font-size: 15px;
    padding: 18px 0px;
  }
  .balance {
    margin-right: 10px;
  }
</style>

<script>
  import {
    Block,
    BlockTitle,
    List,
    ListItem,
    Icon,
    Preloader,
  } from "framework7-svelte";
  import { createMovStore } from '../store/mov';
  import { onMount, onDestroy } from 'svelte';

  let unsubscribe;

  export let movs,
    title,
    alwaisShow = true,
    tenant,
    casa,
    balance;

  onMount(() => {
    if (tenant && casa)
    {
      unsubscribe = createMovStore().read(tenant, casa).subscribe(val => {
        if (val) {
          movs = val['data'];
          balance = val.balance;
        }
      });
    }
  });

  onDestroy(() => {
    unsubscribe && unsubscribe();
  });

</script>
