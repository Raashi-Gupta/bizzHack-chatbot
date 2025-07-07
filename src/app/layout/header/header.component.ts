import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- IMPORT THIS
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-header',
  imports: [FormsModule,DropdownModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
    languages = [
    { label: 'English', value: 'en' },
    { label: 'Hindi - हिन्दी', value: 'hi' },
    { label: 'Tamil - தமிழ்', value: 'ta' },
    { label: 'Telugu - తెలుగు', value: 'te' },
    { label: 'Bengali - বাংলা', value: 'bn' },
    { label: 'Gujarati - ગુજરાતી', value: 'gu' },
    { label: 'Kannada - ಕನ್ನಡ', value: 'kn' },
    { label: 'Malayalam - മലയാളം', value: 'ml' },
    { label: 'Marathi - मराठी', value: 'mr' },
    { label: 'Punjabi - ਪੰਜਾਬੀ', value: 'pa' },
    { label: 'Urdu - اردو', value: 'ur' }
  ];
  selectedLanguage = 'en'; 
  isOpen = false;
    toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  closeDropdown() {
    setTimeout(() => (this.isOpen = false), 200); // delay to allow click
  }

  navigate(action: string) {
    console.log('Navigating to:', action);
    this.isOpen = false;
  }

}

