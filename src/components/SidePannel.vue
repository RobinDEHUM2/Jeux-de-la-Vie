<template>
  <div>
    <h4>Dimensions :</h4>
    <div>
      <label>Hauteur :</label>
      <input class="dimInput" type="number" v-model="height" />
    </div>
    <div>
      <label>Largeur :</label>
      <input class="dimInput" type="number" v-model="width" />
    </div>
    <button v-on:click="resize">redimensionner</button>
    <h4>Motif :</h4>
    <vSelect
      class="design-select"
      v-model="modelSelected"
      :options="modelOptions"
    ></vSelect>
    <h4>Actions :</h4>
    <button v-on:click="reset">reset</button><br />
    <button v-if="hasStarted" v-on:click="stop">stop</button>
    <button v-else v-on:click="start">start</button>
  </div>
</template>

<script>
import vSelect from "vue-select";
export default {
  name: "SidePannel",
  components: {
    vSelect
  },
  props: {
    height: {
      type: Number,
      required: true
    },
    width: {
      type: Number,
      required: true
    },
    hasStarted: {
      type: Boolean,
      required: true
    },
    modelSelected: {
      type: String,
      required: true
    },
    modelOptions: {
      type: Array,
      required: true
    }
  },
  data() {
    return {};
  },
  methods: {
    resize() {
      console.log(`resize : ${this.height}, ${this.width}`);
    },
    reset() {
      console.log(
        `reset: ${this.height}, ${this.width} , ${this.modelSelected}`
      );
    },
    start() {
      console.log("start");
      this.hasStarted = true;
    },
    stop() {
      console.log("stop");
      this.hasStarted = false;
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
