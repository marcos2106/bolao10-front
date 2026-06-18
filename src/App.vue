<template>
  <router-view></router-view>
</template>

<script>
export default {
}
</script>

<style>
/* Cores das bordas dos níveis de usuário */
.fundo-sem-nivel,
.fundo-amador,
.fundo-juvenil,
.fundo-profissional,
.fundo-beteiro,
.fundo-lenda {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 38px;
  min-height: 34px;
  border-radius: 8px;
}

.fundo-sem-nivel,
.borda-sem-nivel {
  --nivel-color: transparent;
  --nivel-rgb: 0, 0, 0;
}

.fundo-amador,
.borda-amador {
  --nivel-color: #4b5563;
  --nivel-rgb: 75, 85, 99;
}

.fundo-juvenil,
.borda-juvenil {
  --nivel-color: #7c2d12;
  --nivel-rgb: 124, 45, 18;
}

.fundo-profissional,
.borda-profissional {
  --nivel-color: #b91c1c;
  --nivel-rgb: 29, 78, 216;
}

.fundo-beteiro,
.borda-beteiro {
  --nivel-color: #1d4ed8;
  --nivel-rgb: 185, 28, 28;
}

.fundo-lenda,
.borda-lenda {
  --nivel-color: #ca8a04;
  --nivel-rgb: 202, 138, 4;
}

.fundo-amador,
.fundo-juvenil,
.fundo-profissional,
.fundo-beteiro,
.fundo-lenda {
  background: linear-gradient(90deg,
    rgba(var(--nivel-rgb), 0.38) 0%,
    rgba(var(--nivel-rgb), 0.26) 30%,
    rgba(var(--nivel-rgb), 0.14) 68%,
    rgba(var(--nivel-rgb), 0) 100%);
  box-shadow: inset 4px 0 0 rgba(var(--nivel-rgb), 0.52);
}

.fundo-sem-nivel {
  background: transparent;
  box-shadow: none;
}

.borda-sem-nivel,
.borda-amador,
.borda-juvenil,
.borda-profissional,
.borda-beteiro,
.borda-lenda {
  padding: 0;
  border: 1px solid var(--nivel-color) !important;
  box-shadow: 0 1px 4px rgba(15, 23, 42, 0.22);
}

.borda-sem-nivel {
  border-color: transparent !important;
  box-shadow: none;
}
</style>
