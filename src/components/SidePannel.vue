<template>
  <div>
    <h4>Vitesse :</h4>
    <vue-slider v-model="selectedSpeed" v-on:drag-end="changeSpeed" min="1" />
    <h4>Dimensions :</h4>
    <label>Hauteur :</label>
    <input class="dimInput" type="number" v-model="selectedHeight" />
    <br />
    <label>Largeur :</label>
    <input class="dimInput" type="number" v-model="selectedWidth" />
    <button v-on:click="resizeWindow">redimensionner</button>
    <h4>Motif :</h4>
    <vSelect
      class="design-select"
      v-model="modelSelected"
      :options="modelOptions"
      @change="resetBoard"
    ></vSelect>
    <h4>Actions :</h4>
    <button v-if="!editable" v-on:click="editBoard">edit</button>
    <button v-else v-on:click="cancelEdit">annuler</button>
    <button v-if="hasStarted" v-on:click="stopGame">stop</button>
    <button v-else v-on:click="startGame">start</button>
  </div>
</template>

<script>
import vSelect from "vue-select";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/antd.css";
import { mapState, mapActions } from "vuex";

export default {
  name: "SidePannel",
  components: {
    vSelect,
    VueSlider
  },
  computed: {
    ...mapState(["hasStarted", "modelOptions", "editable"])
  },
  props: ["selectedSpeed", "selectedHeight", "selectedWidth"],
  data() {
    return {
      modelSelected: "default"
    };
  },
  methods: {
    ...mapActions([
      "resize",
      "reset",
      "start",
      "stop",
      "updateSpeed",
      "edit",
      "cancel"
    ]),

    resizeWindow() {
      this.resize({ width: this.selectedWidth, height: this.selectedHeight });
    },

    resetBoard() {
      this.reset(this.modelSelected);
    },

    startGame() {
      this.start();
    },

    stopGame() {
      this.stop();
    },

    changeSpeed() {
      this.updateSpeed(this.selectedSpeed);
    },

    editBoard() {
      this.edit();
    },

    cancelEdit() {
      this.cancel();
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
