//이미지 주소 함수
// id: string, format: 사진 사이즈
export function makeImagePath(id:string, format?:string){
    return `https://image.tmdb.org/t/p/${format?format:"original"}/${id}`
}

// https://image.tmdb.org/t/p/original/wdrCwmRnLFJhEoH8GSfymY85KHT.png