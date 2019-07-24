<template>
  <div>
    Admin page Test
    <div>
      {{ testData }}
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      testData: []
    };
  },
  mounted() {
    this.getPosts();
  },
  method: {
    async getPosts() {
      await axios.get("http://localhost:5000/api/admin");
    }
  }
};
</script>
