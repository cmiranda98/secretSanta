import {
    RESTORE_DATA, RESTORE_DATA_FINISHED,
    MODIFY_MEMBERS,
    GENERATE_DATA, GENERATE_DATA_FINISHED
} from "../_constant";
import { Alert, AlertType, GetLocalStorage, SetLocalStorage, FactorialRecursive } from "../_utility";
import HGraph from "../_utility/grafo";

export const RestoreFromMemory = () => (Dispatch) => {
    Dispatch({ type: RESTORE_DATA });
    let data = GetLocalStorage("members", true);
    let to = setTimeout(() => {
        Dispatch({ type: RESTORE_DATA_FINISHED, payload: data ?? [] });
        clearTimeout(to);
    }, 500);
};

export const ModifyMembers = (data) => (Dispatch) => {
    SetLocalStorage("members", data);
    Dispatch({ type: MODIFY_MEMBERS, payload: data });
};

const GenerateHashMap = (dictionary, members, parentName = null) => {
    for (let i = 0; i < members.length; i++) {
        const element = members[i], name = element.key, children = element.children || [];
        let relativesNames = children.map((e) => e.key);
        if (parentName !== null) relativesNames.push(parentName);
        dictionary[element.key] = {
            name,
            direct: relativesNames
        };
        if (children.length > 0) GenerateHashMap(dictionary, children, name);
    }
    return;
};

const AddPosibilitiesHashMap = (dictionary) => {
    let list = [];
    for (const [key] of Object.entries(dictionary)) {
        list.push(key);
    }
    for (const [key] of Object.entries(dictionary)) {
        let relatives = dictionary[key].direct;
        dictionary[key].posibilities = list.filter((e) => !relatives.includes(e) && e !== key);
    }
    return;
};

const ComparePosibility = (element, last) => {
    if (last === null) return true;
    var interCurrent = [], result = true;
    for (let i = 0; i < element.length - 1; i++) {
        interCurrent.push(element[i] + element[i + 1])
    }
    for (let i = 0; i < last.length - 1; i++) {
        if (interCurrent.includes(last[i] + last[i + 1])) {
            result = false;
            break;
        }
    }
    return result;
};

const CanAppendPosibility = (output, element) => {
    const len = output.length, last1 = len > 0 ? output[len - 1] : null, last2 = len > 1 ? output[len - 2] : null, last3 = len > 2 ? output[len - 3] : null;
    if (!ComparePosibility(element, last1)) return false;
    if (!ComparePosibility(element, last2)) return false;
    if (!ComparePosibility(element, last3)) return false;
    return true;
};

const OrderPosibilities = (posibilities) => {
    let output = [], noMovements = false;
    if (posibilities.length === 0) Alert("No se encontraron formas de organizar, trata de incluir mas datos.", AlertType.info);
    else {
        output.push(posibilities[0]);
        posibilities.splice(0, 1);
        while (!noMovements) {
            noMovements = true;
            for (let i = 0; i < posibilities.length; i++) {
                const element = posibilities[i];
                if (CanAppendPosibility(output, element)) {
                    output.push(posibilities[i]);
                    posibilities.splice(i, 1);
                    noMovements = false;
                }
                if (output.length > 49) {
                    noMovements = true;
                    break;
                }
            }
        }
    }
    return output;
};

const CreateGraph = (graph, dictionary) => {
    let nodes = [];
    for (const [key, values] of Object.entries(dictionary)) {
        const children = values.posibilities || [];
        nodes.push(key);
        graph.addNode(key);
        if (children.length > 0)
            children.forEach((e) => {
                graph.addLine(key, e);
            });
    }
    return graph;
};

const ComplexCalculus = (dictionary) => {
    var complex = 1;
    for (const values of Object.values(dictionary)) {
        let f = FactorialRecursive(values.posibilities.length);
        complex = f + complex;
    }
    return complex * .7;
};

export const GenerateData = (callback) => (Dispatch, GetStore) => {
    Dispatch({ type: GENERATE_DATA });
    const { members } = GetStore().santa, graph = new HGraph();
    if (members.length === 0) {
        Alert("Se deben incluir personas para poder organizar.", AlertType.info);
        Dispatch({ type: GENERATE_DATA_FINISHED, payload: [] });
    } else {
        const dictionary = [];
        GenerateHashMap(dictionary, members);
        AddPosibilitiesHashMap(dictionary);
        if (ComplexCalculus(dictionary) > 1500000) {
            Alert("La complejidad del acomodo es demasiado alta.", AlertType.info);
            Dispatch({ type: GENERATE_DATA_FINISHED, payload: [] });
        } else {
            CreateGraph(graph, dictionary);
            Dispatch({ type: GENERATE_DATA_FINISHED, payload: OrderPosibilities(graph.findAllHamilton() ?? []) });
        }
    }
    if(callback) callback();
};
