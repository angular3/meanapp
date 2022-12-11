import { ElementRef } from "@angular/core";

declare var M: any;

export interface MaterialInstance {
    open?(): void,
    close?(): void,
    destroy?():void,
}

export class MaterialService {
    static toast(message: string) {
        M.toast({html: message})
    }

    static initializeFloatingButton(ref: ElementRef) {
        M.FloatingActionButton.init(ref.nativeElement) // with this we can have here our target el
    }

    static updateTextInputs() {
        M.updateTextFields();
    }

    static initModal(ref: ElementRef): MaterialInstance {
       return M.Modal.init(ref.nativeElement); // here we return element and then we can control it
    }
}
