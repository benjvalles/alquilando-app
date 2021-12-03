<div class="grid">
  <slot>
    Componente vacio.
  </slot>
</div>

<style>
  .grid {
    background-color: #0a809654;
    --f7-grid-gap: 0px;
    --f7-grid-row-gap: 2px;
  }
  .grid :global(.col) {
    padding: 5px;
    background-color: aliceblue;
  }
  .grid :global(.col:nth-child(2n+1)) {
    text-align: right;
  }
  .grid :global(.col:nth-child(2n+1)::after) {
    content: var(--grid-separator, '');
  }
  @media screen and (min-width: 768px) {
    .grid {
      max-width: 50%;
      margin: auto;
      padding: 5px;
      border-radius: 5px;
    }
  }
</style>