export enum Color { DANGER = 'danger', PRIMARY = 'primary', SUCCESS = 'success', WARNING = 'warning' }

export enum Icon {
    CHECK = 'check',
    DOWNLOAD = 'download',
    EXCLAMATION = 'exclamation',
    PLUS = 'plus'
}

export interface Toast { color: Color; message: string; }