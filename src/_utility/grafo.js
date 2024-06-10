export default class HGraph {
    constructor() {
        this.nodes = [];
        this.lines = {};
    };

    addNode(node) {
        if (!this.nodes.includes(node)) {
            this.nodes.push(node);
            this.lines[node] = [];
        }
    };

    addLine(line1, line2) {
        if (!this.lines[line1]) this.addNode(line1);
        if (!this.lines[line2]) this.addNode(line2);

        this.lines[line1].push(line2);
        this.lines[line2].push(line1);
    };

    findAllHamilton() {
        const ciclos = [];
        const permutaciones = this.changeNodes();
        for (const permutacion of permutaciones)
            if (this.doHamilton(permutacion)) ciclos.push(permutacion);
        return ciclos;
    };

    changeNodes() {
        const permutaciones = [];
        const permutarRecursivo = (actual, resto) => {
            if (resto.length === 0) {
                permutaciones.push(actual);
                return;
            }
            for (let i = 0; i < resto.length; i++) {
                permutarRecursivo([...actual, resto[i]], resto.slice(0, i).concat(resto.slice(i + 1)));
            }
        };
        permutarRecursivo([], this.nodes);
        return permutaciones;
    };

    doHamilton(permutacion) {
        permutacion.push(permutacion[0]);
        for (let i = 0; i < permutacion.length - 1; i++)
            if (!this.lines[permutacion[i]].includes(permutacion[i + 1]))
                return false;
        return true;
    };
};
