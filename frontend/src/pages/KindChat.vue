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
      <div class="mb-2" v-for="aiText in aiTexts">{{ aiText }}</div>
    </v-sheet>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "KindChat",
  data() {
    return {
      inputText: "",
      aiTexts: ["1블라블라~", "2블라블라~", "3블라블라~"],
    };
  },
  methods: {
    sendChat() {
      console.log(this.inputText);
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
