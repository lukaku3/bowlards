from django.shortcuts import render
from django.http.response import JsonResponse
from django.views import View
import json
import logging
import pprint
import pytz
import re
from game.models import Game
#import pymysql.cursors

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
            ret = self.saveGame(request, json.loads(request.POST['score']))
            return JsonResponse(ret)
        else:
            # Do something for anonymous users.
            pprint.pprint("not logged in")
            return JsonResponse({'message': 'NG'})

    def saveGame(self,request, score):
        new_dta = Game(user_id=request.user.id)
        msg = 'NG'
        for k in score.keys():
            if ( re.match(r'dt',k) ):
#                self.fmtDt(score[k])
                pprint.pprint( k )
                #pprint.pprint( score[k] )
                #setattr(new_dta, k, self.fmtDt(score[k]) )
            else:
                pprint.pprint( k )
                setattr(new_dta, k, score[k])
        try:
            new_dta.save()
            last_id = Game.objects.latest('id')
            if ( 'id' in score):
                msg = 'UPDATED'
            else:
                msg = 'REGISTED'
            return {'message': msg, 'id': last_id.id}
        except:
            return {'message': 'UNEXCEPT ERROR', "Unexpected error": sys.exc_info()[0]}
        
    def fmtDt(self, dt):
        pprint.pprint(str(dt))
#        jst = pytz.timezone('Asia/Tokyo')
#        date,time = str.split(" ")
#        pprint.pprint(date)
#        pprint.pprint(time)
#        loc_dt = eastern.localize(datetime(2002, 10, 27, 6, 0, 0))

add = AddView.as_view()

