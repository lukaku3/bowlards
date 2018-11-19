$(function(){
    var score = {};
    fnAddFrame(0);
    $(document).ready( function(){
        $('#addFrame').prop('disabled', true);
    });

    $(document).on('change', 'select', function(){
        var data = [];
        var lane_no = this.name.match(/f([0-9]+)/);
        var select_cnt = fnCountSelect(lane_no[1]);
        var ex = fnCountSelect(lane_no[1]);
        score[this.name] = parseInt(this.value); 
        score[this.name+"_dt"] = moment().format('YYYY-mm-DD hh:mm:ss');
        var select_num = $('td.f'+lane_no[1]+' > div > select').length;
        if ( lane_no[1] < 10){
            if(select_num < 2){ // frame 1 to 9
                fnAddSelect(lane_no[1],select_num);
            }else if (select_num == 2){ // frame 1 to 9
                if(this.value === ""){
                    $('#addFrame').prop('disabled', true);
                }else if(this.value >= 0) {
                    $('#addFrame').prop('disabled', false);
                }
            }
            if(this.name.match(/_+0$/) && this.value == 10){
                $('select[name="f'+lane_no[1]+'_1"]').val("0");
                score['f'+lane_no[1]+'_1'] = 0;
                score['f'+lane_no[1]+'_1'+"_dt"] = moment().format('YYYY-mm-DD hh:mm:ss');
                $('#addFrame').prop('disabled', false);
            }
        }else if(this.name.match(/^f10_0$/) && select_num < 2){ // frame 10
            fnAddSelect(lane_no[1],select_num);
            if (this.value == 10){
                fnAddSelect(lane_no[1],2);
            }
        }else if(this.name.match(/^f10_1$/) && select_num < 3){ // frame 10
            if (select_num == 2) fnAddSelect(lane_no[1],select_num);
        }
        if (('f10_0' in score) && ('f10_1' in score)){
           if(score['f10_0'] != 10 && score['f10_1'] != 10){
                $('select[name="f10_2"]').remove();
                delete score['f10_2'];
                delete score['f10_2_dt'];
            }else if(score['f10_0'] == 10 && this.name == "f10_1" && this.value != 10){
                $('select[name="f10_2"] option[value="10"]').text("/");
            }
        }else if(this.name == 'f10_0' && this.value == 10){
            $('select[name="f10_1"] option[value="10"]').text("X");
        }
        fnCalc(lane_no[1]);
        fnShowScore();
    });

    $("button.btn.btn-info").on("click", function(){
        var cnt = fnCountFrame();
        if ( cnt < 10 ) {
            fnAddFrame(cnt);
        }
    });

    function fnAddFrame(cnt){
        fnDisableSelect(cnt);
        fnAddHead(cnt);
        fnAddTd(cnt);
        fnAddScore(cnt);
        $('#addFrame').prop('disabled', true);
        fnAddSelect((cnt+1),0);
    };

    function fnDisableSelect(cnt){
        var el = document.querySelectorAll('div.f'+cnt+' > select');
        if ( el != undefined ) {
            for (var i=0; i<el.length; i++) {
                el[i].disabled = !el[i].disabled;
            }
        }
    }

    function fnAddHead(cnt){
        $(".table thead > tr").append('<th scope="col-sm">'+(cnt+1)+"</th>");
    }

    function fnAddTd(cnt){
        $(".table tbody > tr").append('<td scope="col" class="f'+(cnt+1)+'"></td>');
        $(".table tbody > tr.summary > td.f"+(cnt+1)).append('<div>');
    }

    function fnAddScore(cnt){
        $(".score > td.f"+(cnt+1)).append('<div class="col-sm input-group m-1 f'+(cnt+1)+'">');
        fnAddSelect(cnt);
    }

    function fnAddSelect(fr = 0,fno = -1, gt = -1){
        if (fr === 0 || fno == undefined || fno == -1 ) return true;
        var list = {"0": "G", "1":"1", "2":"2", "3":"3", "4":"4", "5":"5", "6":"6", "7":"7", "8":"8","9":"9","10":"X"};
        $('.score > td.f'+fr+' > div').append('<select class="custom-select" name="f'+fr+'_'+fno+'">');
        var select = $('.score > td.f'+fr+' > div > select[name="f'+fr+'_'+fno+'"]');
        select.append('<option value="">');
        $.each(list, function(k,v){
            if (fno == 1){
                if (k === "0") select.append('<option value="'+k+'">-');
                else if(k == 10) select.append('<option value="'+k+'">/');
                else select.append('<option value="'+k+'">'+v); 
            }else select.append('<option value="'+k+'">'+v); 
        });
        if ( fno == 1 && gt == 1) {
            select.val("0");
            score['f'+fr+'_'+fno] = 0;
            score['f'+fr+'_'+fno+"_dt"] = moment().format('YYYY-mm-DD hh:mm:ss');
            $('#addFrame').prop('disabled', false);
//            fnCalc();
        }
    }


    function fnCountFrame(){
        return $("table#game > thead > tr > th").length;
    }

    function fnCountSelect(cnt){
        if ( cnt == undefined ) cnt = 0; 
        return $(".score select").length;
    }

    function fnCalc(){
        $.each(score, function(k,v){
            var m = k.match(/^f([0-9]+)+\_[0-2]$/);
            var fr = (m) ? parseInt(m[1]) : null;
            if ( fr != undefined){
                if ( k.match(/f(\d+)\_0/) ){
                    if ( v == 10 && fr == 9) { //strike 9frame
                        if ( ('f'+(fr+1)+'_0' in score) && ('f'+(fr+1)+'_1' in score) && score['f'+(fr+1)+'_1'] != 10 && score['f'+(fr+1)+'_1'] == 10){ // X-/
                            score['f'+fr+'_score'] = (v + score['f'+(fr+1)+'_1']);
                        }else if ( ('f'+(fr+1)+'_0' in score) && ('f'+(fr+1)+'_1' in score) && score['f'+(fr+1)+'_0'] == 10){ // XX[0-10]
                            score['f'+fr+'_score'] = (v + score['f'+(fr+1)+'_0'] + score['f'+(fr+1)+'_1']);
                        }else if ( ('f'+(fr+1)+'_0' in score) && ('f'+(fr+1)+'_1' in score)){
                            if (score['f'+(fr+1)+'_0'] < 10 && score['f'+(fr+1)+'_1'] < 10){ // X[0-9][0-9]
                                score['f9_score'] = (v + score['f'+(fr+1)+'_0'] + score['f'+(fr+1)+'_1']);
                            }else if (score['f'+(fr+1)+'_0'] < 10 && score['f'+(fr+1)+'_1'] == 10){ // X[0-9]/
                                score['f9_score'] = (v + score['f'+(fr+1)+'_1']);
                            }
                        }
                    }else if ( v == 10) { //strike
                        if( ('f'+(fr+1)+'_0' in score) && ('f'+(fr+2)+'_0' in score) && score['f'+(fr+1)+'_0'] == 10 ){ // XX(X|,|[0-9])
                            score['f'+fr+'_score'] = (v + score['f'+(fr+1)+'_0'] + score['f'+(fr+2)+'_0']);
                        }else if(score['f'+(fr+1)+'_1'] == 10 && ('f'+(fr+1)+'_1' in score)) { // X([0-9])/
                            score['f'+fr+'_score'] = (v + score['f'+(fr+1)+'_1']);
                        }else if(('f'+(fr+2)+'_0' in score) == false) { // X([0-9])([0-9])
                            if (('f'+(fr+1)+'_0' in score) && ('f'+(fr+1)+'_1' in score)){
                                if (score['f'+(fr+1)+'_0'] < 10 && score['f'+(fr+1)+'_1'] < 10){
                                    score['f'+fr+'_score'] = (v + score['f'+(fr+1)+'_0'] + score['f'+(fr+1)+'_1']);
                                }
                            }
                        }
                    }
                }else if( k.match(/f(\d+)\_1/) ){
                    if (score['f'+fr+'_1'] == 10 && score['f'+(fr+1)+'_0'] >= 0){ // [0-9]/[0-10]
                        score['f'+fr+'_score'] = (v + score['f'+(fr+1)+'_0']);
                    }else if(score['f'+fr+'_0'] != 10 && score['f'+fr+'_1'] >= 0 && score['f'+fr+'_1'] < 10){
                        score['f'+fr+'_score'] = (v + score['f'+fr+'_0']);
                    }else if( ('f10_1' in score) && score['f10_0'] != 10){
                        score['f10_score'] = (score['f10_0'] + score['f10_1']); // [0-9][0-9]-
                    }
                }else if( k.match(/f10\_2/) ){
                    //}else if( ('f10_1' in score) && score['f10_0'] != 10 && score['f10_1'] == 10){
                    if( score['f10_0'] == 10 && score['f10_1'] == 10){
                        score['f10_score'] = (score['f10_0']+score['f10_1']+score['f10_2']);// XXX
                    }else if( score['f10_0'] != 10 && score['f10_1'] == 10){
                        score['f10_score'] = (score['f10_1']+score['f10_2']); // [0-9]/[0-10]
                    }else if( score['f10_0'] == 10 && score['f10_1'] < 10 && score['f10_2'] == 10){
                        score['f10_score'] = 20; // X[0-9]/
                    }else{
                        score['f10_score'] = (score['f10_0']+score['f10_1']+score['f10_2']);// G/[0-10]
                    }
                }
            }
        });
    }

    function fnShowScore(){
        var sum = 0;
        for(var i=1; i<= 10; i++){
            $('.summary td.f'+i+' > div').text('');
            if (score['f'+i+'_score'] === undefined) return true;
            if( score['f'+i+'_score'] === 0 || score['f'+i+'_score'] > 0 ){
                    $('.summary td.f'+i+' > div').text( (sum + score['f'+i+'_score']) );
                    sum += score['f'+i+'_score'];
            }
        }
    }
});
