import { AfterViewInit, Component, ElementRef, Input, OnInit, Self, ViewChild } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss']
})
export class TimePickerComponent implements AfterViewInit, OnInit, ControlValueAccessor {
  @ViewChild('input', { read: ElementRef, static: false }) public input: ElementRef;
  @Input() placeholder = '';

  onChange: (obj: any) => void;
  onTouched: () => void;
  public disabled: boolean;
  private beforeValue: string;
  private initialValue;

  constructor(@Self() public controlDir: NgControl) {
    controlDir.valueAccessor = this;
  }

  ngOnInit() {
    const control = this.controlDir.control;
    control.setValidators([this.validate, control.validator]);
    control.updateValueAndValidity();
    control.valueChanges.subscribe(value => {
      const inputNumber = Number(value);
      if (this.beforeValue && this.beforeValue.indexOf(':') != -1) {
        this.beforeValue = value;
        return;
      }

      if (inputNumber && inputNumber >= 10 && inputNumber < 24) {
        const formatedValue = `${value}:`;
        control.setValue(formatedValue, {emitEvent: false});
        this.input.nativeElement.value = formatedValue;
        this.beforeValue = formatedValue;
        return;
      }

      this.beforeValue = value;
    });
  }
  
  validate(control: AbstractControl) {
    function isHHMMWithColon(value: string) {
      const hoursStr = value.split(':')[0];
      const minutesStr = value.split(':')[1];
      if (hoursStr == null || minutesStr == null) {
        return false;
      }

      if (hoursStr === '' || minutesStr === '') {
        return false;
      }

      if (hoursStr.length > 2 || minutesStr.length > 2) {
        return false;
      }

      const hours = Number(value.split(':')[0]);
      const minutes = Number(value.split(':')[1]);
      if (isNaN(hours) || isNaN(minutes)) {
        return false;
      }

      if (!isFinite(hours) || !isFinite(minutes)) {
        return false;
      }

      if (!Number.isInteger(hours) || !Number.isInteger(minutes)) {
        return false;
      }


      return true;
    }

    function checkRange(value: string) {
      const hours = Number(value.split(':')[0]);
      const minutes = Number(value.split(':')[1]);
      if (hours >= 24 || minutes >= 60) {
        return false;
      }

      return true;
    }

    if (control.value == null || control.value === '') {
      return null;
    }

    if (!isHHMMWithColon(control.value)) {
      return { format: true };
    }

    if (!checkRange(control.value)) {
      return { range: true };
    }

    return null;
  }

  ngAfterViewInit() {      
    this.input.nativeElement.value = this.initialValue;
  }
  writeValue(obj: any): void {
    this.initialValue = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  plus() {
    if (this.controlDir.control.valid) {
      const hoursStr = this.controlDir.control.value.split(':')[0];
      const hours = Number(this.controlDir.control.value.split(':')[0]);
      const minutes = Number(this.controlDir.control.value.split(':')[1]);

      if (minutes >= 59 && hours >= 23) {
        this.input.nativeElement.value = '00:00';
        this.controlDir.control.setValue('00:00');
        this.beforeValue = '00:00';
        return;
      }

      if (minutes >= 59) {
        const formatedValue = `${('00' + (hours + 1)).slice(-2)}:00`;
        this.input.nativeElement.value = formatedValue;
        this.controlDir.control.setValue(formatedValue);
        this.beforeValue = formatedValue;
        return;
      }

      const formatedValue = `${hoursStr}:${('00' + (minutes + 1)).slice(-2)}`;
      this.input.nativeElement.value = formatedValue;
      this.controlDir.control.setValue(formatedValue);
      this.beforeValue = formatedValue;
      return;
    }

    this.input.nativeElement.value = '00:00';
    this.controlDir.control.setValue('00:00');
    this.beforeValue = '00:00';
    return;
  }

  minus() {
    if (this.controlDir.control.valid) {
      const hoursStr = this.controlDir.control.value.split(':')[0];
      const hours = Number(this.controlDir.control.value.split(':')[0]);
      const minutes = Number(this.controlDir.control.value.split(':')[1]);

      if (minutes <= 0 && hours <= 0) {
        this.input.nativeElement.value = '23:59';
        this.controlDir.control.setValue('23:59');
        this.beforeValue = '23:59';
        return;
      }

      if (minutes <= 0) {
        const formatedValue = `${('00' + (hours - 1)).slice(-2)}:59`;
        this.input.nativeElement.value = formatedValue;
        this.controlDir.control.setValue(formatedValue);
        this.beforeValue = formatedValue;
        return;
      }

      const formatedValue = `${hoursStr}:${('00' + (minutes - 1)).slice(-2)}`;
      this.input.nativeElement.value = formatedValue;
      this.controlDir.control.setValue(formatedValue);
      this.beforeValue = formatedValue;
      return;
    }

    this.input.nativeElement.value = '00:00';
    this.controlDir.control.setValue('00:00');
    this.beforeValue = '00:00';
    return;
  }
}
