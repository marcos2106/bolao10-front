<template>
  <router-view></router-view>
</template>

<script>
export default {
}
</script>

<style>
/* Cores das bordas dos níveis de usuário */
.borda-amador       { border: 2px solid #575757 !important; padding: 1px; }
.borda-juvenil      { border: 2px solid #643030 !important; padding: 1px; }
.borda-profissional { border: 2px solid #28378f !important; padding: 1px; }
.borda-beteiro      { border: 2px solid #9e0f0f !important; padding: 1px; }
.borda-lenda        { border: 2px solid #ecc517 !important; padding: 1px; }
.fundo-amador       { border-radius: 15%; background: linear-gradient(to right, rgba(151, 151, 151, 0.3) 10%, transparent 60%); }
.fundo-juvenil      { border-radius: 15%; background: linear-gradient(to right, rgb(100, 48, 48, 0.3) 10%, transparent 60%); }
.fundo-profissional { border-radius: 15%; background: linear-gradient(to right, rgb(40, 55, 143, 0.3) 10%, transparent 60%); }
.fundo-beteiro      { border-radius: 15%; background: linear-gradient(to right, rgba(235, 44, 44, 0.3) 10%, transparent 60%); }
.fundo-lenda        { border-radius: 15%; background: linear-gradient(to right, rgb(236, 197, 23, 0.3) 10%, transparent 60%); }
</style>
