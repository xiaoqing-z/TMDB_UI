var receive =JSON.parse( sessionStorage.getItem("data"));
window.addEventListener('load',function(){
    let fetchData = function (){ 
        const xhr = new XMLHttpRequest();
        return new Promise((resolve,reject) =>{
            const head = "https://api.themoviedb.org/3/movie" 
           // https://api.themoviedb.org/3/movie/497582?api_key=4f11995f183e7370f9c72b2a9129c5e2&language=en-US  
            const api_key = "4f11995f183e7370f9c72b2a9129c5e2"
            xhr.open('get',`${head}/${receive}?api_key=${api_key}&language=en-US`);
            //defaults.type,defaults.url
            //https://api.themoviedb.org/3/genre/movie/list?api_key=4f11995f183e7370f9c72b2a9129c5e2&language=en-US
            xhr.send();
    
            xhr.onload = function(){
                const responseText =JSON.parse(xhr.responseText) ;
                console.log(responseText)
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
   
fetchData().then((res)=>{

   const categery = document.querySelector('.categery') ;
   for(let i =0;i<res.genres.length;i++){
    const randomColor = '#'+Math.floor(Math.random()*(2<<23)).toString(16); 
        const lis = document.createElement('li')
        lis.innerHTML = res.genres[i].name ;
        lis.style.background = randomColor;
        categery.append(lis);
    }
    const bar = document.querySelector('.bar')
    if(res.production_companies.length>0){
    bar.innerHTML = res.production_companies[0].name
}
else{
    bar.innerHTML = 'no results' 
}
    const div = document.querySelector('div');
    const img = document.querySelector('img');
    const h1 = document.querySelector('h1')
    h1.innerHTML = res.title
    const over = document.querySelector('.overview')
    
    over.innerHTML= `Overview:  ${res.overview}`
    


    
    img.src = `https://image.tmdb.org/t/p/w185/${res.poster_path}`
    div.style.backgroundImage ="url("+img.src+")";

    })

    const close = document.querySelector('.close_icon');
    
    close.addEventListener('click',function(){
        sessionStorage.removeItem("data")
     
        window.location.href = './index.html'
  

    })



    

    
    
});