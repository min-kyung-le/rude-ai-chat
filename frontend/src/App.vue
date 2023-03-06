<template>
  <v-app id="inspire">
    <v-app-bar class="bg-teal-lighten-4" flat>
      <v-container class="fill-height d-flex align-center">
        <v-icon class="mr-5">mdi-chat</v-icon>

        <div>
          {{ title }}
        </div>
      </v-container>
    </v-app-bar>

    <v-main class="bg-teal-darken-1">
      <v-container>
        <v-row>
          <v-col cols="3">
            <v-sheet rounded="lg">
              <v-list rounded="lg" class="bg-teal-lighten-4">
                <v-list-item
                  v-for="link in links"
                  :key="link.id"
                  variant="text"
                  @click="setPage(link)"
                  link
                >
                  <v-list-item-title class="text-body-2">
                    {{ link.name }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-sheet>
          </v-col>

          <v-col>
            <v-sheet class="bg-teal-lighten-4 chat-sheet" rounded="lg">
              <ChatSheet :chatId="chatId" />
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ChatSheet from "@/pages/ChatSheet.vue";

export default defineComponent({
  components: {
    ChatSheet,
  },
  data: () => ({
    title: "예의바른 버전",
    chatId: "KindChat",
    links: [
      {
        name: "예의바른 버전",
        id: "KindChat",
      },
      {
        name: "4가지없는 버전",
        id: "RudeChat",
      },
      {
        name: "이모티콘으로 대답하는 버전",
        id: "EmojiChat",
      },
    ],
  }),
  methods: {
    setPage(obj: { name: string; id: string }): void {
      this.title = obj.name;
      this.chatId = obj.id;
    },
  },
});
</script>
<style scoped>
.chatbg {
  height: 100%;
}
</style>
