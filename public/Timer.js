var src=0
var decrement=function(sec)
{
    console.log('called1');
    if(sec>0)
    {
        console.log('called');
        e=document.getElementById('time');
        e.innerHTML="Time left :"+sec;
        setTimeout(function(){
            decrement(sec-1);
        },1000);
        
    }
    else{
        e=document.getElementById('myform').submit();
        e.innerHTML="Time left :"+0;
        //window.location.pathname='/res';
    }
    
}
