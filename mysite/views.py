from django.http import HttpResponse
from django.template import loader

def home(request):
    tmpl = loader.get_template("home.html")
    return HttpResponse(tmpl.render())
