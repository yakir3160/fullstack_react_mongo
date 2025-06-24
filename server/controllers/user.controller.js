
import {userService} from "../services/user.service.js";


export const getUsers = async (req, res) => {
    try{
        const {age,email,name,city} = req.query;
        const  result = await  userService.getUsers({age, email, name, city});
        // console.log('Users retrieved', result);
        return  res.status(200).json((result));
    }catch(err){
        res.status(400).send({error:err.message});
    }
}

export const userAction = async (req, res) => {
    try {
        const  result = async  () =>{
            switch(req.method){
                case 'GET':
                    return  await userService.getUserById(req.params.id, req.headers.authorization);
                case 'PUT':
                {
                    if(!req.body)
                        return res.status(400).send({error:'No data provided'});
                    return await userService.updateUserById(req.params.id, req.body);
                }
                case 'DELETE':
                    return await userService.deleteUserById(req.params.id);
            }
        }
        res.status(200).json(await result());
    }catch(err){
        res.status(500).send({error:err.message});}
}


