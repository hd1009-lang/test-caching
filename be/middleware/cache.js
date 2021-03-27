import redis from 'redis'
import _ from 'lodash'
export const client=redis.createClient({
  host: '127.0.0.1',
  port: 6379,
})



export const cache=(req,res,next)=>{
  // console.log(_.isEmpty(req.params));
  console.log(req.params);
  if(_.isEmpty(req.params)){
    const page = Number(req.query.pageNumber) || 1

    var username=`allproduct${page}`;
  }else{
    var {id:username}=req.params;
  }
  client.get(username,(err,data)=>{
    if(err) throw err;
    if(data !== null){
      console.log('Có data');
      return res.json(JSON.parse(data))
    }else{
      console.log('Không có data');
      next();
    }
  })
}

