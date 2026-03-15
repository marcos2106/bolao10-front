<template>
  <span class="user-name-badges">
    <!-- Nome do usuário -->
    <span class="user-nome">{{ nome }}</span>
    <!-- Badges antes do nome (mini ícones coloridos) -->
    <el-tooltip
      v-for="badge in badges"
      :key="badge.id"
      :content="badge.nome + ': ' + badge.descricao"
      placement="top"
      effect="dark"
    >
      <span
        class="badge-icon"
        :style="{ backgroundColor: badge.corFundo, color: badge.corIcone }"
      >
        <i :class="badge.iconeClasse"></i>
      </span>
    </el-tooltip>
  </span>
</template>

<script>
export default {
  name: 'UserNameBadges',
  props: {
    /** Nome do usuário a ser exibido */
    nome: {
      type: String,
      required: true
    },
    /**
     * Lista de badges ativos do usuário.
     * Cada badge deve ter: { id, nome, descricao, iconeClasse, corFundo, corIcone }
     */
    badges: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style scoped>
.user-name-badges {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  flex-wrap: nowrap;
}

.badge-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  font-size: 9px;
  flex-shrink: 0;
  cursor: default;
  box-shadow: 0 1px 3px rgba(0,0,0,0.3);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.badge-icon:hover {
  transform: translateY(-3px) scale(1.2);
  box-shadow: 0 4px 10px rgba(0,0,0,0.35);
}

.user-nome {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 3px;
}
</style>
