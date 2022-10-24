import "./Home.css";
import { useFetch } from "../../hooks/useFetch";
import BlogList from "../../components/BlogList";

import {db} from '../../firebase/config'
import {collection,getDocs} from 'firebase/firestore'
import {useState,useEffect } from 'react';


export default function Home() {

//const { data, yukleniyor, hata } = useFetch('http://localhost:8000/bloglar')

    //console.log(data);
    const [data,setData]=useState(null)
    const [hata,setHata]=useState(false)
    const [yukleniyor,setYukleniyor]=useState(false)

    useEffect(()=>{
        setYukleniyor(true)

        const ref=collection(db,'bloglar');

        getDocs(ref).then((snap)=>{
          //console.log(snap);
          if(snap.empty){
            setHata('Bir hata oluştu')
            setYukleniyor(false)
          }else{
            let sonuclar=[];
        
            snap.forEach(doc=>{
              sonuclar.push({id:doc.id,...doc.data()})
            })
        
            setData(sonuclar);
            setYukleniyor(false)
          }
        }).catch((err)=>{
          setHata(err.message)
          setYukleniyor(false)
        })

    },[])


  return (
    <div className="home">
      {hata && <p className="error">{hata}</p>}
      {yukleniyor && <p className="loading">Yükleniyor</p>}
      {data && <BlogList bloglar={data}/>}
    </div>
  );
}
