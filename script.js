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
        new Transition("1", "2", "up 1", "2"),
        new Transition("1", "3", "up 2", "3"),
        new Transition("1", "4", "up 3", "4"),
        new Transition("1", "5", "up 4", "5"),
        new Transition("2", "1", "down 1", "1"),
        new Transition("2", "3", "up 1", "3"),
        new Transition("2", "4", "up 2", "4"),
        new Transition("2", "5", "up 3", "5"),
        new Transition("3", "2", "down 1", "2"),
        new Transition("3", "1", "down 2", "1"),
        new Transition("3", "4", "up 1", "4"),
        new Transition("3", "5", "up 2", "5"),
        new Transition("4", "2", "down 2", "2"),
        new Transition("4", "3", "down 1", "3"),
        new Transition("4", "1", "down 3", "1"),
        new Transition("4", "5", "up 1", "5"),
        new Transition("5", "2", "down 3", "2"),
        new Transition("5", "3", "down 2", "3"),
        new Transition("5", "4", "down 1", "4"),
        new Transition("5", "1", "down 4", "1"),
    ];

    let fsm = new FiniteStateMachine("1");
    fsm.add_transitions(transitions);
    
    document.getElementById("button-1").addEventListener("click", function (e) {
        let input = "1";
        let res = fsm.accepts([input]);
        document.querySelectorAll(".elevator")[0].className = "elevator floor-" + input;
    });
    document.getElementById("button-2").addEventListener("click", function (e) {
        let input = "2";
        let res = fsm.accepts([input]);
        document.querySelectorAll(".elevator")[0].className = "elevator floor-" + input;
    });
    document.getElementById("button-3").addEventListener("click", function (e) {
        let input = "3";
        let res = fsm.accepts([input]);
        document.querySelectorAll(".elevator")[0].className = "elevator floor-" + input;
    });
    document.getElementById("button-4").addEventListener("click", function (e) {
        let input = "4";
        let res = fsm.accepts([input]);
        document.querySelectorAll(".elevator")[0].className = "elevator floor-" + input;
    });
    document.getElementById("button-5").addEventListener("click", function (e) {
        let input = "5";
        let res = fsm.accepts([input]);
        document.querySelectorAll(".elevator")[0].className = "elevator floor-" + input;
    });
});