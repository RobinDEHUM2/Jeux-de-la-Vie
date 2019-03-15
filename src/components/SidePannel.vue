<template>
  <div>
    <h4>Dimensions :</h4>
    <div>
      <label>Hauteur :</label>
      <input class="dimInput" type="number" v-model="selectedHeight" />
    </div>
    <div>
      <label>Largeur :</label>
      <input class="dimInput" type="number" v-model="selectedWidth" />
    </div>
    <button v-on:click="resizeWindow">redimensionner</button>
    <h4>Motif :</h4>
    <vSelect
      class="design-select"
      v-model="modelSelected"
      :options="modelOptions"
    ></vSelect>
    <h4>Actions :</h4>
    <button v-on:click="resetBoard">reset</button><br />
    <button v-if="hasStarted" v-on:click="stopGame">stop</button>
    <button v-else v-on:click="startGame">start</button>
  </div>
</template>

<script>
import vSelect from "vue-select";
import { mapState, mapActions } from "vuex";

export default {
  name: "SidePannel",
  components: {
    vSelect
  },
  computed: {
    ...mapState(["hasStarted", "modelOptions"])
  },
  data() {
    return {
      modelSelected: null,
      selectedHeight: 100,
      selectedWidth: 100
    };
  },
  methods: {
    ...mapActions(["resize", "reset", "start", "stop"]),
    resizeWindow() {
      console.log(`resize : ${this.selectedHeight}, ${this.selectedWidth}`);
      this.resize(this.selectedHeight, this.selectedWidth);
    },
    resetBoard() {
      console.log(
        `reset: ${this.selectedHeight}, ${this.selectedWidth} , ${
          this.modelSelected
        }`
      );
      this.reset(this.selectedHeight, this.selectedWidth, this.modelSelected);
    },
    startGame() {
      console.log("start");
      this.start();
    },
    stopGame() {
      console.log("stop");
      this.stop();
    }
  }
};
</script>

<style scoped>
.dimInput {
  text-align: right;
  float: right;
  margin-right: 0;
}

.design-select {
  background-color: white;
}

button {
  width: 50%;
  margin-top: 8px;
  margin-left: 25%;
  margin-right: 25%;
}
</style>
