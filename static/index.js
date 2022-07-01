let user="";
let disable=1;
$(document).ready(function(){
    cookie=document.cookie;
    if (!cookie)
    {
        const fpPromise = import('https://openfpcdn.io/fingerprintjs/v3')
        .then(FingerprintJS => FingerprintJS.load())

        // Get the visitor identifier when you need it.
        fpPromise
        .then(fp => fp.get())
        .then(result => {
        // This is the visitor identifier:
        const visitorId = result.visitorId
        document.cookie=`user=${visitorId}; expires=`+new Date(9999,0,1).toUTCString();
        user=visitorId;
        })
        $('.modal-bg').show();
        $('.container-fluid').css('filter','blur(2px)');
    }
    else
    {
        user=document.cookie;
        user=user.split("=")[1];
        $('.container-fluid').css('filter','blur(0px)');
        $('.modal-bg').hide();
    }
    
    $('#go').click(()=>{
        $('.modal-bg').hide();
        $('.container-fluid').css('filter','blur(0px)');
    })
});

function submitCheck()
{
    let text=$('#confession').val();
    if (text.length==0)
        alert(`Empty Confession cannot be submitted! Don't be shy. Feel free to fess up :)`);
    else
    {
        text=text.replace('<','');
        text=text.replace('>','');
        text=text.replace('&lt;','');
        text=text.replace('&gt;','');
        $('#user-id').val(user);
        $('#confession-form').submit();
    }
}

function toggleGoBtn()
{
    disable=disable*-1;
    if (disable==1)
        $('#go').prop('disabled', true);
    else
        $('#go').prop('disabled', false);
}
