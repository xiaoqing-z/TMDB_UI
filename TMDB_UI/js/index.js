/* import {fetchData} from './moiveApi.mjs'; */
let fetchData = function (page){ 
    const xhr = new XMLHttpRequest();
    return new Promise((resolve,reject) =>{
        const head = "https://api.themoviedb.org/3/discover/movie"
        const api_key = "4f11995f183e7370f9c72b2a9129c5e2"
        const sort_by = "popularity.desc&include_adult=false&include_video=false"
        xhr.open('get',`${head}?api_key=${api_key}&language=en-US&sort_by=${sort_by}&page=${page}`);
        //defaults.type,defaults.url
        xhr.send();

        xhr.onload = function(){
            const responseText =JSON.parse(xhr.responseText) ;
            if(xhr.status ==200){
                resolve(responseText);
            
            }else{
                reject({
                    error:{
                        status:xhr.status,
                        errorText:'fail'
                    }
                    });
            }                
        }

    })
};

function create(data){ 
        const movieLists = document.querySelector('.movieLists'); 
        let likesLists = document.querySelector('.likesLists')
        const params = data;                  
        for(let i = 0;i<20 ; i++){
            let li = `             
            <li >
                <div class="likeIt" >Like it</div>
                <div class ="loadingWrap"></div>
                    <img  src="https://image.tmdb.org/t/p/w185/${data.results[i].poster_path}">
                    <p>${data.results[i].title}</p>
                    <p>${data.results[i].release_date  }</p>
            </li>
        `      
        movieLists.innerHTML += li 
        setTimeout(()=>{
            if(movieLists.children[i].children[1].className =='loadingWrap'){
            movieLists.children[i].removeChild(movieLists.children[i].children[1]) 
        }          
        },50)      
              
        };
        document.querySelector('.page2').style.visibility ='hidden';
        var cpage =JSON.parse (sessionStorage.getItem("cpage"));
        pageNumber.innerHTML = `page  ${cpage} /Total 500 of 10000 results`;
        if(document.querySelector('.count').innerHTML ==''){
            sessionStorage.removeItem("likename")
            sessionStorage.removeItem("configMoive")
        }
        clickLikeIt(movieLists,likesLists);
               
        jumpToDetails(movieLists,params)  
        document.querySelector('.navchildren1').addEventListener('click',()=>{
            clickNavLike(likesLists,params);
        }); 

        document.querySelector('.config').addEventListener('click',()=>{
            clickConfig(likesLists)
        });
    
    }

function clickLikeIt(ms,ls){
    const navlike = document.querySelector('.navchildren1')
    const totallike = document.querySelector('.count')
    const lis =ms.children;
    for(let i = 0;i<lis.length;i++){ 
        const like = lis[i].children[0]    
        like.addEventListener('click',function(){
            if(this.style.color !=='purple'){  
                navlike.style.display = 'block';
                //count+=1;
               $(lis[i]).clone().appendTo(ls)
               //console.log(likesLists)
                totallike.innerHTML = ls.children.length;   
                this.style.color = 'purple'                    
            }else{
                alert('you have added it')                     
            }
            let name =ls.children;
            let namelist =[]
            for(let i =0;i<name.length;i++) {
                name2 = name[i].children[2].innerHTML;
                namelist.push(name2)
            } 
            const namelist2 = JSON.stringify(namelist)
            sessionStorage.setItem("likename",namelist2);     
                 
        })
                     
                   
    } 

}

function jumpToDetails(Lists,r){  
    const lis =Lists.children;   
    for(let i= 0;i<lis.length;i++){         
        lis[i].querySelector('img').addEventListener('click',function(){
            for(let j =0;j<r.results.length;j++){ 
                console.log(r.results[j].title);
                if(lis[i].children[2].innerHTML == r.results[j].title) {
                const p=  JSON.stringify(r.results[j].id);
                sessionStorage.setItem('data',p); 
                }  
            }     
        window.location.href = './moviedetails.html'
        }) ; 
    } 
}

function clickNavLike(l,r){  
    document.querySelector('.main').style.transform ='rotateY(180deg)';
    document.querySelector('.config').style.display = 'block';
   
    const  cpage = JSON.parse(sessionStorage.getItem('cpage'))  ;
   
    fetchData(cpage).then(res=>{
        mainpage(res) 
    }); 
           
    likeflag = 1;
    sessionStorage.setItem("likeflag",likeflag);
}

function clickNavMoive(){
    const totallike = document.querySelector('.count')
    const cpage = sessionStorage.getItem('cpage');
    if( totallike.innerHTML !==0){
        document.querySelector('.main').style.transform ='rotateY(0deg)' ;
        document.querySelector('.page1').style.visibility ='visible' ; 
        document.querySelector('.config').style.display = 'none';
        //document.querySelector('.page2').style.visibility ='hidden'
        fetchData(cpage).then((res)=>{
            create(res)
        })
    } 
    sessionStorage.removeItem("likeflag");
}

