import {useEffect , useState} from 'react'
import Header from '../../components/Header/Header'
import "./index.scss"
import SubmenuLivros from '../../components/SubmenuLivros/SubmenuLivros'
import { useParams } from 'react-router-dom'
import { LivrosService } from '../../api/LivrosService'

const LivrosEdicao = () => {  
  let {livroId} = useParams();

  const [livro, setLivro] = useState([])

  async function getLivro(){
    const {data} = await LivrosService.getLivro(livroId);
     setLivro(data)
    console.log(data)
  }

  async function editLivro(){
    const body = {
        "id" : livroId,
        "title":livro.title,
        "pagenumber": Number(livro.pagenumber),
        "cod_isbn": Number(livro.cod_isbn),
        "publishing_company": livro.publishing_company
    }
      await LivrosService.updateLivro(livroId,body)
      .then(({data})=>{
        alert(data.mensagem)
      })
      .catch(({response:{data,status}})=>{
        alert(`${status} - ${data}`)      
      });
     

    console.log(body)

  }

  useEffect(() => {
    getLivro()    
  }, [])  

  return (
  <>
    <Header/>    
    <SubmenuLivros/>
    <div className='livrosCadastro'>
        <h1>Edição de Livros</h1>
        <div>
          <form id="formulario">
            <div className='form-group'>
              <label>Id</label>
              <input type="text" disabled required onChange={(event)=>{ setLivro({...livro, id: event.target.value})}} value={livro.id || ''}></input>
            </div>
            <div className='form-group'>
              <label>Titulo</label>
              <input type="text" required onChange={(event)=>{ setLivro({...livro, title: event.target.value})}} value={livro.title || ''} ></input>
            </div>
            <div className='form-group'>
              <label>Número de Páginas</label>
              <input type="text"  required onChange={(event)=>{ setLivro({...livro, pagenumber: event.target.value})}} value={livro.pagenumber || ''}></input>
            </div>
            <div className='form-group'>
              <label>ISBN</label>
              <input type="text"  required onChange={(event)=>{ setLivro({...livro, cod_isbn: event.target.value})}} value={livro.cod_isbn || ''}></input>
            </div>
            <div className='form-group'>
              <label>Editora</label>
              <input type="text"  required onChange={(event)=>{ setLivro({...livro, publishing_company: event.target.value})}} value={livro.publishing_company || ''}></input>
            </div> 
            <div className='form-group'>
              <button onClick={()=>{
              editLivro()
            }}>Atualizar Livro</button>  
            </div>                   
          </form>
          </div>        
    </div>
  </>)
  
}

export default LivrosEdicao