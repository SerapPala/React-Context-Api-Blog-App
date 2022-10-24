import { useState, useRef, useEffect } from "react";
import { useFetch } from '../../hooks/useFetch'
import { useHistory } from 'react-router-dom'
import {db} from '../../firebase/config';
import {collection,addDoc } from 'firebase/firestore';
import "./Create.css";

export default function Create() {


  const { postData, data, error } = useFetch('http://localhost:8000/bloglar', 'POST')
	


  const [baslik, setBaslik] = useState("");
  const [icerik, setIcerik] = useState("");
  const [okunmaSuresi, setOkunmaSuresi] = useState("");

  const [yeniKategori, setYeniKategori] = useState("");
  const [kategoriler, setKategoriler] = useState([]);
  const kategoriInput = useRef(null);


  const history = useHistory()

  const handleSubmit =async (e) => {
    e.preventDefault()
    //console.log(baslik, icerik, okunmaSuresi,kategoriler)
    const doc={ baslik, kategoriler, icerik, okunmaSuresi: okunmaSuresi + ' dakika' };

    const ref=collection(db,'bloglar');

    try{
      await addDoc(ref,{
        ...doc
      })

      history.push('/')
    }catch(err){
      console.log(err);
    }
  }

  const handleAdd = (e) => {
    e.preventDefault();
    const yKat = yeniKategori.trim();

    if (yKat && !kategoriler.includes(yKat)) {
      setKategoriler((oKat) => [...oKat, yeniKategori]);
    }
    setYeniKategori("");
    kategoriInput.current.focus();
  };



/*   useEffect(() => {
    if (data) {
      history.push('/')
    }
  }, [data, history])
 */
  

  return (
    <div className="create">
      <h2 className="page-title">Yeni Yazı</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Yazı Başlık:</span>
          <input
            type="text"
            onChange={(e) => setBaslik(e.target.value)}
            value={baslik}
            required
          />
        </label>

        {/* recipe ingredients here */}

        <label>
          <span>Yazı İçerik:</span>
          <textarea
            onChange={(e) => setIcerik(e.target.value)}
            value={icerik}
            rows={5}
            required
          />
        </label>

        <label>
          <span>Okunma Süresi:</span>
          <input
            type="number"
            onChange={(e) => setOkunmaSuresi(e.target.value)}
            value={okunmaSuresi}
            required
          />
        </label>

        <label>
          <span>Yazı Kategorileri:</span>
          <div className="categories">
            <input
              type="text"
              onChange={(e) => setYeniKategori(e.target.value)}
              value={yeniKategori}
              ref={kategoriInput}
            />
            <button onClick={handleAdd} className="btnAdd btn">
              ekle
            </button>
          </div>


        </label>
        <p>
          Kategoriler:
          <span className="list">
            {" "}
            {kategoriler.map((i) => (
              <em key={i}>{i}, </em>
            ))}
          </span>
        </p>

        <button className="btn">Oluştur</button>
      </form>
    </div>
  );
}
