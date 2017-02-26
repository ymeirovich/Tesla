
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { IEtlProps } from '../shared/data.interface';

@Component({
  selector: 'kendo-grid-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss'],
  styles: [
    "input[type=text] { width: 100%; }"
  ],
})
export class EditFormComponent {
  private props: IEtlProps;
  private editForm = new FormGroup({
    'Stage': new FormControl(),
    'Rerun_Description': new FormControl("", Validators.required),
    'Message': new FormControl(0),
    // 'UnitsInStock': new FormControl("", Validators.compose([Validators.required, Validators.pattern('^[0-9]{1,2}')])),
    // 'Discontinued': new FormControl(false)
  });

  private active: boolean = false;

  @Input() public isNew: boolean = false;

  @Input() public set model(product: any) {
    this.editForm.reset(product);

    this.active = product !== undefined;
  }

  @Output() cancel: EventEmitter<any> = new EventEmitter();
  @Output() save: EventEmitter<any> = new EventEmitter();

  constructor() {
    //this.props.Stage
  }

  public onSave(e): void {
    e.preventDefault();
    this.save.emit(this.editForm.value);
    this.active = false;
  }

  public onCancel(e): void {
    e.preventDefault();
    this.closeForm();
  }

  private closeForm(): void {
    this.active = false;
    this.cancel.emit();
  }
}