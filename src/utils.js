
const devApi = "http://192.168.0.8:3000/api/v1";
const productApi = "https://tgp-hn-api.vercel.app/api/v1";
class Utils {
    apiUrl = productApi;

    formatDate(date) {
        return new Date(date).toLocaleDateString('en-GB'); 
    }

    filterDoanSinh(listThanhVien) {
        const listDoanSinh = listThanhVien.filter((e) =>  
            e.idCapKhan != "6568504d160bbc528d507af6" && 
            e.idCapKhan != "6568505a160bbc528d507af8" && 
            e.idCapKhan != "6568505e160bbc528d507afa" &&
            e.idCapKhan != "65685062160bbc528d507afc" &&
            e.idCapKhan != "6568507b160bbc528d507afe" &&
            e.idCapKhan != "65685084160bbc528d507b00" &&
            e.idCapKhan != "6568508d160bbc528d507b02" &&
            e.idCapKhan != "6568509b160bbc528d507b04" &&
            e.idCapKhan != "656850ac160bbc528d507b06" &&
            e.idCapKhan != "656850b8160bbc528d507b08"
        )
        return listDoanSinh;
    }

    filterGLV(listThanhVien) {
        const listGLV = listThanhVien.filter((e) => 
            e.idCapKhan == "6568504d160bbc528d507af6" || 
            e.idCapKhan == "6568505a160bbc528d507af8" || 
            e.idCapKhan == "6568505e160bbc528d507afa" ||
            e.idCapKhan == "65685062160bbc528d507afc"
        )
        return listGLV;
    }
}

module.exports = new Utils