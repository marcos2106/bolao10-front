<template>
    <div>
        <base-header class="pb-1">
            <div class="row align-items-center py-4">
                <div class="col-lg-6 col-7">
                    <h6 class="h2 text-white d-inline-block mb-0">Regra</h6>
                </div>
            </div>
        </base-header>

        <div class="container-fluid mt--6">
            <card>
                <h2 slot="header" class="mb-0">Regra</h2>
                <h5 slot="header" class="mb-0">Descrição das regras e regulamento do nosso Bolão</h5>
                <div class="row">
                    <div class="col-10">
                        REGRA do bolão 10 istoria do bolão 10 istoria do bolão 10 istoria do bolão 10 istoria do bolão 10 istoria do bolão 10 istoria do bolão 10 istoria do bolão 10 istoria do bolão 10 istoria do bolão 10 istoria do bolão 10 istoria do bolão 10 istoria do bolão 10 istoria do bolão 10 istoria do bolão 10 <br />
                        <br />
                        REGRA do bolão 10 istoria do bolão 10 istoria do bolão 10 istoria do bolão 10 istoria do bolão 10 istoria do bolão 10 istoria do bolão 10 istoria do bolão 10 istoria do bolão 10 istoria do bolão 10 istoria do bolão 10 istoria do bolão 10 istoria do bolão 10 istoria do bolão 10 istoria do bolão 10 <br />
                        <br />
                        REGRA do bolão 10 istoria do bolão 10 istoria do bolão 10 istoria do bolão 10 istoria do bolão 10 istoria do bolão 10 istoria do bolão 10 istoria do bolão 10 istoria do bolão 10 istoria do bolão 10 istoria do bolão 10 istoria do bolão 10 istoria do bolão 10 istoria do bolão 10 istoria do bolão 10 <br />
                        <br />
                        <a name=pagamento></a>
                        Para <strong>fazer pagamento</strong> e, assim, participra do nosso bolão, basta fazer o PIX para a chave:<br/>
                        <strong>PIX: 72370041153 (CPF)</strong><br/>
                        R$ 75,00 (Setenta e cinco reais)<br/>
                        (Marcos Coimbra Osorio)<br/>
                        <br/>
                        Enviar o comprovante para os organizadores do bolão.<br/>


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
