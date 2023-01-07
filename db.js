const Pool = require('pg').Pool

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'traya',
  password: 'postgres',
  port: 5432,
})


pool.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});


async function registerPerson(person) {

  const query = `    
          CREATE TABLE IF NOT EXISTS "feedback"( 
          id SERIAL PRIMARY KEY NOT NULL,
          name VARCHAR(200) NOT NULL,
          email VARCHAR(300) NOT NULL,
          feed VARCHAR(1000) NOT NULL )
  `;
  return pool.query(query);
}
registerPerson()
    
    



//query for post data into database
  const createFeed = (request, response) => {
      try{
        if(Object.keys(request.body).length !=3){
          response.send({err : 'Please fill all fields'})
        }
        else{
        const { name, email,feed } = request.body
        if(!name || !email || !feed){
        response.send({err : 'Please fill all fields'})
        }
      console.log(request.body)
        pool.query('INSERT INTO feedback (name, email,feed) VALUES ($1, $2,$3) RETURNING *', [name, email,feed], (error, results) => {
          if (error) {
            response.send({err:error.message})
          }
          const data=results.rows
          response.status(200).send({msg:'Your feedback submitted successfully',data})
        })
      }
    }
    catch(error){
response.send({err:error.message})
    }
      }
  
    const getFeed=(request,response)=>{
      try{
        pool.query('SELECT * FROM feedback', (error, results) => {
          if (error) {
            response.send({err:error.message})
          }
          const data=results.rows
          response.status(200).json({msg:'Feed fetched successfully',data})
        })
      }
      catch(err){
        response.send({err:err.message})
      } 
    }
module.exports={createFeed,getFeed}