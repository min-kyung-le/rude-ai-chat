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
      <div
        class="mb-2"
        v-if="chatId == 'KindChat'"
        v-for="data in kindChatList"
      >
        {{ data }}
      </div>
      <div
        class="mb-2"
        v-if="chatId == 'RudeChat'"
        v-for="data in rudeChatList"
      >
        {{ data }}
      </div>
      <div
        class="mb-2"
        v-if="chatId == 'EmojiChat'"
        v-for="data in emojiChatList"
      >
        {{ data }}
      </div>
    </v-sheet>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ChatSheet",
  props: {
    chatId: String,
  },
  data() {
    return {
      kindChatList: [] as Array<string>,
      rudeChatList: [] as Array<string>,
      emojiChatList: [] as Array<string>,
      inputText: "",
    };
  },
  methods: {
    sendChat(): void {
      if (this.chatId == "KindChat") {
        this.kindChatList.unshift("You: " + this.inputText);
      } else if (this.chatId == "RudeChat") {
        this.rudeChatList.unshift("You: " + this.inputText);
      } else if (this.chatId == "MovieChat") {
        this.emojiChatList.unshift("You: " + this.inputText);
      }
      try {
        this.$http
          .post("/api/generate", { name: this.chatId, data: this.inputText })
          .then((res) => {
            if (this.chatId == "KindChat") {
              this.kindChatList.unshift("AI:" + res.data.result);
            } else if (this.chatId == "RudeChat") {
              this.rudeChatList.unshift("AI:" + res.data.result);
            } else if (this.chatId == "MovieChat") {
              this.emojiChatList.unshift("AI:" + res.data.result);
            }
          });
        this.inputText = "";
      } catch (error) {
        console.error("error", error);
      }
    },
  },
});
</script>
