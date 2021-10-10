
async function handleAdd(){
  await firebase.firestore().collection('posts')
  .add({
    titulo,
    autor
  })
  .then(()=>{
    console.log('dados cadastrados com sucesso');
    setTitulo('');
    setAutor('');
  })
  .catch((error)=>{
    console.log('gerou algum erro' + error);
  })
}


async function buscaPost(){
  await firebase.firestore().collection('posts')
  .get() // trazer tudo de posts
  .then((snapshot)=>{ // retorna para snapshot
    let lista = [];

    snapshot.forEach((doc)=>{ // percorre snapshot e adiciona em lista
      lista.push({
        id: doc.id,
        titulo: doc.data().titulo,
        autor: doc.data().autor
      })
    })

    setPosts(lista);
  })
  .catch(()=>{
    console.log('deu erro')
  })
}

async function editarPost(){
  await firebase.firestore().collection('posts')
  .doc(idPost)
  .update({
    titulo,
    autor
  })
  .then(()=>{
    console.log('dados atualizados com sucesso');
    setIdPost('');
    setTitulo('');
    setAutor('');
  })
  .catch(()=>{
    console.log('erro ao atualizar');
  })
}

async function excluirPost(id){
  await firebase.firestore().collection('posts')
  .doc(id)
  .delete()
  .then(()=>{
    alert('esse post foi excluido');
  })
}

<div className="container">
    <h2>Banco de Dados </h2>
      <label>ID: </label>
      <input type="text" value={idPost} onChange={(e) => setIdPost(e.target.value)} />

      {user && ( // verifica se tem algum usuário logado
          <div>
            <strong>Seja bem vindo </strong> 
            <span> {userLogged.email}</span>
            <br/> <br/>
          </div>
        )}

        
      <label>Titulo:</label>
      <textarea type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)}/>

      <label>Autor:</label>
      <input type="text" value={autor} onChange={(e) => setAutor(e.target.value)}/>

      <button onClick={handleAdd}>Cadastrar</button>
      <button onClick={buscaPost}>Buscar Post</button> 
      <button onClick={editarPost}>Editar</button> <br/>

      <ul>
        {posts.map((post)=>{
          return(
            <li key={post.id}>
                <span>ID: {post.id} </span> <br/>
                <span>Titulo: {post.titulo}</span> <br/>
                <span>Autor: {post.autor}</span>  <br/>
                <button onClick={()=> excluirPost(post.id)}>Excluir Post</button> <br/> <br/>
            </li>
          )
        })}
      </ul>
      </div>