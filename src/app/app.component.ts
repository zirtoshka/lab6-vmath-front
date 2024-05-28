import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AppService} from "./app.service";
import {GraphComponent} from "./comp/graph/graph.component";
import {FormComponent} from "./comp/form/form.component";
import {ToastModule} from "primeng/toast";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GraphComponent, FormComponent, ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'lab6-vmath-front';
  constructor(public appService:AppService) {
  }
}

