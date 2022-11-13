
function show(ele)
{
    ele.style.visibility = "visible";
    ele.style.width = "200px";
    ele.style.height = "200px";
    ele.style.margin = "30px";
}

function hide(ele)
{
    ele.style.visibility = "hidden";
    ele.style.width = "0px";
    ele.style.height = "0px";
    ele.style.margin = "0px";
}

function filter()
{
    var every = document.getElementsByClassName("game");

    for(var i = 0 ; i < every.length ; i++)
    {
        show(every[i]);
    }

    if(document.getElementById("age").value != "all")
    {
        for(var i = 0 ; i < every.length ; i++)
        {
            if(!every[i].classList.contains(document.getElementById("age").value))
            {
                hide(every[i]);
            }
        }
    }

    if(document.getElementById("category").value != "all")
    {
        for(var i = 0 ; i < every.length ; i++)
        {
            if(!every[i].classList.contains(document.getElementById("category").value))
            {
                hide(every[i]);
            }
        }
    }
}
