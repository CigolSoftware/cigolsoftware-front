export interface Body<R> { code: number; message: string; response: R; }
export interface Dto { id?: number, name: string }
export interface Project extends Dto { }
export interface Skill extends Dto{ easy: number, hard: number, normal: number }