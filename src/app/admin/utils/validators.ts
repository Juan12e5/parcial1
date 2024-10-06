import { AbstractControl, ValidatorFn } from '@angular/forms';

export function fileTypeValidator(allowedTypes: string[]): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const file = control.value;

    if (!file) {
      return null;
    }
    if (file instanceof File) {
      const fileType = file.type;
      if (!allowedTypes.includes(fileType)) {
        return { invalidFileType: true }; 
      }
    }
    
    return null;
  };
}
