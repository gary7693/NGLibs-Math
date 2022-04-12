"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Octree = void 0;
const Vector3_1 = require("./Vector3");
class Octree {
    constructor(bound, level = 3) {
        this.level = level;
        this.boundary = bound.splice(0);
        let { boundary } = this;
        if (level <= 0)
            return this;
        this.child = [];
        let center = Vector3_1.Vector3.averageList(boundary);
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 2; j++) {
                for (let k = 0; k < 2; k++) {
                    let b0 = new Vector3_1.Vector3(i ? boundary[0].x : boundary[1].x, j ? boundary[0].y : boundary[1].y, k ? boundary[0].z : boundary[1].z);
                    this.child.push(new Octree([b0, center.clone()], level - 1));
                }
            }
        }
    }
    add(element) {
        if (!this.isWithin(element.pos))
            return false;
        if (!this.contents)
            this.contents = [];
        this.contents.push(element);
        if (this.level <= 0)
            return true;
        for (let childen of this.child) {
            if (childen.add(element))
                break;
        }
        return true;
    }
    isWithin(pos) {
        let { boundary: boundry } = this;
        try {
            if ((pos.x > Math.max(boundry[0].x, boundry[1].x)) || (pos.x < Math.min(boundry[0].x, boundry[1].x)))
                return false;
            if ((pos.y > Math.max(boundry[0].y, boundry[1].y)) || (pos.y < Math.min(boundry[0].y, boundry[1].y)))
                return false;
            if ((pos.z > Math.max(boundry[0].z, boundry[1].z)) || (pos.z < Math.min(boundry[0].z, boundry[1].z)))
                return false;
            return true;
        }
        catch (_a) {
            throw ('check border failed');
        }
    }
    isCloseTo(pos, range = 0) {
        let { boundary: boundry } = this;
        if (range == 0)
            return this.isWithin(pos);
        try {
            if (((pos.x - range) > Math.max(boundry[0].x, boundry[1].x)) || ((pos.x + range) < Math.min(boundry[0].x, boundry[1].x)))
                return false;
            if (((pos.y - range) > Math.max(boundry[0].y, boundry[1].y)) || ((pos.y + range) < Math.min(boundry[0].y, boundry[1].y)))
                return false;
            if (((pos.z - range) > Math.max(boundry[0].z, boundry[1].z)) || ((pos.z + range) < Math.min(boundry[0].z, boundry[1].z)))
                return false;
            return true;
        }
        catch (_a) {
            throw ('check border failed');
        }
    }
    nearBy(pos, range, res, filter = (check) => true) {
        let { contents, child, level } = this;
        if (!contents || contents.length == 0)
            return false;
        if (!this.isCloseTo(pos, range))
            return false;
        if (level == 0) {
            for (let content of contents) {
                if (filter(content.element)) {
                    if (content.pos.distanceTo(pos) <= range) {
                        res.push(content);
                    }
                }
            }
        }
        else {
            for (let node of child) {
                node.nearBy(pos, range, res, filter);
            }
        }
        return true;
    }
    /**
     *
     * @param pos The Position to Detectd.
     * @param res  The object return the result content
     * @param filter Costum filter call back
     * @returns Result
     */
    nearest(pos, res, filter = (check) => true) {
        let { contents, child, level } = this;
        if (!contents || contents.length == 0)
            return false;
        if (res.curNearest) {
            //let range = pos.distanceTo(res.curNearest.pos);
            if (!this.isCloseTo(pos, res.distance)) //range))
                return false;
        }
        else {
            if (!this.isWithin(pos))
                return false;
        }
        if (level == 0) {
            for (let content of contents) {
                if (filter(content.element)) {
                    if (res.curNearest) {
                        let dist = content.pos.distanceTo(pos);
                        if (dist < res.distance) {
                            res.curNearest = content;
                            res.distance = dist;
                        }
                    }
                    else {
                        res.curNearest = content;
                        res.distance = content.pos.distanceTo(pos);
                    }
                }
            }
        }
        else {
            for (let node of child) {
                node.nearest(pos, res, filter);
            }
        }
        return true;
    }
}
exports.Octree = Octree;
