<template>
  <div>....</div>
</template>

<script>
export default {
    mounted(){
        this.deslogar()
    },
    methods:{
        deslogar(){
            localStorage.removeItem("token")
            location.href = '/login'
        }
    }
}
</script>

<style>

</style>