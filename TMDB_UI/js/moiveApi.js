
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
            //console.log(responseText)
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

export {fetchData};