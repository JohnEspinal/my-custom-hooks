import { useEffect, useRef, useState } from 'react'

export const useFetch = ( url ) => {

    const isMounted = useRef(true);

    useEffect( (  )=>{

      return () =>{
        isMounted.current = false;
      }

    }, [])

    const [state, setState] = useState({data: null, loading: true, error: null});

    useEffect(() =>{

      setState({...state, loading: true});

        fetch( url )
            .then( resp => {
              
              return resp.json();
            } )
            .then( data => {
              if(isMounted.current){

                console.log("Se llamo Set state");
                
                setState({
                  loading: false,
                  error: null,
                  data
                }
                )
                
              }else{
              console.log("No se llamo Set state");
                
              }
            } )
            .catch( () => {
              setState({
                data: null,
                loading: false,
                error: "Couldn't load info"
              })
              
            } )
// eslint-disable-next-line
    }, [url])

  return state;
}
