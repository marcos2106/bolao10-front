<template>
    <div>
        <base-header class="pb-1">
            <div class="row align-items-center py-4">
                <div class="col-lg-6 col-7">
                    <h6 class="h2 text-white d-inline-block mb-0">História</h6>
                </div>
            </div>
        </base-header>

        <div class="container-fluid mt--6">
            <card>
                <h2 slot="header" class="mb-0">História</h2>
                <h5 slot="header" class="mb-0">Pequeno resumo de toda a história do nosso Bolão</h5>
                <div class="row">
                    <div class="col-10">
                        Historia do bolão 10 istoria do bolão 10 istoria do bolão 10 istoria do bolão 10 istoria do bolão 10 istoria do bolão 10 istoria do bolão 10 istoria do bolão 10 istoria do bolão 10 istoria do bolão 10 istoria do bolão 10 istoria do bolão 10 istoria do bolão 10 istoria do bolão 10 istoria do bolão 10 <br />
                        <br />
                        Historia do bolão 10 istoria do bolão 10 istoria do bolão 10 istoria do bolão 10 istoria do bolão 10 istoria do bolão 10 istoria do bolão 10 istoria do bolão 10 istoria do bolão 10 istoria do bolão 10 istoria do bolão 10 istoria do bolão 10 istoria do bolão 10 istoria do bolão 10 istoria do bolão 10 <br />
                        <br />
                        Historia do bolão 10 istoria do bolão 10 istoria do bolão 10 istoria do bolão 10 istoria do bolão 10 istoria do bolão 10 istoria do bolão 10 istoria do bolão 10 istoria do bolão 10 istoria do bolão 10 istoria do bolão 10 istoria do bolão 10 istoria do bolão 10 istoria do bolão 10 istoria do bolão 10 <br />
                    </div>
                </div>
            </card>
        </div> <!--- fecha conteudo -->
    </div>
</template>

<script>
export default {
    data() {
        return {
            user:{
                password : null
            }
        };
    },
    methods:{
        changePasswd(){
            this.$clubApi.post('/user/update/passwd',{
                passwd : this.user.password
            })
            .then((response) => {
                this.$notify({type: 'success', message: "Atualização realizada"})
            }) .catch((error) => {
                this.$notify({type: 'warning', message: error.response.data.msg})
            }).finally(() =>{
                NProgress.done() 
            })
        }
    }
}
</script>

<style>

</style>
