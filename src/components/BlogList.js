import './BlogList.css'
import {Link} from 'react-router-dom'
import { useTheme } from '../hooks/useTheme';

import DeleteIcon from '../assets/delete-icon.svg'
import {db} from '../firebase/config';
import { doc,deleteDoc } from 'firebase/firestore';


export default function  BlogList  ({bloglar})  {


  const {mode}=useTheme();


  const handleClick =async (id) => {
    console.log(id);
    const ref=doc(db,'bloglar',id);
  
    await deleteDoc(ref);
  }
  
  



  
  if (bloglar.length === 0) {
    return <div className="error">Aranan yazı bulunamadı</div>
  }

  
  return (
    <div className='blog-list'>
        {
            bloglar.map(blog=>(
<div key={blog.id} className={`card ${mode}`}>

                <h3 key={blog.id}>{blog.baslik}</h3>
                <p>{blog.okunmaSuresi}</p>
                <div>{blog.icerik.substring(0,100)} ...</div>
                <Link to={`/blog/${blog.id}`}>Daha Fazla Oku</Link>
<img 
	className="delete"
	onClick={() => handleClick(blog.id)}
	src={DeleteIcon} alt="delete blog" 
/>
                </div>
            ))
        }
    </div>
  )
}

