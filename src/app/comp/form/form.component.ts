import {Component, EventEmitter, inject, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AppService} from "../../app.service";
import {Req} from "../../request";
import {MatRadioButton, MatRadioChange, MatRadioGroup} from "@angular/material/radio";
import {InputGroupAddonModule} from "primeng/inputgroupaddon";
import {ButtonModule} from "primeng/button";
import {NgIf} from "@angular/common";
import {InputTextModule} from "primeng/inputtext";
import {Respon} from "../../response";


@Component({
    selector: 'app-form',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        InputGroupAddonModule,
        ButtonModule,
        NgIf,
        MatRadioGroup,
        MatRadioButton,
        InputTextModule
    ],
    templateUrl: './form.component.html',
    styleUrl: './form.component.css'
})
export class FormComponent {
    form: FormGroup;
    @Output() choseEvent = new EventEmitter<Respon>();
    private appService = inject(AppService);


    constructor(private formBuilder: FormBuilder) {
        this.form = formBuilder.group({
            "inaccuracy": ["0.1", [Validators.required,
                Validators.max(0.1),
                Validators.min(0),
                Validators.pattern('-?\\d+([\\.,]\\d+)?')]],
            "yInLeftBorder": ["0", [Validators.required,
                Validators.pattern('-?\\d+([\\.,]\\d+)?')]],
            "leftBorderX": ["0", [Validators.required,
                Validators.pattern('-?\\d+([\\.,]\\d+)?')]], //'\\d+(\\.|,\\d+)?'
            "rightBorderX": ["0", [Validators.required,
                Validators.pattern('-?\\d+([\\.,]\\d+)?')]],
            "equation": ["", [Validators.required]],
            "step": ["0.1", [Validators.required,
                Validators.pattern('-?\\d+([\\.,]\\d+)?'),
                Validators.min(0)]],
        });
    }



    submit() {
        this.choseEvent.emit(this.form.value.equation);
        const requestData: Req = {
            equation:this.form.value.equation,
            yInLeftBorder: this.form.value.yInLeftBorder,
            leftBorderX: this.form.value.leftBorderX,
            rightBorderX:   this.form.value.rightBorderX,
            inaccuracy:  this.form.value.inaccuracy,
            step:this.form.value.step
        };

        this.appService.odeRequest(
            requestData
        ).subscribe({
            next: (response) => {
                console.log(response);
                this.choseEvent.emit(response);

            },
            error: (error) => {
                if (error.status === 400) {
                    this.appService.show("error", "что-то пошло не так((", "я не могу посчитать( bad request**/");
                    this.appService.dataUser = error.error;
                } else {
                    this.appService.show("error", "что-то пошло не так((", "я не могу посчитать(");
                    this.appService.dataUser = error;
                }
            }
        });
    }


}
