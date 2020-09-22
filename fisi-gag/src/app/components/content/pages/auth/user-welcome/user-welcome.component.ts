import { Component, OnInit } from '@angular/core';
import ParticlesConfig from '../../../../../../assets/data/particles.json';
declare var particlesJS: any;

@Component({
  selector: 'app-user-welcome',
  templateUrl: './user-welcome.component.html',
  styleUrls: ['./user-welcome.component.scss']
})
export class UserWelcomeComponent implements OnInit {

  constructor() { }

  private slogans: string[] = [
    'It\'s like Facebook, but entierly different!',
    'What happens at 9¾-GAG stays at 9¾-GAG!',
    '69% of people find something dirty in every sentence...',
    'People say nothing is impossible, But I do nothing everyday',
    'My imaginary friend thinks you have some serious problems',
    'Life is short, smile while you still have teeth',
    'Don’t Drink and Drive, You might hit a bump and spill something'
  ];

  public sloganCurrent = 'Something is wrong. I can feel it ... :/';

  ngOnInit(): void {
    this.sloganCurrent = this.slogans[Math.round(Math.random() * (this.slogans.length - 1))];
    particlesJS('particles-js', ParticlesConfig, () => {
      console.log('callback - particles.js config loaded');
    });
  }

}
