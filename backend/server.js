import express from 'express';
import cors from 'cors';
import { DatabasePostgres } from './databasePostgres.js';
import './createTable.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const db = new DatabasePostgres();

//autenticação (auth)
//register
app.post ('/auth/register', async(resizeBy,res) =>{
    const {name, email, password, setor} = req.body;

    const userExists = await db.findUserByEmail(email);
    if (userExists) return res.status(400).json({msg: 'Email já existe'});

    await db.createUser({name, email, password, setor});
    res.status(201).json({msg:'Usuario criado'});
});

//Login
app.post ('/auth/login', async(resizeBy,res) =>{
    const { email, password} = req.body;

    const user = await db.findUserByEmail(email);
    if (!user) return res.status(400).json({msg: 'Email não encontrado'});

    const valid = await bcrypt.compare(password, user.password);
    if(!valid) return res.status(401).json({msg:'Senha invalida'});

    const token = jwt.sign(
        {id: user.id},
        process.env.JWT_SECRET,
        {expiresIn: 'id'}
    );
    res.json({token, user});

});

//middleware
function auth(req,res,next){
    const token = req.headers.authurization?.split('')[1];
    if(!token) return res.status(401).json ({msg: 'Sem'});

}