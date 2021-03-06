"use strict";

class Transition {
    constructor(current, input, output, next) {
        this.current = current;
        this.input = input;
        this.output = output;
        this.next = next;
    }

    match(current, input) {
        return this.current === current && this.input === input;
    }
}

class FiniteStateMachine {
    constructor(initial_state) {
        this.initial_state = initial_state;
    }

    add_transitions(transitions) {
        this.transitions = transitions;
    }

    get_next(current, input) {
        for (let rule of this.transitions) {
            if (rule.match(current, input)) {
                let log = document.getElementById("log");
                log.innerHTML = rule.output;

                return rule.next;
            }
        }
    }

    accepts(sequence) {
        console.log(`Current state is ${this.initial_state}`);

        let current = this.get_next(this.initial_state, sequence[0]);
        console.log(`New state is ${current}`);

        for (let input of sequence.slice(1)) {
            current = this.get_next(current, input);
            console.log(`New state is ${current}`);
        }
        this.initial_state = current;

        return current;
    }
}

document.addEventListener("DOMContentLoaded", function (e) {
    // Finite State Machine initialisation
    let transitions = [
        new Transition("1", "1", "Elevator stopped", "1"),
        new Transition("1", "2", "Elevator moved up 1 floor", "2"),
        new Transition("1", "3", "Elevator moved up 2 floors", "3"),
        new Transition("1", "4", "Elevator moved up 3 floors", "4"),
        new Transition("2", "2", "Elevator stopped", "2"),
        new Transition("2", "1", "Elevator moved down 1 floor", "1"),
        new Transition("2", "3", "Elevator moved up 1 floor", "3"),
        new Transition("2", "4", "Elevator moved up 2 floors", "4"),
        new Transition("3", "3", "Elevator stopped", "3"),
        new Transition("3", "2", "Elevator moved down 1 floor", "2"),
        new Transition("3", "1", "Elevator moved down 2 floors", "1"),
        new Transition("3", "4", "Elevator moved up 1 floor", "4"),
        new Transition("4", "4", "Elevator stopped", "4"),
        new Transition("4", "2", "Elevator moved down 2 floors", "2"),
        new Transition("4", "3", "Elevator moved down 1 floor", "3"),
        new Transition("4", "1", "Elevator moved down 3 floors", "1"),
    ];

    let fsm = new FiniteStateMachine("1");
    fsm.add_transitions(transitions);

    const freeze_buttons = function() {
        Array.from(document.querySelectorAll("button")).forEach(
            (x) => {x.disabled = true}
        );
        
        setTimeout(function() {
            Array.from(document.querySelectorAll("button")).forEach(
                (x) => {x.disabled = false}
            );
        }, 3000);
    }

    document.getElementById("button-1").addEventListener("click", function (e) {
        let input = "1";
        let res = fsm.accepts([input]);
        document.querySelectorAll(".elevator")[0].className = "elevator floor-" + input;
        freeze_buttons();
    });
    document.getElementById("button-2").addEventListener("click", function (e) {
        let input = "2";
        let res = fsm.accepts([input]);
        document.querySelectorAll(".elevator")[0].className = "elevator floor-" + input;
        freeze_buttons();
    });
    document.getElementById("button-3").addEventListener("click", function (e) {
        let input = "3";
        let res = fsm.accepts([input]);
        document.querySelectorAll(".elevator")[0].className = "elevator floor-" + input;
        freeze_buttons();
    });
    document.getElementById("button-4").addEventListener("click", function (e) {
        let input = "4";
        let res = fsm.accepts([input]);
        document.querySelectorAll(".elevator")[0].className = "elevator floor-" + input;
        freeze_buttons();
    });
});