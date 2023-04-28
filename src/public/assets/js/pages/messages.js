var permitted = ['image/jpg','image/jpeg','image/png'];
$(function(){
	$(document).on('click','.send',function(){sendMessage()});
    //$('#txtmessage').keyup(function(e){if(e.keyCode == 13){ e.preventDefault();sendMessage();return false;}});
    $('#txtmessage').keydown(function(event){if(event.keyCode == 13) { event.preventDefault();return false;}});
    if($('#attachment-template-js')){var template = $('#attachment-template-js').clone(); $('#attachment-template-js').remove()}
    
    $('#searchText').bind('keyup', function() {
        var searchString = $(this).val(), is_found=false;
        $(".nav.list-discussions-js a.not-found").remove();
        $(".nav.list-discussions-js a.nav-link").each(function(index, value) {currentName=$(value).text();if( currentName.toUpperCase().indexOf(searchString.toUpperCase()) > -1) {is_found = true; $(value).show()}else{$(value).hide()}});
        if(!is_found){$(".nav.list-discussions-js").append('<a class="text-reset nav-link p-0 mb-0 not-found" href="javascript:;" data-id="5"><div class="card"><div class="card-body">No results found for \''+searchString+'\'</div></div></a>')}
    });

    $("#attachment").change(function(event){
        var errmsg = "", isError = false;
        if(event.target.files.length){ var tmppath = URL.createObjectURL(event.target.files[0]), name = event.target.files[0].name, size = event.target.files[0].size, type = event.target.files[0].type; if($.inArray(type, permitted ) > 0) { if(size > 2048000){ isError = true; errmsg = "Attachment file size maximum 2mb allowed."} else { template.find('[data-dz-thumbnail]').attr('src', tmppath); template.find('[data-dz-name]').html(name);template.find('[data-dz-size]').html(size); $('.attachment-div').html(template).show(); } } else {  isError = true; errmsg = "Please select valid image"; } } else{isError = true}
        if(isError){ $("#attachment").val('');if(errmsg!=""){errorToast(errmsg) }$('.attachment-div').html('').hide(); }
    });

    $(document).on('click',".attachment-div .remove",function(){ $("#attachment").val('');$('.attachment-div').html(''); $('.attachment-div').hide();});
    $(document).on('click',".icon-attachment",function(){  $('#attachment').trigger('click') });

    $(document).on('click',".refresh-chat",function(){  
        var activechat = $('.card.card-active-listener.active'), gid = $(activechat).attr('data-id'), time = $(activechat).attr('data-time'), formData = new FormData();
        formData.append('gid',gid);
        formData.append('time',time);
        $.ajax({
            url:refresh_url,type: 'POST',data: formData,cache: false,contentType: false,processData: false,
            beforeSend:function(){},
            success: function(response) {if (typeof response !== "undefined" && response !== null && response.status){
                response = response.data;
                getMessage(response);
            }else{errorToast(response.message)}},
            error: function (xhr, status, response) {if (xhr.status === 422) {var returnData = xhr.responseJSON;} else {errorToast("Something went wrong..!please try again..")}},
            complete:function(){},
        });
    });
});
function sendMessage(){	
    var activechat = $('.card.card-active-listener.active'), gid = $(activechat).attr('data-id'), time = $(activechat).attr('data-time'), txtmessage = $("#txtmessage").val(), formData = new FormData();
    formData.append('gid',gid);
    formData.append('time',time);
    formData.append('message',txtmessage);

    if($("#attachment").length && $("#attachment").val() != ''){
        var attachment = $("#attachment")[0].files[0];
        formData.append('attachment',attachment);
    }
    if(typeof gid !== "undefined" && gid != null && ((typeof txtmessage !== "undefined" && $.trim(txtmessage) != '') || ($("#attachment").length && $("#attachment").val() !=''))){
        if(txtmessage.length > 2000){errorToast("Message should be less than 2000 characters") } else {       
            $.ajax({
                url: $("#chat-form").attr('action'),type: 'POST',data: formData,cache: false,contentType: false,processData: false,
                beforeSend:function(){$('textarea#txtmessage').attr('disabled',true); $("button.send").attr('disabled',true)},
                success: function(response) {if (typeof response !== "undefined" && response !== null && response.status){
                    response = response.data;
                    getMessage(response);
                    $("#attachment, #txtmessage").val('').trigger('change');
                }else{errorToast(response.message)}},
                error: function (xhr, status, response) {if (xhr.status === 422) {var returnData = xhr.responseJSON;} else {errorToast("Something went wrong..!please try again..")}},
                complete:function(){$('textarea#txtmessage').attr('disabled',false); $("button.send").attr('disabled',false)},
            });
        }
    } else{ errorToast("Please enter a message") }
}

function getMessage(response){
    var activechat = $('.card.card-active-listener.active'), strm = "";
    if(response.messages.length){
        if($(".chat-content-messages .message-divider").length){
            if($(".chat-content-messages .message-divider").last().find('small').text() != "Today"){
                strm = '<div class="message-divider my-9 mx-lg-5"><div class="row align-items-center"><div class="col"><hr></div><div class="col-auto"><small class="text-muted">Today</small></div><div class="col"><hr></div></div></div>';
            }
        } else {
            strm = '<div class="message-divider my-9 mx-lg-5"><div class="row align-items-center"><div class="col"><hr></div><div class="col-auto"><small class="text-muted">Today</small></div><div class="col"><hr></div></div></div>';
        }
        $(activechat).attr('data-time', response.time);
        $.each(response.messages, function(k,v){
            var is_receiver = false;
            if(v.sender_id == response.user){is_receiver = true}
            strm += '<div class="message ' + (is_receiver ?'message-right':'') + '"><div class="avatar avatar-sm  ml-2 ml-lg-3  d-lg-block"><img class="avatar-img" src="'+(profile_url+v.sender.photo)+'" alt=""></div><div class="message-body"><div class="message-row">';
            if(v.message!=null){strm += '<div class="d-flex align-items-center ' + (is_receiver?'justify-content-end':'') + '"><div class="message-content ' + (is_receiver?'bg-primary text-white':'bg-light') + '"><div>'+ v.message +'</div><div class="mt-1 ' + (is_receiver?'text-right':'') + '"><small class="opacity-65">' + moment(v.created_at).format('h:mm a') +'</small></div></div></div>';}
            if(v.media!="" && v.media != null){strm += '<div class="d-flex align-items-center ' + (is_receiver?'justify-content-end':'') + '"><div class="mt-5"><a href="' + attach_url + '/' + v.media + '" class="attach" download><img src="' + attach_url + '/' + v.media + '"></a></div></div>';}
            strm += '</div></div></div>';
        });
    }
    if(strm!=""){
        $(".chat-content-messages").append(strm);
        $(".chat-blank").remove();
    }
    if (document.querySelector('.end-of-chat')) {document.querySelector('.end-of-chat').scrollIntoView(false)}
    if (document.querySelector('.chat-footer')) { document.querySelector('.chat-footer').scrollIntoView(false) }
    if(typeof response.messages[response.messages.length-1] !== "undefined"){$(activechat).find('.last-message').html(response.messages[response.messages.length-1].message!=null ? response.messages[response.messages.length-1].message : "Image");$(activechat).find('.last-message-time').html("Today");}
}