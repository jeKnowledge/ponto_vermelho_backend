from django.shortcuts import render, redirect
from django.urls import reverse
from django.contrib.auth.forms import UserCreationForm
from django.http import HttpResponse, HttpResponseRedirect
from django.core.mail import send_mail
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.views import View
from django.core import serializers
from .models import Instituicao, Pedido, Produto, RequestedPerson, RequestedProduct
from .forms import *
from django.contrib.auth.decorators import login_required

# Create your views here.
def index(request):
    return render(request, "index.html")

class Login(View):
    def get(self, request):
        print(request.user.is_authenticated)
        if request.user.is_authenticated:
            return redirect("personal") #---------------- AQUI ALTEREI PARA PERSONAL! ERA REQUEST
        form =LoginForm()
        return render(request, "login.html",{"form":form})

    def post(self, request):
        form = LoginForm(request.POST)
        if form.is_valid():
            formData = form.cleaned_data
            email = formData["email"]
            password = formData["password"]
            user = authenticate(request, username = email, password = password)
            if user is not None:
                login(request, user)
                return redirect('personal') #---------------- AQUI ALTEREI PARA PERSONAL! ERA REQUEST
            else:
                messages.warning(request, 'Email ou Password Invalida')
                return redirect('login')


class Register(View):
    def get(self, request):
        if request.user.is_authenticated:
            return redirect("personal") #---------------- AQUI ALTEREI PARA PERSONAL! ERA REQUEST
        #messages.warning(request, 'Erro no Registo')
        #print("publico alvo", publico_alvo)
        form = SignUpForm()
        return render(request, 'signup.html',{"form":form})

    def post(self, request):
        form = SignUpForm(request.POST)
        if form.is_valid():
            instance = form.save(commit=False)
            user = form.cleaned_data.get('username')
            email = form.cleaned_data.get('email')
            if(instance.publicoAlvo == "Outros"):

                instance.publicoAlvo = request.POST.get('publicKind')
            instance.save()
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
            messages.error(request, 'Erro no Registo')
            return redirect('signup',{"form":form})
        #return HttpResponse('Pagina de Registo para a instituição')


@login_required
def request_view(request):
    query = Produto.objects.all()
    query_json = serializers.serialize("json",query)
    formData = {}

    if not request.user.aceite:
        messages.error(request, 'Não autorizado')
        return redirect("personal")


    form = RequestForm()
    if request.method == 'POST':
        print(request.POST)
        form = RequestForm(request.POST)
        if form.is_valid():
            formData = form.cleaned_data
            print(formData)
            peopleObjects = []
             #DATA VALIDATION
            if(formData["requestType"] != "intern"):
                #NEED TO ADD PEOPLE
                peopleInfo = formData["peopleInfo"].split("/")
                if(formData["requestType"] == "individual" and len(peopleInfo) != 1):
                    print("ERRO QUANTAS PESSOAS")
                    return
                # ERRO

                for person in peopleInfo:
                    personData = person.split(",")
                    name1 = personData[0]
                    name2 = personData[1]
                    cc = int(personData[2])
                    phoneNumber = int(personData[3].replace(" ", ""))
                    queryPerson = RequestedPerson.objects.filter(cartaoCidadao=cc)
                    if(queryPerson):
                        # NEED TO CHECK IF ANY REQUEST FOR 6 MONTHS
                        person = queryPerson[0]
                        pass
                    else:
                        # NEED TO CREATE OBJECT
                        person = RequestedPerson(nomeBeneficiario=name2, nomeTecnico=name1, cartaoCidadao=cc, telefone=phoneNumber)
                    peopleObjects.append(person)

            # VALIDATE PRODUCTS
            productsInfo = formData["requestInfo"].split("/")
            productObjects = []
            for product in productsInfo:
                productData = product.split(",")
                productName = productData[0]
                quantity = int(productData[1])
                typeSize = productData[2]
                productSize = productData[3]

                productQuery= Produto.objects.get(tipoProduto=productName)

                if(quantity > productQuery.quantidadeMaxima):
                    #erro
                    print("ERRO QUANTIDADE")
                    return

                if(productQuery.tamanhosPossiveis):
                    # NAO TEM TYPESIZE
                    if(productSize not in productQuery.tamanhosPossiveis):
                        # ERRO
                        print("ERRO TAMANHO POSSIVEl")
                        return
# TUDO PERFEITO     
                    newProductRequested = RequestedProduct(produto=productQuery, tamanho=productSize,quantidade=quantity)
                    productObjects.append(newProductRequested)
                else:
                    # TEM TYPE SIZE
                    print(typeSize)
                    print(productQuery.tamanhosPossiveisAdulto)
                    if(typeSize == "Criança" and productSize in productQuery.tamanhosPossiveisCriança):
                        # PERFEITO
                        newProductRequested = RequestedProduct(produto=productQuery, tamanho="Criança - "+productSize,quantidade=quantity)
                        productObjects.append(newProductRequested)
                    elif(typeSize == "Adulto" and productSize in productQuery.tamanhosPossiveisAdulto):
                        newProductRequested = RequestedProduct(produto=productQuery, tamanho="Adulto - " + productSize,quantidade=quantity)
                        productObjects.append(newProductRequested)
                    else:
                        print("ERRO TAMANHOS TIPO")
                        return
                        #return

                    # CHEGOU AQUI PEDIDO VALIDO
                    for obj in productObjects:
                        obj.save()
                    for obj in peopleObjects:
                        obj.save()

                    if(formData["requestType"] == "intern"):
                        newRequest = Pedido(
                            tipoPedido="Requisição interna",
                            equipa=request.user,
                        )
                        newRequest.save()
                        for obj in productObjects:
                            newRequest.listProducts.add(obj)
                    if(formData["requestType"] == "individual"):
                        newRequest = Pedido(
                            tipoPedido="Individual",
                            equipa=request.user,
                        )
                        newRequest.save()
                        for obj in productObjects:
                            newRequest.listProducts.add(obj)
                        for obj in peopleObjects:
                            newRequest.listPeople.add(obj)
                    if(formData["requestType"] == "multiple"):
                        newRequest = Pedido(
                            tipoPedido="Agregado",
                            equipa=request.user,
                        )
                        newRequest.save()
                        for obj in productObjects:
                            newRequest.listProducts.add(obj)
                        for obj in peopleObjects:
                            newRequest.listPeople.add(obj)

        else:
            print(form.errors)
    print(query[0].tamanhosPossiveisAdulto, "***********************")
    print(range(query[0].quantidadeMaxima + 1))
    print(query);
    return render(request, "request.html",{"products": query, "productsJSON":query_json, "form": form, "tamanhos": query[0].tamanhosPossiveisAdulto.split(","), "range": range(1, query[0].quantidadeMaxima + 1)})

@login_required
def personal_view(request):
    query = Pedido.objects.filter(equipa=request.user).order_by("-createdAt")
    return render(request, "personal.html", {"user": request.user, "requests": query})

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
    return redirect('index')


def ajuda(request):
    return HttpResponse('nada')
