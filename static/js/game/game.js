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
        if( ex > 0 && ex % 2 == 1)fnAddSelect(lane_no[1]-1);
        if ( this.name.match(/f(\d)\_1/) != undefined){
            if ( ex > 0 && ex % 2 == 0 && this.name.match(/f(\d)\_1/)[1] == lane_no[1]){
                $('#addLane').prop('disabled', false);
            }
        }
        if ( this.name.match(/f(\d)\_0/) != undefined){
            //$('f'+cnt+'_1')
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
        score[this.name] = this.value;
        score[this.name+"_dt"] = moment().format('YYYY-mm-DD hh:mm:ss');
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
        $(".table tbody > tr.summary > td.f"+(cnt+1)).append('<input type="hidden" name="f'+(cnt+1)+'_0">');
        $(".table tbody > tr.summary > td.f"+(cnt+1)).append('<input type="hidden" name="f'+(cnt+1)+'_1">');
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
        $('.score > td.f'+(cnt+1)+' > div').append('<select class="custom-select" name="f'+(cnt+1)+'_'+(select_cnt%2)+'">');
        $('.score > td.f'+(cnt+1)+' > div > select[name="f'+(cnt+1)+'_'+(select_cnt%2)+'"]').append('<option>');
        $.each(list, function(key,val){
            $('.score > td.f'+(cnt+1)+' > div > select[name="f'+(cnt+1)+'_'+(select_cnt%2)+'"]').append('<option value="'+key+'">'+val);
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
        console.log(score);
    }
});
