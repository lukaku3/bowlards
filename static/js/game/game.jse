$(function(){
    var score = {};
    fnAddLane(0);
    $(document).ready( function(){
        $('#addLane').prop('disabled', true);
    });


    $(document).on('change', 'select', function(){
        var data = [];
        var lane_no = this.name.match(/f([0-9]+)/);
        var select_cnt = fnCountSelect(lane_no[1]);
        var ex = fnCountSelect(lane_no[1]);
        if( ex > 0 && ex % 2 == 1) fnAddSelect(lane_no[1]-1);
        if ( this.name.match(/f(\d)\_1/) != undefined){
            if ( ex > 0 && ex % 2 == 0 && this.name.match(/f(\d)\_1/)[1] == lane_no[1]){
                $('#addLane').prop('disabled', false);
            }
        }
        if ( this.name.match(/f(\d)\_0/) != undefined){
            var diff = 10 - parseInt(this.value);
            if ( diff == 0 ){
                for(var i=1; i<11; i++){
                    $('select[name="f'+lane_no[1]+'_1"]').children('option[value='+i+']').remove();
                }
                
                $('select[name="f'+lane_no[1]+'_1"]').val("0");
                $('#addLane').prop('disabled', false);
            }else{
                for(var i=0; i<10; i++){
                    if ( diff <= i ) $('select[name="f'+lane_no[1]+'_1"]').children('option[value='+i+']').remove();
                }
            }
        }
        if ( this.name == 'f10_0' && this.value == 10) {
            $('select[name="f10_1"]').val("");
            $('.score td.f10 > div > select[name="f10_1"] > option[value="10"]').text('X');
            fnAddSelect(lane_no[1]);
        }else if ( this.name == 'f10_1' && this.value == 10){
            $('.score td.f10 > div > select[name="f10_2"] > option[value="10"]').text('X');
        }else if ( this.name == 'f10_1' && this.value < 10){
            $('.score td.f10 > div > select[name="f10_2"] > option[value="10"]').text('/');

        }else if ( this.name == 'f10_0' && this.value < 10){
            $('select[name="f10_1"]').val("");
            $('.score td.f10 > div > select[name="f10_2"]').remove();
            $('.score td.f10 > div > select[name="f10_1"] > option[value="10"]').text('/');
        }
        score[this.name] = this.value;
        score[this.name+"_dt"] = moment().format('YYYY-mm-DD hh:mm:ss');
        // doneBtn
        if(lane_no[1] == 10){
            $('div.form-group > div.col-sm > button#addLane').remove();
            if( $('div.form-group > div.col-sm').length == 1){
                $('div.form-group > div.col-sm').append('<button type="button" id="registBtn" class="btn btn-info">Regist</button>');
            }
        }
    });

    $("button.btn.btn-info").on("click", function(){
        var cnt = fnCountLane();
        if ( cnt < 10 ) {
            fnAddLane(cnt);
        }
    });

    function fnAddLane(cnt){
        fnDisableSelect(cnt);
        fnAddHead(cnt);
        fnAddTd(cnt);
        fnAddScore(cnt);
        $('#addLane').prop('disabled', true);
        fnCalc();
        fnShowScore();
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

    function fnAddSelect(cnt){
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

    function fnCountLane(){
        return $("table#game > thead > tr > th").length;
    }

    function fnCountSelect(cnt){
        if ( cnt == undefined ) cnt = 0; 
        return $(".score select").length;
    }

    function fnCalc(){
        var strike = 0;
        var spare = 0;
        for(var i=1; i<11; i++){
            if(score['f'+i+'_0'] == undefined) return false;
            var val0 = parseInt(score['f'+i+'_0']);
            var val1 = (parseInt(score['f'+i+'_1'])) ? parseInt(score['f'+i+'_1']) : 0 ;
            if (val0 == 10){ // strike;
                if (score['f'+(i+1)+'_0'] !== undefined && score['f'+(i+1)+'_1'] !== undefined && score['f'+(i+1)+'_1'] != 10){
                    if (score['f'+(i+1)+'_0'] >= 0 && score['f'+(i+1)+'_0'] < 10 
                        && score['f'+(i+1)+'_1'] >= 0 && score['f'+(i+1)+'_1'] < 10){
                        score['f'+i+'_score'] = (val0 + parseInt(score['f'+(i+1)+'_0']) + parseInt(score['f'+(i+1)+'_1']));
                    }
                }else if(score['f'+(i+1)+'_0'] == 10 && (score['f'+(i+2)+'_0'] === "0" || score['f'+(i+2)+'_0'])>0 ){
                    score['f'+i+'_score'] = (val0 + parseInt(score['f'+(i+1)+'_0']) + parseInt(score['f'+(i+2)+'_0']) );
                }else if( parseInt(score['f'+(i+1)+'_1']) == 10){
                    score['f'+i+'_score'] = 20;
                }
            }else if( val1 == 10){ // spare
                if (score['f'+(i+1)+'_0'] !== undefined) score['f'+i+'_score'] = (val1 + parseInt(score['f'+(i+1)+'_0']));
            }else if( (val0 + val1) < 10 ){
                score['f'+i+'_score'] = (val0 + val1);
            }
        }
    }

    function fnShowScore(){
        var sum = 0;
        for(var i=0; i< 10; i++){
            if( score['f'+i+'_score'] === 0 || score['f'+i+'_score'] > 0 ){
                    $('.summary td.f'+i+' > div').text( (sum + score['f'+i+'_score']) );
                    sum += score['f'+i+'_score'];
            }
        }
    }
});
