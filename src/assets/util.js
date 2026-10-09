export const getHoy = ()=>{
    const d = new Date();
    let anio = d.getFullYear(),
        mes = d.getMonth()+1,
        dia = d.getDate();

    mes = (mes >= 10)  ? mes : (`0${mes}`);
    dia = (dia >= 10)  ? dia : (`0${dia}`);

    return `${anio}-${mes}-${dia}`;
};

export const getHora = ()=>{
    const d = new Date();
    let hora = d.getHours(),
        min = d.getMinutes(),
        seg = d.getSeconds();

    hora = (hora >= 10)  ? hora : (`0${hora}`);
    min = (min >= 10)  ? min : (`0${min}`);
    seg = (seg >= 10)  ? seg : (`0${seg}`);

    return  `${hora}:${min}:${seg}`;
}