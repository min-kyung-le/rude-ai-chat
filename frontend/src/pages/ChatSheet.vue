<template>
  <div class="pa-3 pb-11 d-flex flex-column-reverse chat-div overflow-y-hidden">
    <v-text-field
      class="chat-text"
      label=""
      append-inner-icon="mdi-chat"
      v-model="inputText"
      @click:append-inner="sendChat"
      @keyup.enter="sendChat"
    ></v-text-field>
    <v-sheet class="mb-2 bg-teal-lighten-4 talk-bg d-flex flex-column-reverse">
      <div class="mb-2" v-for="data in showChatList">
        {{ data }}
      </div>
    </v-sheet>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

type listType = {
  [index: string]: Array<string>;
  KindChat: Array<string>;
  RudeChat: Array<string>;
  EmojiChat: Array<string>;
};

let chatList: listType = {
  KindChat: [],
  RudeChat: [],
  EmojiChat: [],
};

export default defineComponent({
  name: "ChatSheet",
  props: {
    chatId: { type: String, required: true },
  },
  data() {
    return {
      inputText: "",
      showChatList: new Array<string>(),
    };
  },
  watch: {
    chatId() {
      this.showChatList = chatList[this.chatId];
    },
  },
  methods: {
    sendChat() {
      this.showChatList = chatList[this.chatId];
      this.showChatList.unshift("You: " + this.inputText);
      try {
        this.$http
          .post("/api/generate", { name: this.chatId, data: this.inputText })
          .then((res) => {
            this.showChatList.unshift("AI:" + res.data.result);
          });
        this.inputText = "";
      } catch (error) {
        console.error("error", error);
      }
    },
  },
});
</script>
