const JWT={
    jwt: process.env.JWT_SECRET || '12345-67890-09876-54321',
    jwtExp: process.env.JWT_EXPIRE || '365d',
}

module.exports={JWT}