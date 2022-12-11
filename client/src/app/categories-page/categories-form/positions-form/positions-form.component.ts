import { MaterialInstance } from './../../../shared/classes/material.service';
import { PositionsService } from './../../../shared/services/positions.service';
import { Component, Input, OnInit, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Position } from 'src/app/shared/interfaces';
import { MaterialService } from 'src/app/shared/classes/material.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-positions-form',
  templateUrl: './positions-form.component.html',
  styleUrls: ['./positions-form.component.css']
})
export class PositionsFormComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input('categoryId') categoryId: string | undefined; // here we define var that passed from parent component
  @ViewChild('modal') modalRef: ElementRef | undefined;

  positions: Position[] = [];
  loading: boolean = false;
  positionId: string = '';
  modal?: MaterialInstance;
  form?: FormGroup;
  constructor(private positionsService: PositionsService) { } // inject service in our component

  completed =  () => {
    this.form?.reset(),
    this.modal?.close!(),
    this.form?.enable();
  };


  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      cost: new FormControl(null, [Validators.required, Validators.min(1)]),
    })

    this.loading = true;
    this.positionsService.fetch(this.categoryId!)
      .subscribe(positions => {
        this.positions = positions;
        this.loading = false;
      });
  }

  ngAfterViewInit(): void {
    this.modal = MaterialService.initModal(this.modalRef!);
  }

  ngOnDestroy(): void {
    this.modal?.destroy?.()!;
  }
 
  onSelectPosition(position: Position) {
    this.positionId = position._id!;
    this.form?.patchValue({// here we define valuse of form with values from our position
      name: position.name,
      cost: position.cost,
    })
    this.modal?.open?.();
    MaterialService.updateTextInputs();
  }

  onAddPosition() {
    this.positionId = '';
    this.form?.reset({// here we define valuse of form with values from our position
      name: null,
      cost: null,
    })
    MaterialService.updateTextInputs();
    this.modal?.open?.();
  } 
  onCancel() {
    this.modal?.close?.();
  }


  onSubmit() {
    this.form?.disable();

    const newPosition: Position = {
      name: this.form?.value.name,
      cost: this.form?.value.cost,
      category: this.categoryId!,
    }

    if (this.positionId) {
      newPosition._id = this.positionId;
      this.positionsService.update(newPosition).subscribe(pos => {
          const i = this.positions.findIndex(p => p._id === this.positionId);
        this.positions[i] = pos;
        MaterialService.toast('position was updated');
      },
        error => {
          MaterialService.toast(error.error);
        },
          this.completed)
    } else {
      this.positionsService.create(newPosition)
      .subscribe(pos => {
        MaterialService.toast('position was created');
        this.positions.push(pos);

      },
        error => {
          MaterialService.toast(error.error);
        },
          this.completed)
    }
  }

  onDeletePosition(event: Event, position: Position) {
    event.stopPropagation();
    const decision = window.confirm('Are you sure that you want to delete position?');
    if (decision) {
      this.positionsService.delete(position)
        .subscribe(
          response => {
          const i = this.positions.findIndex(p => p._id === position._id);
          this.positions.splice(i,1);
          MaterialService.toast(response.message);
        },
        error => {
          MaterialService.toast(error.error);
          });
    }
  }

}
