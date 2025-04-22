import {Window} from "./core/ui"
import {Button} from "./widgets/button"
import {checkBox} from "./widgets/checkbox";
import {radioButton, radioGroup} from "./widgets/radioButton";
import { scrollBar } from "./widgets/scrollBar";
import { progressBar } from "./widgets/progressBar";
import {Heading} from "./widgets/heading"


let w = new Window(window.innerHeight-10,'100%');

let lbl1= new Heading(w);
lbl1.text = "Button Demo";
lbl1.tabindex = 1;
lbl1.fontSize = 16;
lbl1.move(10,20);

let btn = new Button(w);
btn.tabindex = 2;
btn.fontSize = 14
btn.move(12, 50)

btn.onClick(() => {
    lbl1.text = "Button was clicked!";
});

let cb = new checkBox(w);
cb.move(12, 100)

let rb1 = new radioButton(w, '1');
rb1.move(12, 150)

let rb2 = new radioButton(w, '2');
rb2.move(12, 200)

let rb3 = new radioButton(w, '3');
rb3.move(12, 250)

let rg = new radioGroup()
rg.add(rb1);
rg.add(rb2);
rg.add(rb3);

let sb = new scrollBar(w);
sb.move(12, 300)

let pb = new progressBar(w);
pb.move(12, 500)
