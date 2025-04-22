// importing local code, code we have written
import {Path, Text, Circle} from "@svgdotjs/svg.js";
import {Window, Widget, RoleType} from "../core/ui";
// importing code from SVG.js library
import {Rect, IdleUpWidgetState} from "../core/ui";

class radioButton extends Widget{
    private _circle: Circle;
    private _innercircle: Circle;
    private defaultDiameter: number = 20;
    private _checked: boolean = false;
    private _label: Text;
    public name: string;
    private _groupManager: radioGroup | null = null;

    constructor(parent:Window, name: string){
        super(parent);
        this.name = name;
        this.role = RoleType.button;
        this.setState(new IdleUpWidgetState());
        this.render();
    }

    render(): void {
        this._group = (this.parent as Window).window.group();
        this.outerSvg = this._group;

        // Transparent rect to prevent selection cursor
        this._group.circle(this.defaultDiameter).opacity(0);
      
        // Outer circle
        this._circle = this._group
            .circle(this.defaultDiameter)
            .fill('white')
            .stroke({ color: 'black', width: 2 });

        // Inner Circle (initially hidden)
        this._innercircle = this._group
            .circle(this.defaultDiameter - 5)
            .fill('pink')
            .hide();

        this._label = this._group
        .text('Choice')
        .font({ size: 14, anchor: 'start' })
        .move(this.defaultDiameter + 5, 2);
        this._label.on('click', () => this.editLabel());

        this.registerEvent(this._group);
    }

    set groupManager(manager: radioGroup) {
        this._groupManager = manager;
    }

    setChecked(value: boolean): void {
        this._checked = value;
        value ? this._innercircle.show() : this._innercircle.hide();
    }

    onClick(): void {
        if (this._groupManager) {
            this._groupManager.select(this)
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

class radioGroup {
    private buttons: radioButton[] = [];

    add(button: radioButton): void {
        this.buttons.push(button);
        button.groupManager = this;
    }

    select(selected: radioButton): void {
        this.buttons.forEach(btn => btn.setChecked(btn === selected));
        console.log('Radio Button: "', selected.name, '" has been checked.');
    }
}

export {radioButton, radioGroup}