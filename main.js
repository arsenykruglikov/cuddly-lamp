import "./style.css";
import { findClosest, findClosestAsync } from "./findClosest";

const elements = document.getElementsByClassName("box");

const candidates = [];

function focus(element) {
  element.focus();
}

for (const element of elements) {
  candidates.push(element);
}

let kek = 100;
let lol = 100;

function handleKeyDown(event) {
  const target = event.target;

  if (event.key === "s" && kek !== 0) {
    kek--;
    const closest = findClosest(target, candidates);
    // closest.focus();
    return;
  }

  if (event.key === "a" && lol !== 0) {
    lol--;
    const closest = findClosestAsync(target, candidates);
    // closest.then(focus);
    return;
  }
}

window.addEventListener("keydown", handleKeyDown);
