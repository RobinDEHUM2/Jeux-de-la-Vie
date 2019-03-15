<template>
  <div id="app">
    <SidePannel
      class="sidePannel"
      v-bind:height="100"
      v-bind:width="100"
      v-bind:hasStarted="true"
      v-bind:modelSelected="empty"
      v-bind:modelOptions="['empty', 'foo', 'bar']"
    />
    <Board class="mainBoard" />
  </div>
</template>

<script>
import Board from "./components/Board.vue";
import SidePannel from "./components/SidePannel.vue";

export default {
  name: "app",
  components: {
    Board,
    SidePannel
  }
};
</script>

<style>
html,
body,
app {
  height: 100vh;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  flex-direction: row;
}
</style>

<style scoped>
.sidePannel {
  height: 100vh;
  width: 33vw;
  display: inline-block;
  padding-left: 5px;
  padding-right: 5px;
  background-color: rgb(73, 73, 73);
  color: rgb(182, 184, 219);
}

.mainBoard {
  height: 100vh;
  flex-grow: 100;
  display: inline-block;
  padding-left: 1vw;
}
</style>
