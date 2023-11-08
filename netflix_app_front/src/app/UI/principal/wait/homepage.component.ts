import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})

export class HomepageComponent {
  @Input() title: string = 'Popular on Netflix';
  @Input() contents: any[] = [
    { imagePath: 'https://github.com/carlosavilae/Netflix-Clone/blob/master/img/p1.PNG?raw=true'  },
    { imagePath: 'https://github.com/carlosavilae/Netflix-Clone/blob/master/img/p2.PNG?raw=true'  },
    { imagePath: 'https://github.com/carlosavilae/Netflix-Clone/blob/master/img/p3.PNG?raw=true'  },
    { imagePath: 'https://github.com/carlosavilae/Netflix-Clone/blob/master/img/p4.PNG?raw=true'  },
    { imagePath: 'https://github.com/carlosavilae/Netflix-Clone/blob/master/img/p5.PNG?raw=true'  },
    { imagePath: 'https://github.com/carlosavilae/Netflix-Clone/blob/master/img/p6.PNG?raw=true'  },
    { imagePath: 'https://github.com/carlosavilae/Netflix-Clone/blob/master/img/p7.PNG?raw=true'  },
    { imagePath: 'https://github.com/carlosavilae/Netflix-Clone/blob/master/img/p8.PNG?raw=true'  },
    { imagePath: 'https://github.com/carlosavilae/Netflix-Clone/blob/master/img/p9.PNG?raw=true'  },
    { imagePath: 'https://github.com/carlosavilae/Netflix-Clone/blob/master/img/p10.PNG?raw=true'  },
    { imagePath: 'https://github.com/carlosavilae/Netflix-Clone/blob/master/img/p11.PNG?raw=true'  },
    { imagePath: 'https://github.com/carlosavilae/Netflix-Clone/blob/master/img/p12.PNG?raw=true'  },
  ];
}
