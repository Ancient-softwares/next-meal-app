import bcrypt from 'bcryptjs'
import { Jwt } from 'jsonwebtoken'
import User from '../models/client.js'

const signUp = (request, response, next) => {
    // checks if email or cpf already exists
    User.findOne({ where : {
        email: request.body.email, 
        cpf: request.body.cpf
    }})
    .then(users => {
        if (users) {
            return response.status(409).json({message: "email already exists"});
        } else if (request.body.email && request.body.password) {
            // password hash
            bcrypt.hash(request.body.password, 12, (err, passwordHash) => {
                if (err) {
                    return response.status(500).json({message: "couldnt hash the password"}); 
                } else if (passwordHash) {
                    return User.create(({
                        email: request.body.email,
                        name: request.body.name,
                        password: passwordHash,
                    }))
                    .then(() => {
                        response.status(200).json({message: "user created"});
                    })
                    .catch(err => {
                        console.log(err);
                        response.status(502).json({message: "error while creating the user"});
                    });
                };
            });
        } else if (!request.body.password) {
            return response.status(400).json({message: "password not provided"});
        } else if (!request.body.email) {
            return response.status(400).json({message: "email not provided"});
        };
    })
    .catch(error => {
        console.log('error', error);
    });
};

const login = (request, response, next) => {
    // checks if email exists
    User.findOne({ where : {
        email: request.body.email, 
    }})
    .then(users => {
        if (!users) {
            return response.status(404).json({message: "user not found"});
        } else {
            // password hash
            bcrypt.compare(request.body.password, users.password, (error, compareRes) => {
                if (error) { // error while comparing
                    response.status(502).json({message: "error while checking user password"});
                } else if (compareRes) { // password match
                    const token = Jwt.sign({ email: request.body.email }, 'secret', { expiresIn: '1h' });
                    response.status(200).json({message: "user logged in", "token": token});
                } else { // password doesnt match
                    response.status(401).json({message: "invalid credentials"});
                };
            });
        };
    })
    .catch(err => {
        console.log('error', err);
    });
};


const isAuth = (request, response, next) => {
    const authHeader = request.get('Authorization')
    if (!authHeader) {
        return response.status(401).json({ message: 'not authenticated' })
    }

    const token = authHeader.split(' ')[1]
    let decodedToken

    try {
        decodedToken = Jwt.verify(token, 'secret')
    } catch (error) {
        return response.status(500).json({ message: error.message || 'coud not decode the token' })
    }

    if (!decodedToken) {
        response.json(401).json({ message: 'unauthorized' })
    } else {
        response.status(200).json({ message: 'here is your resource' })
    }
}

export { signUp, login, isAuth }