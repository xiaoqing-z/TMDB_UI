var receive =JSON.parse(sessionStorage.getItem("configMoive"));
window.addEventListener('load',function(){
    
    const adjust = document.querySelector('.adjust');

    for(let i =0;i<receive.length;i++){
        const li = document.createElement('li');
        li.innerHTML = receive[i];
        adjust.append(li)
    }

    const order = [...receive];
    function findIndexInLike(name) {
        for (let i = 0; i < order.length; i++) {
            if (order[i] === name) return i;
        }
    }  
    
function achievedrag(){  
    const lis = adjust.children;
    let previous,current
    for(var i=0; i<lis.length; i++){ 
        lis[i].draggable="true"
        lis[i].addEventListener('drag',function(e){
            e.preventDefault();
            previous = e.target.innerHTML;
            //console.log(previous);

        },false)
        lis[i].addEventListener('dragover',function(e){
            e.preventDefault();
            current = e.target.innerHTML;
        },false)

        lis[i].addEventListener('drop',function(e){
            e.preventDefault();
            let pi = findIndexInLike(previous);
            let ci = findIndexInLike(current);
            let temp = order[pi];
            order[pi]=order[ci];
            order[ci]=temp;
           
            lis[pi].innerHTML=current;
            lis[ci].innerHTML=previous;
            console.log(order);
            const o=  JSON.stringify(order); 
            sessionStorage.setItem('configMoive',o);                      
        },false)
       
    }
   

}
achievedrag()

let conflag = 0
    const close = document.querySelector('.close_icon');
    close.addEventListener('click',function(){
        conflag = 1
        localStorage.setItem('con',conflag);
        
        window.location.href = './index.html'

    })

})