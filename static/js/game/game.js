$(function(){
    var score = {};
    fnAddFrame(0);
    $(document).ready( function(){
        $('#addFrame').prop('disabled', true);
    });

    $(document).on('change', 'select', function(){
console.log(this.name);
        var data = [];
        var lane_no = this.name.match(/f([0-9]+)/);
        var select_cnt = fnCountSelect(lane_no[1]);
        var ex = fnCountSelect(lane_no[1]);
        score[this.name] = parseInt(this.value); 
        score[this.name+"_dt"] = moment().format('YYYY-mm-DD hh:mm:ss');
        var select_num = $('td.f'+lane_no[1]+' > div > select').length;
        if ( lane_no[1] < 10){
            if(select_num < 2){ // frame 1 to 9
                console.log("select_num:"+select_num);
                fnAddSelect(lane_no[1],select_num);
            }else if (select_num == 2){ // frame 1 to 9
                if(this.value === ""){
                    $('#addFrame').prop('disabled', true);
                }else if(this.value >= 0) {
                    $('#addFrame').prop('disabled', false);
                }
            }
        }else if(select_num < 3){ // frame 10
            fnAddSelect(lane_no[1],select_num);
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
//        fnCalc();
//        fnShowScore();
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
        select.append('<option>');
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

    function fnAddSelect2(cnt){
        var select_cnt = fnCountSelect(cnt);
        var list = {};
        if ( select_cnt%2 == 1 ){
            list = {"0": "-", "1":"1", "2":"2", "3":"3", "4":"4", "5":"5", "6":"6", "7":"7", "8":"8","9":"9","10":"/"};
        }else{
            list = {"0": "G", "1":"1", "2":"2", "3":"3", "4":"4", "5":"5", "6":"6", "7":"7", "8":"8","9":"9","10":"X"};
        }
        if ( select_cnt < 20){
            $('.score > td.f'+(cnt+1)+' > div').append('<select class="custom-select" name="f'+(cnt+1)+'_'+(select_cnt%2)+'">');
            $('.score > td.f'+(cnt+1)+' > div > select[name="f'+(cnt+1)+'_'+(select_cnt%2)+'"]').append('<option>');
        }else if(select_cnt == 20){
            $('.score > td.f'+(cnt)+' > div').append('<select class="custom-select" name="f'+(cnt)+'_2">');
            $('.score > td.f'+(cnt)+' > div > select[name="f'+(cnt)+'_2"]').append('<option>');
        }
        $.each(list, function(key,val){
            if ( select_cnt < 20){
                $('.score > td.f'+(cnt+1)+' > div > select[name="f'+(cnt+1)+'_'+(select_cnt%2)+'"]').append('<option value="'+key+'">'+val);
            }else if(select_cnt == 20){
                $('.score > td.f'+cnt+' > div > select[name="f'+cnt+'_2"]').append('<option value="'+key+'">'+val);
            }
        });
    }

    function fnResetSelect(flame,shot){

    }

    function fnCountFrame(){
        return $("table#game > thead > tr > th").length;
    }

    function fnCountSelect(cnt){
        if ( cnt == undefined ) cnt = 0; 
        return $(".score select").length;
    }

    function fnCalc(){
console.log("--fnCalc---");
        $.each(score, function(k,v){
            var m = k.match(/^f([0-9]+)+\_[0-2]$/);
            var fr = (m) ? parseInt(m[1]) : null;
            if ( fr != undefined){
                if ( k.match(/f(\d+)\_0/) ){
                    if ( v == 10) { //strike
                        //if( score['f'+(fr+1)+'_0'] == 10 && score['f'+(fr+2)+'_0'] >= 0){ // XX(X|,|[0-9])
                        if( ('f'+(fr+1)+'_0' in score) && ('f'+(fr+2)+'_0' in score) && score['f'+(fr+1)+'_0'] == 10 ){ // XX(X|,|[0-9])
                            score['f'+fr+'_score'] = (v + score['f'+(fr+1)+'_0'] + score['f'+(fr+2)+'_0']);
console.log(1);
                        //}else if(score['f'+(fr+1)+'_1'] == 10) { // X([0-9])/
                        }else if(score['f'+(fr+1)+'_1'] == 10 && ('f'+(fr+1)+'_1' in score)) { // X([0-9])/
                            score['f'+fr+'_score'] = (v + score['f'+(fr+1)+'_1']);
console.log(2);
                        //}else if(score['f'+(fr+1)+'_1'] != 10 && score['f'+(fr+1)+'_1'] != 10) { // X([0-9])([0-9])
                        }else if(('f'+(fr+2)+'_0' in score) == false) { // X([0-9])([0-9])
                            if (('f'+(fr+1)+'_0' in score) && ('f'+(fr+1)+'_1' in score)){
                                if (score['f'+(fr+1)+'_0'] < 10 && score['f'+(fr+1)+'_1'] < 10){
                                    score['f'+fr+'_score'] = (v + score['f'+(fr+1)+'_0'] + score['f'+(fr+1)+'_1']);
console.log(3);
                                }
                            }
                        }
                    }
                }else if( k.match(/f(\d+)\_1/) ){
                    if (score['f'+fr+'_1'] == 10 && score['f'+(fr+1)+'_0'] >= 0){ // [0-9]/[0-10]
console.log(4);
                        score['f'+fr+'_score'] = (v + score['f'+(fr+1)+'_0']);
                    }else if(score['f'+fr+'_0'] != 10 && score['f'+fr+'_1'] >= 0 && score['f'+fr+'_1'] < 10){
console.log(5);
                        score['f'+fr+'_score'] = (v + score['f'+fr+'_1']);
                    }
                }
            }
        });
        console.log(score); 
    }

    function fnShowScore(){
        var sum = 0;
        for(var i=0; i< 10; i++){
            if( score['f'+i+'_score'] === 0 || score['f'+i+'_score'] > 0 ){
                    $('.summary td.f'+i+' > div').text( (sum + score['f'+i+'_score']) );
                    sum += score['f'+i+'_score'];
            }
        }
console.log(score);
    }
});
