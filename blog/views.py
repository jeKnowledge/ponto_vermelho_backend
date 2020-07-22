from django.shortcuts import render, redirect
from django.urls import reverse
from django.contrib.auth.forms import UserCreationForm
from django.http import HttpResponse, HttpResponseRedirect
from django.core.mail import send_mail
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.views import View
from .models import Instituicao, Pedido, Produto
from .forms import InstituicaoRegisterForm, ProdutoPedir

# Create your views here.
class Login(View):
    def get(self, request):
        return render(request, 'blog/login.html')

    def post(self, request):
        email = request.POST['email']
        password = request.POST['password']
        user = authenticate(request, username = email, password = password)
        if user is not None:
            login(request, user)
            return redirect('order_page')
        else:
            messages.warning(request, 'Email ou Password Invalida')
            return redirect('login')

        '''
        return HttpResponse('Pagina Log In Com a informaçao de bem vindo')
        if request.method == 'POST':
            form = UserCreationForm(request.POST)
        '''

class Register(View):
    def get(self, request):
        return render(request, 'blog/register.html')

    def post(self, request):
        if request.method == 'POST':
            form = InstituicaoRegisterForm(request.POST)
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
            form = InstituicaoRegisterForm()
            return render(request, 'blog/register.html', {'form': form})
        #return HttpResponse('Pagina de Registo para a instituição')


def typeOrder(request):
    return render(request, "blog/typeOrder.html")

class RecipientInfo(View):
    def get(self, request):
        return render(request, 'blog/recipient.html')

    def post(self, request):
        instituicao = Instituicao.objects.get(instituicao = instituicao)
        nomeBenefeciario = request.POST['nomeBenefeciario']
        nomeTecnico = request.POST['nomeTecnico']
        cartaoCidadao = request.POST['cartaoCidadao']
        telefone = request.POST['telefone']
        sexo = request.POST['sexo']
        idade = request.POST['idade']
        numeroElementosAgregado = request.POST['numeroElementosAgregado']


class Order(View):
    def get(self, request):
        form = ProdutoPedir()
        return render(request, 'blog/order.html',{"form":form})

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




'''
class OrderPage(View):
    def get(self, request):
        return HttpResponse('Pagina com o estado de todos os pedidos')
'''

def orderPage(request):
    return HttpResponse('Pagina com o estado de todos os pedidos')

def signOut(request):
    logout(request)
    return redirect('login')


def ajuda(request):
    return HttpResponse('nada')
