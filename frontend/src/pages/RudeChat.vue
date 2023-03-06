<template>
  <div class="pa-3 pb-11 d-flex flex-column-reverse chat-div">
    <v-text-field
      class="chat-text"
      label=""
      append-inner-icon="mdi-chat"
      v-model="inputText"
      @click:append-inner="sendChat"
      @keyup.enter="sendChat"
    ></v-text-field>
    <v-sheet class="mb-2 bg-teal-lighten-4 talk-bg d-flex flex-column-reverse">
      <div class="mb-2" v-for="data in showChat">{{ data }}</div>
    </v-sheet>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "RudeChat",
  data() {
    return {
      showChat: [] as Array<String>,
      inputText: "",
    };
  },
  methods: {
    sendChat(): void {
      this.showChat.push(this.inputText);
      try {
        this.$http
          .post("/api/generate", { data: this.inputText })
          .then((res) => {
            console.log("returnData", res.data.result);
            this.showChat.push(res.data.result);
          });
        this.inputText = "";
      } catch (error) {
        console.error("error", error);
      }
    },
  },
});
</script>

<style scoped>
.talk-bg {
  min-height: 200px;
}
.chat-div {
  height: 500px;
}
.chat-text {
  max-height: 10px;
}
</style>
