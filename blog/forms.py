from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import Instituicao, Pedido, Produto


publico_alvo = [
    ["população sem abrigo", "população sem abrigo"],
    ["beneficiários do Rendimento Social de Inserção", "beneficiários do Rendimento Social de Inserção"],
    ["grávidas em situação de risco", "grávidas em situação de risco"],
    ["vítimas de violência doméstica", "vítimas de violência doméstica"],
    ["outros", "outros"]
]

class InstituicaoRegisterForm(UserCreationForm):
    #publicoAlvo = forms.CharField(label = "Publico Alvo", widget = forms.Select(choices = publico_alvo))
    class Meta:
        model = Instituicao
        fields = [#'nomeEquipa',
        'username',
        'instituicao',
        'publicoAlvo',
        'areaGeografica',
        'telefone',
        'email',
        'password1',
        'password2'
        ]


class InstituicaoLoginForm():
    email = forms.EmailField(max_length = 100)
    password = forms.CharField(widget = forms.PasswordInput)

    class Meta:
        model = Instituicao
        fields = [
            'email',
            'password'
        ]


class ProdutoPedir(forms.Form):
    cartaoCidadao = forms.CharField( max_length=100)
    produto = forms.CharField( max_length=100)
    '''
    class Meta:
        model = Produto
        fields = [
            ''
        ]
        '''