function clickConfig(ls){
    const listname = []
    const likelistchild = ls.children;
    for (let i = 0;i<likelistchild.length;i++){                
        listname.push( likelistchild[i].children[2].innerHTML)
    }
    const ln=  JSON.stringify(listname);
    sessionStorage.setItem('configMoive',ln);  
    window.location.href = './config.html'
}

function  mainpage(re){
    let page2 = document.querySelector('.page2')
    let page1 = document.querySelector('.page1')
    page2.children[1].children[0].innerHTML = "" ;
    var r = JSON.parse(sessionStorage.getItem("configMoive"));
    var l = JSON.parse(sessionStorage.getItem("likename"));
    if(r && r.length>0){
        receive = r;
        
    }else{
        receive = l;
    }
    console.log(receive);
    for(let j=0;j<receive.length;j++){       
        for(let i =0;i<re.results.length;i++){ 
            if(receive[j] == re.results[i].title){
            let li = `             
                        <li >
                        <div class="likeIt" >Like it</div>
                            <img  src="https://image.tmdb.org/t/p/w185/${re.results[i].poster_path}">
                            <p>${re.results[i].title}</p>
                            <p>${re.results[i].release_date }</p>
                    </li>
                `
            
            page2.children[1].children[0].innerHTML += li ;
            
             page1.style.visibility ='hidden' ;
             page2.style.visibility ='visible' ;
            
            document.querySelector('.navchildren1').style.display = 'block';
            const totallike = document.querySelector('.count')
            totallike.innerHTML = receive.length;             
        }
    }
    jumptoLikelist(page2.children[1].children[0],re);
    document.querySelector('.navchildren0').addEventListener('click',clickNavMoive);

}
 
}
function jumptoLikelist(l,r){  
    const config = document.querySelector('.config')    
    config.style.visibility = 'visible';
    jumpToDetails(l,r)
    config.addEventListener('click',()=>{clickConfig(l)})
    sessionStorage.removeItem('con');
}  

                                                       
const pageNumber = document.querySelector('.pageNumber')
const next = document.querySelector('.next')
const previous = document.querySelector('.previous')
//var  current_page = 1;

const totalpage = 500;
var con =JSON.parse(localStorage.getItem("con"));
var likeflag =JSON.parse (sessionStorage.getItem("likeflag"));

var cpage =JSON.parse (sessionStorage.getItem("cpage"));
console.log(cpage);
if(cpage -1> 0){
    cpage = cpage;
    previous.disabled = false;  
    previous.innerHTML = 'previous';

    
}else{
    sessionStorage.setItem('cpage',1);
}


fetchData(cpage).then((res) =>{
    if(con == 1 && likeflag==1){ 
        clickNavLike()       
    }
    else{
        sessionStorage.removeItem("likeflag")
        create(res); 
              
    }
  })  

  document.querySelector('.navchildren0').addEventListener('click',clickNavMoive);
  document.querySelector('.navchildren1').addEventListener('click',clickNavLike);
  
let nextlist = [] 
next.addEventListener('click',function(){ 
    
    var cpage =JSON.parse (sessionStorage.getItem("cpage"));
    cpage ++;
    nextlist.push(cpage);
    pageNumber.innerHTML = `page  ${cpage} /Total 500 of 10000 results`;
    if(cpage+1>totalpage) { 
        next.innerHTML = 'no more';
        next.disabled = true;        
            
    }else{
        next.innerHTML = 'next';
        next.disabled = false; 
    
    } ;
    if(cpage-1 <1){
        previous.disabled = true;  
        previous.innerHTML = 'no more';
    }else{
        previous.disabled = false;  
        previous.innerHTML = 'previous';
    }

    document.querySelector(".movieLists").innerHTML = "";/*清空上一页显示的数据*/
    sessionStorage.setItem('cpage',cpage);
    fetchData(cpage).then((res) =>{
        create(res);
        });   
});


previous.addEventListener('click',function(){
    var cpage =JSON.parse (sessionStorage.getItem("cpage"));
    cpage--;
    pageNumber.innerHTML = `page  ${cpage} /Total 500 of 10000 results`;
    if(cpage-1 <1){
        previous.disabled = true;  
        previous.innerHTML = 'no more';
    }else{
        previous.disabled = false;  
        previous.innerHTML = 'previous';
    }
    if(cpage+1>totalpage) { 
        next.innerHTML = 'no more';
        next.disabled = true;        
            
    }else{
        next.innerHTML = 'next';
        next.disabled = false; 
        document.querySelector(".movieLists").innerHTML = "";/*清空上一页显示的数据*/
        sessionStorage.setItem('cpage',cpage);
        fetchData(cpage).then((res) =>{
        create(res);
        });
    
    } ;
}
);
    


   
    
        
      
    

        