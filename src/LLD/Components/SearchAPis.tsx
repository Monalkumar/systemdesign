import React,{useState, useEffect} from "react";

    const SearchApis:React.FC =()=>{
    const[input,setInput] = useState<string>("");
    const[searchResult,setSearchResult] = useState<string[]>([])
    const[show,setShow] = useState<boolean>(true);
    const[cache,setCache] = useState<Record<string, string[]>>({})
    const fetchData = async():Promise<void> =>{
        console.log("API",input)

        if(cache[input]){
            setSearchResult(cache[input])
        }
        else{
         const response = await fetch("https://www.google.com/complete/search?client=firefox&q="+input);
         const result  = await response.json();
         setCache((prevCache) => ({ ...prevCache, [input]: result[1] }));
         setSearchResult(result[1])
        }
    }

    useEffect(()=>{
        const timer = setTimeout(fetchData,500)
        return()=>{
            clearTimeout(timer);
        }
    },[input])
    return(
        <div className="card">
            
            
      <input style={{width:"401px", caretColor: "#4285f4", height:"25px", borderRadius:"25px", boxShadow:"0px 1px 0px 1px #f0e9e9ff" }} type="text" value={input} onFocus={()=>setShow(true)} onBlur={()=>setShow(false)} onChange={(e)=>setInput(e.target.value)}/>
      {show&& <ul style={{ borderRadius:"25px", textAlign:"left",marginTop:"0px", boxShadow:"0px 1px 0px 1px #f0e9e9ff"}}>
       {searchResult.map((search)=>(
        <li style={{listStyleType:"none"}} key={search}>{search}</li>
       ))}
       </ul>
       }
        </div>
    )
}

export default SearchApis;