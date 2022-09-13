<template>
  <tr>
    <td>
      {{ user.userId }}
    </td>
  </tr>
</template>
<script>
export default {
  name: 'user',
  props: {
    user: Object,
  },
};
</script>
<style></style>
