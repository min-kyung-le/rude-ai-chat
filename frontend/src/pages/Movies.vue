<template>
  <div>
    <h1>영화 목록</h1>
    <div v-for="movie in movies" :key="movie.id">
      <img v-bind:src="movie.poster" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  mounted() {
    this.getMovies();
  },
  data() {
    return {
      movies: [
        {
          id: Number,
          name: String,
          year: Number,
          director: String,
          poster: String,
        },
      ],
    };
  },
  methods: {
    getMovies(): object {
      return this.$http.get("/api/movies").then((response) => {
        this.movies = response.data;
      });
    },
  },
});
</script>

<style lang="" scoped></style>
