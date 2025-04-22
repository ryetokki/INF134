// importing local code, code we have written
import {Path, Text} from "@svgdotjs/svg.js";
import {Window, Widget, RoleType} from "../core/ui";
// importing code from SVG.js library
import {Rect, IdleUpWidgetState} from "../core/ui";

class checkBox extends Widget{
    private _rect: Rect;
    private defaultWidth: number = 20;
    private defaultHeight: number = 20;
    private _checked: boolean = false;
    private _checkmark: Path;
    private _label: Text;
    private _labelInput: HTMLInputElement | null = null;

    constructor(parent:Window){
        super(parent);
        this.height = this.defaultHeight;
        this.width = this.defaultWidth;
        this.role = RoleType.button;
        this.setState(new IdleUpWidgetState());
        this.render();
    }

    render(): void {
        this._group = (this.parent as Window).window.group();
        this.outerSvg = this._group;

        // Transparent rect to prevent selection cursor
        this._group.rect(this.width, this.height).opacity(0).attr('id', 0);

        // Checkbox box
        this._rect = this._group
            .rect(this.width, this.height)
            .fill('white')
            .stroke({ color: 'black', width: 2 });

        // Checkmark (initially hidden)
        this._checkmark = this._group
            .path('M4 10 L8 14 L16 6') // checkmark
            .stroke({ color: 'pink', width: 2 })
            .fill('none')
            .hide();

        this._label = this._group
        .text('New Item')
        .font({ size: 14, anchor: 'start' })
        .move(this.width + 5, 2);
        this._label.on('click', () => this.editLabel());

        this.registerEvent(this._group);
    }

    onClick(): void {
        console.log('check box checked state has changed.')
        if (this._checked) {
            this._checkmark.show();
        } else {
            this._checkmark.hide();
        }
    }

    editLabel(): void {
        const bbox = this._label.bbox();

        const input = document.createElement('input');
        input.type = 'text';
        input.value = this._label.text();
        input.style.position = 'absolute';
        input.style.left = `${bbox.x + window.scrollX}px`;
        input.style.top = `${bbox.y + window.scrollY}px`;
        input.style.fontSize = '14px';
    
        document.body.appendChild(input);
        input.focus();
        this._label.hide();
    
        input.onblur = () => {
            this._label.text(input.value).show();
            input.remove();
        };
    
        input.onkeydown = (e) => {
            if (e.key === 'Enter' || e.key === 'Escape') {
                input.blur(); // triggers onblur logic
            }
        };
    }

    //TODO: give the states something to do! Use these methods to control the visual appearance of your
    //widget
    idleupState(): void {
    }
    idledownState(): void {
    }
    pressedState(): void {
    }
    pressReleaseState(): void {
        this._checked = !this._checked;
        this.onClick();
    }
    hoverState(): void {
    }
    hoverPressedState(): void {
    }
    pressedoutState(): void {
    }
    moveState(): void {
    }
    keyupState(): void {
    }
}

export {checkBox}