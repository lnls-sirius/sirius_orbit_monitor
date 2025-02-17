import { OrbitData } from "../assets/interfaces/types";

// Switch states
function changeStates(state1: any, state2: any): Array<any>{
    let stateTemp = state2;
    state2 = state1;
    state1 = stateTemp;
    return [state1, state2];
}

// Return the other BPM Axis
function reverseAxis(axis: string): string {
    if(axis === 'X'){
        return 'Y';
    }else{
        return 'X';
    }
}

// Sort a string or number list
function sortList(listToSort: Array<OrbitData>, elem: number): Array<OrbitData>{
    if(typeof listToSort[0][elem] === "string"){
        return listToSort.sort(
            (first: OrbitData, second: OrbitData) => {
                return String(first[elem]).localeCompare(String(second[elem]));
            }
        );
    }else if(typeof listToSort[0][elem] === "number"){
        return listToSort.sort(
            (first: OrbitData, second: OrbitData) => {
                return Math.abs(Number(first[elem])) - Math.abs(Number(second[elem]));
            }
        );
    }
    return listToSort;
}

export {
    changeStates,
    reverseAxis,
    sortList
}
