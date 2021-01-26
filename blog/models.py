from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.html import format_html


publico_alvo = [
    ["População sem abrigo", "População sem abrigo"],
    ["Beneficiários do Rendimento Social de Inserção", "Beneficiários do Rendimento Social de Inserção"],
    ["", "Grávidas em situação de risco"],
    ["", ""],
    ["Outros", "Outros"]
]


class Instituicao(AbstractUser):
    #class Publico(models.TextChoices): <----- isto seria para usar se metesse o choices mas ainda estou a ver o que utilizar

    #nomeEquipa = models.CharField(max_length = 100, unique = True) <-------- username
    instituicao = models.CharField(max_length = 100, verbose_name = "Instituição")
    publicoAlvo = models.CharField(max_length = 100, default = "população sem abrigo", verbose_name = "Publico Alvo")
    areaGeografica = models.CharField(max_length = 300, verbose_name = "Área Geográfica")
    telefone = models.IntegerField(unique = True)
    email = models.EmailField(max_length = 300, unique = True)
    aceite = models.BooleanField(default = False) #campo para ser aceite pelo admin para poder utilziar a conta

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'instituicao', 'publicoAlvo', 'areaGeografica', 'telefone']

    class Meta:
        verbose_name = "Equipa"
        verbose_name_plural = "Equipas"

    def __str__(self):
        return self.instituicao


class Produto(models.Model):
    tipoProduto = models.CharField(unique = True, max_length = 150, verbose_name = "Tipo de Produto")
    quantidadeMaxima = models.IntegerField(verbose_name = "Quantidade Maxima")
    tamanhosPossiveisAdulto = models.CharField(max_length = 300, null=True, blank=True, verbose_name = "Tamanhos Adulto")
    tamanhosPossiveisCriança = models.CharField(max_length = 300, null=True, blank=True, verbose_name = "Tamanhos Criança")
    tamanhosPossiveis = models.CharField(max_length = 300, default = '', null=True, blank=True, verbose_name = "Tamanhos(não roupa)")
    #quantidadeDisponivel = models.IntegerField()

    def __str__(self):
        return self.tipoProduto



numeroElementos = [
    ["1", 1],
    ["2", 2],
    ["3", 3],
    ["4", 4],
    ["5", 5],
    ["6", 6]
]

tiposPedidos = [
    ["Requisição interna", "Requisição interna"],
    ["Individual", "Individual"],
    ["Agregado", "Agregado"]
]

estadoPedidos = [
    ["Recebido", "Recebido"],
    ["Em preparação", "Em preparação"],
    ["A aguardar stock", "A aguardar stock"],
    ["Pronto a levantar", "Pronto a levantar"],
    ["Recolhido", "Recolhido"]
]

class RequestedProduct(models.Model):
    produto = models.ForeignKey(Produto, on_delete = models.CASCADE)
    tamanho = models.CharField(max_length = 10, default = "30")
    quantidade = models.IntegerField(default = 1)

    def __str__(self):
        return "\n\n" + str(self.produto) +"\n- Tamanho: "+ self.tamanho +"\n    - Quantidade: "+ str(self.quantidade)

class RequestedPerson(models.Model):
    nomeBeneficiario = models.CharField(max_length = 100)
    nomeTecnico = models.CharField(max_length = 100)
    cartaoCidadao = models.IntegerField(unique = True)
    telefone = models.IntegerField(unique = False)

    def __str__(self):
        return "\n" + self.nomeBeneficiario + " - " + str(self.cartaoCidadao)

class Pedido(models.Model):
    #produto = models.CharField(max_length = 3000, default = "")
    numPeople = models.IntegerField(default = 1, verbose_name="Número de Pessoas")
    estadoPedido = models.CharField(max_length = 50, choices = estadoPedidos, default = "Recebido", verbose_name = "Estado do Pedido")
    tipoPedido = models.CharField(max_length = 50, choices = tiposPedidos, default = "Individual", verbose_name = "Tipo de Pedido")
    equipa = models.ForeignKey(Instituicao, on_delete=models.CASCADE) # <-----------Aqui a instituicao sera aquela em q esta feito o login!!!!
    listProducts = models.ManyToManyField(RequestedProduct, related_name="products", verbose_name = "Lista de Produtos")
    listPeople = models.ManyToManyField(RequestedPerson, related_name="people", blank=True, verbose_name = "Lista de Pessoas")
    createdAt = models.DateTimeField(auto_now_add=True)
    #numeroElementosAgregado = models.IntegerField(default = 1) #  <------- ADICIONEI AGR! UMA DAS ALTERAÇOES NECESSARIAS

    """
    sexo = models.CharField(max_length = 30)
    idade = models.IntegerField()
    numeroElementosAgregado = models.CharField(max_length = 2, choices = numeroElementos, default = '0')
    """

    def __str__(self):
        return self.estadoPedido + " - " + str(self.equipa)

