export interface TipoDoc{
    idtipodoc: number;
    descortipodoc: string;
    deslartipodoc: string;
}

export interface Empresa{
    idempresa: number;
    razonsocial: string;
    nroruc: string;
}

export interface Area{
    idarea: number;
    desarea: string;
    cargos: any[];
}

export interface Cargo{
    idcargo: number;
    idarea: number;
    descargo: string;
}

export interface TipoSoft{
    idtiposoft: number;
    destiposoft: string;
}

export interface Soft{
    idsoft: number;
    idtiposoft: number;
    dessoft: string;
}

export interface TipoDirec{
    idtipodir: number;
    destipodir: string;
}

export interface TipoTelf{
    idtipotelf: number;
    destipotelf: string;
}

export interface TipoEmail{
    idtipoemail: number;
    destipoemail: string;
}