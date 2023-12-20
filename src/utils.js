
const devApi = "http://192.168.0.8:3000/api/v1";
const productApi = "https://tgp-hn-api.vercel.app/api/v1";
class Utils {
    apiUrl = productApi;

    formatDate(date) {
        return new Date(date).toLocaleDateString('en-GB'); 
    }
}

module.exports = new Utils