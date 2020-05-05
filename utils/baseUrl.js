const basrUrl = 
process.env.NODE_ENV === "production" ? 'https://dhome-sweet-home.now.sh'
: 'http://localhost:3000';

export default basrUrl;