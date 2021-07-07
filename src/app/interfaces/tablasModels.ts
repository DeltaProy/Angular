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
    cargos: Cargo[];
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

export interface Peticion{
    idpeticion?: number;
    titulo: string;
    despeticion: string;
    idarea: number;
    idusuario: number | null;
    idasignado?: number;
    estado: string;
    detalles: PeticionDet[];
}

export interface PeticionDet{
    idpeticion: number;
    fecha_mov: Date;
    id_usuario: number;
    estado_ant: string | null;
    estado_act: string;
    observacion: string;
}

export interface Personal{
    idpersonal: number,
    idtipodoc: number,
    nrodoc: string,
    nomper: string,
    apeper: string,
    idempresa: number,
    idarea: number,
    idcargo: number,
    fotografia: string
}