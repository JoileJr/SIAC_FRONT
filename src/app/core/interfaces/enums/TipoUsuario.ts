export enum TipoUsuario {
    ADMINISTRADOR = "Administrador",
    PACIENTE = "Paciente",
    ADMINISTRATIVO = "Administrativo",
    MEDICO = "Médico",
    ENFERMEIRO = "Enfermeiro",
    TECNICO_ENFERMAGEM = "Técnico de Enfermagem",
    BIOMEDICO = "Biomédico"
}

export function getDescricao(tipo: TipoUsuario): string {
    return tipo;
}
