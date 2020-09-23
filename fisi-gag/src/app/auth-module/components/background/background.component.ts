import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import ParticlesConfig from '../../../../assets/data/particles.json';
declare var particlesJS: any;

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss'],

})
export class BackgroundComponent implements OnInit {

  constructor() { }

  private slogans: string[] = [
    'It\'s like Facebook, but entierly different!',
    'What happens at 9¾-GAG stays at 9¾-GAG!',
    '69% of people find something dirty in every sentence...',
    'People say nothing is impossible, But I do nothing everyday',
    'My imaginary friend thinks you have some serious problems',
    'Life is short, smile while you still have teeth',
    'Don’t Drink and Drive, You might hit a bump and spill something',
    'Life is too short to remove USB safely',
    'Political correctness is tyranny with manners.',
    'I’m not insane. My mother had me tested.',
    'Woke up today. It was terrible.',
    'I’m not superstitious, but I am a little stitious.',
    'The worst thing about prison was the dementors.',
    'And I knew exactly what to do. But in a much more real sense, I had no idea what to do.',
    'Whenever I’m sad, I stop being sad and be awesome instead.',
    'All hail Beercules!',
    'Shotgun.',
    'This Is Heavy!',
    'I guess you guys aren’t ready for that yet. But your kids are gonna love it.',
    'Roads? Where we’re going, we don’t need roads.'
  ];

  public sloganCurrent = 'Something is wrong. I can feel it ... :/';

  ngOnInit(): void {
    this.sloganCurrent = this.slogans[Math.round(Math.random() * (this.slogans.length - 1))];
    particlesJS('particles-js', ParticlesConfig, () => {
      console.log('callback - particles.js config loaded');
    });
  }

  newSlogan(){
    let newSlogan = this.sloganCurrent;
    while (newSlogan === this.sloganCurrent){
      newSlogan = this.slogans[Math.round(Math.random() * (this.slogans.length - 1))];
    }
    this.sloganCurrent = newSlogan;
  }

}
