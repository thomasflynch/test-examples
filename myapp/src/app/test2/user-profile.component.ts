import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-upload-overflow-error',
  templateUrl: './upload-overflow-error.component.html',
  styleUrls: ['./upload-overflow-error.component.scss']
})
export class UploadOverflowErrorComponent {
  @Input() rejectedFiles: File[] = [];
  @Input() max = 10;
  @Input() acceptedCountThisAttempt = 0;

  showDetails = false;
  previewLimit = 5;

  get count(): number {
    return this.rejectedFiles ? this.rejectedFiles.length : 0;
  }

  get previewNames(): string[] {
    return (this.rejectedFiles || [])
      .slice(0, this.previewLimit)
      .map(f => f.name);
  }

  get remainingCount(): number {
    const c = this.count;
    return c > this.previewLimit ? c - this.previewLimit : 0;
  }

  toggleDetails() {
    this.showDetails = !this.showDetails;
  }
}
