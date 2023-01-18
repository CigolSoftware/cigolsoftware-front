import { Subject, timer } from "rxjs";
import { Project } from "./data";
import { Toast } from "./dto";

export class Constants {
    public static EMPTY_NAME = 'El nombre no puede estar vacío.';
    public static NETWORK_ERROR = 'No logramos conectarnos con el servidor, revisa tu conexión o intentalo más tarde.';
    public static PROJECT_EXIST = 'Ya existe un proyecto con este nombre.';
    public static PROJECT_NULL: Project = { name: '' }

    public static proyectModified(project: Project, modification: 'actualizado' | 'creado' | 'eliminado') { return "Proyecto '" + project.name + "' " + modification + " correctamente" };
}

export class Utilities {

    private static LAST = false;
    private static NEXT = false;
    private static AVAILABLE = true;
    private static TIME = 0;
    private static WAITING = 0;

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

    public static toast(toast: Toast) { Utilities.TOAST.next(toast) }
    public static async wait(wait: boolean) {
        if (wait) {
            Utilities.WAITING++;
            while (Utilities.TIME < 5) {
                await Utilities.await(500);
                Utilities.TIME++;
            }
        } else Utilities.WAITING--;
        Utilities.TIME = 0;
        if (Utilities.WAITING > 0 && !Utilities.NEXT) Utilities.next(true);
        else if (Utilities.WAITING <= 0 && Utilities.NEXT) Utilities.next(false);
    }

    public static await(time: number) { return new Promise(r => setTimeout(r, time)); }

}