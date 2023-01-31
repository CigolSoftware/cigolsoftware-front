import { NgForm, NgModel } from "@angular/forms";
import { Project, Skill } from "./data";
import { Service } from "../services/service";
import { Subject, timer } from "rxjs";
import { Toast } from "./dto";

export class Constants {
    public static EMPTY = 'Este campo no puede estar vacío.';
    public static GREATER = 'Este campo debe ser mayor que el campo \'{0}\'';
    public static EXISTS_PROJECT = 'Ya existe un proyecto con este nombre.';
    public static EXISTS_SKILL = 'Ya existe una habilidad con este nombre.';
    public static NETWORK_ERROR = 'No logramos conectarnos con el servidor, revisa tu conexión o intentalo más tarde.';
    public static POSITIVE = 'Este campo debe ser un número positivo.';
    public static PROJECT_NULL: Project = { name: '' }

    public static proyectModified(project: Project, modification: 'actualizado' | 'creado' | 'eliminado') { return "Proyecto '" + project.name + "' " + modification + " correctamente" };
    public static skillModified(skill: Skill, modification: 'actualizada' | 'creada' | 'eliminada') { return "Habilidad '" + skill.name + "' " + modification + " correctamente" };
}

export class Utilities {

    private static AVAILABLE = true;
    private static LAST = false;
    private static NEXT = false;
    private static TIME = 0;
    private static WAITING = 0;

    public static MENU = new Subject<void>();
    public static TOAST = new Subject<Toast>();
    public static WAIT = new Subject<boolean>();

    private static async next(wait: boolean) {
        Utilities.NEXT = wait;
        if (Utilities.AVAILABLE) {
            Utilities.AVAILABLE = false;
            timer(500).subscribe(() => {
                Utilities.AVAILABLE = true;
                if (Utilities.LAST !== Utilities.NEXT) {
                    Utilities.LAST = Utilities.NEXT;
                    Utilities.WAIT.next(Utilities.NEXT);
                }
            });
        }
    }

    public static async wait(wait: boolean) {
        if (wait) {
            Utilities.WAITING++;
            while (Utilities.TIME < 5) {
                await new Promise(r => setTimeout(r, 500));
                Utilities.TIME++;
            }
        } else Utilities.WAITING--;
        Utilities.TIME = 0;
        if (Utilities.WAITING > 0 && !Utilities.NEXT) Utilities.next(true);
        else if (Utilities.WAITING <= 0 && Utilities.NEXT) Utilities.next(false);
    }

    public static menu() { timer(1).subscribe(() => Utilities.MENU.next()); }
    public static toast(toast: Toast) { Utilities.TOAST.next(toast); }

}

export abstract class Form {
    protected static readonly ERRORS = [
        { name: 'complete', submited: true },
        { name: 'greater', submited: true },
        { name: 'positive', submited: true },
        { name: 'unique', submited: false }
    ];
    public submited?: boolean;

    constructor(protected service: Service<any>) { }

    public hasError(model: NgModel) {
        if (!model.errors) return null;
        for (let error of Form.ERRORS) if (model.errors && model.errors[error.name]) return error.submited && !this.submited ? null : model.errors[error.name];
    }

    public abstract postSubmit(): void;

    public submit(form: NgForm, id?: number) {
        this.submited = true;
        if (form.valid && form.dirty) this.service.save({ id: id, ...form.value }).subscribe(b => { if (b) this.postSubmit() });
    }
}