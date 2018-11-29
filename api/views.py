from django.shortcuts import render
from django.http.response import JsonResponse
from django.views import View
import logging
import pprint
import json
from game.models import Game


# Create your views here.
class IndexView(View):
    def get(self, request, *args, **kwargs):
        #return self.render_json_response({'save': 'OK'})
        json_dict = {}
        json_dict["message"] = "Done"

        #return render(request, 'api/index.html', json_dict)
        return render(request, 'api/game/index.html', {'save': 'OK'})

index = IndexView.as_view()

class AddView(View):
    def post(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            # Do something for logged-in users.
            pprint.pprint("logged in")
        else:
            # Do something for anonymous users.
            pprint.pprint("not logged in")
        json_post = request.POST
        score = json.loads(json_post['score'])
        #cnt = Game.objects.all().count()
        new_dta = Game(user_id=request.user.id)
        for k in score.keys():
            setattr(new_dta, k, score[k])
        new_dta.save()
        return render(request, 'api/game/add.html', {'save': 'OK'})
        return JsonResponse(request.user)

add = AddView.as_view()

