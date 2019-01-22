<template>
  <div id="app">
    <router-view name="header"/>
    <div class="wrapper">
      <div class="main main-raised">
        <router-view/>
      </div>
    </div>
    <router-view name="footer"/>
  </div>
</template>
<script>

export default {
  bodyClass: "index-page",
  data() {
    return {};
  },
  mounted() {
  }
};
</script>
<style>
.section-download {
  .md-button + .md-button {
    margin-left: 5px;
  }
}

@media all and (min-width: 991px) {
  .btn-container {
    display: flex;
  }
}
</style>
