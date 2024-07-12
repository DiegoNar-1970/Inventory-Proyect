import { useEffect, useState } from "react";

export function UseFetchArea(url,area){
    const [data,setData]=useState();
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState(null);
    const [controller,setController]=useState(null);

    useEffect(()=>{
        const abortController=new AbortController();
        setController(abortController);
        setLoading(true);
        fetch(url, {signal:abortController.signal})
        .then((response)=>response.json())
        .then((data)=>setData(data))
        .catch((error)=>{
            if(error.name==='AbortError'){
                console.log("request cancel")
            }
            setError(error)})
        .finally(()=> setLoading(false));
    return ()=> abortController.abort(); //se ejecuta si se llega a pausar la carga o cualquier cosa que interumpa el fetching
    },[url,area])

const cancelRequest=()=>{
    if(controller){
    controller.abort();
    setError("request cancel")
    }
}    
    return {data,loading,error,cancelRequest}
}

export function UseBodyFetch(url,area,datos){
    const [data,setData]=useState();
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState(null);
    const [controller,setController]=useState(null);

    useEffect(()=>{
        const abortController=new AbortController();
        setController(abortController);
        setLoading(true);

        fetch(url,
            {method:"POST",
            headers:{'Accept':"application/json",
                "Content-type":"application/json"},
        body:JSON.stringify(datos),
        signal:abortController.signal})

        .then((response)=>response.json())
        .then((data)=>setData(data))
        .catch((error)=>{
            if(error.name==='AbortError'){
                console.log("request cancel")
            }
            setError(error)})

        .finally(()=> setLoading(false));

    return ()=> abortController.abort(); //se ejecuta si se llega a pausar la carga o cualquier cosa que interumpa el fetching
    },[url,area])

const cancelRequest=()=>{
    if(controller){
        console.log(controller)
    controller.abort();
    setError("request cancel")
    }
}    
    return {data,loading,error,cancelRequest}
}


export function UseFetch(url){
    const [data,setData]=useState();
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState(null);
    const [controller,setController]=useState(null);

    useEffect(()=>{
        const abortController=new AbortController();
        setController(abortController);
        setLoading(true);
        fetch(url, {signal:abortController.signal})
        .then((response)=>response.json())
        .then((data)=>setData(data))
        .catch((error)=>{
            if(error.name==='AbortError'){
                console.log("request cancel")
            }
            setError(error)})
        .finally(()=> setLoading(false));
    return ()=> abortController.abort();
    },[url])
    
const cancelRequest=()=>{
    if(controller){
    controller.abort();
    setError("request cancel")
    }
}    
    return {data,loading,error,cancelRequest}
}
//fynali se ejecuta una vez la respuesta se haya completado 
