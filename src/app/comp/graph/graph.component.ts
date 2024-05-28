import { Component } from '@angular/core';
import * as JXG from "jsxgraph";
import {Point} from "../../Point";
import {GeometryElement} from "jsxgraph";
import {Respon} from "../../response";


@Component({
  selector: 'app-graph',
  standalone: true,
  imports: [],
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.css'
})
export class GraphComponent {
  board!: JXG.Board;
  lines: GeometryElement[] = [];
  maxBoard!: number[];


  ngOnInit() {
    this.board = this.boardInit([-5, 5, 5, -5]);
  }



  odeDraw(resp: Respon) {
    let xList = resp.xList;
    let yList = resp.exact;
    let euler = resp.euler;
    let rungeKutt = resp.runge;
    let milne=resp.milne;
    this.maxBoard = this.maxBoardAbs(xList,yList);
    this.cleanBoard();
    this.board = this.boardInit(this.maxBoard);

    this.lines.push(this.board.create('curve', [xList,yList], {
      dash: 2, strokeColor: 'black', strokeWidth: 10
    }));

    this.lines.push(this.board.create('curve', [xList,euler], {
      dash: 2, strokeColor: 'yellow', strokeWidth: 6
    }));

    this.lines.push(this.board.create('curve', [xList,rungeKutt], {
      dash: 2, strokeColor: 'red', strokeWidth: 3
    }));
    this.lines.push(this.board.create('curve', [xList,milne], {
      dash: 2, strokeColor: 'fuchsia', strokeWidth: 3
    }));

  }

  pointDraw(xy: number[]) {
    this.lines.push(this.board.create('point', [xy[0], xy[1]], {
      name: '', fixed: true, color: "green", fillOpacity: 1, visible: true,
      strokewidth: 1
    }));
  }

  allPointsDraw(point: Point) {

    let n = point.x.length;
    for (let i = 0; i < n; i++) {
      this.pointDraw([point.x[i], point.y[i]]);
    }

  }


  cleanBoard() {
    for (const object of this.lines) {
      this.board.removeObject(object);
    }
  }

  boardInit(boardData: number[]) {
    // -5, 5, 5, -5
    return JXG.JSXGraph.initBoard('jxgbox', {
      boundingbox: [boardData[0], boardData[1], boardData[2], boardData[3]],
      grid: true,
      showCopyright: false,
      axis: true,
      defaultAxes: {
        x: {
          ticks: {
            drawZero: true,
            majorHeight: 5,
            minTicksDistance: 1,
            strokeColor: 'black',
          },
          name: 'X',
          withLabel: true,
          color: 'black',
          label: {
            position: 'rt',
            offset: [7, 10],
            anchorX: 'right',
            color: 'black'
          }
        },
        y: {
          ticks: {
            majorHeight: 5,
            minTicksDistance: 1,
            strokeColor: 'black',
          },
          color: 'black',
          withLabel: true,
          name: 'Y',
          label: {
            position: 'rt',
            offset: [-15, 10],
            anchorY: 'top',
            color: "black",

          }
        }
      },
      description: 'super-puper graph',


    });
  }


  maxBoardAbs(arr1: number[], arr2: number[]): number[] {

    let a = Math.floor(Math.min(...arr1))-0.1;
    let b = Math.ceil(Math.max(...arr2))+0.1;
    let c = Math.ceil(Math.max(...arr1))+0.1;
    let d = Math.floor(Math.min(...arr2))-0.1;
    console.log("kokok")
    console.log(a,b,c,d)

    if (a > -0.8) {
      a = -0.8;
    }
    if (c < 0.8) {
      c = 0.8;
    }
    if (b < 0.8) {
      b = 0.8;
    }
    if (d >= 0) {
      d = -0.8;
    }
    console.log(a,b,c,d)


    return [a, b, c, d];
  }
}
