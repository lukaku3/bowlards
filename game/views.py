from django.shortcuts import render
from django.views import View

# Create your views here.
class IndexView(View):
    def get(self, request, *args, **kwargs):
        context = {
            'msg': 'game/index'
        }
        return render(request, 'game/index.html', context)

index = IndexView.as_view()

class AddView(View):
    def get(self, request, *args, **kwargs):
        context = {
            'msg': 'game/index'
        }
        return render(request, 'game/add.html', context)

add = AddView.as_view()

class changeView(View):
    def get(self, request, *args, **kwargs):
        context = {
        }
        return render(request, 'game/index.html', context)
