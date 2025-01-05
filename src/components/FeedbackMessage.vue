<template>
  <p :class="['feedback', type]">{{ message }}</p>
</template>

<script>
export default {
  props: {
    message: { type: String, required: true },
    type: { type: String, default: "success" }, // "error" or "success"
  },
};
</script>
