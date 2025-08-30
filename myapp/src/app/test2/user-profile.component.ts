import { Component, Input, signal, computed } from '@angular/core';

@Component({
  selector: 'app-upload-overflow-error',
  templateUrl: './upload-overflow-error.component.html',
  styleUrls: ['./upload-overflow-error.component.scss'],
})
export class UploadOverflowErrorComponent {
  /** Files rejected due to max limit (pass the *newly* rejected ones). */
  @Input({ required: true }) rejectedFiles: File[] = [];

  /** Max files allowed (for message text). */
  @Input() max = 10;

  /** If you also want to show how many were accepted this attempt. */
  @Input() acceptedCountThisAttempt = 0;

  /** Start collapsed. */
  showDetails = signal(false);

  count = computed(() => this.rejectedFiles?.length ?? 0);

  // Optional: limit long lists initially, but full list appears in details.
  previewLimit = 5;

  get previewNames(): string[] {
    return (this.rejectedFiles ?? []).slice(0, this.previewLimit).map(f => f.name);
  }

  get remainingCount(): number {
    const c = this.count();
    return c > this.previewLimit ? c - this.previewLimit : 0;
  }

  toggleDetails = () => this.showDetails.update(v => !v);
}
