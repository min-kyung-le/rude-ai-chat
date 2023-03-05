<template>
  <div>
    <h1>영화 목록</h1>
    <div v-for="movie in movies" :key="movie.id" class="movies">
      <img
        :src="movie.poster"
        :alt="movie.name"
        @click="movieInfo(Number(movie.id))"
      />
    </div>
    <h1>상세 정보</h1>
    <div>제목 : {{ moviesInfo.name }}</div>
    <div>년도 : {{ moviesInfo.year }}</div>
    <div>배우 : {{ moviesInfo.director }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  mounted() {
    this.movieInfo(1);
    this.getMovies();
  },
  data() {
    return {
      moviesInfo: {
        id: Number,
        name: String,
        year: Number,
        director: String,
        poster: String,
      },
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
    movieInfo(id: number): object {
      return this.$http.get("/api/movies/" + id).then((response) => {
        this.moviesInfo = response.data[0];
      });
    },
    getMovies(): object {
      return this.$http.get("/api/movies").then((response) => {
        this.movies = response.data;
      });
    },
  },
});
</script>

<style scoped>
.movies {
  display: inline-block;
  margin: 0 25px 0 0;
}
.movies img {
  width: 210px;
  height: 300px;
}
</style>
