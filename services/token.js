import jwt from 'jsonwebtoken'

const generateJWTToken = userId => {
	const accessToken = jwt.sign({userId}, "Javoh", {expiresIn: '30d'})

	return accessToken
}

export {generateJWTToken}
