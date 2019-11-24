
function create()
{
    var val=document.getElementById('count').value;
    console.log("here in create");
    s="<input type='text' placeholder='quizName' value='quiz' name='quizName' ><br><br>"
    
    for( i=1;i<=val;i++)
    {
        s+="<input type='text' placeholder='title' value='t1' name=q" +i+"><br><br>";
        for(j=1;j<=4;j++)
        {
            p=i+''+j;
            s+="<input type='text' placeholder='option' value='a' name=op"+ p+"><br><br>";;
            
        }
        s+="<input type='text' placeholder='answer' value='1' name=a" +i+"><br><br>";
    }
    s+="<input type='hidden' name='count' value='"+val+"'>";
    s+="<input type='submit' value='go'>";
    
    document.getElementById("questions").innerHTML=s;
}