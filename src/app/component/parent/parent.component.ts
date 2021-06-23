import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements OnInit {
  public formGroup: FormGroup;
  public disabled = true;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      time: ["11:00", [Validators.required]],
    })
  }

  public checkValidation(): boolean {
    let disabled = false;
    console.log(this.formGroup.controls);
    Object.keys(this.formGroup.controls).forEach(formControlName => {
      if (this.formGroup.controls[formControlName].errors) {
        disabled = true;
      }
    })

    return disabled;
  }

}
