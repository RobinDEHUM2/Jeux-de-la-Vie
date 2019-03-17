<template>
  <div>
    <h3>Jeux de la vie :</h3>
    <table border="1">
      <tr v-for="(line, lIndex) in board" :key="lIndex">
        <td
          v-for="(cell, cIndex) in line"
          :key="cIndex"
          v-bind:class="{ white: !cell, black: cell }"
          @click="switchState(lIndex, cIndex)"
        ></td>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "Board",
  computed: {
    ...mapState(["board"])
  },
  methods: {
    ...mapActions(["updateBoard"]),

    switchState(line, column) {
      this.updateBoard({ line, column });
    }
  }
};
</script>

<style scoped>
table {
  border-collapse: collapse;
}

table,
th,
td {
  border: 1px solid black;
}

td {
  height: 10px;
  width: 10px;
}

.black {
  background-color: black;
}

.white {
  background-color: white;
}
</style>
