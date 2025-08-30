import { Component, Input, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

export interface OverflowData {
  rejectedFiles: File[];
  max?: number;
  acceptedCountThisAttempt?: number;
  showActions?: boolean;   // only relevant for dialog usage
}

@Component({
  selector: 'app-unified-overflow',
  templateUrl: './unified-overflow.component.html',
  styleUrls: ['./unified-overflow.component.scss']
})
export class UnifiedOverflowComponent {
  // Inline usage inputs
  @Input() rejectedFiles: File[] = [];
  @Input() max = 10;
  @Input() acceptedCountThisAttempt = 0;
  @Input() showActions = false; // inline: usually false

  showDetails = false;
  previewLimit = 5;

  constructor(
    @Optional() public dialogRef: MatDialogRef<UnifiedOverflowComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) private dialogData: OverflowData
  ) {
    // If opened via MatDialog, prefer dialog data over @Inputs
    if (dialogData) {
      this.rejectedFiles = dialogData.rejectedFiles || [];
      if (typeof dialogData.max === 'number') this.max = dialogData.max!;
      if (typeof dialogData.acceptedCountThisAttempt === 'number') {
        this.acceptedCountThisAttempt = dialogData.acceptedCountThisAttempt!;
      }
      if (typeof dialogData.showActions === 'boolean') this.showActions = dialogData.showActions!;
      else this.showActions = true; // by default show dialog actions when in a dialog
    }
  }

  // Helpers
  get count(): number { return this.rejectedFiles ? this.rejectedFiles.length : 0; }
  get previewNames(): string[] {
    return (this.rejectedFiles || []).slice(0, this.previewLimit).map(f => f.name);
  }
  get remainingCount(): number { return Math.max(0, this.count - this.previewLimit); }

  toggleDetails() { this.showDetails = !this.showDetails; }
  close() { if (this.dialogRef) this.dialogRef.close(); }

  // Optional convenience to open this as a dialog from anywhere
  static openDialog(dialog: MatDialog, data: OverflowData) {
    return dialog.open(UnifiedOverflowComponent, {
      width: '520px',
      autoFocus: false,
      restoreFocus: true,
      data: { ...data, showActions: true }
    });
  }
}
