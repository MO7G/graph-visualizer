
class DisjSet {
    constructor(n) {
        this.rank = new Array(n);
        this.parent = new Array(n);
        this.n = n;
        this.makeSet();
    }

    makeSet() {
        for (let i = 0; i < this.n; i++) {
            this.parent[i] = i;
        }
    }

    find(x) {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]);
        }
        return this.parent[x];
    }

    Union(x, y) {
        x = this.find(x);
        y = this.find(y);

        if (x === y) return;

        if (this.rank[x] < this.rank[y]) {
            [x, y] = [y, x];
        }
        this.parent[y] = x;
        if (this.rank[x] === this.rank[y]) {
            this.rank[x] = this.rank[x] + 1;
        }

    }
}

module.exports = DisjSet;