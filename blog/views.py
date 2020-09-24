from django.shortcuts import render, redirect
from django.urls import reverse
from django.contrib.auth.forms import UserCreationForm
from django.http import HttpResponse, HttpResponseRedirect
from django.core.mail import send_mail
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.views import View
from django.core import serializers
from .models import Instituicao, Pedido, Produto
from .forms import *
from django.contrib.auth.decorators import login_required

# Create your views here.
def index(request):
    return render(request, "index.html")

class Login(View):
    def get(self, request):
        if(request.user):
            return redirect("request")
        form =LoginForm()
        return render(request, 'login.html',{"form":form})

    def post(self, request):
        form = LoginForm(request.POST)
        if form.is_valid():
            formData = form.cleaned_data
            email = formData["email"]
            password = formData["password"]
            user = authenticate(request, username = email, password = password)
            if user is not None:
                login(request, user)
                return redirect('request')
            else:
                messages.warning(request, 'Email ou Password Invalida')
                return redirect('login')


class Register(View):
    def get(self, request):
        messages.warning(request, 'Erro no Registo')
        form = SignUpForm()
        return render(request, 'signup.html',{"form":form})

    def post(self, request):
        form = SignUpForm(request.POST)
        if form.is_valid():
            form.save()
            user = form.cleaned_data.get('username')
            email = form.cleaned_data.get('email')
            '''   REVER COMO O ENVIO DE EMAIL FUNCIONA QUE ESTA A DAR ERRO
            send_mail(
                'Pedido de Registo',
                'O utilizador <str: user> com o email <str: email> pretende criar conta em Ponto Vermelho.',
                'joaobernardo.domingues@gmail.com',
                ['joaobndomingues@gmail.com'],
            )
            '''
            return redirect('login')
            #return HttpResponseRedirect(reverse('blog: login'))
        else:
            print(form.errors)
            messages.warning(request, 'Erro no Registo')
            return redirect('signup')
        #return HttpResponse('Pagina de Registo para a instituição')


@login_required
def request_view(request):
    query = Produto.objects.all()
    query_json = serializers.serialize("json",query)
    print(query_json)
    return render(request, "request.html",{"products": query, "productsJSON":query_json})

def personId(request):
    return render(request, "blog/personId.html")

class RecipientInfo(View):
    def get(self, request):
        return render(request, 'blog/recipient.html')

    def post(self, request):
        equipa = request.user.username
        instituicao = request.user.instituicao
        nomeBenefeciario = request.POST['nomeBenefeciario']
        nomeTecnico = request.POST['nomeTecnico']
        cartaoCidadao = request.POST['cartaoCidadao']
        telefone = request.POST['telefone']
        #sexo = request.POST['sexo']
        #idade = request.POST['idade']
        numeroElementosAgregado = request.POST['numeroElementosAgregado']


class Order(View):
    def get(self, request):
        form = ProdutoPedir()
        query = Produto.objects.all()
        return render(request, 'blog/order.html',{"form":form, 'products':query})

    def post(self, request):
        #produto = request.POST['produto']
        #quantidade = request.POST['quantidade']
        form = ProdutoPedir(request.POST)
        if form.is_valid():
            cartaoCidadao = form.cleaned_data['cartaoCidadao']
            print(cartaoCidadao)
            return redirect("login")
        else:
            return HttpResponse(form)


class OrderPage(View):
    def get(self, request):
        user = request.user
        orders = Pedido.objects.filter(equipa = user)
        return render(request, 'blog/orderpage.html', {'orders': orders, 'loginUser': user})

'''
def orderPage(request):
    return HttpResponse('Pagina com o estado de todos os pedidos')
'''

def signOut(request):
    logout(request)
    return redirect('login')


def ajuda(request):
    return HttpResponse('nada')
