import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { IonicModule, ActionSheetController } from '@ionic/angular';
import jsPDF from 'jspdf';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Camera, CameraResultType, Photo } from '@capacitor/camera';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @Input() isModalOpen = false;
  @Output() modalClose = new EventEmitter<void>();

  selectedImages: string[] = [];
  description: string = '';

  private actionSheetCtrl= inject(ActionSheetController);

  closeModal() {
    this.modalClose.emit();
  }


  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Add Images',
      buttons: [
        {
          text: 'Take Picture',
          icon: 'camera',
          handler: () => this.takePicture(),
        },
        {
          text: 'Choose from Gallery',
          icon: 'images',
          handler: () => this.pickImages(),
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();
  }

  
  async takePicture() {
    try {
      const image: Photo = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.DataUrl,
      });

      if (image?.dataUrl) {
        this.selectedImages.push(image.dataUrl);
      }
    } catch (error) {
      console.error('Error taking photo:', error);
    }
  }

  removeImage(index: number) {
    this.selectedImages.splice(index, 1);
  }
  

 
  async pickImages() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = true;

    input.onchange = () => {
      const files = Array.from(input.files || []);
      files.forEach((file: any) => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.selectedImages.push(e.target.result);
        };
        reader.readAsDataURL(file);
      });
    };

    input.click();
  }

 
  async generateAndSharePDF() {
    try {
      const pdf = new jsPDF();
      const pdfWidth = pdf.internal.pageSize.getWidth() - 20;

    
      for (let i = 0; i < this.selectedImages.length; i++) {
        const img = this.selectedImages[i];

       
        const imgElement = new Image();
        imgElement.src = img;
        await new Promise((resolve) => (imgElement.onload = resolve));

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d')!;

        const maxWidth = 800;
        const scale = maxWidth / imgElement.width;
        const width = Math.min(imgElement.width, maxWidth);
        const height = imgElement.height * scale;

        canvas.width = width;
        canvas.height = height;
        context.drawImage(imgElement, 0, 0, width, height);

        const resizedImage = canvas.toDataURL('image/jpeg', 0.7); 

        
        const imgProps = pdf.getImageProperties(resizedImage);
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        if (i > 0) {
          pdf.addPage();
        }
        pdf.addImage(resizedImage, 'JPEG', 10, 10, pdfWidth, pdfHeight);
      }

      
      pdf.addPage();
      pdf.setFontSize(14);
      pdf.text('Description:', 10, 20); 
      pdf.setFontSize(12);
      pdf.text(this.description, 10, 30, { maxWidth: pdfWidth }); 

      const fileName = 'shared_images';
      const pdfBlob = pdf.output('blob');
      const file = new File([pdfBlob], `${fileName}.pdf`, { type: 'application/pdf' });

      if (navigator.share) {
        await navigator.share({
          files: [file],
          title: 'Shared PDF',
          text: 'Here is your shared PDF.',
        });
      } else {
        console.error('Web Share API not supported.');
      }
    } catch (error) {
      console.error('Error generating and sharing PDF:', error);
    }
  }
}
