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

console.log("yes")

// usage example
let obj = new DisjSet(5);
obj.Union(0, 2);
obj.Union(4, 2);
obj.Union(3, 1);

if (obj.find(4) === obj.find(0)) {
    console.log("Yes");
} else {
    console.log("No");
}
if (obj.find(1) === obj.find(0)) {
    console.log("Yes");
} else {
    console.log("No");
}
