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

class SignUpForm(UserCreationForm):
    class Meta:
        model = Instituicao
        fields = [
        'username',
        'instituicao',
        'publicoAlvo',
        'areaGeografica',
        'telefone',
        'email',
        'password1',
        "password2",
        ]


class LoginForm(forms.Form):
    email = forms.EmailField(max_length = 50)
    password = forms.CharField(widget = forms.PasswordInput)


requestTypeChoices = (
    ("intern", "intern"),
    ("individual", "individual"),
    ("multiple", "multiple"),
)

class RequestForm(forms.Form):
    requestType = forms.CharField()
    peopleInfo = forms.CharField(required=False)
    requestInfo = forms.CharField()
    numPeople = forms.IntegerField(max_value = 8)


