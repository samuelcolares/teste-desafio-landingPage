const Main = {
    init: function () {
        this.cacheSelectors()
        this.bindEvents()
        this.loadProdutos(1)
    },
    cacheSelectors: function () {
        this.$cadastroForm = document.querySelector('.formContent_form')
        this.$produtosWrapper = document.querySelector('.products-wrapper')
        this.$buttonNext = document.querySelector('.next_btn')
        this.$buttonPrev = document.querySelector('.prev_btn')
        this.$newsLetterForm = document.querySelector('.newsletter_form')
    },
    bindEvents: function () {
        this.$cadastroForm.addEventListener('submit', this.Events.enviarF1.bind(this))
        this.$newsLetterForm.addEventListener('submit', this.Events.enviarF2.bind(this))
        this.$buttonNext.addEventListener('click',this.Events.proxPag.bind(this))
        this.$buttonPrev.addEventListener('click',this.Events.prevPag.bind(this))
    },
    loadProdutos: async function (numeroPagina) {
        const config = {
            headers: {
                Accept: 'Application/json',
            },
        }

        const response = await fetch(`https://frontend-intern-challenge-api.iurykrieger.vercel.app/products?page=${numeroPagina}`, config)
        const data = await response.json()
        this.outputProdutos(data)
    },
    outputProdutos: function (data) {
        const arrayProdutos = data.products

        this.$produtosWrapper.innerHTML = ''

        arrayProdutos.forEach(produto => {
            this.$produtosWrapper.innerHTML += `
        <div class="product">
        <img src="${produto.image}" alt="" class="product-image">
        <h4 class="product-name">${produto.name}</h4>
        <p class="product-description">${produto.description}</p>
        <p class="product-old-price">De: R$${produto.oldPrice},00</p>
        <p class="product-new-price">Por: R$${produto.price},00</p>
        <p class="product-split">ou ${produto.installments.count}x de R$${produto.installments.value.toString().replace('.', ',')}0</p>
        <button class="product-button" type="button">Comprar</button>
    </div>
        `
        })
    },
    count: 1,
    Events: {
        enviarF1: function (e) {
            e.preventDefault()
            let erro = false
            const nome = document.forms[0]['nome']
            const email = document.forms[0]['email']
            const cpf = document.forms[0]['cpf']
            const genre = document.forms[0]['genre']

            if (!nome.value || !isNaN(nome.value)) {
                erro = true
                nome.previousElementSibling.innerHTML = 'Preencha o nome corretamente'
                nome.classList.add('erroFormulario')

                setTimeout(() => {
                    nome.previousElementSibling.innerHTML = 'Nome:'
                }, 3000)
            } else {
                nome.classList.remove('erroFormulario')
            }

            if (!email.value) {
                erro = true
                email.previousElementSibling.innerHTML = 'Preencha o email corretamente'
                email.classList.add('erroFormulario')

                setTimeout(() => {
                    email.previousElementSibling.innerHTML = 'E-mail:'
                }, 3000)
            } else {
                email.classList.remove('erroFormulario')
            }

            if (!cpf.value || isNaN(cpf.value)) {
                erro = true
                cpf.previousElementSibling.innerHTML = 'Preencha o CPF corretamente (Apenas Números)'
                cpf.classList.add('erroFormulario')

                setTimeout(() => {
                    cpf.previousElementSibling.innerHTML = 'CPF:'
                }, 3000)
            } else {
                cpf.classList.remove('erroFormulario')
            }

            if (!genre.value) {
                erro = true
                genre.forEach(g => g.nextElementSibling.classList.add('erroFormulario'))
            } else {
                genre.forEach(g => g.nextElementSibling.classList.remove('erroFormulario'))
            }

            if (!erro) {
                this.$cadastroForm.classList.add('formularioEnviado')
                setTimeout(() => {
                    this.$cadastroForm.innerHTML = '<p>Obrigado por se cadastrar!!</p>'
                    this.$cadastroForm.classList.remove('formularioEnviado')
                    this.$cadastroForm.classList.add('obrigado')
                }, 1000)
            }
        },
        enviarF2: function (e) {
            e.preventDefault();
            let erro = false
            const nome = document.forms[1]['nome']
            const email = document.forms[1]['email']

            if (!nome.value || !isNaN(nome.value)) {
                erro = true
                nome.previousElementSibling.innerHTML = 'Preencha o nome corretamente'
                nome.classList.add('erroFormulario')

                setTimeout(() => {
                    nome.previousElementSibling.innerHTML = 'Nome:'
                }, 3000)
            } else {
                nome.classList.remove('erroFormulario')
            }

            if (!email.value) {
                erro = true
                email.previousElementSibling.innerHTML = 'Preencha o email corretamente'
                email.classList.add('erroFormulario')

                setTimeout(() => {
                    email.previousElementSibling.innerHTML = 'E-mail:'
                }, 3000)
            } else {
                email.classList.remove('erroFormulario')
            }

            if (!erro) {
                this.$newsLetterForm.classList.add('formularioEnviado')
                setTimeout(() => {
                    this.$newsLetterForm.innerHTML = '<p>Obrigado por nos compartilhar!!</p>'
                    this.$newsLetterForm.classList.remove('formularioEnviado')
                    this.$newsLetterForm.classList.add('obrigado')
                }, 1000)
            }
        },
        proxPag: function(){
            this.count++
            let contador = this.count
            if(!this.$buttonPrev.classList.contains('active')){
                this.$buttonPrev.classList.add('active')
                this.$buttonNext.innerText = 'Avançar'
            }
            if(contador>1){
                this.$buttonPrev.disabled = false
            }
            this.loadProdutos(contador)
        },
        prevPag: function(){
            this.count--
            let contador = this.count
            if(contador <= 1){
                contador = 1;
                this.$buttonPrev.disabled = 'true'
            }
            this.loadProdutos(contador)
        }
    }
}


Main.init()